const ctx = document.getElementById('myChart');

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('submitForm').addEventListener('click', () => {

    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Check the data received

        
        const chart = new Chart(ctx, {
          type: 'bar',
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
