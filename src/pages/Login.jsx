import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = "https://a00573055.pythonanywhere.com/login";
const regex = /profe/;

export default function Login({ onLoginSuccess }) {
  const [user, setUser] = useState("");
  const [group, setGroup] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numero_lista: user, grupo: group }),
      });

      const text = await response.text(); // usa text() primero para ver el cuerpo

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = JSON.parse(text);

      if (data.nombre === "admin") {
        sessionStorage.setItem("token", "admin");
      } else if (regex.test(data.nombre)) {
        sessionStorage.setItem("token", "profe");
      } else {
        sessionStorage.setItem("token", "estudiante");
        sessionStorage.setItem("lista", data.numero_lista);
        sessionStorage.setItem("grupo", data.grupo);
      }

      if (sessionStorage.getItem("token") != "estudiante") {
        sessionStorage.setItem("nombre", data.nombre);
        sessionStorage.setItem("director", data.director);
        sessionStorage.setItem("id", data.id);
      }

      onLoginSuccess();
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <img className="absolute top-1/20  z-10" src="/logo.png" alt="logo" />
      <div className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 p-6">
        <h1 className="text-2xl font-semibold text-gray-100 mb-4">
          Bienvenido
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <label htmlFor="user" className="font-medium text-gray-400">
            Usuario
          </label>
          <input
            type="text"
            id="user"
            name="user"
            value={user}
            placeholder="Ingresa el usuario"
            onChange={(e) => setUser(e.target.value)}
            className="p-2 ring-2 ring-gray-700 backdrop-blur-md outline-none focus:ring-blue-600 rounded"
            required
          />

          <label htmlFor="group" className="font-medium text-gray-400">
            Grupo
          </label>
          <input
            type="text"
            id="group"
            name="group"
            value={group}
            placeholder="Ingresa el grupo"
            onChange={(e) => setGroup(e.target.value)}
            className="p-2 ring-2 ring-gray-700 backdrop-blur-md outline-none focus:ring-blue-600 rounded"
            required
          />

          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
