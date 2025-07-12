
import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';
import axios from 'axios';



export async function fetchUserDates() {
  
try{


  
  const response = await axios.get('/api/v1/users/getUserData', {
    withCredentials: true
  });

  const userData = response.data.entries;
  const userDates = userData.map(user => user.createdAt.slice(0, 10));
   const dataObject = JSON.parse(JSON.stringify(userDates));


const frequencyMap = {};

dataObject.forEach(date => {
  frequencyMap[date] = (frequencyMap[date] || 0) + 1;
});

// Step 2: Convert to array of objects
const calData = Object.entries(frequencyMap).map(([date, value]) => ({
  date,
  value
}));

 const heatmap = new CalHeatmap().paint({
  itemSelector: "#cal-heatmap",
  start: new Date(2025, 5, 1),
  range: 3,
  domain: { type: "month", gutter: 4 },
  subDomain: { type: "day", width: 12, height: 12, gutter: 2, radius: 2 },
  data: {
    source: calData,
    type: "json",
    x: d => new Date(d.date).getTime(),
    y: d => d.value
  },
  scale: {
    color: { type: "threshold", domain: [1, 3, 5, 7, 10], scheme: "Blues" }
  }
});

  document.getElementById('submitForm').addEventListener('click', async (e) => {
      e.preventDefault()

   
        heatmap.destroy()
        await fetchUserDates()
    })

}catch(error){
  console.error(error)
}


}

window.addEventListener('DOMContentLoaded', async () => {
  await fetchUserDates()
});


