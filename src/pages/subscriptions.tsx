import React from 'react';
import Layout from '../components/Layout';
import { trpc } from '../utils/trpc';

const Subscriptions: React.FC = () => {
  const { data: subscriptions, isLoading } = trpc.subscriptions.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Subscription Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subscriptions?.map((subscription) => (
          <div key={subscription.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{subscription.name}</h2>
            <p className="text-lg font-semibold mt-2">${subscription.price}/{subscription.interval}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Subscriptions;