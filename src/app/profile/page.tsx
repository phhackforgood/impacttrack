import Link from 'next/link'; 
import { useRouter } from 'next/navigation'; 
import React from 'react' 
import { FaRegEdit } from "react-icons/fa";
 
function ProfilePage() { 
    return (
        <div className="flex flex-col">
            <h1 className="text-4xl font-medium mx-auto items-center font-Dmsans mt-5" >Profile Page</h1>
    
            <div className="main">
                <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                    <section className=" bg- mt-6"></section>
                        <img className="w-32 h-32 rounded-full mx-auto" src="https://picsum.photos/200" alt="Profile picture" />
                        <div className="flex justify-center mt-5 mb-9">
                        <a href="#" className="font-Dmsans text-xs text-gray-500 hover:text-purple-600 pr-2">Change profile picture</a>
                        <FaRegEdit />
                        </div>

                        <div style={{display: 'flex', alignItems: 'center' }}>
                            <h2 className="text-left text-2xl font-Dmsans font-semibold mr-2">NAME</h2>
                            <FaRegEdit />
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
                </main>
            </div>
        </div>
    );
}
export default ProfilePage;