import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import OverviewPage from "./pages/OverviewPage";
import Sidebar from "./components/Sidebar";
import FindStudentPage from "./pages/FindStudentPage";
import Login from "./pages/Login";
import StudentView from "./pages/StudentView";
import ProfesorView from "./pages/ProfesorView.";

function ProtectedRoute({ children, allowedUsers = [] }) {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (allowedUsers.length > 0 && !allowedUsers.includes(token)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  console.log(sessionStorage.getItem("token"));
  console.log(sessionStorage.getItem("lista"));

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0" />
      </div>

      {isAuthenticated && <Sidebar />}

      <Routes>
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {sessionStorage.getItem("token") === "estudiante" ? (
                <StudentView studentId={sessionStorage.getItem("lista")} />
              ) : sessionStorage.getItem("token") === "profe" ? (
                <ProfesorView profesorId={sessionStorage.getItem("id")} />
              ) : (
                <OverviewPage />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute allowedUsers={["admin"]}>
              <FindStudentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedUsers={["estudiante"]}>
              <StudentView studentId={sessionStorage.getItem("lista")} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
