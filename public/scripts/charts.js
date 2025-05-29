/*const ctx = document.getElementById('myChart');
let chart
let jsonData
let graphButtonValue = document.querySelectorAll('.graph')
document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('submitForm').addEventListener('click', createTable = (type) => {

    fetch('../data.json')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Check the data received

        jsonData = data
        chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.map(n => n.status),
            datasets: [{
              label: 'Job Listings',
              data: data.map(n => n.amount),
              borderWidth: 2.5
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            maintainAspectRatio: false
          }
        });

       

        console.log(chart.data);
        console.log(chart.data.datasets[0].data[2]); // Check data for 'Closed' value

        chart.data.datasets[0].data[2] = 5; // Change 'Closed' to 5
        console.log(chart.data.datasets[0].data[2]); // Check updated value

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });


  
});



 
//let chartType = currentTarget.value
/*
document.getElementById('chartTypes').addEventListener('click', (e) => {
console.log('jjsnfkx')
console.log(chart.config.type)
console.log(graphButtonValue)
console.log(e.currentTarget.value)
 chart.destroy();
 chart.config.type = e.currentTarget.value
 createTable()

})

document.querySelectorAll('.graph').forEach((i)=> {

i.addEventListener('click', (e) =>{
  console.log(e.currentTarget.value)
  console.log('^^^^^^^')
  
  chart.config.type = e.currentTarget.value
  chart.update()
  
}
)
})
*/