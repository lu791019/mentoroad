import React from 'react';
import Layout from '../components/Layout';
import { trpc } from '../utils/trpc';

const Webinars: React.FC = () => {
  const { data: webinars, isLoading } = trpc.services.getWebinars.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Upcoming Webinars</h1>
      <div className="space-y-4">
        {webinars?.map((webinar) => (
          <div key={webinar.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{webinar.name}</h2>
            <p className="text-gray-600">{webinar.description}</p>
            <p className="text-sm text-gray-500">Duration: {webinar.duration} minutes</p>
            <p className="text-lg font-semibold mt-2">${webinar.price}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
              Register
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Webinars;