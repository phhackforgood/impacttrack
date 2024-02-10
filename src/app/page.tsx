import db from "../db";
import EventCard from "./components/EventCard";

export default async function Home() {
  const events = await db.getEvents();
  console.log(events);
  return (
    <main className="flex min-h-screen flex-col justify-between items-center px-24 py-32 bg-gray-100">
      <div className="text-3xl font-semibold mr-auto mb-3 mx-8 mt-6">
        <h1>All Events</h1>
      </div>
      
      {events?.map((event, index) => {
          return <div key={index} className="mr-auto w-full mb-4">
            <EventCard title={event.title} description={event.description} id={event.id}/>
          </div>
        })}
    </main>
  );
}
