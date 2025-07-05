'use client';

import { useState } from 'react';
import axios from 'axios';

export default function BookPage() {
  const [fanId, setFanId] = useState('');
  const [celebrityId, setCelebrityId] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [bookingId, setBookingId] = useState<number | null>(null); // ✅ moved here

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/booking', {
        fanId: Number(fanId),
        celebrityId: Number(celebrityId),
        message,
        date,
      });
      setBookingId(response.data.id); // ✅ works now
      localStorage.setItem('latestBookingId', response.data.id);
      alert('Booking successful!');
    } catch (err) {
      console.error('Booking failed:', err);
      alert('Booking failed!');
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto mt-20 bg-[#1e1e1e] rounded-lg text-white">
      <h1 className="text-2xl font-bold mb-6">Book a Celebrity</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Fan ID"
          value={fanId}
          onChange={(e) => setFanId(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="number"
          placeholder="Celebrity ID"
          value={celebrityId}
          onChange={(e) => setCelebrityId(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Submit Booking
        </button>
      </form>

      {bookingId && (
        <p className="mt-4 text-green-400">Booking ID: {bookingId}</p>
      )}
    </div>
  );
}
