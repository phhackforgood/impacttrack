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
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
          setImage(files[0]);
        }
      };
 
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
        <div className="flex flex-col justify-between items-center bg-gray-100">
            <h1 className="text-4xl font-medium mx-auto items-center font-Dmsans mt-5" >Volunteer Form</h1>

            <section className="mt-10">

            <form className="flex flex-col" method="POST" action="#">

                <label className=" block text-gray-700 text-sm font-Dmsans font-semibold" >Your profile</label>
                <div className="mb-8 pt-3 rounded bg-gray-100">
                    <label>
                        <input type="radio" name="role" className="form-radio"/>
                        <span className="ml-2 font-Dmsans text-gray-700 text-sm">Organiser</span>
                    </label>
                    <div></div>
                    <label>
                        <input type="radio" name="role" className="form-radio"/>
                        <span className="ml-2 font-Dmsans text-gray-700 text-sm">Volunteer</span>
                    </label>
                    <div></div>
                    <label>
                        <input type="radio" name="role" className="form-radio"/>
                        <span className="ml-2 font-Dmsans text-gray-700 text-sm">Beneficiary</span>
                    </label>
                </div>

                <label className="block font-Dmsans text-gray-700 text-sm font-semibold" >Event</label>
                <div className="mb-8 pt-3 rounded bg-gray-100">
                    <select 
                    className="pt-3 bg-white rounded w-full text-gray-700 text-sm outline-gray-300 focus:outline-gray-400 transition duration-500 px-2 pb-2"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}>
                        <option value="Ongoing Events">Ongoing Events</option>
                        <option value="Earth Oven">Earth Oven</option>
                        <option value="Wood Upcycling">Wood Upcycling</option>
                        <option value="Glass Upcycling">Glass Upcycling</option>
                    </select>
                </div>

                <label className="block font-Dmsans text-gray-700 text-sm font-semibold" >Hours</label>
                <div className="mb-8 pt-3 rounded bg-gray-100">
                    <input 
                        type="integer" 
                        className=" pt-1 bg-white rounded w-full font-Dmsans text-gray-700 outline-gray-300 focus:outline-gray-400 transition duration-500 px-2 pb-2"
                        value={hours}
                        onChange={(e) => setHours(Number(e.target.value))}/>
                </div>

                <label className="flex-grow text-gray-700 text-sm font-semibold font-Dmsans" >Write Up</label>
                <div className="mb-8 pt-3 rounded bg-gray-100">
                    <input 
                        type="string" 
                        className="pt-1 bg-white rounded w-full text-gray-700 outline-gray-300 focus:outline-gray-400 transition duration-500 px-2 pb-2"
                        value={text}
                        onChange={(e) => setText(e.target.value)}/>
                        
                </div>

                <label className="block text-gray-700 text-sm font-semibold font-Dmsans" >Add photos of the event!</label>
                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-35 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-100 dark:hover:border-gray-100">
                        <div className="flex flex-col items-center justify-center pt-3 pb-3">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm font-Dmsans text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs font-Dmsans text-gray-700 dark:text-gray-400">PNG or JPG </p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                </div> 


                <div className="flex justify-end">
                    <a href="#" className="text-sm font-Dmsans text-purple-600 hover:text-purple-700 hover:underline pt-6 mb-4">Back</a>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-Dmsans font-semibold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Submit</button>
            </form>
        </section>
        </div>
    )
}

export default FormPage;
