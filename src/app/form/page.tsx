'use client'; 
import Link from 'next/link'; 
import { useRouter } from 'next/navigation'; 
import React from 'react' 
 
function formPage() { 
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
        <div>FORM VIEW HERE</div>
    ) 
} 
 
export default formPage