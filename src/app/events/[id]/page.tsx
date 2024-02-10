import Link from "next/link";
import VolunteerCard from "../../components/VolunteerCard";
import db from "@/db";

function countHours(forms: any) {
    let total = 0;
    forms.forEach((form: any) => {
        total += form.hours;
    });
    return total;

}

function calculatePercentage(max: number, value: number) {
    return Math.round((value / max) * 100);
}

export default async function EventPage({ params }: any) {
    const event = await db.getEvent(params.id);
    const { title, description, users, expand } = event as any;
    const forms = expand.forms;
    const totalHours = countHours(forms);
    console.log(totalHours);
    const volunteers = users.length;
    const max = 250;
    const percentageVolunteers = calculatePercentage(30, volunteers);
    console.log(percentageVolunteers);
    const percentageHours = calculatePercentage(30, totalHours);
    console.log(percentageHours);

    return (
        <main className="flex min-h-screen flex-col items-center px-12 bg-gray-100">
            <div className="flex flex-col items-center font-Dmsans w-3/5 mr-auto mt-6 max-w-2xl">
                <h1 className="text-4xl mb-4"> {title}</h1>
                <h2 className="text-md"> {description}</h2>
            </div>
            <section className="flex flex-col items-center font-Dmsans w-3/5 mr-auto mb-3 max-w-2xl">
                <h1 className="text-2xl font-semibold mr-auto mb-3 mt-6 ">Key Performance Indicators</h1>
                <div className="text-sm font-light text-left text-gray-400 leading-2 text-wrap px-8 w-full">
                    <div className="relative pt-1">
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-amber-200">
                            <div style={{ width: "10%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
                            <div style={{ width: "15%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"></div>
                            <div style={{ width: "25%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-500"></div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="flex flex-col items-center bg-white font-Dmsans w-3/5 max-w-2xl rounded-xl mr-auto mb-3 pr-12">
                <h2 className="text-xl font-semibold mr-auto mb-3 mx-6 mt-4">Volunteers</h2>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 ml-12 my-4">
                    <div style={{ width: `${percentageVolunteers}%` }} className="bg-red-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full">{volunteers}/30</div>
                </div>
                <h2 className="text-xl font-semibold mr-auto mb-3 mx-6 mt-6">Total Hours Volunteered</h2>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 ml-12 my-4">
                    <div style={{ width: `${percentageHours}%` }} className="bg-orange-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full">{totalHours}/30</div>
                </div>
                <h2 className="text-xl font-semibold mr-auto mb-3 mx-6 mt-6">CO2 Emissions Reduced</h2>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 ml-12 my-4">
                    <div style={{ width: `${percentageHours}%` }} className="bg-amber-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full">{totalHours}/3,000kg</div>
                </div>
            </div>

            <div className="mr-auto w-full mb-4 flex flex-row">
                {forms?.map((form: any, index: any) => {
                    return <div className="mr-4" key={index}><VolunteerCard formId={form.id} image={form.image} /></div>
                })}
            </div>
        </main>
    )
}