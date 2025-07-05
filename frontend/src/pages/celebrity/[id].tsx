'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type Celebrity = {
  id: number;
  name: string;
  category: string;
  location: string;
  image: string;
  bio: string;
};

export default function CelebrityProfile() {
  const router = useRouter();
  const { id } = router.query;

  const [celebrity, setCelebrity] = useState<Celebrity | null>(null);
  const [fanId, setFanId] = useState<number | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [pdfDownloading, setPdfDownloading] = useState(false);

  useEffect(() => {
    const storedFanId = localStorage.getItem('fanId');
    if (storedFanId) setFanId(Number(storedFanId));

    const storedBookingId = localStorage.getItem('latestBookingId');
    if (storedBookingId) setBookingId(storedBookingId);

    if (!id) return;

    axios
      .get('http://localhost:3000/celebrity')
      .then((res) => {
        const celeb = res.data.find((c: Celebrity) => c.id === Number(id));
        setCelebrity(celeb);
      })
      .catch((err) => console.error('Error fetching celebrity:', err));
  }, [id]);

  const downloadPDF = async () => {
    if (!bookingId) return;

    try {
      setPdfDownloading(true);
      const response = await axios.post(
        'http://localhost:3000/booking/download',
        { bookingId },
        {
          responseType: 'blob',
        }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `booking-${bookingId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('PDF Download failed:', error);
      alert('Failed to download PDF');
    } finally {
      setPdfDownloading(false);
    }
  };

  if (!celebrity) {
    return <p className="text-white text-center mt-40">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1c1c1e] via-[#2e2e2f] to-[#0a0a0a] text-white py-24 px-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
        <img
          src={celebrity.image}
          alt={celebrity.name}
          className="w-72 h-72 object-cover rounded-xl shadow-lg"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            {celebrity.name}
          </h1>
          <p className="text-gray-400 text-lg">
            {celebrity.category} • {celebrity.location}
          </p>
          <p className="text-gray-300">{celebrity.bio}</p>
          <Link href="/book">
          <button className="flex gap-3 mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 transition rounded-lg text-white font-semibold">
            Book {celebrity.name}
          </button>
          </Link>

          {bookingId && (
            <button
              onClick={downloadPDF}
              className="mt-4 px-5 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
              disabled={pdfDownloading}
            >
              {pdfDownloading ? 'Downloading...' : 'Download Booking PDF'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
