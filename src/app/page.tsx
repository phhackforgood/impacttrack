import db from "../db";
import EventCard from "./components/EventCard";

export default async function Home() {
  const events = await db.getEvents();
  console.log(events);
  return (
    <main className="flex min-h-screen flex-col justify-between items-center px-24 py-32 bg-gray-100">
      {events?.map((event, index) => {
          return <div key={index} className="mr-auto w-full mb-4">
            <EventCard title={event.title} description={event.description} id={event.id}/>
          </div>
        })}
    </main>
  );
}
