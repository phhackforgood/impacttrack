export default function FormPage() {
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