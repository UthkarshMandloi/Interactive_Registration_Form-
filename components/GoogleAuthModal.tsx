"use client";

import React, { useEffect, useState } from 'react';
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
  const [demoEmail, setDemoEmail] = useState('');
  const [demoError, setDemoError] = useState('');
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (isOpen && googleClientId && typeof window !== 'undefined') {
      const initGsi = () => {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: googleClientId,
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
          });

          const btnContainer = document.getElementById('gsi-button-container');
          if (btnContainer) {
            btnContainer.innerHTML = '';
            window.google.accounts.id.renderButton(btnContainer, {
              theme: 'outline',
              size: 'large',
              width: 280,
              text: 'continue_with',
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

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailToUse = demoEmail.trim() || 'volunteer.nss@gmail.com';
    if (!emailToUse.toLowerCase().endsWith('@gmail.com')) {
      setDemoError(t.status.errorGmailOnly);
      return;
    }
    onSuccess({
      email: emailToUse,
      name: 'NSS Volunteer',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Soft backdrop */}
      <div 
        className="absolute inset-0 bg-[#0B1B3D]/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Neumorphic Modal Card */}
      <div className="relative w-full max-w-md bg-[#e6edf5] rounded-3xl p-6 sm:p-8 neu-card shadow-[16px_16px_36px_#b8c5d6,-16px_-16px_36px_#ffffff] z-10 text-center border border-white/60">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-[#0B1B3D]/60 hover:text-[#D90429] w-8 h-8 rounded-full bg-[#e6edf5] flex items-center justify-center neu-knob text-sm font-bold transition"
        >
          ✕
        </button>

        {/* NSS Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-[#e6edf5] p-2 flex items-center justify-center neu-card shadow-[6px_6px_12px_#c2cfd6,-6px_-6px_12px_#ffffff]">
            <Image src="/R.png" alt="NSS Logo" width={48} height={48} className="object-contain" />
          </div>
        </div>

        <h3 className="text-xl font-black text-[#0B1B3D] tracking-wide mb-2">
          {t.authModal.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#475569] mb-6 leading-relaxed font-medium">
          {t.authModal.subtitle}
        </p>

        {/* Real Google GSI Container */}
        {googleClientId ? (
          <div className="flex justify-center my-4 min-h-[44px]">
            <div id="gsi-button-container"></div>
          </div>
        ) : null}

        {/* Fallback / Local Dev Demo Sign-In */}
        <div className="mt-4 pt-4 border-t border-[#c2cfd6]/40">
          {!googleClientId && (
            <p className="text-xs text-[#0B1B3D] mb-3 bg-[#FFB703]/20 p-2.5 rounded-xl border border-[#FFB703]/50 font-medium">
              {t.authModal.devBypassHint}
            </p>
          )}

          <form onSubmit={handleDemoSubmit} className="space-y-3">
            <div className="text-left">
              <label className="text-xs text-[#0B1B3D] font-bold mb-1 block">
                {t.authModal.googleButton} (Gmail):
              </label>
              <input 
                type="email" 
                value={demoEmail} 
                onChange={(e) => {
                  setDemoEmail(e.target.value);
                  setDemoError('');
                }}
                placeholder="your.email@gmail.com" 
                className="w-full px-4 py-3 rounded-2xl bg-[#e6edf5] neu-input text-[#0B1B3D] placeholder:text-[#475569]/50 text-sm outline-none"
              />
              {demoError && <p className="text-xs text-[#D90429] mt-1 font-bold">{demoError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#0B1B3D] to-[#162B56] text-white font-black text-xs uppercase tracking-wider rounded-2xl hover:scale-[1.01] active:scale-95 transition-all shadow-[6px_6px_14px_#c2cfd6,-6px_-6px_14px_#ffffff] cursor-pointer"
            >
              {googleClientId ? 'Sign in with Gmail' : t.authModal.devBypassButton}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
