import React, { Fragment } from "react";
import ActorSkeleton, { TextSkeleton } from "./ActorSkeleton";
import { limit } from "@/utils/constants";

function EventsSkeleton() {
  return (
    <Fragment>
      {[...Array(limit)].map((_, i) => {
        return (
          <tr key={i}>
            <td className="p-4">
              <ActorSkeleton />
            </td>

            <td>
              <TextSkeleton />
            </td>

            <td>
              <TextSkeleton />
            </td>

            <td className="flex flex-col items-center">
              <button onClick={() => {}}>
                <img src="/Vector (Stroke).svg" />
              </button>
            </td>
          </tr>
        );
      })}
    </Fragment>
  );
}

export default EventsSkeleton;
