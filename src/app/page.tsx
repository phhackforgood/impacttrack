import db from "../db";
import EventCard from "./components/EventCard";

export default async function Home() {
  const events = await db.getEvents();
  return (
    <main className="flex min-h-screen flex-col items-center pl-8 py-14 bg-gray-100">
      {events?.map((event, index) => {
          return <div key={index} className="mr-auto w-4/6 mb-4">
            <EventCard title={event.title} description={event.description} id={event.id}/>
          </div>
        })}
    </main>
  );
}
