
import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import Legend from 'cal-heatmap/plugins/Legend';
import axios from 'axios';


const dataArray = [
  // June 2025
  { date: "2025-06-01", value: 3 },
  { date: "2025-06-05", value: 1 },
  { date: "2025-06-08", value: 6 },
  { date: "2025-06-12", value: 2 },
  { date: "2025-06-15", value: 4 },
  { date: "2025-06-19", value: 5 },
  { date: "2025-06-22", value: 1 },
  { date: "2025-06-26", value: 7 },

  // July 2025
  { date: "2025-07-02", value: 3 },
  { date: "2025-07-04", value: 6 },
  { date: "2025-07-07", value: 2 },
  { date: "2025-07-11", value: 8 },
  { date: "2025-07-17", value: 5 },
  { date: "2025-07-21", value: 1 },
  { date: "2025-07-25", value: 4 },
  { date: "2025-07-30", value: 2 },

  // August 2025
  { date: "2025-08-01", value: 7 },
  { date: "2025-08-05", value: 3 },
  { date: "2025-08-09", value: 5 },
  { date: "2025-08-13", value: 2 },
  { date: "2025-08-18", value: 6 },
  { date: "2025-08-22", value: 4 },
  { date: "2025-08-27", value: 1 },
  { date: "2025-08-30", value: 3 }
];



new CalHeatmap().paint({
  itemSelector: "#cal-heatmap",
  start:       new Date(2025,5,1),
  range:       3,
  domain:      { type: "month", gutter: 4 },
  subDomain:   { type: "day", width: 12, height: 12, gutter: 2, radius: 2 },
  data: {
   source: dataArray,
    type:   "json",
    x:      d => {
      
      const iso = d.date.replace(/\u2011/g, "-");
      return new Date(iso).getTime();
    },
    y:      d => d.value   
  },
  scale: {
    color: { type: "threshold", domain: [1,3,5,7,10], scheme: "Blues" }
  }
});




/*
document.addEventListener('DOMContentLoaded', () => {
  const cal = new CalHeatmap();

  cal.paint({
    range: 12, // Show 12 months
    domain: {
      type: 'month',
      gutter: 4,
      label: {
        text: 'MMM',
        position: 'top',
        offset: { x: 10, y: 12 },
      },
    },
    subDomain: {
      type: 'day',
      radius: 2,
      width: 12,
      height: 12,
      gutter: 2,
      label: '',
    },
    scale: {
      color: {
        scheme: 'Greens',
        domain: [0, 1, 3, 5, 10], // Adjust intensity
        type: 'threshold',
      },
    },
    date: {
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    },
    data: {
      source: async () => {
        // Example: randomly generate data
        const data = {};
        const now = new Date();
        for (let i = 0; i < 365; i++) {
          const date = new Date(now.getTime() - i * 86400000);
          data[date.toISOString().split('T')[0]] = Math.floor(Math.random() * 10);
        }
        return data;
      },
      type: 'json',
    },
    plugins: [
      Tooltip(),
      Legend({
        tickSize: 0,
        width: 100,
        itemSelector: '#legend',
        label: 'Contributions',
      }),
    ],
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const cal = new CalHeatmap();
  cal.paint({
    target: '#cal-heatmap',
    range: 12,
    domain: 'month',
    
    subDomain: {
      type: 'day',
      label: 'D',
      radius: 2,
      width: 15,
      height: 15,
    },
    data: '/api/your-job-data',
    start: new Date(),
    legend: [2, 4, 6, 8],
    domainLabelFormat: date =>
      date.toLocaleDateString('default', { month: 'short' }),
  });
});

*/