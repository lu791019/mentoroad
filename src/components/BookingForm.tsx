import React, { useState } from 'react';
import { trpc } from '../utils/trpc';

interface BookingFormProps {
  mentorId: string;
  serviceId: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ mentorId, serviceId }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const bookingMutation = trpc.bookings.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await bookingMutation.mutateAsync({
      mentorId,
      serviceId,
      dateTime: `${date}T${time}`,
    });
    // Handle success (e.g., show confirmation, redirect)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
          Time
        </label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md"
      >
        Book Session
      </button>
    </form>
  );
};

export default BookingForm;