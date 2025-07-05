'use client';

import { useState } from 'react';
import axios from 'axios';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.get(`https://b3syyb9vf3.execute-api.us-east-1.amazonaws.com/celebrity/search?q=${query}`);
      setResult(res.data.generated);
    } catch (err) {
      setResult('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-6">
      <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
        🔍 AI Celebrity Search
      </h1>

      <div className="max-w-xl mx-auto flex flex-col gap-4">
        <input
          type="text"
          placeholder="Type something like 'romantic singer from India'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-3 rounded-lg bg-[#1e1e1e] text-white border border-gray-700 outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-lg font-semibold transition"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
        {result && (
          <div className="mt-6 p-4 bg-[#2e2e2f] rounded-md border border-gray-700">
            <p className="text-gray-300 whitespace-pre-wrap">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
