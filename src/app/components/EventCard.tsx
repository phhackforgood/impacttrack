import Link from "next/link";
import { Progress } from "@material-tailwind/react";


interface EventCardProps {
    id: string;
    title: string;
    description: string;
}

const EventCard = (props: EventCardProps) => {
    const { id, title, description } = props;
    const progress = 20;
    return (
        <Link href={`/events/${id}`} className="flex flex-col items-center bg-white hover:shadow-xl font-Dmsans pr-12 rounded-xl mr-auto overflow-hidden">
            <h2 className="text-2xl font-semibold mr-auto mb-3 mx-8 mt-6">{title}</h2>
            <h3 className="text-sm font-light text-left text-gray-400 leading-2 text-wrap px-8 w-full">{description}</h3>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 ml-16 my-4">
                <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-1/2"> 50%</div>
            </div>
        </Link>
    );
}

export default EventCard