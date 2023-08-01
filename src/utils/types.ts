export interface ActivityEvent {
  id: string;
  object: "event";
  actor_id: string;
  actor_name: string;
  group: string;
  action: {
    id: string;
    object: "event_action";
    name: string;
  };
  target_id: string;
  target_name: string;
  location: string;
  occurred_at: string;
  meta_data: {
    redirect: string;
    description: string;
    x_request_id: string;
  };
}
