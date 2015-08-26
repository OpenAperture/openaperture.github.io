sidebarNodes = {
  "modules": [
    {"id": "OpenAperture.Overseer",
"docs": ["start/2"]
},{"id": "OpenAperture.Overseer.Clusters.ClusterMonitor",
"docs": ["handle_cast/2","monitor/1","monitor_cluster/1","monitor_cluster_units/1","monitor_host/3","monitor_hosts/2","monitor_unit_instances/3","monitor_units/2","start_link/1"]
},{"id": "OpenAperture.Overseer.Clusters.ClustersMonitor",
"docs": ["handle_cast/2","monitor_cached_clusters/1","monitor_cluster/2","monitor_clusters/1","start_link/0","stop_monitoring_clusters/2"]
},{"id": "OpenAperture.Overseer.Components.ComponentMgr",
"docs": ["component/1","current_upgrade_task/1","handle_call/3","refresh/1","request_upgrade/1","save/2","set_task/3","start_link/1"]
},{"id": "OpenAperture.Overseer.Components.ComponentStatusMgr",
"docs": ["check_for_upgrade/1","handle_cast/2","start_link/1"]
},{"id": "OpenAperture.Overseer.Components.ComponentsMgr",
"docs": ["get_mgr_for_component_type/1","handle_cast/2","resolve_system_components/1","start_link/0"]
},{"id": "OpenAperture.Overseer.Components.MonitorTask",
"docs": ["check_upgrade_status/2","create/1","execute_monitoring/1","resolve_current_workflow/1"]
},{"id": "OpenAperture.Overseer.Components.UpgradeTask",
"docs": ["create/1","create_upgrade_workflows/2","eligible_for_upgrade?/1","execute_upgrade/1","upgrade/3"]
},{"id": "OpenAperture.Overseer.Configuration",
"docs": ["get_current_broker_id/0","get_current_exchange_id/0","get_current_queue_name/0","get_current_system_modules_queue_name/0"]
},{"id": "OpenAperture.Overseer.Dispatcher",
"docs": ["acknowledge/1","close_connection/1","process_request/3","publish/3","publish_rpc/4","register_queues/0","reject/2","start_link/0","subscribe/3","unsubscribe/2"]
},{"id": "OpenAperture.Overseer.FleetManagerPublisher",
"docs": ["close_connection/1","list_machines!/2","list_unit_states!/2","list_units!/2","node_info!/2","publish/3","publish_rpc/4","start_link/0","subscribe/3","unit_logs!/3","unsubscribe/2"]
},{"id": "OpenAperture.Overseer.MessageManager",
"docs": ["remove/1","start_link/0","track/1"]
},{"id": "OpenAperture.Overseer.Modules.Listener",
"docs": ["close_connection/1","handle_cast/2","process_event/2","publish/3","publish_rpc/4","start_link/0","subscribe/3","unsubscribe/2"]
},{"id": "OpenAperture.Overseer.Modules.Manager",
"docs": ["handle_cast/2","inactivate_listeners/1","set_modules/1","start_link/0"]
},{"id": "OpenAperture.Overseer.Modules.Retriever",
"docs": ["handle_cast/2","refresh_modules/0","start_link/0"]
},{"id": "OpenAperture.Overseer.Supervisor",
"docs": ["init/1","start_link/0"]

  }]

};
fillSidebarWithNodes(sidebarNodes);
