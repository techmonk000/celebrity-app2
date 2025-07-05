'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function FanRegister() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:3000/fan/register', { name, email });
      const fanId = res.data.id;
      localStorage.setItem('fanId', res.data.id);
      alert('Fan registered successfully!');
      router.push(`/fan-dashboard?fanId=${fanId}`);
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="pt-24 px-6 text-white min-h-screen bg-black flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">🎉 Register as a Fan</h1>
      <div className="space-y-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded bg-[#1e1e1e] outline-none"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded bg-[#1e1e1e] outline-none"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded font-semibold"
        >
          Register
        </button>
      </div>
    </div>
  );
}
