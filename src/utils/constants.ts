import { ActivityEvent } from "./types";

export const limit = 4;

export const events: ActivityEvent[] = [
  {
    id: "evt_15B56WILKW5K",
    object: "event",
    actor_id: "user_3VG74289PUA2",
    actor_name: "Ali Salah",
    group: "instatus.com",
    action: {
      id: "498ca03c-9487-432c-92ce-3434af0864d5",
      object: "event_action",
      name: "user.login_succeeded",
    },
    target_id: "user_DOKVD1U3L030",
    target_name: "ali@instatus.com",
    location: "105.40.62.95",
    occurred_at: "2022-01-05T14:31:13.607Z",
    meta_data: {
      redirect: "/setup",
      description: "User login succeeded.",
      x_request_id: "req_W1Y13QOHMI5H",
    },
  },
  {
    id: "evt_15B56WILKW5K",
    object: "event",
    actor_id: "user_4FW74258PUA2",
    actor_name: "Mohamed Zaki",
    group: "mohamedzaki@instatus.com",
    action: {
      id: "31b93534-624b-4d80-bb7e-5f78e8a1854b",
      object: "event_action",
      name: "user.searched_activity_log_events",
    },
    target_id: "user_KOJU1U3L030",
    target_name: "mohamed@instatus.com",
    location: "105.40.62.95",
    occurred_at: "2022-01-05T14:31:13.607Z",
    meta_data: {
      redirect: "/setup",
      description: "user.searched_activity_log_events",
      x_request_id: "req_W1Y13QOHMI5H",
    },
  },
  {
    id: "evt_15B56WILKW5K",
    object: "event",
    actor_id: "user_4FW74258PUA2",
    actor_name: "Wael Radwan",
    group: "waelradwan@instatus.com",
    action: {
      id: "e3159741-8c96-4b4c-9a7e-fa442bd87665",
      object: "event_action",
      name: "incident.create_succeeded",
    },
    target_id: "user_KOJU1U3L030",
    target_name: "waelradwan@instatus.com",
    location: "105.40.62.95",
    occurred_at: "2022-01-05T14:31:13.607Z",
    meta_data: {
      redirect: "/setup",
      description: "incident.create_succeeded",
      x_request_id: "req_W1Y13QOHMI5H",
    },
  },
  {
    id: "evt_15B56WILKW5K",
    object: "event",
    actor_id: "user_4FW74258PUA2",
    actor_name: "Aser Sabry",
    group: "superaser@instatus.com",
    action: {
      id: "6ac17351-b4c9-4cbc-bc0c-8a99227371d6",
      object: "event_action",
      name: "user.invited_teammate",
    },
    target_id: "user_KOJU1U3L030",
    target_name: "superaser@instatus.com",
    location: "105.40.62.95",
    occurred_at: "2022-01-05T14:31:13.607Z",
    meta_data: {
      redirect: "/setup",
      description: "user.invited_teammate",
      x_request_id: "req_W1Y13QOHMI5H",
    },
  },
];

export const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());
