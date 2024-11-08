import  { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const SalesList = () => {
  const [sales, setSales] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://exassddd.vercel.app/api/sales')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar las ventas');
        }
        return response.json();
      })
      .then(data => {
        setSales(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <p className="text-center text-gray-500">Cargando ventas...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <p className="text-center text-red-500">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  // Convert sales object to array with null check
  const salesArray = Object.entries(sales || {}).map(([id, sale]) => ({
    id,
    ...sale
  }));

  if (!salesArray.length) {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <p className="text-center text-gray-500">No hay ventas disponibles</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Lista de Ventas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left font-semibold">Fecha</th>
                <th className="px-4 py-2 text-left font-semibold">Título</th>
                <th className="px-4 py-2 text-left font-semibold">Marca</th>
                <th className="px-4 py-2 text-left font-semibold">Categoría</th>
                <th className="px-4 py-2 text-right font-semibold">Precio</th>
                <th className="px-4 py-2 text-right font-semibold">Cantidad</th>
                <th className="px-4 py-2 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {salesArray.map((sale) => (
                <tr key={sale.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {formatDate(sale.date)}
                  </td>
                  <td className="px-4 py-2">{sale.title}</td>
                  <td className="px-4 py-2">{sale.brand}</td>
                  <td className="px-4 py-2">{sale.category}</td>
                  <td className="px-4 py-2 text-right">
                    ${sale.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {sale.quantity}
                  </td>
                  <td className="px-4 py-2 text-right">
                    ${(sale.price * sale.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-lg font-semibold">
              Total de Ventas: $
              {salesArray
                .reduce((sum, sale) => sum + sale.price * sale.quantity, 0)
                .toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesList;