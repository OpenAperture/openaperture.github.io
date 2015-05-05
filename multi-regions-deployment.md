# How to configure a multi-regions deployment with OpenAperture and AWS

In this post I’ll show you how can you use OpenAperture and AWS to create a multi-regions deployment environment.

To understand some basic EC2 and VPC concepts, VPC stands for virtual private cloud and is the equivalent of having a virtual data center in the cloud. You can assign a network CIDR, ACLs and utilize many other features that you would see in a traditional data center. If you’ve never used a VPC before I would suggest that you read over the official [AWS documentation](http://aws.amazon.com/documentation/vpc/?nc2=h_ls).

## What was the status quo?

There was an existing OpenAperture system on the basis of AWS in Virginia. The deployment was working by private ip addresses. That means, we were able to start a deployment in Virginia (private ip addresses). If we wanted to deploy a system in Sydney, EU or Ireland we were forced to use the public ip addresses. That doesn’t match with the security pillar! We were looking for a solution to solve this problem.

## Target state

Following long and extensive discussions, we decided for a global private network. To accomplish that, we using a VPN solution to encrypt the connections between the different VPCs regions.

So, we are starting with a look at how the network is built:

(NETWORK GRAPHIC)

As software VPN solution we are using OpenSwan. We’ve got 3 different regions (US East, EU and Asia Pacific) with 3 different VPN gateways.

Because we wanted to build a high-availability system, each system is approximately assigned to 2 subnets. To give an example: The CoreOS machines are located in different subnets and availability zones. If one availability zone is down, the system will still work! This is a hugely important feature if you build a high-availability system.

The OpenAperture build server is located in Virginia, which means that Virginia must be able to communicate with all regions. The regions Sydney and FFM don’t communicate with each other, only to Virginia. 

This is a quick overview of our VPC setup:

|                       | VPC#1 Virginia| VPC#2 Sydney  | VPC#3 EU     |
| :---------------------|:------------- | :------------ | :----------- |
| CIDR                  | 10.11.0.0/16  | 12.11.0.0/16  | 13.11.0.0/16 |
| VPN server subnet     | 10.11.4.0/24  | 12.11.4.0/24  | 13.11.4.0/24 |
| VPN server static IP  | 10.11.4.5     | 12.11.4.5     | 13.11.4.5    |
| VPN server public IP  | EIP1          | EIP2          | EIP3         |
| fns subnet (zone A)   |               | 12.11.6.0/24  | 13.11.6.0/24 |
| fns subnet (zone B)   |               | 12.11.7.0/24  | 13.11.7.0/24 |
| epss subnet (zone A)  |               | 12.11.8.0/24  | 13.11.8.0/24 |
| epss subnet (zone B)  |               | 12.11.9.0/24  | 13.11.9.0/24 |

## Configuration

### VPC’s and subnets

First up, we’ll create the required VPCs and subnets in the regions Sydney and EU. Please see the structure of the VPC and the subnets in the upper table.

### VPN Server

Now we’ll launch 3 Amazon Linux AMIs (in each region 1 VPN server) with this properties:

  - Elastic IP
  - Static IP addresses (see table)
  - Disable Source/Dest. Check

Next up, we configure the routing tables so that the VPN server in Virginia can communicate with the VPN servers in Sydney and EU. In Virginia, we route the traffic to the IPs 12.11.0.0/16 (Sydney) and 13.11.0.0/16 (FFM) through the VPN server instance (i-caa0741c).

(GRAPHIC main route table in Virginia)

In Sydney we route the traffic with the destination 10.11.0.0/16 (Virginia) through the VPN server instance (i-4277ce9e)

(GRAPHIC main route table in Sydney)

and also in the EU VPC we route the traffic with the destination 10.11.0.0/16 (Virginia) through the VPN server instance (i-0da8f0c3).

(GRAPHIC main route table in EU)

When done you can install the VPN software OpenSwan on each VPN server instance with the command `sudo yum install openswan`.

We have to make sure that OpenSwan use our configuration file(s) stored under 
`/etc/ipsec.d/`. Therefore we need to uncomment the last line of the ipsec.conf file (`/etc/ipsec.conf`) so it looks like the following:

```
# /etc/ipsec.conf - Openswan IPsec configuration file
#
# Manual: ipsec.conf.5
#
# Please place your own config files in /etc/ipsec.d/ ending in .conf

version 2.0 # conforms to second version of ipsec.conf specification

# basic configuration
config setup
    # Debug-logging controls: "none" for (almost) none, "all" for lots.
    # klipsdebug=none
    # plutodebug="control parsing"
    # For Red Hat Enterprise Linux and Fedora, leave protostack=netkey
    protostack=netkey
    nat_traversal=yes
    virtual_private=
    oe=off
    # Enable this if you see "failed to find any available worker"
    # nhelpers=0

#You may put your configuration (.conf) file in the "/etc/ipsec.d/" and uncomment this.
include /etc/ipsec.d/*.conf
```

There are various ways to use encryption between the VPN server instances. We decided to use the Pre-Shared key method. You can generate [here](http://geekpasswordgenerator.com/) or [here](http://randomkeygen.com/) an unique Pre-Shared key.

We start with the OpenSwan configuration on the VPN server instance in Virginia. (btw: It doesn’t make a difference if you start with the VPN server in Sydney or EU.)

We created the first configuration files under `etc/ipsec.d/` for the connection from Virginia to Sydney with the command `sudo nano /etc/ipsec.d/vpc1-to-vpc2.conf`:

```
conn vpc1-to-vpc2
    type=tunnel
    authby=secret
    left=%defaultroute
    leftid=<EIP1>
    leftnexthop=%defaultroute
    leftsubnet=<VPC1 CIDR>
    right=<EIP2>
    rightsubnet=<VPC2 CIDR>
    pfs=yes
    auto=start
```

and the required secret file for the connection `sudo nano /etc/ipsec.d/vpc1-to-vpc2.secrets`

```
<EIP1> <EIP2>: PSK "Preshared Key"
```

As a next step you create the second configuration file for the connection from Virginia to EU with the command `sudo nano /etc/ipsec.d/vpc1-to-vpc3.conf`

```
conn vpc1-to-vpc3
    type=tunnel
    authby=secret
    left=%defaultroute
    leftid=<EIP1>
    leftnexthop=%defaultroute
    leftsubnet=<VPC1 CIDR>
    right=<EIP3>
    rightsubnet=<VPC3 CIDR>
    pfs=yes
    auto=start
```

and the required secret file for the connection `sudo nano /etc/ipsec.d/vpc1-to-vpc3.secrets`

```
<EIP1> <EIP3>: PSK "Preshared Key"
```

These steps must also be performed on the VPN server instances in Sydney and EU with a customized configuration.

For the connection Sydney-Virginia `sudo nano /etc/ipsec.d/vpc2-to-vpc1.conf`

```
conn vpc2-to-vpc1
    type=tunnel
    authby=secret
    left=%defaultroute
    leftid=<EIP2>
    leftnexthop=%defaultroute
    leftsubnet=<VPC2 CIDR>
    right=<EIP1>
    rightsubnet=<VPC1 CIDR>
    pfs=yes
    auto=start
```

and the required secret file for the connection Sydney-Virginia `sudo nano /etc/ipsec.d/vpc2-to-vpc1.secrets`

```
<EIP2> <EIP1>: PSK "Preshared Key"
```

For the connection EU-Virginia `sudo nano /etc/ipsec.d/vpc3-to-vpc1.conf`

```
conn vpc3-to-vpc1
    type=tunnel
    authby=secret
    left=%defaultroute
    leftid=<EIP3>
    leftnexthop=%defaultroute
    leftsubnet=<VPC3 CIDR>
    right=<EIP1>
    rightsubnet=<VPC1 CIDR>
    pfs=yes
    auto=start
```

and the required secret file for the connection EU-Virginia

```
<EIP3> <EIP1>: PSK "Preshared Key"
```

And now the last steps! You need to perform the following commands on each VPN server instance.


Start IPSec/Openswan and set that the service always start on boot with these commands:

```sh
$ sudo service ipsec start
$ sudo chkconfig ipsec on
```

Add the following lines to the `/etc/sysctl.conf` file. This has the effect that the VPN server instances forward/route the incoming traffic:

```
net.ipv4.ip_forward = 1
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
```

Restart the network service `$ sudo service network restart`

