//import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Busqueda"; // Página de búsqueda
import SearchResults from "./pages/Producto"; // Resultados de búsqueda
import ProductDetail from "./pages/Detalle"; // Detalle del producto
import SalesList from "./pages/Ventas"; // Lista de compras registradas

function AppRouter() {
    return (
        <Router>
            <Routes>

                {/* Resultados de búsqueda */}
                <Route path="/" element={<Home />} />

                {/* Resultados de búsqueda */}
                <Route path="/items" element={<SearchResults />} />

                {/* Detalle de producto */}
                <Route path="/item/:id" element={<ProductDetail />} />

                {/* Lista de compras */}
                <Route path="/sales" element={<SalesList />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
