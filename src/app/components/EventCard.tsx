
import Link from "next/link";
import { ProgressBar } from 'react-bootstrap';

interface EventCardProps {
    title: string;
    description: string;
}

const EventCard = (props: EventCardProps) => {
    const { title, description } = props;
    const progress = 20;
    return (
        <Link href="/events" className="flex flex-col items-center bg-white hover:shadow-xl font-Dmsans w-3/5 h-40 rounded-xl mr-auto mb-4">
            <h2 className="text-2xl font-semibold mr-auto mb-3 mx-8 mt-6">{title}</h2>
            <h3 className="text-sm font-light text-left text-gray-400 leading-2 text-wrap px-8 w-full">{description}</h3>
            <div className="text-sm font-light text-left text-gray-400 leading-2 text-wrap px-8 w-full">
                <ProgressBar variant="success" now={progress} label={`${progress}%`} />
            </div>
        </Link>
    );
}

export default EventCard
