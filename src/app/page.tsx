"use client";

import { ActivityEvent } from "@/utils/types";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<ActivityEvent[]>([]);

  const getData = async () => {
    const resp = await axios.get<ActivityEvent[]>("/events");
    const { data } = resp ?? {};
    setProducts((data ?? []) as ActivityEvent[]);
  };

  const addEvent = async () => {
    const resp = await axios.post("/events");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <table className="table-auto border">
        <thead className="bg-bg-1">
          <tr>
            <th>Actor</th>
            <th>Action</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {products?.map((p) => (
            <tr key={p?.id}>
              <td className="p-4">{p?.actor_name}</td>
              <td>{p?.action?.name}</td>
              <td>{new Date(p?.occurred_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={getData}>Fetch Events</button>
      <button onClick={addEvent}>Create an event</button>
    </main>
  );
}
