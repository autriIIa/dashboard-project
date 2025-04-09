import Header from "../components/Header";
import StatCard from "../components/StatCard";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function OverviewPage() {
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
            </main>
        </div>
    );
}
