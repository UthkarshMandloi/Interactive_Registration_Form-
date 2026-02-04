"use client";
import React, { useState } from 'react';
import PreviewModal from '@/components/PreviewModal';
import Image from 'next/image';

export default function Platform() {
  const [form, setForm] = useState({ name: '', college: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      if (!res.ok) throw new Error("Sheet update failed");
    } catch (err) {
      console.error(err);
      alert("Network error while saving data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // 1. Updated main container to use your generated mandala image as a fixed background
    <main 
      className="min-h-screen relative flex items-center justify-center font-sans py-10 bg-fixed bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/mandala_background.jpg')" }}
    >
      
      {/* 2. Overlay to ensure the form remains readable against the complex background */}
      <div className="absolute inset-0 bg-[#2D0A1B]/60 backdrop-blur-[2px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl px-6">
        
        {/* 3. Header Section with Logo and Hindi Date */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="relative p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20 mb-6 shadow-2xl">
            <Image 
              src="/logo-yova-utsav.png" 
              alt="Yuva Mahotsav Logo" 
              width={160} 
              height={160} 
              className="drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
            />
          </div>
          
          <p className="text-[#FFD700] text-3xl font-bold mb-4 italic tracking-widest drop-shadow-md">
            ६ से ८ फ़रवरी २०२६
          </p>
          
          <h1 className="text-5xl font-black text-white mb-2 tracking-tight uppercase italic drop-shadow-lg">
            Get Your Certificate
          </h1>
          <p className="text-white/80 text-lg max-w-md drop-shadow-md">
            Celebrating the spirit of <b>Ancient Indian Tradition</b>
          </p>
        </div>

        {/* 4. Portrait-Style Ornamental Form Card */}
        <div className="bg-[#3D0C21]/90 backdrop-blur-xl p-8 md:p-12 rounded-[50px] shadow-[0_0_100px_rgba(0,0,0,0.6)] border-2 border-[#FFD700]/30 relative overflow-hidden">
          
          {/* Subtle Golden Pattern Overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstripe.png')]" />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#FFD700] uppercase tracking-[0.3em] ml-2">Full Name</label>
                <input 
                  required 
                  className="w-full p-5 rounded-2xl bg-black/40 border border-[#FFD700]/30 text-white placeholder:text-white/20 focus:bg-black/60 focus:border-[#FFD700] outline-none transition-all shadow-inner" 
                  placeholder="As it should appear" 
                  onChange={e => setForm({...form, name: e.target.value})} 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#FFD700] uppercase tracking-[0.3em] ml-2">University / College</label>
                <input 
                  required 
                  className="w-full p-5 rounded-2xl bg-black/40 border border-[#FFD700]/30 text-white placeholder:text-white/20 focus:bg-black/60 focus:border-[#FFD700] outline-none transition-all shadow-inner" 
                  placeholder="College Name" 
                  onChange={e => setForm({...form, college: e.target.value})} 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#FFD700] uppercase tracking-[0.3em] ml-2">Email</label>
                <input 
                  required 
                  type="email"
                  className="w-full p-5 rounded-2xl bg-black/40 border border-[#FFD700]/30 text-white placeholder:text-white/20 focus:bg-black/60 focus:border-[#FFD700] outline-none transition-all shadow-inner" 
                  placeholder="example@mail.com" 
                  onChange={e => setForm({...form, email: e.target.value})} 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#FFD700] uppercase tracking-[0.3em] ml-2">Phone Number</label>
                <input 
                  required 
                  type="tel"
                  className="w-full p-5 rounded-2xl bg-black/40 border border-[#FFD700]/30 text-white placeholder:text-white/20 focus:bg-black/60 focus:border-[#FFD700] outline-none transition-all shadow-inner" 
                  placeholder="+91" 
                  onChange={e => setForm({...form, phone: e.target.value})} 
                />
              </div>
            </div>

            <button 
              disabled={loading} 
              className="w-full py-6 bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFD700] text-[#2D0A1B] rounded-full font-black text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_15px_40px_rgba(255,215,0,0.4)] disabled:opacity-50 uppercase tracking-widest border-b-4 border-[#B8860B]"
            >
              {loading ? 'Pranam...' : 'Generate Certificate'}
            </button>
          </form>
        </div>
      </div>

      <PreviewModal 
        name={form.name} 
        isOpen={showPreview} 
        onClose={() => setShowPreview(false)} 
        onConfirm={handleConfirm} 
      />
    </main>
  );
}