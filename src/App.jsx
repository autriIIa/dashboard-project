import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import OverviewPage from "./pages/OverviewPage";
import Sidebar from "./components/Sidebar";
import FindStudentPage from "./pages/FindStudentPage";
import Login from "./pages/Login";

function ProtectedRoute({ children }) {
    const token = sessionStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    // Function to update auth state when login succeeds
    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <>
            <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
                <div className="fixed inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
                    <div className="absolute inset-0 backdrop-blur-sm" />
                </div>

                {isAuthenticated && <Sidebar />}

                <Routes>
                    <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                    <Route 
                        path="/" 
                        element={isAuthenticated ? <OverviewPage /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/users" 
                        element={isAuthenticated ? <FindStudentPage /> : <Navigate to="/login" />} 
                    />
                </Routes>
            </div>
        </>
    );
}

export default App;