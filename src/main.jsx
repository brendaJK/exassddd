import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./Router"; // Cambia el nombre si decides usar otro archivo
import "./index.css"; // Estilos globales

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AppRouter />
    </React.StrictMode>
);
