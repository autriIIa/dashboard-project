import Header from "../components/Header";
import StatCard from "../components/StatCard";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import TopUsers from "../components/TopUsers";
import LineChart from "../components/LineChart";
import { useState, useEffect } from "react";

const API_URL = "https://pokeapi.co/api/v2/ability/1/";
export default function OverviewPage() {
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

    const [topData, setTopData] = useState([]);
    const [idTopData, setIdTopData] = useState([]);

    // datos individuales
    const [averageCompletedLevels, setAverageCompletedLevels] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetches = [
                    fetch(API_URL),
                    fetch("https://a00573055.pythonanywhere.com/db/top/"),
                    fetch(API_URL),
                    fetch(
                        "https://a00573055.pythonanywhere.com/db/completado/"
                    ),
                ];

                const responses = await Promise.all(fetches);

                responses.forEach((response) => {
                    if (!response.ok) {
                        throw new Error(
                            "One of the network responses was not ok"
                        );
                    }
                });

                const [mean_data, top_data, aaaa, completado] =
                    await Promise.all(responses.map((res) => res.json()));

                // Puedes usar mean_data, top_data, etc. como quieras
                const numPokemon = mean_data.pokemon?.length || 0;

                const monthlyCounts = Array.from({ length: 7 }, () =>
                    Math.floor(Math.random() * (numPokemon || 10))
                );

                // barras
                const top_monedas = top_data.mejores.map(
                    (item) => item.monedas
                );
                const top_id = top_data.mejores.map((item) => item.id);

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
                        data: [8, 8, 4, 1, 6, 2, 9], // Podrías también procesar top_data aquí
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                        tension: 0.2,
                    },
                ]);

                setTopData([
                    {
                        label: "Ability Usage",
                        data: top_monedas,
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                ]);
                setIdTopData(top_id);
            } catch (error) {
                console.error("Error fetching data:", error);
                setChartData([
                    {
                        label: "Sales",
                        data: [65, 59, 80, 81, 56, 55, 72],
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        tension: 0.2,
                    },
                    {
                        label: "Revenue",
                        data: [28, 48, 40, 19, 86, 27, 90],
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                        tension: 0.2,
                    },
                ]);
            }
        };

        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const chartDataFormatted = {
        labels,
        datasets: chartData,
    };

    const topDataFormatted = {
        labels: idTopData,
        datasets: topData,
    };

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Overview" />
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <StatCard
                        name="Total Sales"
                        icon={Zap}
                        value="12,200"
                        color="#6366f1"
                    ></StatCard>
                    <StatCard
                        name="Total Sales"
                        icon={Zap}
                        value="12,200"
                        color="#6366f1"
                    ></StatCard>
                    <StatCard
                        name="Total Sales"
                        icon={Zap}
                        value="12,200"
                        color="#6366f1"
                    ></StatCard>
                    <StatCard
                        name="Total Sales"
                        icon={Zap}
                        value="12,200"
                        color="#6366f1"
                    ></StatCard>
                </motion.div>
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
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <LineChart
                        titulo="Grafico de ventas"
                        chartDataFormatted={chartDataFormatted}
                    ></LineChart>
                </div>
            </main>
        </div>
    );
}
