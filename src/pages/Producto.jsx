import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const query = searchParams.get("q") || searchQuery;

    if (query) {
      setLoading(true);
      console.log(query);
      fetch(`https://exassddd.vercel.app/api/items?q=${query}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al cargar los productos");
          }
          return response.json();
        })
        .then((data) => {
          setProducts(data || []);
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleNavigate = (id) => {
    navigate(`/item/${id}`);
  };

  const getGridClassName = () => {
    if (products.length === 1) {
      return "flex justify-center items-start";
    }
    if (products.length === 2) {
      return "grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto";
    }
    return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";
  };

  const getProductCardClassName = () => {
    if (products.length === 1) {
      return "w-full max-w-md flex flex-col bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300";
    }
    return "flex flex-col bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300";
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <p className="text-lg">Cargando productos...</p>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <p className="text-lg text-red-500">Error: {error}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <form 
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8 max-w-4xl mx-auto"
      >
        <div className="relative w-full max-w-md">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Buscar productos..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button 
          type="submit"
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Buscar
        </button>
      </form>

      {!products.length ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">No se encontraron productos.</p>
        </div>
      ) : (
        <div className={getGridClassName()}>
          {products.map((product) => (
            <div 
              key={product.id} 
              className={getProductCardClassName()}
            >
              <div className="relative pt-[75%]">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">{product.description}</p>
                <div className="mt-auto">
                  <p className="text-xl font-bold text-blue-600 mb-3">${product.price}</p>
                  <button 
                    onClick={() => handleNavigate(product.id)}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;