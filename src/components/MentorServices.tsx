import React from 'react';
import Link from 'next/link';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  type: 'one-on-one' | 'webinar' | 'bundle';
}

interface MentorServicesProps {
  services: Service[];
  mentorId: string;
}

const MentorServices: React.FC<MentorServicesProps> = ({ services, mentorId }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Services</h2>
      <div className="grid gap-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
            <p className="text-sm text-gray-600">{service.duration} mins</p>
            <p className="text-lg font-semibold mt-2">${service.price}</p>
            <Link href={`/booking?mentor=${mentorId}&service=${service.id}`}>
              <a className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md inline-block">Book</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorServices;