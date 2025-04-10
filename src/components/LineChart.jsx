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

const LineChart = ({ chartDataFormatted, titulo }) => {
  const date = new Date();

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

export default LineChart;
