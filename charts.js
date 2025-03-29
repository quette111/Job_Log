
const ctx = document.getElementById('myChart');


const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Applied', 'Interested', 'Closed', 'Assessment', 'Interview', 'Rejected'],
    datasets: [{
      label: 'Job Listings',
      data: [1, 0, 0, 0, 0, 0],
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


let selectValue = document.getElementById('name')
document.getElementById('submitForm').addEventListener('click', ()=> {
  chart.data.data[1] + 1
  })
 

$('.slide').on('click', function(event){
  event.preventDefault();
    $('.chart').toggleClass('show');
});
