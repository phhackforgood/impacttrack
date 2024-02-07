'use client'; 
import Link from 'next/link'; 
import { useRouter } from 'next/navigation'; 
import React from 'react' 
 
function RegisterPage() { 
    const route = useRouter(); 
    const [email, setEmail] = React.useState<string>(''); 
    const [password, setPassword] = React.useState<string>(''); 
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');
    const [error, setError] = React.useState(''); 
 
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault(); 
 
        try { 
            const form = { email, password }; 
            const response = await fetch('/api/auth/register', { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(form) 
            }); 
            if (password != confirmPassword) {
                setError('Passwords do not match');
                return;
            };
            if (!response.ok) { 
                setError('Failed to authenticate user 0'); 
                return; 
            }; 
            const data = await response.json(); 
            route.push('/auth/login');
        } catch (err) { 
            setEmail('Failed to authenticate user 2'); 
        } 
    }; 
 
    return ( 
        <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0 font-light" > 
            <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl"> 
                <section> 
                    <h3 className="font-bold text-2xl">Welcome to VoluMeter!</h3> 
                    <p className="text-gray-600 pt-2">Register here to create a new account :P</p> 
                </section> 
 
                <section className="mt-10"> 
                    <form className="flex flex-col" method="POST" action="#" onSubmit={onSubmit}> 
                        <div className="mb-6 pt-3 rounded bg-gray-200"> 
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="email">Email</label> 
                            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value || '')} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" /> 
                        </div> 
                        <div className="mb-6 pt-3 rounded bg-gray-200"> 
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="password">Password</label> 
                            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value || '')} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" /> 
                        </div> 
                        <div className="mb-6 pt-3 rounded bg-gray-200"> 
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="password">Confirm Password</label> 
                            <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value || '')} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" /> 
                        </div> 
                         
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Register</button> 
                        {error && <p className='error'>{error}</p>} 
                    </form> 
                </section> 
            </main > 
            <div className="max-w-lg mx-auto text-center mt-12 mb-6"> 
                <p className="text-white">Dont have an account? <a href="/auth/register" className="font-bold hover:underline">Sign up</a>.</p> 
            </div> 
            <footer className="max-w-lg mx-auto flex justify-center text-white"> 
                <a href="#" className="hover:underline">Contact</a> 
                <span className="mx-3">•</span> 
                <a href="#" className="hover:underline">Privacy</a> 
            </footer> 
        </div> 
    ) 
} 
 
export default RegisterPage