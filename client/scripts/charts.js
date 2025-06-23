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
          backgroundColor: [
      '#36a2eb', // Applied
      '#ff6384', // Interested
      '#ff9f40', // Interview
      '#4bc0c0', // Rejected
      '#9966ff', // Closed
      '#c9cbcf'  // Assessment
    ],
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
        text: 'Application Status Review ',
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



document.addEventListener('change', function (e) {
    if(!e.target.matches('.subject')) return

if(dataVisualizationChart){
  dataVisualizationChart.destroy()
  createChart()
}else{
  createChart()
}
createChart()
dataVisualizationChart.update('active')

});

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
         backgroundColor: [
  "#d9ead3", // very light muted green
  "#b6d7a8", // soft leafy green
  "#93c47d", // calm medium green
  "#6aa84f", // classic muted green
  "#38761d"  // deep forest green
],
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


document.addEventListener('change', function (e) {

    if(!e.target.matches('.subject')) return

if(dataVisualizationPie){
  dataVisualizationPie.destroy()
  createSecondChart()
}else{
createSecondChart()
}
createSecondChart()
dataVisualizationPie.update('active')

});


}

window.addEventListener('DOMContentLoaded', () => {
createSecondChart()

});














