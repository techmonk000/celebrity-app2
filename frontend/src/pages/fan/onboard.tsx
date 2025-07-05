'use client';

import { useState } from 'react';
import axios from 'axios';

export default function FanOnboard() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: '',
    favoriteCelebrity: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://b3syyb9vf3.execute-api.us-east-1.amazonaws.com/fan', formData);
      alert('Fan registered successfully!');
      setFormData({ name: '', email: '', interests: '', favoriteCelebrity: '' });
    } catch (err) {
      alert('Error submitting fan data.');
      console.error(err);
    }
  };

  return (
    <div className="pt-28 px-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
        🎉 Become a Fan
      </h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6 bg-[#1e1e1e] p-8 rounded-lg shadow-xl">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] outline-none text-white"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] outline-none text-white"
          required
        />
        <textarea
          name="interests"
          placeholder="Your Interests"
          value={formData.interests}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] outline-none text-white"
          rows={3}
          required
        />
        <input
          type="text"
          name="favoriteCelebrity"
          placeholder="Your Favorite Celebrity"
          value={formData.favoriteCelebrity}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] outline-none text-white"
          required
        />
        <button
          type="submit"
          className="w-full py-2 rounded-md bg-purple-600 hover:bg-purple-700 font-semibold text-white transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
