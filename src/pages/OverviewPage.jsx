import Header from "../components/Header";
import StatCard from "../components/StatCard";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import StudentLineChart from "../components/StudentLineChart";
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
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
                <TopUsers />
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
