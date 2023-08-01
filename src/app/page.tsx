"use client";

import EventDetails from "@/components/EventDetails";
import { fetcher, limit } from "@/utils/constants";
import { useDebounce, useDisclose } from "@/utils/customHooks";
import { ActivityEvent } from "@/utils/types";
import axios from "axios";
import { useState, useMemo, useCallback, Fragment } from "react";
import useSWRInfinite from "swr/infinite";
import moment from "moment";
import EventsSkeleton from "@/components/EventsSkeleton";
import EventsFilter from "@/components/EventsFilter";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const { isOpen, toggle } = useDisclose();
  const [openedEvent, setOpenedEvent] = useState("");
  const [selectedActionId, setSelectedActionId] = useState<undefined | string>(
    undefined
  );

  const { isOpen: isFilterOpen, toggle: toggleFilter } = useDisclose();

  const [selectedActionName, setSelectedActionName] = useState<
    undefined | string
  >(undefined);
  const [selectedActorId, setSelectedActorId] = useState<undefined | string>(
    undefined
  );
  const [selectedTargetId, setSelectedTargetId] = useState<undefined | string>(
    undefined
  );

  const getKey = useCallback(
    (page_index: number, previousPageData: ActivityEvent[]) => {
      // return a falsy value if this is the last page
      if (page_index && !previousPageData.length) return null;
      const actionIdQuery = selectedActionId
        ? `&action_id=${selectedActionId}`
        : "";
      const actionNameQuery = selectedActionName
        ? `&action_name=${selectedActionName}`
        : "";
      const actorIdQuery = selectedActorId
        ? `&actor_id=${selectedActorId}`
        : "";
      const targetIdQuery = selectedTargetId
        ? `&target_id=${selectedTargetId}`
        : "";

      return `/events?search_text=${debouncedSearchText}&page=${page_index}&limit=${limit}${actionIdQuery}${actionNameQuery}${actorIdQuery}${targetIdQuery}`;
    },
    [
      debouncedSearchText,
      selectedActionId,
      selectedActionName,
      selectedActorId,
      selectedTargetId,
    ]
  );

  const { data, isLoading, size, setSize } = useSWRInfinite<ActivityEvent[]>(
    getKey,
    fetcher,
    {}
  );

  const isLoadingMore = useMemo(
    () => isLoading || (size > 0 && data && !data[size - 1]),
    [data, isLoading, size]
  );

  const isLastPage = useMemo(() => {
    return data && data?.[size - 1]?.length < limit;
  }, [data, size]);

  const addEvent = async () => {
    await axios.post("/events", {});
  };

  return (
    <main className="flex min-h-screen flex-col p-12 gap-4">
      <button
        className="bg-blue-500 self-end hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={addEvent}
      >
        Generate an event
      </button>

      <div className="bg-bg-1 border rounded-xl flex flex-col overflow-auto">
        <div className="border border-border-color-1 rounded-lg m-4 flex flex-row justify-between">
          <input
            className="p-4 flex-1 border border-border-color-1 rounded-l-lg focus:outline-none focus:border-gray-300"
            placeholder="Search name, email or action"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={toggleFilter}
            className="flex flex-row items-center gap-1 p-2"
          >
            <img src="/sort.png" width={16} />
            FILTER
          </button>
        </div>

        <div className="m-4 ">
          {isFilterOpen && (
            <EventsFilter
              selectedActionId={selectedActionId}
              onSelectedActionIdChange={(text) => setSelectedActionId(text)}
              selectedActionName={selectedActionName}
              onSelectedActionNameChange={(text) => setSelectedActionName(text)}
              selectedActorId={selectedActorId}
              onSelectedActorIdChange={(text) => setSelectedActorId(text)}
              selectedTargetId={selectedTargetId}
              onSelectedTargetIdChange={(text) => setSelectedTargetId(text)}
            />
          )}
        </div>
        <table className="table-auto min-w-full">
          <thead>
            <tr>
              <th className="p-4 text-left">Actor</th>
              <th className="p-4 text-left">Action</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left"></th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data?.map((events) => {
              return events?.map((event) => (
                <Fragment key={event?.id}>
                  <tr>
                    <td className="p-4 flex flex-row gap-2 items-center">
                      <div className="flex -space-x-2 overflow-hidden">
                        <div className=" h-8 w-8 rounded-full flex justify-center items-center bg-gradient-to-r from-[#F3994A] from-84.99% to-[#B325E2] to-14.17% text-white border">
                          {event?.target_name?.[0]?.toUpperCase()}
                        </div>
                      </div>
                      {event?.target_name}
                    </td>

                    <td>{event?.action?.name}</td>

                    <td>
                      {moment(event?.occurred_at).format("MMM D, h:mm A")}
                    </td>

                    <td className="flex flex-col items-center">
                      <button
                        onClick={() => {
                          setOpenedEvent(event.id);
                          toggle();
                        }}
                      >
                        <img src="/Vector (Stroke).svg" />
                      </button>
                    </td>
                  </tr>

                  {isOpen && event.id === openedEvent && (
                    <tr>
                      <td colSpan={4}>
                        <EventDetails event={event} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ));
            })}
          </tbody>

          <tfoot className="bg-white">
            {isLoadingMore && <EventsSkeleton />}

            <tr>
              <td className="col-span-2 rounded-2xl" colSpan={4}>
                {!isLastPage && (
                  <button
                    className="bg-bg-1 hover:bg-gray-50 py-3 px-6 w-full text-[#616161]"
                    onClick={() => setSize(size + 1)}
                  >
                    Load more
                  </button>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
}
