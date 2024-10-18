import React from 'react';
import Layout from '../components/Layout';
import { trpc } from '../utils/trpc';

const Products: React.FC = () => {
  const { data: products, isLoading } = trpc.products.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Digital Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-semibold mt-2">${product.price}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
              Purchase
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Products;