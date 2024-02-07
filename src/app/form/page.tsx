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
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-medium mx-auto items-center font-Dmsans mt-3" >Volunteer Form</h1>
            
            <section className="mt-10">
            <form className="flex flex-col" method="POST" action="#">
                    <label className="block text-gray-700 text-sm font-normal font-Dmsans mb-2 ml-3" >Write Up</label>
                <div className="mb-6 pt-3 rounded bg-gray-100">
                    <input type="string" className="bg-white rounded w-full text-gray-700 border-b-4 outline-gray-300 focus:outline-gray-400 transition duration-500 px-3 pb-3"/>
                </div>
                    <label className="block text-gray-700 text-sm font-normal mb-2 ml-3" >Hours</label>
                <div className="mb-6 pt-3 rounded bg-gray-100">
                    <input type="integer" className="bg-white rounded w-full text-gray-700 border-b-4 outline-gray-300 focus:outline-gray-400 transition duration-500 px-3 pb-3"/>
                </div>
                    <label className="block text-gray-700 text-sm font-normal mb-2 ml-3" >Event</label>
                <div className="mb-6 pt-3 rounded bg-gray-100">
                    <input type="string" className="bg-white rounded w-full text-gray-700 border-b-4 outline-gray-300 focus:outline-gray-400 transition duration-500 px-3 pb-3"/>
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
 
export default FormPage

