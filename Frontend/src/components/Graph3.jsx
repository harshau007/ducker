import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';


const Graph3 = ({id}) => {
  const [cpuUsageData, setCpuUsageData] = useState([]);
  const [chart, setChart] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/docker/stats/${id}`);
        const data = await response.json();
        const newCpuUsageData = [...cpuUsageData, data.networks.eth0.rx_bytes].slice(-10);
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
    const ctx = document.getElementById('networkChart');
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Network Usage',
            data: [],
            fill: true,
            borderColor: '#ca9eff',
            tension: 0.5,
          },

        ],
      },
    });

    setChart(newChart);

    return () => newChart.destroy();
  }, []);

  return <canvas id="networkChart" />;
};

export default Graph3;