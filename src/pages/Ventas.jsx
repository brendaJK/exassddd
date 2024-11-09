import { useState, useEffect } from 'react';

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch('https://exassddd.vercel.app/api/sales');
        if (!response.ok) {
          throw new Error('Error al cargar las ventas');
        }
        const data = await response.json();
        const salesArray = Object.entries(data).map(([id, sale]) => ({
          id,
          ...sale
        }));
        setSales(salesArray);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);


  const calculateTotal = () => {
    return sales.reduce((sum, sale) => sum + sale.price * sale.quantity, 0);
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto mt-8">
        <div className="p-6 flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          <p className="ml-4 text-gray-500">Cargando ventas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto mt-8">
        <div className="p-6 flex items-center justify-center h-32">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!sales.length) {
    return (
      <div className="w-full max-w-6xl mx-auto mt-8">
        <div className="p-6 flex items-center justify-center h-32">
          <p className="text-gray-500">No hay ventas disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Lista de Ventas</h1>
      </div>

      <div className="w-screen -white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marca
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center">
                      <img
                        src={sale.thumbnail || "/api/placeholder/80/80"}
                        alt={sale.title}
                        className="w-20 h-20 object-cover rounded-lg shadow-sm"
                      />
                    </div>
                  </td>
                
                
                
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {sale.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {sale.brand}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {sale.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-gray-500">
                    ${sale.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-gray-500">
                    {sale.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-gray-900">
                    ${(sale.price * sale.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <div className="bg-black rounded-lg p-4 shadow">
          <p className="text-xl font-bold">
            Total de Ventas: ${calculateTotal().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalesList;