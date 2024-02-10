import db from "../db";
import EventCard from "./components/EventCard";

export default async function Home({ params }: any) {
  try {
    const eventId = params?.id; // Access the event ID from params

    if (!eventId) {
      throw new Error("Event ID is missing.");
    }

    console.log("Event ID:", eventId);

    const event = await db.getEvent(eventId);
    console.log("Event:", event);

    return (
      <main className="flex min-h-screen flex-col justify-between items-center px-24 py-32 bg-gray-100">
        <div className="mr-auto w-full mb-4">
          <EventCard
            image={event.image}
            title={event.title}
            description={event.description}
            eventId={event.id}
          />
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching event:", error);
    return <div>Error fetching event. Please try again later.</div>;
  }
}
