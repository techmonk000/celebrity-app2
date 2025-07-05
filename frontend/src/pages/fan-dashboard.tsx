'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type Fan = {
  id: number;
  name: string;
  email: string;
  interests: string;
  favoriteCelebrity: string;
};

export default function FansDashboard() {
  const [fans, setFans] = useState<Fan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3000/fan')
      .then((res) => {
        setFans(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching fans:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-28 px-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
        🎯 Fan Registrations
      </h1>

      <div className="text-end mb-10">
        <Link href="/">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition">
            Home
          </button>
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Loading fans...</p>
      ) : fans.length === 0 ? (
        <p className="text-center text-gray-400">No fans registered yet.</p>
      ) : (
        <div className="overflow-x-auto max-w-5xl mx-auto">
          <table className="min-w-full border border-gray-700 text-sm">
            <thead className="bg-[#2a2a2a] text-white">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Interests</th>
                <th className="px-4 py-2">Favorite Celebrity</th>
              </tr>
            </thead>
            <tbody>
              {fans.map((fan) => (
                <tr key={fan.id} className="border-t border-gray-700 hover:bg-[#333] transition">
                  <td className="px-4 py-2">{fan.name}</td>
                  <td className="px-4 py-2">{fan.email}</td>
                  <td className="px-4 py-2">{fan.interests}</td>
                  <td className="px-4 py-2">{fan.favoriteCelebrity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
