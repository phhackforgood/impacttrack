import Link from "next/link";
import ProgressBar from 'react-bootstrap/ProgressBar';

interface VolunterCardProps {
    name: string;
    description: string;
}

const VolunteerCard = (props: VolunterCardProps) => {
    const { name, description } = props;
    const progress = 20;
    return (
        <Link href="/events" className="flex flex-col items-center bg-white hover:shadow-xl font-Dmsans w-40 h-40 rounded-xl mr-auto">
            <h2 className="text-2xl font-semibold mr-auto mb-3 mx-8 mt-6">Volunteer A</h2>
            <h3 className="text-sm font-light text-left text-gray-400 leading-2 text-wrap px-8 w-full">Comets are a big source of meteoroids because of the nature of those long tails. A large amount of dust</h3>
            
        </Link>
    );
}

export default VolunteerCard