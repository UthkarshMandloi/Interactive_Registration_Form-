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
    <header className="w-full bg-[#e6edf5] border-b border-[#c2cfd6]/40 sticky top-0 z-40 backdrop-blur-md shadow-sm">
      
      {/* ========================================================================= */}
      {/* MOBILE PHONE VIEW (< sm screen sizes)                                    */}
      {/* ========================================================================= */}
      <div className="block sm:hidden px-3 py-2.5">
        {/* Mobile Top Tier: Logo & Branding + Capsule Language Toggle */}
        <div className="flex items-center justify-between gap-2 mb-2">
          {/* Logo & Title */}
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="relative w-9 h-9 rounded-xl bg-[#e6edf5] p-1 flex items-center justify-center neu-card shadow-[3px_3px_6px_#c2cfd6,-3px_-3px_6px_#ffffff] shrink-0">
              <Image 
                src="/R.png" 
                alt="NSS Logo" 
                width={36} 
                height={36} 
                className="object-contain"
                priority
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-xs font-black text-[#0B1B3D] tracking-wider uppercase leading-tight truncate">
                NSS IET DAVV
              </h1>
              <p className="text-[10px] text-[#D90429] font-bold tracking-wide truncate flex items-center gap-1.5">
                <span>{t.header.orgSubtitle}</span>
                <span className="bg-[#0B1B3D] text-[#FFB703] text-[9px] px-1.5 py-0.2 rounded font-black tracking-normal uppercase">
                  {t.header.sessionTag}
                </span>
              </p>
            </div>
          </div>

          {/* Capsule Language Switcher */}
          <button
            type="button"
            onClick={onToggleLang}
            className="relative w-20 h-8 rounded-full bg-[#e6edf5] p-0.5 flex items-center justify-between cursor-pointer neu-input focus:outline-none select-none transition-all shadow-[inset_3px_3px_6px_#c2cfd6,inset_-3px_-3px_6px_#ffffff] shrink-0"
            aria-label="Toggle Language English / Hindi"
            title="Switch Language"
          >
            {/* Sliding Circle Knob */}
            <div 
              className={`absolute top-0.5 bottom-0.5 w-[36px] rounded-full neu-knob transition-all duration-300 ease-out flex items-center justify-center border border-white/60 shadow-[2px_2px_5px_#b5c3d4,-2px_-2px_5px_#ffffff] ${
                lang === 'en' 
                  ? 'left-0.5 bg-gradient-to-br from-[#0B1B3D] to-[#162B56] text-[#FFB703]' 
                  : 'left-[calc(100%-38px)] bg-gradient-to-br from-[#D90429] to-[#9B001C] text-white'
              }`}
            >
              <span className="text-[10px] font-black tracking-wider uppercase">
                {lang === 'en' ? 'ENG' : 'HI'}
              </span>
            </div>

            {/* Background Labels inside Capsule */}
            <span className={`flex-1 text-center text-[9px] font-bold transition-colors ${lang === 'en' ? 'opacity-0' : 'text-[#0B1B3D]/70 pl-1'}`}>
              ENG
            </span>
            <span className={`flex-1 text-center text-[9px] font-bold transition-colors ${lang === 'hi' ? 'opacity-0' : 'text-[#0B1B3D]/70 pr-1'}`}>
              HI
            </span>
          </button>
        </div>

        {/* Mobile Bottom Tier: Dedicated Logged-In User Account Card */}
        {user && (
          <div className="flex items-center justify-between bg-[#e6edf5] px-3 py-1.5 rounded-xl text-xs font-semibold text-[#0B1B3D] neu-card shadow-[3px_3px_6px_#c2cfd6,-3px_-3px_6px_#ffffff] border border-white/50">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              {user.picture ? (
                <img src={user.picture} alt="Avatar" className="w-5 h-5 rounded-full border border-[#0B1B3D]/20 shrink-0" />
              ) : (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              )}
              <span className="truncate text-[11px] font-bold text-[#0B1B3D]">{user.email}</span>
            </div>
            <button 
              onClick={onSwitchAccount}
              className="text-[#D90429] hover:underline font-extrabold text-[10px] uppercase tracking-wider cursor-pointer whitespace-nowrap pl-2 border-l border-[#0B1B3D]/15 ml-2"
              title={t.header.switchAccount}
            >
              {t.header.switchAccount}
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP VIEW (>= sm screen sizes)                                        */}
      {/* ========================================================================= */}
      <div className="hidden sm:flex max-w-5xl mx-auto items-center justify-between gap-4 px-8 py-4">
        {/* Left Branding */}
        <div className="flex items-center space-x-4">
          <div className="relative w-14 h-14 rounded-2xl bg-[#e6edf5] p-2 flex items-center justify-center neu-card shadow-[6px_6px_12px_#c2cfd6,-6px_-6px_12px_#ffffff]">
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
            <h1 className="text-base font-black text-[#0B1B3D] tracking-wider uppercase leading-tight">
              {t.header.orgTitle}
            </h1>
            <div className="flex items-center gap-2">
              <p className="text-xs text-[#D90429] font-bold tracking-wide">
                {t.header.orgSubtitle}
              </p>
              <span className="bg-[#0B1B3D] text-[#FFB703] text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider shadow-sm">
                {t.header.sessionTag}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: User Info + Switch Account + Neumorphic Capsule Language Toggle */}
        <div className="flex items-center space-x-3">
          {user && (
            <div className="flex items-center space-x-2 bg-[#e6edf5] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0B1B3D] neu-card shadow-[4px_4px_8px_#c2cfd6,-4px_-4px_8px_#ffffff]">
              {user.picture ? (
                <img src={user.picture} alt="Avatar" className="w-5 h-5 rounded-full border border-[#0B1B3D]/20" />
              ) : (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              )}
              <span className="max-w-[140px] truncate text-xs font-medium">{user.email}</span>
              <button 
                onClick={onSwitchAccount}
                className="text-[#D90429] hover:underline font-bold pl-2 border-l border-[#0B1B3D]/20 text-xs uppercase tracking-wider cursor-pointer"
                title={t.header.switchAccount}
              >
                {t.header.switchAccount}
              </button>
            </div>
          )}

          {/* Neumorphic Capsule Language Switcher */}
          <button
            type="button"
            onClick={onToggleLang}
            className="relative w-28 h-11 rounded-full bg-[#e6edf5] p-1 flex items-center justify-between cursor-pointer neu-input focus:outline-none select-none transition-all shadow-[inset_4px_4px_8px_#c2cfd6,inset_-4px_-4px_8px_#ffffff]"
            aria-label="Toggle Language English / Hindi"
            title="Switch Language"
          >
            {/* Sliding Circle Knob */}
            <div 
              className={`absolute top-1 bottom-1 w-[50px] rounded-full neu-knob transition-all duration-300 ease-out flex items-center justify-center border border-white/60 shadow-[3px_3px_8px_#b5c3d4,-3px_-3px_8px_#ffffff] ${
                lang === 'en' 
                  ? 'left-1 bg-gradient-to-br from-[#0B1B3D] to-[#162B56] text-[#FFB703]' 
                  : 'left-[calc(100%-54px)] bg-gradient-to-br from-[#D90429] to-[#9B001C] text-white'
              }`}
            >
              <span className="text-xs font-black tracking-wider uppercase">
                {lang === 'en' ? 'ENG' : 'HI'}
              </span>
            </div>

            {/* Background Labels inside Capsule */}
            <span className={`flex-1 text-center text-xs font-bold transition-colors ${lang === 'en' ? 'opacity-0' : 'text-[#0B1B3D]/70 pl-1'}`}>
              ENG
            </span>
            <span className={`flex-1 text-center text-xs font-bold transition-colors ${lang === 'hi' ? 'opacity-0' : 'text-[#0B1B3D]/70 pr-1'}`}>
              HI
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
