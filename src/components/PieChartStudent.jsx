import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const allPieData = [
  [10, 20, 30],
  [5, 15, 25],
  [8, 12, 18],
];

const labels = ["Red", "Blue", "Yellow"];
const colors = [
  "rgba(255, 99, 132, 0.6)",
  "rgba(54, 162, 235, 0.6)",
  "rgba(255, 206, 86, 0.6)",
];

export default function PieChartStudent() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Votes",
        data: allPieData[selectedIndex],
        backgroundColor: colors,
        borderColor: colors.map((c) => c.replace("0.6", "1")),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-900 text-white rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-bold">Dynamic Pie Chart</h2>

      <label className="block text-sm mb-2">
        Select Data Set:
        <select
          className="w-full mt-1 bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(parseInt(e.target.value))}
        >
          <option value={0}>Data 1</option>
          <option value={1}>Data 2</option>
          <option value={2}>Data 3</option>
        </select>
      </label>

      <Pie data={chartData} options={{ responsive: true }} />
    </div>
  );
}
