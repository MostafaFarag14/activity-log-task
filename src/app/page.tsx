"use client";

import EventDetails from "@/components/EventDetails";
import { useDisclose } from "@/utils/customHooks";
import { ActivityEvent } from "@/utils/types";
import axios from "axios";
import { useState, useMemo, useCallback, Fragment } from "react";
import useSWRInfinite from "swr/infinite";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const { isOpen, toggle } = useDisclose();
  const [openedEvent, setOpenedEvent] = useState("");

  const getKey = useCallback(
    (page_index: number, previousPageData: ActivityEvent[]) => {
      // return a falsy value if this is the last page
      if (page_index && !previousPageData.length) return null;
      return `/events?search_text=${searchText}&page=${page_index}&limit=2`;
    },
    [searchText]
  );

  const { data, error, isLoading, size, setSize } = useSWRInfinite<
    ActivityEvent[]
  >(getKey, fetcher);

  const lastEventsPage = useMemo(() => {
    return data?.slice(-1)?.[0].length;
  }, [data]);

  const addEvent = async () => {
    const resp = await axios.post("/events", {});
  };

  return (
    <main className="flex min-h-screen flex-col p-12">
      <div className="bg-bg-1 border rounded-xl flex flex-col overflow-auto">
        <input
          className="p-4 m-4 border border-border-color-1 rounded-lg focus:outline-none focus:border-gray-300"
          placeholder="Search name, email or action"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

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
                          {event?.actor_name?.[0]?.toUpperCase()}
                        </div>
                      </div>
                      {event?.actor_name}
                    </td>
                    <td>{event?.action?.name}</td>
                    <td>{new Date(event?.occurred_at).toLocaleString()}</td>
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

          <tfoot>
            <tr>
              <td className="col-span-2 rounded-2xl" colSpan={4}>
                {!!lastEventsPage && (
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

      <button onClick={addEvent}>Create an event</button>
    </main>
  );
}
