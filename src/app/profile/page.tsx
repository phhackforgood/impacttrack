'use client';
import Link from 'next/link'; 
import { useRouter } from 'next/navigation'; 
import React, { useState, useRef } from 'react' 
import { FaRegEdit } from "react-icons/fa";
 
function ProfilePage() { 
    const route = useRouter(); 
    const [userName, setUserName] = React.useState<string>('');
    const [image, setImage] = React.useState<File| null>(null);
    const [error, setError] = React.useState(''); 
    
    const fileInput = useRef(null);
    const handleIconClick = () => {
        if (fileInput.current) {
            (fileInput.current as HTMLInputElement).click();
        }
    };

    const [isEditing, setIsEditing] = useState(false);
    const userNameInput = useRef<HTMLInputElement>(null);

    const handleIconClickName = () => {
        setIsEditing(true);
        // Focus the input after a short delay to ensure that it's visible
        setTimeout(() => {
            if (userNameInput.current) {
                userNameInput.current.focus();
            }
        }, 100);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault(); 
 
        try { 
            const form = { image }; 
            const response = await fetch('/api/profile', { 
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
                setError('Failed to update profile'); 
            } 
        } catch (err) { 
            setError('Failed to update profile'); 
        } 
    }; 

    return (
        <div className="flex flex-col">
            <h1 className="text-4xl font-medium mx-auto items-center font-Dmsans mt-5" >Profile Page</h1>
    
            <div className="main">
                <form className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl" method="POST" action="#" onSubmit={onSubmit}>
                    <section className=" bg- mt-6"></section>
                        <img className="w-32 h-32 rounded-full mx-auto" src="https://picsum.photos/200" alt="Profile picture" />
                        <div className="flex justify-center mt-5 mb-9">
                        <a href="#" className="font-Dmsans text-xs text-gray-500 hover:text-purple-600 pr-2">Change profile picture</a>
                        <FaRegEdit onClick={handleIconClick} />
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={e => setImage(e.target.files?.[0] || null)}
                                ref={fileInput}
                                style={{ display: 'none' }} 
                            />
                        </div>

                        <div style={{display: 'flex', alignItems: 'center' }}>
                            <h2 className="text-left text-2xl font-Dmsans font-semibold mr-2">
                                {isEditing ? '' : userName}
                            </h2>
                            <FaRegEdit onClick={handleIconClickName} />
                            {isEditing && (
                                <input
                                    type="text"
                                    id="name"
                                    value={userName}
                                    onChange={e => setUserName(e.target.value || '')}
                                    onBlur={handleBlur}
                                    ref={userNameInput}
                                />
                            )}
                        </div>

                        <p className="text-left text-sm font-Dmsans text-gray-600 mt-1">Volunteer/Organiser/Beneficiary</p>

                        <div className="mt-16 flex flex-row items-left">
                            <div>
                                <p className="font-Dmsans text-base text-red-400 hover:text-purple-600">300</p>
                                <a href="#" className="font-Dmsans text-xs text-gray-500 hover:text-purple-600">Activities recorded</a>
                            </div>
                            <div>
                                <p className="font-Dmsans text-base text-blue-400 hover:text-purple-600 ml-10 mx-4">500</p>
                                <a href="#" className="font-Dmsans text-xs text-gray-500 hover:text-purple-600 ml-10 mx-4">Hours volunteered</a>
                            </div>
                        </div>
                </form>
            </div>
        </div>
    );
}
export default ProfilePage;
