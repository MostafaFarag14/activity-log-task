import { fetcher } from "@/utils/constants";
import React, { useMemo } from "react";
import useSWR from "swr";

interface Event {
  actor_id: string;
  target_id: string;
}

interface Action {
  id: string;
  name: string;
}

interface EventsFilterProps {
  selectedActionId: string | undefined;
  onSelectedActionIdChange: (text: string) => void;
  selectedActionName: string | undefined;
  onSelectedActionNameChange: (text: string) => void;
  selectedTargetId: string | undefined;
  onSelectedTargetIdChange: (text: string) => void;
  selectedActorId: string | undefined;
  onSelectedActorIdChange: (text: string) => void;
}

function EventsFilter({
  selectedActionId,
  onSelectedActionIdChange,
  selectedActionName,
  onSelectedActionNameChange,
  selectedTargetId,
  onSelectedTargetIdChange,
  selectedActorId,
  onSelectedActorIdChange,
}: EventsFilterProps) {
  const { data } = useSWR("/filters", fetcher);

  const { actions, events }: { actions: Action[]; events: Event[] } =
    useMemo(() => {
      return data ?? {};
    }, [data]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <h4 className="flex-1">Action ID</h4>
        <select
          value={selectedActionId ?? ""}
          onChange={(e) => onSelectedActionIdChange(e.target.value)}
          className="flex-1 p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600"
        >
          <option value="" disabled hidden>
            Select Action ID
          </option>
          {actions?.map((action) => (
            <option key={action.id}>{action.id}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-row items-center gap-2 justify-between">
        <h4 className="flex-1">Action Name</h4>
        <select
          value={selectedActionName ?? ""}
          onChange={(e) => onSelectedActionNameChange(e.target.value)}
          className="flex-1 p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600"
        >
          <option value="" disabled hidden>
            Select Action Name
          </option>
          {actions?.map((action) => (
            <option key={action.name}>{action.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-row items-center gap-2 justify-between">
        <h4 className="flex-1">Actor ID</h4>

        <select
          value={selectedActorId ?? ""}
          onChange={(e) => onSelectedActorIdChange(e.target.value)}
          className="flex-1 p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600"
        >
          <option value="" disabled hidden>
            Select Actor ID
          </option>
          {events?.map((event) => (
            <option key={event.actor_id}>{event.actor_id}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-row items-center gap-2 justify-between">
        <h4 className="flex-1">Target ID</h4>

        <select
          value={selectedTargetId ?? ""}
          onChange={(e) => onSelectedTargetIdChange(e.target.value)}
          className="flex-1 p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600"
        >
          <option value="" disabled hidden>
            Select Target ID
          </option>
          {events?.map((event) => (
            <option key={event.target_id}>{event.target_id}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default EventsFilter;
