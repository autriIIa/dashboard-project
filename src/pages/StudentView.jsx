import { useEffect, useState } from "react";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import { motion } from "framer-motion";
import { Check, Mars, UsersRound, CircleDollarSign } from "lucide-react";
import LineChart from "../components/LineChart";

const StudentView = ({ studentId }) => {
  if (!studentId) {
    studentId = "glugluglu";
  }

  const [data, setData] = useState({
    genero: "",
    grupo: "",
    id_docente: 0,
    monedas: 0,
    numero_lista: 0,
    id: 0,
  });

  const [chartData1, setChartData1] = useState({
    labels: [],
    datasets: [],
  });

  const [chartData2, setChartData2] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionResponse = await fetch(
          "https://a00573055.pythonanywhere.com/Sesion/"
        );
        const sessionData = await sessionResponse.json();

        const completedGames = [];
        const coins = [];
        const dates = [];

        sessionData.forEach((element) => {
          if (element.id_jugador == studentId) {
            completedGames.push(element.juegos_completados);
            coins.push(element.monedas_ganadas);
            dates.push(element.fecha);
          }
        });

        console.log("completedGames: ", completedGames);
        setChartData1({
          labels: dates,
          datasets: [
            {
              label: "Juegos Completados",
              data: completedGames,
              fill: true,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderWidth: 1,
            },
          ],
        });

        setChartData2({
          labels: dates,
          datasets: [
            {
              label: "Monedas Ganadas",
              data: coins,
              fill: true,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderWidth: 1,
            },
          ],
        });

        const playerResponse = await fetch(
          `https://a00573055.pythonanywhere.com/Jugador/${studentId}`
        );
        const playerData = await playerResponse.json();

        let genero = "";
        const grupo = playerData.grupo;
        const id = playerData.id;
        const id_docente = playerData.id_docente;
        const monedas = playerData.monedas;

        if (playerData.genero === "H" || playerData.genero === "M") {
          genero = "Masculino";
        } else if (playerData.genero === "F") {
          genero = "Femenino";
        }

        setData({
          genero: genero,
          grupo: grupo,
          id: id,
          id_docente: id_docente,
          monedas: monedas,
        });
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

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title={`Bienvenido estudiante ${studentId}`} />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-10  lg:grid-cols-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LineChart
            chartDataFormatted={chartData1}
            titulo="Juegos Completados"
          ></LineChart>
          <LineChart
            chartDataFormatted={chartData2}
            titulo="Monedas Ganadas"
          ></LineChart>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatCard
            name={"Genero"}
            value={data.genero}
            icon={Mars}
            color="#FF6384"
          />
          <StatCard
            title="Grupo"
            name={"Grupo"}
            value={data.grupo}
            icon={UsersRound}
            color="#FF6384"
          />
          <StatCard
            name={"Monedas"}
            value={data.monedas}
            icon={CircleDollarSign}
            color="#FF6384"
          />
        </motion.div>
      </main>
    </div>
  );
};

export default StudentView;
