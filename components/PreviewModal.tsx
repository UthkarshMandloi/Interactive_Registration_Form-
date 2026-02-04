"use client";
import React, { useRef, useEffect, useState } from 'react';

interface PreviewProps {
  name: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function PreviewModal({ name, isOpen, onClose, onConfirm }: PreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgUrl, setImgUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen && name) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const img = new Image();
      img.src = '/template.png';
      img.onload = () => {
        if (!canvas || !ctx) return;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // Traditional style: High-contrast Dark Maroon text for the certificate
        ctx.font = "bold 65px sans-serif"; 
        ctx.fillStyle = "#2D1B22"; 
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(name.toUpperCase(), canvas.width / 2, canvas.height * 0.6);
        
        setImgUrl(canvas.toDataURL('image/png'));
      };
    }
  }, [isOpen, name]);

  const handleDownload = async () => {
    setIsSaving(true);
    try {
      await onConfirm(); // Syncs with Google Sheets API
      const link = document.createElement('a');
      link.href = imgUrl;
      link.download = `${name}_YuvaMahotsav_Certificate.png`;
      link.click();
      onClose();
    } catch (err) {
      alert("Error saving your details. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
      {/* 1. Backdrop using the Deep Wine color to match the landing page theme */}
      <div className="absolute inset-0 bg-[#2D0A1B]/95 backdrop-blur-xl" />
      
      {/* 2. Decorative Golden Glow behind the modal */}
      <div className="absolute w-[500px] h-[500px] bg-[#FFD700]/10 blur-[120px] rounded-full animate-pulse" />
      
      <div className="relative bg-[#3D0A1B] rounded-[50px] p-6 md:p-10 max-w-3xl w-full shadow-[0_0_80px_rgba(0,0,0,0.8)] border-2 border-[#FFD700]/30">
        
        {/* Header with Traditional Typography */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-black text-[#FFD700] italic tracking-widest uppercase">
              पूर्वावलोकन
            </h2>
            <p className="text-white/40 text-xs uppercase tracking-[0.2em]">Certificate Preview</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-[#FFD700] hover:bg-white/10 transition border border-[#FFD700]/20"
          >
            ✕
          </button>
        </div>
        
        <canvas ref={canvasRef} className="hidden" />
        
        {/* 3. Framed Certificate Preview */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-[#FFD700]/40 mb-10 shadow-inner bg-black/20">
          <div className="absolute inset-0 border-[12px] border-transparent pointer-events-none" />
          {imgUrl ? (
            <img src={imgUrl} alt="Preview" className="w-full h-auto" />
          ) : (
            <div className="aspect-[1.414/1] flex items-center justify-center text-[#FFD700]/30 animate-pulse">
              Generating Preview...
            </div>
          )}
        </div>
        
        {/* 4. Action Buttons with Gold Gradient */}
        <div className="flex flex-col sm:flex-row gap-5">
          <button 
            onClick={onClose} 
            className="flex-1 py-5 rounded-full font-bold border-2 border-[#FFD700]/20 text-[#FFD700]/60 hover:text-[#FFD700] hover:bg-[#FFD700]/5 transition-all uppercase tracking-widest text-xs"
          >
            वापस जाएं (Edit)
          </button>
          
          <button 
            onClick={handleDownload}
            disabled={isSaving}
            className="flex-1 py-5 rounded-full font-black bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFD700] text-[#2D0A1B] shadow-[0_15px_40px_rgba(255,215,0,0.3)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 uppercase tracking-widest text-xs border-b-4 border-[#B8860B]"
          >
            {isSaving ? 'प्रतीक्षा करें...' : 'पुष्टि और डाउनलोड'}
          </button>
        </div>

        {/* Traditional Border Accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#FFD700]/40 rounded-tl-xl" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#FFD700]/40 rounded-tr-xl" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#FFD700]/40 rounded-bl-xl" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#FFD700]/40 rounded-br-xl" />
      </div>
    </div>
  );
}