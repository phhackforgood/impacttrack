import db from "../db";
import EventCard from "./components/EventCard";

export default async function Home() {
  const events = await db.getEvents();
  return (
    <main className="flex min-h-screen flex-col items-center pl-8 py-4 bg-gray-100">
      <h1 className="mr-auto text-5xl font-Dmsans mb-4 ">Ongoing Events</h1>
      {events?.map((event, index) => {
          return <div key={index} className="mr-auto max-w-screen-md w-11/12 mb-4">
            <EventCard title={event.title} description={event.description} id={event.id}/>
          </div>
        })}
    </main>
  );
}
