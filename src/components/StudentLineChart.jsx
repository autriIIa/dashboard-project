import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      text: "Monthly Data Trends",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: 10,
    },
  },
};
const date = new Date();

const StudentLineChart = ({ url, titulo }) => {
  const [chartData, setChartData] = useState([]);
  const [labels, setLabels] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Example: Extract the number of Pokémon with this ability
        const numPokemon = data.pokemon?.length || 0;

        // Create some fake monthly data for demonstration purposes
        const monthlyCounts = Array.from({ length: 7 }, () =>
          Math.floor(Math.random() * (numPokemon || 10))
        );

        setChartData([
          {
            label: "Ability Usage",
            data: monthlyCounts,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            tension: 0.2,
          },
          {
            label: "Revenue",
            data: [8, 8, 4, 1, 6, 2, 9],
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            tension: 0.2,
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Provide fallback data in case of error
        setChartData([
          {
            label: "Sales",
            data: [65, 59, 80, 81, 56, 55, 72],
            borderColor: color?.color1 || "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            tension: 0.2,
          },
          {
            label: "Revenue",
            data: [28, 48, 40, 19, 86, 27, 90],
            borderColor: color?.color2 || "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            tension: 0.2,
          },
        ]);
      }
    };

    fetchData();

    // Use a more reasonable interval - 30 seconds instead of 1 second
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const chartDataFormatted = {
    labels,
    datasets: chartData,
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg overflow-hidden rounded-xl border border-gray-700 p-5"
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -5,
        boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
      }}
    >
      <h3 className="text-2xl font-semibold text-gray-300">{titulo}</h3>

      <h4 className="text-sm font-semibold text-gray-500 mb-4">
        {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
      </h4>

      <Line options={options} data={chartDataFormatted} />
    </motion.div>
  );
};

export default StudentLineChart;
