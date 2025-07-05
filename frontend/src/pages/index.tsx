'use client';// At the top
import Link from 'next/link';


import { useEffect, useState } from 'react';
import axios from 'axios';

type Celebrity = {
  id: number;
  name: string;
  category: string;
  location: string;
  image: string;
  bio: string;
};

export default function HomePage() {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/celebrity') // backend endpoint
      .then((res) => setCelebrities(res.data))
      .catch((err) => console.error('API Error:', err));
  }, []);

  return (
    <div className="pt-28 px-6 bg-black min-h-screen text-white">
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        🌟 Meet the Celebrities
      </h1>
      <div className="text-end mb-10">
  <div className="flex justify-end gap-4 flex-wrap">
    <Link href="/signup">
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition">
        Become a Fan ⭐
      </button>
    </Link>
    <Link href="/search">
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition">
        Search your celeb
      </button>
    </Link>
    <Link href="/onboard-ai">
      <button className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white font-semibold transition">
        + AI Onboard
      </button>
    </Link>
  </div>
</div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {celebrities.map((celeb) => (
          <Link href={`/celebrity/${celeb.id}`} key={celeb.id}>
          <div className="bg-[#1e1e1e] p-5 rounded-xl shadow-xl hover:bg-[#2a2a2a] transition cursor-pointer">
            <img
              src={celeb.image}
              alt={celeb.name}
              className="w-full aspect-[3/2] object-contain rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">{celeb.name}</h2>
            <p className="text-gray-400 text-sm">{celeb.category} • {celeb.location}</p>
            <p className="mt-2 text-gray-300 text-sm">{celeb.bio.slice(0, 80)}...</p>
          </div>
        </Link>

        ))}
      </div>
    </div>
  );
}
