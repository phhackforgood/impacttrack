import Link from "next/link";
import { RecordModel } from "pocketbase";
import db from "@/db";
import Image from "next/image";

interface EventCardProps {
    id: string;
    title: string;
    description: string;
}

const EventCard = async (props: EventCardProps) => {
    const { id, title, description } = props;
    const progress = 20;
    const event = await db.getEvent(id);
    const imageUrl = db.client.files.getUrl(event, event.image);
    console.log(event);
    return (
        <Link href={`/events/${id}`} className="flex flex-row">
            <Image className="rounded-l-xl max-h-72" src={imageUrl} width={300} height={300} alt="Event Image"></Image>
            <div className="flex flex-col items-center bg-white hover:shadow-xl font-Dmsans pr-12 rounded-r-xl mr-auto overflow-hidden">
                <h2 className="text-2xl font-semibold mr-auto mb-3 mx-6 mt-6">{title}</h2>
                <h3 className="text-sm font-light text-left text-gray-400 leading-2 text-wrap ml-12 w-full">{description}</h3>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 ml-12 my-4">
                    <div style={{width: "30%"}} className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full">50%</div>
                </div>
            </div>
        </Link>
    );
}

export default EventCard