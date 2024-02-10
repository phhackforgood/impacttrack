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
      return date.toLocaleDateString('en-US', { year:'numeric', month: 'short', day: 'numeric' });
    });
    return labels.reverse();
  };

  // Function to generate the data object based on eventDataStat
const generateData = (eventDataStat: EventDataStat[]): any => {
  const labels = getPast7DaysLabels();
  const colorPairs = [
    { background: 'rgb(75, 192, 192)', border: 'rgba(75, 192, 192, 0.2)' },
    { background: 'rgb(255, 99, 132)', border: 'rgba(255, 99, 132, 0.2)' },
    { background: 'rgb(54, 162, 235)', border: 'rgba(54, 162, 235, 0.2)' },
    // Add more color pairs as needed
  ];
  const datasets = eventDataStat.map(({ eventName, forms }: EventDataStat, index) => {
    const colorPair = colorPairs[index % colorPairs.length];
    const data = labels.map((labelDate) => {
      const utcLabelDate = new Date(labelDate + ' UTC');
      const cumulativeHours = forms
      .filter((form) => {
        // Assuming form.created is in UTC format
        const utcFormCreated = new Date(form.created);
        return utcFormCreated.toISOString().includes(utcLabelDate.toISOString().split('T')[0]);
      })
      .reduce((totalHours, form) => totalHours + form.hours, 0);

      return cumulativeHours;
    });
    return {
      label: eventName,
      data,
      fill: false,
      backgroundColor: colorPair.background,
      borderColor: colorPair.border,
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
    <div className="flex-grow min-w-full">
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