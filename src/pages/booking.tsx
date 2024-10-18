import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import BookingForm from '../components/BookingForm';
import { trpc } from '../utils/trpc';

const Booking: React.FC = () => {
  const router = useRouter();
  const { mentor: mentorId, service: serviceId } = router.query;

  const { data: service, isLoading } = trpc.services.getById.useQuery(serviceId as string);

  if (isLoading) return <div>Loading...</div>;
  if (!service) return <div>Service not found</div>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Book a Session</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{service.name}</h2>
        <p className="text-gray-600">{service.description}</p>
        <p className="text-lg font-semibold">${service.price}</p>
      </div>
      <BookingForm mentorId={mentorId as string} serviceId={serviceId as string} />
    </Layout>
  );
};

export default Booking;