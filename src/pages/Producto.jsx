import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    // Obtener el parámetro `q` de los SearchParams
    const query = searchParams.get("q") || searchQuery;

    if (query) {
      setLoading(true);
      fetch(`https://exassddd.vercel.app/api/items?q=${query}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al cargar los productos");
          }
          return response.json();
        })
        .then((data) => {
          setProducts(data.items || []);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setProducts([]);
    }
  }, [searchQuery, searchParams]);

  // Manejador de cambio de búsqueda
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Función para manejar la redirección
  const handleNavigate = (id) => {
    navigate(`/item/${id}`);
  };

  // Renderizado
  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!products.length) return <p>No se encontraron productos.</p>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
      
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Buscar productos..."
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "250px",
          }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
        {products.map((product) => (
          <div key={product.id} className="product-card" style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
            />
            <h3 style={{ fontSize: "18px", margin: "15px 0" }}>{product.name}</h3>
            <p style={{ color: "#555" }}>{product.description}</p>
            <p style={{ fontWeight: "bold", marginTop: "10px" }}>${product.price}</p>
            <button 
              onClick={() => handleNavigate(product.id)} 
              style={{ padding: "10px 15px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" }}
            >
              Ver detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
