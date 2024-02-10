"use client";
import React from 'react'; 
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import db from '../../db';
import EventCard from '../components/EventCard';

async function getStatistics() {
  try {
    const response = await fetch('/api/statistics', { 
      method: 'GET', 
  });
  console.log(response);

  if (!response.ok) { 
    console.log('Failed to authenticate get data from server');
    throw new Error('Failed to authenticate get data from server');
  }; 
  return response.json();
  } catch (err: any) { 
      console.log(err.message);
  }
 
}

async function statistics() {
  let earthOven;
  let WoodUpcycling;
  let glass
  const events = await getStatistics();
  console.log(events);

  // const generateData = (e: any) => {
  //   const labels = ['Jan', 'February', 'March', 'April', 'May', 'June', 'July'];

  //   const datasets = e.map(({ eventName, forms }) => ({
  //     label: eventName,
  //     data: forms.map((form) => /* Access the form data or modify as needed */),
  //     fill: false,
  //     backgroundColor: 'rgb(75, 192, 192)',
  //     borderColor: 'rgba(75, 192, 192, 0.2)',
  //   }));
  // }

  

  const data = {

    labels: ['Jan', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: '',
        data: [65, 59, 80, 80, 80, 80, 80],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: '',
        data: [20, 40, 50, 60, 100, 102, 106],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: '',
        data: [10, 15, 40, 60, 100, 120, 130],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };
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

export default statistics;


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