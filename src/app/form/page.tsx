'use client'; 
import { on } from 'events';
import Link from 'next/link'; 
import { useRouter } from 'next/navigation'; 
import React from 'react' 
import { useState } from 'react';
 
function FormPage() { 
    const route = useRouter(); 
    const [text, setText] = useState<string>(''); 
    const [hours, setHours] = useState<number>(0); 
    const [date, setDate] = useState<Date| null>(null);
    const [eventName, setEventName] = useState<string>('Earth Oven');
    const [image, setImage] = useState<File| null>(null);
    const [error, setError] = useState(''); 
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
          setImage(files[0]);
        }
      };
 
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => { 

        event.preventDefault();
        console.log('submitting form');
        try { 
            const formData = new FormData();
            formData.set('text', text);
            formData.set('hours', hours.toString());
            formData.set('date', date?.toISOString() || '');
            formData.set('eventName', eventName);
            if (image) {
                formData.set('image', image);
            }
            const response = await fetch('/api/form', { 
                method: 'POST', 
                body: formData,
            }); 

            if (!response.ok) { 
                setError('Failed to authenticate get data from server');
                console.log(error); 
            }; 
            console.log(response)
            const data = await response.json();
            route.push('/');  
            console.log(data);
        } catch (err: any) { 
            setError(err.message);
            console.log(err); 
            console.log(error);
        } 
    }; 
    
    return (
        <div className="flex flex-col justify-between items-center bg-gray-100">
            <h1 className="text-4xl font-medium mx-auto items-center font-Dmsans mt-5" >Volunteer Form</h1>

            <section className="mt-10">

            <form className="flex flex-col " method="POST" action="#" onSubmit={onSubmit} >

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
                    onChange={(e) => {console.log('Event handler called');
                        setEventName(e.target.value)}}
                    required={true}>
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
                        onChange={(e) => setHours(Number(e.target.value))}
                        required={true}/>
                </div>

                <label className="flex-grow text-gray-700 text-sm font-semibold font-Dmsans" >Write Up</label>
                <div className="mb-8 pt-3 rounded bg-gray-100">
                    <input 
                        type="string" 
                        className="pt-1 bg-white rounded w-full text-gray-700 outline-gray-300 focus:outline-gray-400 transition duration-500 px-2 pb-2"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required={true}/>
                        
                </div>

                <label className="block text-gray-700 text-sm font-semibold font-Dmsans" >Add photos of the event!</label>
                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-35 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-100 dark:hover:border-gray-100">
                        <div className="flex flex-col items-center justify-center pt-3 pb-3">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm font-Dmsans text-gray-500 dark:text-gray-400 whitespace-wrap overflow-hidden">
                                {image ? (<span className="font-semibold">File selected: {image.name}</span>) 
                                    : (<span className="font-semibold">Click to upload</span>)
                                    }
                            </p>
                            <p className="text-xs font-Dmsans text-gray-700 dark:text-gray-400">PNG, JPG or Jpeg </p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" accept=".jpeg, .jpg, .png" onChange={handleFileChange}/>
                    </label>
                </div> 


                <div className="flex justify-end">
                <button
                    type="button"
                    className="text-sm font-Dmsans text-purple-600 hover:text-purple-700 hover:underline pt-6 mb-4"
                    onClick={() => {setImage(null);}}>
                Remove Photo
                </button>
                </div>

                <button className="bg-purple-600 hover:bg-purple-700 text-white font-Dmsans font-semibold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" 
                    type="submit"
                    disabled={!(image && hours && text)}
                    >
                    Submit
                </button>
            </form>
        </section>
        </div>
    )
}

export default FormPage;
