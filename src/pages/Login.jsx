import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = "http://127.0.0.1:5000/pruebat";

export default function Login() {
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
                body: JSON.stringify({ user: user, group: group }),
            });

            const text = await response.text(); // usa text() primero para ver el cuerpo
            console.log("Raw response:", text);

            if (!response.ok) {
                throw new Error("Backend error");
            }

            const data = JSON.parse(text);
            console.log(data.response);
            sessionStorage.setItem("token", data.response);
            sessionStorage.setItem("user", user);
            sessionStorage.setItem("group", group);
            window.location.href = "/";
        } catch (error) {
            console.error("Error al iniciar sesión:", error.message);
        }
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center p-4">
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

                    <label
                        htmlFor="group"
                        className="font-medium text-gray-400"
                    >
                        Grupo
                    </label>
                    <input
                        type="group"
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

