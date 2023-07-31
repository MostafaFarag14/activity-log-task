import { ActivityEvent } from "@/utils/types";
import React from "react";

interface EventDetailsProps {
  event: ActivityEvent;
}

function EventDetails({ event }: EventDetailsProps) {
  const { actor_name, group, actor_id, action, occurred_at } = event ?? {};
  const { name, object, id } = action ?? {};

  return (
    <div className="grid grid-cols-3 gap-4 border border-border-color-2 rounded-xl p-8">
      <div>
        <h1 className="text-text-color-1">ACTOR</h1>

        <ul>
          <li className="flex flex-row justify-between">
            <p className="text-text-color-1">Name</p>
            <p>{actor_name}</p>
          </li>
          <li className="flex flex-row justify-between">
            <p className="text-text-color-1">Email</p>
            <p>{group}</p>
          </li>
          <li className="flex flex-row justify-between">
            <p className="text-text-color-1">ID</p>
            <p>{actor_id}</p>
          </li>
        </ul>
      </div>

      <div>
        <h1 className="text-text-color-1">ACTION</h1>

        <ul>
          <li className="flex flex-row justify-between">
            <p className="text-text-color-1">Name</p>
            <p>{name}</p>
          </li>
          <li className="flex flex-row justify-between">
            <p className="text-text-color-1">Object</p>
            <p>{object}</p>
          </li>
          <li className="flex flex-row justify-between">
            <p className="text-text-color-1">ID</p>
            <p>{id}</p>
          </li>
        </ul>
      </div>
      <div>
        <h1 className="text-text-color-1">DATE</h1>

        <ul>
          <li className="flex flex-row justify-between">
            <p className="text-text-color-1">Readable</p>
            <p>{new Date(occurred_at).toLocaleString()}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EventDetails;
