import React from 'react' 
import db from '../../db';
import EventCard from '../components/EventCard';


async function getStatistics() {

}
 
function StatisticsPage() {
  return (
    <main className="flex min-h-screen flex-col justify-between items-center px-24 py-32 bg-gray-100">
      {/* {events?.map((event, index) => {
        return (
          <div key={index} className="mr-auto w-full mb-4">
            <EventCard title={event.title} description={event.description} />
          </div>
          
        );
      })} */}
      <h1 className='font-Dmsans text-3xl'>Statistics Page</h1>
    </main>
  );
 
    
}

export default StatisticsPage;