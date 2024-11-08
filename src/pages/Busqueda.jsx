import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Busqueda.css";


function Home() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/items?q=${query}`);
        } else {
            alert("Por favor ingresa un término de búsqueda");
        }
    };

    return (
        <div className="home-container">
            <img
                src="/bolso.png" // Reemplaza con la ruta de tu logo
                alt="Logo Bazar Universal"
                className="home-logo"
            />
            <h1 className="home-title">Bazar Universal</h1>
            <div className="home-search">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar productos..."
                    className="home-input"
                />
                <button onClick={handleSearch} className="home-button">
                    Buscar
                </button>
            </div>
        </div>
    );
}

export default Home;
