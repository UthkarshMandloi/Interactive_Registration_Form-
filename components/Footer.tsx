"use client";

import React from 'react';
import { TranslationSchema } from '@/lib/translations';

interface FooterProps {
  t: TranslationSchema;
}

export default function Footer({ t }: FooterProps) {
  return (
    <footer className="w-full py-6 px-4 bg-[#e6edf5] border-t border-[#c2cfd6]/40 text-center text-xs text-[#475569] font-medium mt-auto">
      <div className="max-w-4xl mx-auto space-y-2">
        <p className="font-bold text-[#0B1B3D]">
          © {new Date().getFullYear()} {t.footer.copyright}
        </p>
        <p className="text-[11px] sm:text-xs">
          {t.footer.contactPrefix}{' '}
          <a
            href={`mailto:${t.footer.adminEmail}`}
            className="text-[#D90429] font-bold hover:underline"
          >
            {t.footer.adminEmail}
          </a>
        </p>
      </div>
    </footer>
  );
}
