"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { TranslationSchema } from '@/lib/translations';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { email: string; name?: string; picture?: string }) => void;
  t: TranslationSchema;
}

declare global {
  interface Window {
    google?: any;
  }
}

export default function GoogleAuthModal({ isOpen, onClose, onSuccess, t }: GoogleAuthModalProps) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      const initGsi = () => {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: googleClientId || "667102780022-vtqhifuvuvisji69e2ofjkul8nb60vvi.apps.googleusercontent.com",
            callback: (response: any) => {
              try {
                const base64Url = response.credential.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(
                  atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
                );
                const payload = JSON.parse(jsonPayload);
                onSuccess({
                  email: payload.email,
                  name: payload.name,
                  picture: payload.picture,
                });
              } catch (e) {
                console.error("Failed to parse Google JWT", e);
              }
            },
            auto_select: true,
          });

          // Automatically prompt One-Tap on mobile & desktop Chrome
          window.google.accounts.id.prompt();

          const btnContainer = document.getElementById('gsi-button-container');
          if (btnContainer) {
            btnContainer.innerHTML = '';
            window.google.accounts.id.renderButton(btnContainer, {
              theme: 'filled_blue',
              size: 'large',
              width: 280,
              text: 'continue_with',
              shape: 'pill',
            });
          }
        }
      };

      if (!window.google) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = initGsi;
        document.body.appendChild(script);
      } else {
        initGsi();
      }
    }
  }, [isOpen, googleClientId, onSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Soft backdrop */}
      <div 
        className="absolute inset-0 bg-[#0B1B3D]/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Neumorphic Direct Google Login Modal Card */}
      <div className="relative w-full max-w-sm bg-[#e6edf5] rounded-3xl p-6 sm:p-8 neu-card shadow-[16px_16px_36px_#b8c5d6,-16px_-16px_36px_#ffffff] z-10 text-center border border-white/80">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-[#0B1B3D]/60 hover:text-[#D90429] w-8 h-8 rounded-full bg-[#e6edf5] flex items-center justify-center neu-knob text-sm font-bold transition cursor-pointer"
        >
          ✕
        </button>

        {/* NSS Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-[#e6edf5] p-2 flex items-center justify-center neu-card shadow-[6px_6px_12px_#c2cfd6,-6px_-6px_12px_#ffffff]">
            <Image src="/R.png" alt="NSS Logo" width={48} height={48} className="object-contain" priority />
          </div>
        </div>

        <h3 className="text-xl font-black text-[#0B1B3D] tracking-wide mb-2">
          {t.authModal.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#475569] mb-6 leading-relaxed font-medium">
          {t.authModal.subtitle}
        </p>

        {/* Direct Google Login Button */}
        <div className="flex justify-center my-4 min-h-[44px]">
          <div id="gsi-button-container"></div>
        </div>
      </div>
    </div>
  );
}
