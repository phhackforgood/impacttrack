import Link from "next/link";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import VolunteerCard from "../../components/VolunteerCard";
import db from "@/db";

function countHours(forms: any) {
    let total = 0;
    forms.forEach((form: any) => {
        total += form.hours;
    });
    return total;

}

export default async function EventPage({params}: any) {
    const event = await db.getEvent(params.id);
    console.log(event);
    const {title, description, users, expand} = event as any; 
    const forms = expand.forms;
    const totalHours = countHours(forms);
    const volunteers = users.length;
    const progVolunteers = 84;
    const progPhotos = 50;
    const progSmiles = 57;
    const max = 250;
    
    return (
        <main className="flex min-h-screen flex-col items-center px-24 py-10 bg-gray-300">
            <div className="flex flex-col items-center font-Dmsans w-3/5 mr-auto mb-3 mt-6">
                <h1> {title}</h1>
                <h2 className="text-sm"> {description}</h2>
                <h1 className="text-2xl font-semibold mr-auto mb-3 mx-8 mt-6">Key Performance Indicators</h1>
                <div className="text-sm font-light text-left text-gray-400 leading-2 text-wrap px-8 w-full">
                    <ProgressBar>
                        <ProgressBar variant="success" max={max} now={volunteers} key={1} />
                        <ProgressBar variant="warning" max={max} now={totalHours} key={2} />
                        <ProgressBar variant="danger" max={max} now={progSmiles} key={3} />
                    </ProgressBar>
                </div>    
            </div>
            <div className="flex flex-col items-center bg-white font-Dmsans w-3/5 rounded-xl mr-auto mb-3 mt-6">
                <h2 className="text-xl font-semibold mr-auto mb-3 mx-8 mt-6">Volunteers</h2>
                <div className="text-sm font-light text-left text-gray-400 leading-2 text-wrap px-8 w-full mb-4"><ProgressBar variant="success" now={volunteers} label={`${volunteers}`} /></div>
                <h2 className="text-xl font-semibold mr-auto mb-3 mx-8 mt-6">Total Hours Volunteered</h2>
                <div className="text-sm font-light text-left text-gray-400 leading-2 text-wrap px-8 w-full mb-4"><ProgressBar variant="warning" now={totalHours} label={`${totalHours}`} /></div>
                <h2 className="text-xl font-semibold mr-auto mb-3 mx-8 mt-6">Smiles Recorded</h2>
                <div className="text-sm font-light text-left text-gray-400 leading-2 text-wrap px-8 w-full mb-4"><ProgressBar variant="danger" now={progSmiles} label={`${progSmiles}`} /></div>
            </div>

            <div className="mr-auto w-full mb-4">
                <VolunteerCard name="Volunteer A" description="..." />
            </div>
        </main>
    )
}