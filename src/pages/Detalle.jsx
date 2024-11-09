import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Detalle = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://exassddd.vercel.app/api/items/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los detalles del producto");
        }
        return response.json();
      })
      .then((data) => {
        setProductData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddSale = () => {
    const saleData = {
      productId: productData.id,
      title: productData.title,
      price: productData.price,
      description: productData.description,
      brand: productData.brand,
      stock: productData.stock,
      category: productData.category,
      quantity: 1,
    };

    fetch("https://exassddd.vercel.app/api/addSale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saleData),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Venta registrada correctamente");
      })
      .catch((error) => {
        alert("Error al registrar la venta");
        console.error(error);
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 animate-spin text-blue-500 mx-auto" />
          <p className="mt-2 text-lg text-gray-600">Cargando detalles del producto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <p className="text-red-600 text-lg">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">No se encontró el producto.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">





            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {productData.title}
            </h1>
            <div className="inline-block bg-black px-3 py-1 rounded-full">
              {productData.category}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2 text-center">Descripción:</h3>
              <p className="text-gray-600 text-center">{productData.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-gray-700">Marca</h3>
                <p className="text-black">{productData.brand}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-gray-700">Precio</h3>
                <p className="text-xl font-bold text-green-600">
                  ${productData.price.toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-center">
                <h3 className="font-semibold text-gray-700">Stock Disponible</h3>
                <p className="text-gray-600 mb-2">{productData.stock} unidades</p>
                <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {productData.stock > 0 ? "En Stock" : "Sin Stock"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button 
              onClick={handleAddSale}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={productData.stock === 0}
            >
              Registrar venta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalle;