"use client";
import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart() {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return 
  <div></div>
}

export default LineChart;


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