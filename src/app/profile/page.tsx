import React from 'react' 
import { FaRegEdit } from "react-icons/fa";
import { cookies } from 'next/headers';
import db from '@/db';

async function ProfilePage() { 
    const user = await db.getUser(cookies());
    console.log(user);
    const { name, role, events } = user as any;
    const userAvatar = await db.getAvatarUrl(user as any);


    return (
        <div className="flex flex-col">
            <h1 className="text-4xl font-medium mx-auto items-center font-Dmsans mt-5" >Profile Page</h1>
    
            <div className="main">
                <form className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl" method="POST" action="#" onSubmit={onSubmit}>
                    <section className=" bg- mt-6"></section>
                        <img className="w-32 h-32 rounded-full mx-auto" src={userAvatar} alt="Profile picture" />
                        <div className="flex justify-center mt-5 mb-9">
                        <a href="#" className="font-Dmsans text-xs text-gray-500 hover:text-purple-600 pr-1">Change profile picture</a>
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

                        <p className="font-Dmsans te text-gray-500 hover:text-purple-600 pr-1">NAME</p>
                        <div style={{display: 'flex', alignItems: 'center' }}>
                            <h2 className="text-left text-2xl font-Dmsans font-semibold mr-2">{name}</h2>
                            <FaRegEdit />
                        </div>

                        <p className="text-left text-sm font-Dmsans text-gray-600 mt-1">{role}</p>

                        <div className="mt-16 flex flex-row items-left">
                            <div>
                                <p className="font-Dmsans text-base text-red-400 hover:text-purple-600">300</p>
                                <p className="font-Dmsans text-xs text-gray-500">Activities recorded</p>
                            </div>
                            <div>
                                <p className="font-Dmsans text-base text-blue-400 hover:text-purple-600 ml-10 mx-4">500</p>
                                <p className="font-Dmsans text-xs text-gray-500 ml-10 mx-4">Hours volunteered</p>
                            </div>
                        </div>
                </form>
            </div>
        </div>
    );
}
export default ProfilePage;
