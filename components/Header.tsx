"use client";

import React from 'react';
import Image from 'next/image';
import { Language, TranslationSchema } from '@/lib/translations';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  t: TranslationSchema;
  user: { email: string; name?: string; picture?: string } | null;
  onSwitchAccount: () => void;
}

export default function Header({ lang, onToggleLang, t, user, onSwitchAccount }: HeaderProps) {
  return (
    <header className="w-full py-4 px-4 sm:px-8 bg-[#e6edf5] border-b border-[#c2cfd6]/40 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Branding with NSS Logo R.png */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-[#e6edf5] p-2 flex items-center justify-center neu-card shadow-[6px_6px_12px_#c2cfd6,-6px_-6px_12px_#ffffff]">
            <Image 
              src="/R.png" 
              alt="NSS Logo" 
              width={48} 
              height={48} 
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-xs sm:text-base font-black text-[#0B1B3D] tracking-wider uppercase leading-tight">
              {t.header.orgTitle}
            </h1>
            <p className="text-[11px] sm:text-xs text-[#D90429] font-bold tracking-wide">
              {t.header.orgSubtitle}
            </p>
          </div>
        </div>

        {/* Right Section: User Info + Switch Account + Neumorphic Capsule Language Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {user && (
            <div className="flex items-center space-x-2 bg-[#e6edf5] px-3 py-1.5 rounded-full text-xs font-semibold text-[#0B1B3D] neu-card shadow-[4px_4px_8px_#c2cfd6,-4px_-4px_8px_#ffffff]">
              {user.picture ? (
                <img src={user.picture} alt="Avatar" className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-[#0B1B3D]/20" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              )}
              <span className="max-w-[100px] sm:max-w-[140px] truncate text-[11px] sm:text-xs">{user.email}</span>
              <button 
                onClick={onSwitchAccount}
                className="text-[#D90429] hover:underline font-bold pl-1.5 sm:pl-2 border-l border-[#0B1B3D]/20 text-[10px] sm:text-xs uppercase tracking-wider cursor-pointer"
                title={t.header.switchAccount}
              >
                {t.header.switchAccount}
              </button>
            </div>
          )}

          {/* Neumorphic Capsule Language Switcher (ENG / HI with sliding circle knob) */}
          <button
            type="button"
            onClick={onToggleLang}
            className="relative w-20 sm:w-28 h-9 sm:h-11 rounded-full bg-[#e6edf5] p-1 flex items-center justify-between cursor-pointer neu-input focus:outline-none select-none transition-all shadow-[inset_4px_4px_8px_#c2cfd6,inset_-4px_-4px_8px_#ffffff]"
            aria-label="Toggle Language English / Hindi"
            title="Switch Language"
          >
            {/* Sliding Circle Knob */}
            <div 
              className={`absolute top-1 bottom-1 w-[38px] sm:w-[50px] rounded-full neu-knob transition-all duration-300 ease-out flex items-center justify-center border border-white/60 shadow-[3px_3px_8px_#b5c3d4,-3px_-3px_8px_#ffffff] ${
                lang === 'en' 
                  ? 'left-1 bg-gradient-to-br from-[#0B1B3D] to-[#162B56] text-[#FFB703]' 
                  : 'left-[calc(100%-42px)] sm:left-[calc(100%-54px)] bg-gradient-to-br from-[#D90429] to-[#9B001C] text-white'
              }`}
            >
              <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase">
                {lang === 'en' ? 'ENG' : 'HI'}
              </span>
            </div>

            {/* Background Labels inside Capsule */}
            <span className={`flex-1 text-center text-[9px] sm:text-xs font-bold transition-colors ${lang === 'en' ? 'opacity-0' : 'text-[#0B1B3D]/70 pl-1'}`}>
              ENG
            </span>
            <span className={`flex-1 text-center text-[9px] sm:text-xs font-bold transition-colors ${lang === 'hi' ? 'opacity-0' : 'text-[#0B1B3D]/70 pr-1'}`}>
              HI
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
