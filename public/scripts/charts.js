async function createChart(){

const item = localStorage.getItem('Bearer');

console.log('working')
   const response = await axios.get('/api/v1/users',
  {
 headers: {
          'Authorization': `Bearer ${item}`
        }
      
      })


const userData = response.data

 const statusCounts = {};

userData.forEach(user => {
  const status = user.name;
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
dataVisualizationChart.destroy()
createChart()

})
}


createChart()




