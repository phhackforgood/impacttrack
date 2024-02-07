import Image from "next/image";
import db from "./db";

async function getEvents() {
  const events = await db.client.collection("events").getFullList({
    sort: "-created",
  })
  return events;
}

export default async function Home() {
  const events = await getEvents();
  console.log(events);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-emerald-500">
      <h1 className="text-4xl font-bold text-center">
        ImpactTrack, a new way to track your volunteering impact
      </h1>
      {events?.map((event) => {
        return <div key={event.id} className="flex flex-col items-center">
          <h2 className="text-2xl font-bold">{event.title}</h2>
        </div>
      })}
      <h2>
        Developers
      </h2>
    </main>
  );
}
