import Link from "next/link";
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function EventPage() {
    return (
        <main>
            <div className="flex flex-col items-center bg-white font-Dmsans w-3/5 h-40 rounded-xl mr-auto">
                <h1 className="text-2xl font-semibold mr-auto mb-3 mx-8 mt-6">Key Performance Indicators</h1>
                
                <h2 className="text-2xl font-semibold mr-auto mb-3 mx-8 mt-6">Volunteers</h2>
                <div className="text-sm font-light text-left text-gray-400 leading-2 text-wrap px-8 w-full"><ProgressBar now={50} label={`${50}`} /></div>
                <h2 className="text-2xl font-semibold mr-auto mb-3 mx-8 mt-6">Photos Uploaded</h2>
                <div className="text-sm font-light text-left text-gray-400 leading-2 text-wrap px-8 w-full"><ProgressBar now={50} label={`${50}`} /></div>
                <h2 className="text-2xl font-semibold mr-auto mb-3 mx-8 mt-6">Smiles Recorded</h2>
                <div className="text-sm font-light text-left text-gray-400 leading-2 text-wrap px-8 w-full"><ProgressBar now={50} label={`${50}`} /></div>
            </div>
        </main>
    )
}