'use client'; 
import Link from 'next/link'; 
import { useRouter } from 'next/navigation'; 
import React from 'react' 
 
function FormPage() { 
    const route = useRouter(); 
    const [text, setText] = React.useState<string>(''); 
    const [hours, setHours] = React.useState<number>(0); 
    const [date, setDate] = React.useState<Date| null>(null);
    const [eventName, setEventName] = React.useState<string>('');
    const [image, setImage] = React.useState<File| null>(null);
    const [error, setError] = React.useState(''); 
 
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault(); 
 
        try { 
            const form = { text, hours, date, eventName, image }; 
            const response = await fetch('/api/form', { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(form) 
            }); 
            if (!response.ok) { 
                setError('Failed to authenticate user 0'); 
                return; 
            }; 
            const data = await response.json(); 
            if (data?.token) { 
                route.push('/'); 
            } else { 
                setError('Failed to submit form 1'); 
            } 
        } catch (err) { 
            setError('Failed to submit form 2'); 
        } 
    }; 
    
    return (
        <div className="flex flex-col justify-end items-center">
            <h1 className="text-4xl font-medium mx-auto items-center font-Dmsans mt-5" >Volunteer Form</h1>

            <section className="mt-10">

            <form className="flex flex-col" method="POST" action="#">

                <label className=" block text-gray-700 text-sm font-semibold" >Your profile</label>
                <div className="mb-8 pt-3 rounded bg-gray-100">
                    <label>
                        <input type="radio" className="form-radio"/>
                        <span className="ml-2 text-gray-700 text-sm">Organiser</span>
                    </label>
                    <div></div>
                    <label>
                        <input type="radio" className="form-radio"/>
                        <span className="ml-2 text-gray-700 text-sm">Volunteer</span>
                    </label>
                    <div></div>
                    <label>
                        <input type="radio" className="form-radio"/>
                        <span className="ml-2 text-gray-700 text-sm">Beneficiary</span>
                    </label>
                </div>

                <label className="block text-gray-700 text-sm font-semibold" >Event</label>
                <div className="mb-8 pt-3 rounded bg-gray-100">
                    <select className="pt-3 bg-white rounded w-full text-gray-700 text-sm border-2 outline-gray-300 focus:outline-gray-400 transition duration-500 px-3 pb-3">
                        <option value="Ongoing Events">Ongoing Events</option>
                        <option value="Earth Oven">Earth Oven</option>
                        <option value="Wood Upcycling">Wood Upcycling</option>
                        <option value="Glass Upcycling">Glass Upcycling</option>
                    </select>
                </div>

                <label className="block text-gray-700 text-sm font-semibold" >Hours</label>
                <div className="mb-8 pt-3 rounded bg-gray-100">
                    <input type="integer" className=" pt-3 bg-white rounded w-full text-gray-700 border-2 outline-gray-300 focus:outline-gray-400 transition duration-500 px-3 pb-3"/>
                </div>

                <label className="block text-gray-700 text-sm font-semibold font-Dmsans" >Write Up</label>
                <div className="mb-8 pt-3 rounded bg-gray-100">
                    <input type="string" className="pt-3 bg-white rounded w-full text-gray-700 border-2 outline-gray-300 focus:outline-gray-400 transition duration-500 px-3 pb-3"/>
                </div>

                <div className="flex justify-end">
                    <a href="#" className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Back</a>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Next</button>
            </form>
        </section>
        </div>
    )
}

export default FormPage;