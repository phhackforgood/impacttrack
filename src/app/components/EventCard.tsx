import Link from "next/link";
import Image from "next/image";
import ProgressBar from 'react-bootstrap/ProgressBar';
import db from "@/db";
import { RecordModel } from "pocketbase";   
interface EventCardProps {
    eventId: string;
    image: string;
    title: string;
    description: string;
}

const EventCard = async (props: EventCardProps) => {
    const { image, eventId} = props;
    const progress = 20;
    const event = await db.getEvent(eventId);
    console.log(event);
    const imageUrl = db.client.files.getUrl(event, image);
    const description = event.description;
    const title = event.title;

    return (
            <Link href={`/events/${eventId}`} className="flex flex-row items-center bg-white hover:shadow-xl font-Dmsans w-4/5 h-50 rounded-xl mr-auto">
                <img src={imageUrl} width="200" height="200" />
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-semibold mr-auto mb-3 mx-8 mt-6">{title}</h2>
                        <h3 className="text-sm font-light text-left text-gray-400 leading-2 text-wrap px-8 w-full">{description}</h3>
                        <div className="text-sm font-light text-left text-gray-400 leading-2 text-wrap px-8 w-full">
                            <ProgressBar now={progress} label={`${progress}%`} />
                        </div>
                    </div>
            </Link>
    );
}

export default EventCard