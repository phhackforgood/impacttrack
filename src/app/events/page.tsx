import Link from "next/link";
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function EventPage() {
    const progVolunteers = 84;
    const progPhotos = 50;
    const progSmiles = 57;
    const max = 250;
    
    return (
        <main className="flex min-h-screen flex-col items-center px-24 py-10 bg-gray-300">
            <div className="flex flex-col items-center font-Dmsans w-3/5 mr-auto mb-3 mt-6">
                <h1 className="text-2xl font-semibold mr-auto mb-3 mx-8 mt-6">Key Performance Indicators</h1>
                <div className="text-sm font-light text-left text-gray-400 leading-2 text-wrap px-8 w-full">
                    <ProgressBar>
                        <ProgressBar variant="success" max={max} now={progVolunteers} key={1} />
                        <ProgressBar variant="warning" max={max} now={progPhotos} key={2} />
                        <ProgressBar variant="danger" max={max} now={progSmiles} key={3} />
                    </ProgressBar>
                </div>    
            </div>
            <div className="flex flex-col items-center bg-white font-Dmsans w-3/5 rounded-xl mr-auto mt-100">
                <h2 className="text-xl font-semibold mr-auto mb-3 mx-8 mt-6">Volunteers</h2>
                <div className="text-sm font-light text-left text-gray-400 leading-2 text-wrap px-8 w-full"><ProgressBar variant="success" now={progVolunteers} label={`${progVolunteers}`} /></div>
                <h2 className="text-xl font-semibold mr-auto mb-3 mx-8 mt-6">Photos Uploaded</h2>
                <div className="text-sm font-light text-left text-gray-400 leading-2 text-wrap px-8 w-full"><ProgressBar variant="warning" now={progPhotos} label={`${progPhotos}`} /></div>
                <h2 className="text-xl font-semibold mr-auto mb-3 mx-8 mt-6">Smiles Recorded</h2>
                <div className="text-sm font-light text-left text-gray-400 leading-2 text-wrap px-8 w-full"><ProgressBar variant="danger" now={progSmiles} label={`${progSmiles}`} /></div>
            </div>
        </main>
    )
}