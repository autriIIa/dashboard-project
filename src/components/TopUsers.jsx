import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement, 
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, 
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
  },
};

export default function TopUsers({ chartDataFormatted, titulo }) {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg overflow-hidden rounded-xl border border-gray-700"
      whileHover={{
        y: -5,
        boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="p-4 sm:p-6">
        <span className="flex items-center text-sm font-medium text-gray-400"></span>

        <p className="mt-1 text-3xl font-semibold text-gray-100">{titulo}</p>
        <Bar data={chartDataFormatted} options={options} />
      </div>
    </motion.div>
  );
}
