"use client";
import React from 'react';
import { useState, useEffect } from 'react'; 
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { EventDataStat } from '@/types';
import db from '@/db';

function StatisticsPage() {
  const [events, setEvents] = useState<EventDataStat[]>([]);
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch('/api/statistics', { 
                 method: 'GET', 
             });
             console.log(response);
             setEvents(await response.json());  
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);
  
  const getPast7DaysLabels = (): string[] => {
    const today = new Date();
    const labels = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - index);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    return labels.reverse();
  };

  // Function to generate the data object based on eventDataStat
const generateData = (eventDataStat: EventDataStat[]): any => {
  const labels = getPast7DaysLabels();
  console.log(labels);
  console.log(events, 'events WYA');
  const datasets = eventDataStat.map(({ eventName, forms }: EventDataStat) => {
    const data = labels.map((labelDate) => {
      const cumulativeHours = forms
        .filter((form) => form.created.includes(labelDate))
        .reduce((totalHours, form) => totalHours + form.hours, 0);

      return cumulativeHours;
    });

    return {
      label: eventName,
      data,
      fill: false,
      backgroundColor: 'rgb(75, 192, 192)',
      borderColor: 'rgba(75, 192, 192, 0.2)',
    };
  });
  return {
    labels,
    datasets,
  };
};
const data = generateData(events);
const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Cumulative hours',
      },
    },
  };
  return (
    //<main className="flex flex-col flex justify-between items-center px-0 py-50 bg-gray-100">
    <div className="flex-grow">
      <p><Line data={data} options={options} /></p>
    </div> 
    //</main>
    
  )
  
}

export default StatisticsPage;


/*
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
      })} }
      <h1 className='font-Dmsans text-3xl'>Statistics Page</h1>
    </main>
  );
 
    
}

export default StatisticsPage;
*/