import React, { useState, useEffect } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";

import "./App.css";

import revenueData from "../data/revenueData.json";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const generateRandomData = () => {
  return {
    label: `Label ${Math.floor(Math.random() * 100)}`,
    revenue: Math.floor(Math.random() * 100),
  };
};

export const Graph1 = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Revenue",
        data: revenueData.map((data) => data.revenue),
        backgroundColor: "#064FF0",
        borderColor: "#064FF0",
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateRandomData();

      setChartData((prevChartData) => {
        const updatedLabels = [...prevChartData.labels, newData.label].slice(-10);
        const updatedData = [...prevChartData.datasets[0].data, newData.revenue].slice(-10);

        return {
          labels: updatedLabels,
          datasets: [
            {
              ...prevChartData.datasets[0],
              data: updatedData,
            },
          ],
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div className="dataCard revenueCard">
        <Line
          data={chartData}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "CPU Usage",
              },
            },
          }}
        />
      </div>
    </div>

  );
};

export default Graph1;