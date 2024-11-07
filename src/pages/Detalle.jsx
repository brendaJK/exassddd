import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Detalle = () => {
  const { id } = useParams(); // Obtener el id desde los parámetros de la URL
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener los detalles del producto con el id de la URL
    fetch(`https://exassddd.vercel.app/api/items/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los detalles del producto");
        }
        return response.json();
      })
      .then((data) => {
        setProductData(data); // Guardar los datos del producto
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  // Función para enviar los datos de la venta a la API
  const handleAddSale = () => {
    const saleData = {
      productId: productData.productId,
      title: productData.title,
      price: productData.price,
      description: productData.description,
      brand: productData.brand,
      stock: productData.stock,
      category: productData.category,
    };

    fetch("https://exassddd.vercel.app/api/addSale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saleData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Venta registrada correctamente");
      })
      .catch((error) => {
        alert("Error al registrar la venta");
        console.error(error);
      });
  };

  // Renderizado
  if (loading) return <p>Cargando detalles del producto...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!productData) return <p>No se encontró el producto.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{productData.title}</h2>
      <img
        src={productData.image}
        alt={productData.title}
        style={{ width: "300px", height: "300px", objectFit: "cover", marginBottom: "20px" }}
      />
      <p><strong>Descripción:</strong> {productData.description}</p>
      <p><strong>Marca:</strong> {productData.brand}</p>
      <p><strong>Precio:</strong> ${productData.price}</p>
      <p><strong>Stock:</strong> {productData.stock} unidades</p>
      <p><strong>Categoría:</strong> {productData.category}</p>

      <button
        onClick={handleAddSale}
        style={{
          padding: "10px 15px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Registrar venta
      </button>
    </div>
  );
};

export default Detalle;
