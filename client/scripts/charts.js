import axios from 'axios';
import Chart from 'chart.js/auto';

async function createChart(){


console.log('working')
   const response = await axios.get('/api/v1/users/getUserData',
  {
 withCredentials: true
      
      })

console.log('quetee entries: ', response.data.entries)

const userData = response.data.entries

 const statusCounts = {};

userData.forEach(user => {
  console.log(user)
  console.log(userData)
  const status = user.applicationStatus;
  statusCounts[status] = (statusCounts[status] || 0) + 1;
}); 
 

  

 const ctx = document.getElementById('myChart');



  const dataVisualizationChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(statusCounts),
      datasets: [{
        label: 'Job Status',
        data: Object.values(statusCounts),
        borderWidth: 1
      }]
    },
    options: 
    {
      
        responsive: true,
         maintainAspectRatio: false,

plugins: {
      title: {
        display: true,
        text: 'Application status review ',
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 30
        }
      },
       legend: {
        position: 'bottom',
      },
    },
animations: {
      tension: {
        duration: 1000,
        easing: 'easeInOutCubic',
        from: 1,
        to: 0,
        loop: true
      }
    },
      scales: {
        y: {
          beginAtZero: true
        }
      }
      

    }
  });

 

document.getElementById('submitForm').addEventListener('click', (e) =>{
e.preventDefault()

if(dataVisualizationChart){
  dataVisualizationChart.destroy()
  createChart()
}else{
  createChart()
}
createChart()
dataVisualizationChart.update('active')

})
}

window.addEventListener('DOMContentLoaded', () => {

createChart()
});







async function createSecondChart(){

const item = localStorage.getItem('Bearer');

console.log('working')
   const response = await axios.get('/api/v1/users/getUserData',
  {
  withCredentials: true
      
      })


const userData = response.data.entries

 const statusCounts = {};

userData.forEach(user => {
  const status = user.applicationStatus;
  statusCounts[status] = (statusCounts[status] || 0) + 1;
}); 
 

  

 const ctxTwo = document.getElementById('mySecondChart');



const dataVisualizationPie = new Chart(ctxTwo, {
    type: 'doughnut',
    data: {
      labels: ['<40K', '40K-60K', '60K-80K', '80K-100K', '>100K'],
      datasets: [{
        label: 'Salary',
        data: Object.values(statusCounts),
        borderWidth: 1
      }]
    },
    options: 
    {
       maintainAspectRatio: false,
       responsive: true,

       
    plugins: {
      title: {
        display: true,
        text: 'Salary Overview',
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 30
        }
      },
      legend: {
        position: 'bottom',
      },
   
    },
animations: {
      tension: {
        duration: 1000,
        easing: 'easeInOutCubic',
        from: 1,
        to: 0,
        loop: true
      }
    },
      scales: {
        y: {
          beginAtZero: true
        }
      }

    }
  })


 

document.getElementById('submitForm').addEventListener('click', (e) =>{
e.preventDefault()

if(dataVisualizationPie){
  dataVisualizationPie.destroy()

  createSecondChart()
}else{

  createSecondChart()
}

createSecondChart()
dataVisualizationPie.update('active')


})
}

window.addEventListener('DOMContentLoaded', () => {
createSecondChart()

});














