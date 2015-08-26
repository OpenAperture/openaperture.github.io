sidebarNodes = {
  "modules": [
    {"id": "OpenAperture.WorkflowOrchestrator",
"docs": ["start/2"]
},{"id": "OpenAperture.WorkflowOrchestrator.Builder.DockerHostResolver",
"docs": ["cache_stale?/1","get_build_clusters/1","get_exchange_cluster/1","get_global_build_clusters/0","get_local_build_clusters/0","handle_call/3","next_available/0","start_link/0"]
},{"id": "OpenAperture.WorkflowOrchestrator.Builder.Publisher",
"docs": ["build/3","close_connection/1","handle_cast/2","publish/3","publish_rpc/4","start_link/0","subscribe/3","unsubscribe/2"]
},{"id": "OpenAperture.WorkflowOrchestrator.Configuration",
"docs": ["get_current_broker_id/0","get_current_exchange_id/0","get_current_queue_name/0","get_ui_url/0"]
},{"id": "OpenAperture.WorkflowOrchestrator.Deployer.EtcdClusterMessagingResolver",
"docs": ["exchange_for_cluster/1","get_exchange_for_cluster/1","handle_call/3","start_link/0"]
},{"id": "OpenAperture.WorkflowOrchestrator.Deployer.Publisher",
"docs": ["close_connection/1","deploy/3","deploy_oa/3","handle_cast/2","publish/3","publish_rpc/4","start_link/0","subscribe/3","unsubscribe/2"]
},{"id": "OpenAperture.WorkflowOrchestrator.Dispatcher",
"docs": ["acknowledge/1","close_connection/1","execute_orchestration/2","publish/3","publish_rpc/4","register_queues/0","reject/2","start_link/0","subscribe/3","unsubscribe/2"]
},{"id": "OpenAperture.WorkflowOrchestrator.MessageManager",
"docs": ["remove/1","start_link/0","track/1"]
},{"id": "OpenAperture.WorkflowOrchestrator.Notifications.Publisher",
"docs": ["close_connection/1","email_notification/3","handle_cast/2","hipchat_notification/4","publish/3","publish_rpc/4","start_link/0","subscribe/3","unsubscribe/2"]
},{"id": "OpenAperture.WorkflowOrchestrator.Supervisor",
"docs": ["init/1","start_link/0"]
},{"id": "OpenAperture.WorkflowOrchestrator.Workflow",
"docs": ["add_event_to_log/3","add_failure_notification/2","add_success_notification/2","complete?/1","create_from_payload/1","failed?/1","get_id/1","get_info/1","refresh/1","resolve_next_milestone/1","resolve_next_step/1","save/1","send_failure_notification/2","send_notification/3","send_success_notification/2","send_workflow_completed_email/1","workflow_failed/2"]
},{"id": "OpenAperture.WorkflowOrchestrator.WorkflowFSM",
"docs": ["build/3","call_builder/1","code_change/4","config/3","deploy/3","deploy_oa/3","execute/1","handle_event/3","handle_info/3","handle_sync_event/4","init/1","scheduled/3","start_link/2","terminate/3","workflow_completed/3","workflow_starting/3"]

  }]

};
fillSidebarWithNodes(sidebarNodes);
