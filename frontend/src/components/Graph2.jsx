import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';


const Graph2 = ({id}) => {
  const [cpuUsageData, setCpuUsageData] = useState([]);
  const [chart, setChart] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/docker/stats/${id}`);
        const data = await response.json();
        const newCpuUsageData = [...cpuUsageData, data.memoryUsage].slice(-10);
        setCpuUsageData(newCpuUsageData);

        if (chart) {
          chart.data.labels.push(new Date().toLocaleTimeString());
          chart.data.labels = chart.data.labels.slice(-10);
          chart.data.datasets[0].data = newCpuUsageData;
          chart.update();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 2000);

    return () => clearInterval(intervalId);
  }, [cpuUsageData, chart]);

  useEffect(() => {
    const ctx = document.getElementById('memoryChart');
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Memory Usage',
            data: [],
            fill: true,
            borderColor: '#69d9f5',
            tension: 0.5,
          },
        ],
      },
    });

    setChart(newChart);

    return () => newChart.destroy();
  }, []);

  return <canvas id="memoryChart" />;
};

export default Graph2;