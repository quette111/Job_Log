import axios from 'axios';
import Chart from 'chart.js/auto/auto.js';

async function createChart() {


  try {

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

    //Event listeners to update bar graph
    document.addEventListener("click", async (event) => {

      if (event.target.closest(".delete")) {

        if (dataVisualizationChart) {
          dataVisualizationChart.destroy()
          await createChart()
        } else {
          await createChart()
        }
      }
    });

    document.getElementById('submitForm').addEventListener('click', async (e) => {
      e.preventDefault()

      if (dataVisualizationChart) {
        dataVisualizationChart.destroy()
        await createChart()
      } else {
        await createChart()
      }
    })

    document.addEventListener('change', async function (e) {
      if (!e.target.matches('.subject')) return

      if (dataVisualizationChart) {
        dataVisualizationChart.destroy()
        await createChart()
      } else {
        await createChart()
      }


    });
  } catch (error) {
    console.error('error', error)
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  await createChart()
});

//Pie chart creation for salary data
async function createSecondChart() {

  try {

    const response = await axios.get('/api/v1/users/getUserData',
      {
        withCredentials: true
      })

    const userData = response.data.entries;
    const salaryBuckets = {
      '<40K': 0,
      '40K-60K': 0,
      '60K-80K': 0,
      '80K-100K': 0,
      '>100K': 0
    };

    userData.forEach(user => {
      const salary = Number(user.salary);

      if (isNaN(salary)) return; // skip non-numeric values

      if (salary < 40000) {
        salaryBuckets['<40K']++;
      } else if (salary < 60000) {
        salaryBuckets['40K-60K']++;
      } else if (salary < 80000) {
        salaryBuckets['60K-80K']++;
      } else if (salary < 100000) {
        salaryBuckets['80K-100K']++;
      } else {
        salaryBuckets['>100K']++;
      }
    });

    const ctxTwo = document.getElementById('mySecondChart');
    const dataVisualizationPie = new Chart(ctxTwo, {
      type: 'doughnut',
      data: {
        labels: Object.keys(salaryBuckets),
        datasets: [{
          label: 'Salary',
          data: Object.values(salaryBuckets),
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

    //Event listeners to update bar graph

    document.addEventListener("click", async (event) => {

      if (event.target.closest(".saveNotes")) {

        if (dataVisualizationPie) {
          dataVisualizationPie.destroy()
          await createSecondChart()
        } else {

          await createSecondChart()
        }
      }
    });

    document.addEventListener("click", async (event) => {

      if (event.target.closest(".delete")) {

        if (dataVisualizationPie) {
          dataVisualizationPie.destroy()
          await createSecondChart()

        } else {
          await createSecondChart()
        }
      }
    });

    document.getElementById('submitForm').addEventListener('click', async (e) => {
      e.preventDefault()

      if (dataVisualizationPie) {
        dataVisualizationPie.destroy()
        await createSecondChart()
      } else {
        await createSecondChart()
      }
    })


    document.addEventListener('change', async function (e) {

      if (!e.target.matches('.subject')) return

      if (dataVisualizationPie) {
        dataVisualizationPie.destroy()
        await createSecondChart()
      } else {
        await createSecondChart()
      }
    });
  } catch (error) {
    console.error(error)
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  await createSecondChart()
});













