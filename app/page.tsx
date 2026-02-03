"use client";
import React, { useState } from 'react';
import PreviewModal from '@/components/PreviewModal';

export default function Platform() {
  const [form, setForm] = useState({ name: '', college: '' });
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Just show preview, don't save yet
    setShowPreview(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) alert("Error saving data.");
    } catch (err) {
      alert("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9FB] relative flex items-center justify-center overflow-hidden font-sans">
      {/* Subtle, Sophisticated Glare */}
      <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] bg-purple-100/50 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[800px] h-[800px] bg-blue-100/40 blur-[120px] rounded-full" />

      <div className="relative z-10 w-full max-w-4xl px-6">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-[#1A1A1A] mb-3 tracking-tight">
            Get Your Certificate
          </h1>
          <p className="text-gray-500 text-lg">Enter your details to generate your official recognition.</p>
        </div>

        {/* Minimalist White Glass Card */}
        <div className="bg-white/70 backdrop-blur-2xl p-8 md:p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Full Name</label>
                <input 
                  required 
                  className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-100 text-[#1A1A1A] placeholder:text-gray-300 focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all" 
                  placeholder="e.g. John Doe" 
                  onChange={e => setForm({...form, name: e.target.value})} 
                />
              </div>
              
              <div className="group">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">College / University</label>
                <input 
                  required 
                  className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-100 text-[#1A1A1A] placeholder:text-gray-300 focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all" 
                  placeholder="e.g. IET DAVV" 
                  onChange={e => setForm({...form, college: e.target.value})} 
                />
              </div>
            </div>

            <button 
              disabled={loading} 
              className="w-full py-4 bg-[#1A1A1A] text-white rounded-xl font-bold text-lg hover:bg-black active:scale-[0.98] transition-all shadow-lg disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Generate Certificate'}
            </button>
          </form>
        </div>
      </div>

      <PreviewModal name={form.name} isOpen={showPreview} onClose={() => setShowPreview(false)} onConfirm={handleConfirm} />
    </main>
  );
}