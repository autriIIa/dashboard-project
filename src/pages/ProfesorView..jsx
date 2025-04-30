import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import TopUsers from "../components/TopUsers";
import { motion } from "framer-motion";
import PieChartStudent from "../components/PieChartStudent";

export default function ProfesorView({ profesorId }) {
  const [topData, setTopData] = useState([]);
  const [idTopData, setIdTopData] = useState([]);
  const [minData, setMinData] = useState([]);
  const [idMinData, setIdMinData] = useState([]);

  const [aprobadosData, setAprobadosData] = useState();

  let group = "";
  if (profesorId == 2) {
    group = "A";
  } else if (profesorId == 3) {
    group = "B";
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sessionResponse, topResponse] = await Promise.all([
          fetch(`https://a00573055.pythonanywhere.com/db/aprobados/${group}`),
          fetch(`https://a00573055.pythonanywhere.com/db/top/${group}`),
        ]);

        const sessionData = await sessionResponse.json();
        const topData = await topResponse.json();

        console.log("Session Data:", sessionData);
        console.log("Top Data:", topData);

        const top_monedas = topData.top.map((item) => item.monedas);
        const min_monedas = topData.min.map((item) => item.monedas);
        const top_id = topData.top.map((item) => item.id);
        const min_id = topData.min.map((item) => item.id);

        setTopData([
          {
            label: "Monedas",
            data: top_monedas,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ]);
        setIdTopData(top_id);
        setMinData([
          {
            label: "Monedas",
            data: min_monedas,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ]);
        setIdMinData(min_id);
        setAprobadosData(sessionData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 9000);

    return () => clearInterval(intervalId);
  }, []);

  const topDataFormatted = {
    labels: idTopData,
    datasets: topData,
  };

  const minDataFormatted = {
    labels: idMinData,
    datasets: minData,
  };

  return (
    <div className="flex-1 overflow-auto relative">
      <Header title={`Bienvenido profesor del grupo: ${group}`} />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-10  lg:grid-cols-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TopUsers
            titulo={"Top Usuarios"}
            chartDataFormatted={topDataFormatted}
          />
          <TopUsers
            titulo={"Peores Usuarios"}
            chartDataFormatted={minDataFormatted}
          />
        </motion.div>
        <PieChartStudent data={aprobadosData} />
      </main>
    </div>
  );
}
