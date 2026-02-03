"use client";
import React, { useRef, useEffect, useState } from 'react';

export default function PreviewModal({ name, isOpen, onClose, onConfirm }: { name: string, isOpen: boolean, onClose: () => void, onConfirm: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgUrl, setImgUrl] = useState("");

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
        
        // Exact positioning for your template
        ctx.font = "bold 85px sans-serif"; 
        ctx.fillStyle = "#111827"; // Clean dark slate
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(name.toUpperCase(), canvas.width / 2, canvas.height * 0.6);
        
        setImgUrl(canvas.toDataURL('image/png'));
      };
    }
  }, [isOpen, name]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md p-4">
      <div className="bg-white rounded-[40px] p-8 max-w-3xl w-full shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Verify Your Certificate</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition">✕</button>
        </div>
        
        <canvas ref={canvasRef} className="hidden" />
        
        <div className="rounded-2xl overflow-hidden border border-gray-100 mb-8 shadow-sm">
          {imgUrl && <img src={imgUrl} alt="Preview" className="w-full h-auto" />}
        </div>
        
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-4 rounded-xl font-bold bg-gray-50 text-gray-500 hover:bg-gray-100 transition">Back to Edit</button>
          <a href={imgUrl} download={`${name}_Certificate.png`} onClick={onConfirm} className="flex-1 py-4 rounded-xl font-bold bg-[#1A1A1A] text-white text-center hover:shadow-xl transition">Confirm & Download</a>
        </div>
      </div>
    </div>
  );
}