"use client";

import { ActivityEvent } from "@/utils/types";
import axios from "axios";
import { useState, useMemo, useCallback } from "react";
import useSWRInfinite from "swr/infinite";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

export default function Home() {
  const [searchText, setSearchText] = useState("");

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <table className="table-auto border">
        <thead className="bg-bg-1">
          <tr>
            <th>Actor</th>
            <th>Action</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((events) => {
            return events?.map((p) => (
              <tr key={p?.id}>
                <td className="p-4">{p?.actor_name}</td>
                <td>{p?.action?.name}</td>
                <td>{new Date(p?.occurred_at).toLocaleString()}</td>
              </tr>
            ));
          })}
        </tbody>
      </table>
      {!!lastEventsPage && (
        <button onClick={() => setSize(size + 1)}>Load more</button>
      )}

      <button onClick={addEvent}>Create an event</button>
    </main>
  );
}
