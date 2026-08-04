"use client";

import React from 'react';
import Image from 'next/image';
import { TranslationSchema } from '@/lib/translations';

interface NssLogoLoaderProps {
  t: TranslationSchema;
  message?: string;
}

export default function NssLogoLoader({ t, message }: NssLogoLoaderProps) {
  return (
    <div className="bg-[#e6edf5] rounded-3xl p-8 sm:p-14 text-center neu-card shadow-[16px_16px_36px_#c2cfd6,-16px_-16px_36px_#ffffff] border border-white/80 max-w-lg mx-auto flex flex-col items-center justify-center my-6">
      
      {/* Separated High-Res NSS Emblem Container */}
      <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center mb-6">
        
        {/* Layer 1: Separated Outer Blue Ring (Hindi + English Text) - STATIC */}
        <div className="absolute inset-0 pointer-events-none drop-shadow-[0_10px_25px_rgba(11,27,61,0.25)]">
          <Image
            src="/nss_blue_ring.png"
            alt="NSS Outer Blue Ring"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Layer 2: Separated Inner Red Konark Rath Wheel - ROTATING (Slightly smaller for perfect alignment) */}
        <div className="absolute inset-0 p-[20%] pointer-events-none animate-spin-slow drop-shadow-[0_4px_15px_rgba(217,4,41,0.3)]">
          <Image
            src="/nss_red_wheel.png"
            alt="NSS Inner Red Konark Rath Wheel"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Title & Subtitle */}
      <h3 className="text-lg sm:text-xl font-black text-[#0B1B3D] tracking-wide mb-1">
        NSS IET DAVV
      </h3>
      <p className="text-xs sm:text-sm font-bold text-[#D90429] mb-4">
        {message || (t.header.orgTitle === 'NATIONAL SERVICE SCHEME (NSS)' ? 'Verifying registration status...' : 'पंजीकरण स्थिति की जाँच की जा रही है...')}
      </p>

      {/* Shimmering Loading Dots */}
      <div className="flex items-center space-x-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#0B1B3D] animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#D90429] animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFB703] animate-bounce" />
      </div>
    </div>
  );
}
