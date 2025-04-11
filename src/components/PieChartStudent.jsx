import { useState } from "react";
import { motion } from "framer-motion";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const labels = ["Aprobado", "No aprobado"];
const colors = ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"];

export default function PieChartStudent({ data }) {
  const hasData =
    data && Array.isArray(data.aprobados) && data.aprobados.length > 0;

  const [selectedIndex, setSelectedIndex] = useState(0);

  // If no valid data, show a placeholder or error message
  if (!hasData) {
    return (
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg overflow-hidden rounded-xl border border-gray-700 p-5"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-gray-400 text-center py-16">
          No hay datos disponibles
        </p>
      </motion.div>
    );
  }

  const current = data.aprobados[selectedIndex];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Resultados",
        data: [current.aprobados, current.no_aprobado],
        backgroundColor: colors,
        borderColor: colors.map((c) => c.replace("0.6", "1")),
        borderWidth: 1,
      },
    ],
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
      <label className="block text-sm text-gray-400 mb-2">
        Selecciona grupo:
        <select
          className="w-full mt-1 bg-gray-700 text-white border border-gray-600 rounded px-3 py-2"
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(parseInt(e.target.value))}
        >
          {data.aprobados.map((_, i) => (
            <option key={i} value={i}>
              Grupo {i + 1}
            </option>
          ))}
        </select>
      </label>
      <div className="w-96 h-96 mx-auto">
        <Pie
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </motion.div>
  );
}
