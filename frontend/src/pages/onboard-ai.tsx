'use client';

import { useState } from 'react';
import axios from 'axios';

export default function AIOnboardPage() {
  const [prompt, setPrompt] = useState('');
  const [formData, setFormData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAutoFill = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/celebrity/ai-fill', { prompt });
      setFormData(res.data);
    } catch (err) {
      alert('AI failed. Please try again.');
      console.error(err);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    await axios.post('http://localhost:3000/celebrity', formData);
    alert('Celebrity saved!');
    setFormData(null);
    setPrompt('');
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-28">
      <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        ✨ AI Celebrity Onboarding
      </h1>

      <div className="max-w-xl mx-auto bg-[#1e1e1e] p-6 rounded-xl">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Punjabi singer who performed at Coachella"
          className="w-full p-3 rounded bg-[#2a2a2a] mb-4"
        />
        <button
          onClick={handleAutoFill}
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded font-semibold"
        >
          {loading ? 'Generating...' : 'Auto-Fill Using AI'}
        </button>

        {formData && (
          <div className="mt-6 space-y-4">
            <input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Name"
              className="w-full p-2 rounded bg-[#2a2a2a]"
            />
            <input
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Category"
              className="w-full p-2 rounded bg-[#2a2a2a]"
            />
            <input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Location"
              className="w-full p-2 rounded bg-[#2a2a2a]"
            />
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Bio"
              rows={4}
              className="w-full p-2 rounded bg-[#2a2a2a]"
            />
            <input
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="Image URL"
              className="w-full p-2 rounded bg-[#2a2a2a]"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold"
            >
              Save to Database
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
