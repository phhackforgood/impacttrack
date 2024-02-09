'use client'; 
import React from 'react' 
import db from '../../db';
import EventCard from '../components/EventCard';
 
 
async function StatisticsPage() {
    const [error, setError] = React.useState('');
    const [events, setEvents] = React.useState([]);
    try { 
        const response = await fetch('/api/statistics', { 
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' }, 
        }); 
        if (!response.ok) { 
            setError('Failed to authenticate user 0'); 
            return; 
        };  
        setEvents(await response.json());
    } catch (err) {
        setError('Failed to submit form 2');
    }
    console.log(events)

  return (
    <main className="flex min-h-screen flex-col justify-between items-center px-24 py-32 bg-gray-100">
      {/* {events?.map((event, index) => {
        return (
          <div key={index} className="mr-auto w-full mb-4">
            <EventCard title={event.title} description={event.description} />
          </div>
          
        );
      })} */}
      
    </main>
  );
 
    
}

export default StatisticsPage;