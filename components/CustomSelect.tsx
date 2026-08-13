"use client";

import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
  placeholder: string;
  required?: boolean;
  onFocus?: () => void;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  required,
  onFocus,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = searchQuery.trim()
    ? options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase().trim()))
    : options;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && options.length > 8 && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen, options.length]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (onFocus) onFocus();
        }}
        className={`w-full p-4 pr-12 rounded-2xl bg-[#e6edf5] neu-input text-left text-sm font-semibold outline-none transition-all flex items-center justify-between cursor-pointer ${
          selectedOption ? 'text-[#0B1B3D]' : 'text-[#475569]/50'
        }`}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
          <div className={`w-8 h-8 rounded-xl bg-[#e6edf5] neu-knob flex items-center justify-center text-[#0B1B3D] transition-transform duration-200 shadow-[2px_2px_5px_#bac6d8,-2px_-2px_5px_#ffffff] ${isOpen ? 'rotate-180' : ''}`}>
            <svg className="w-4 h-4 text-[#0B1B3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Floating Custom Neumorphic Popup Menu */}
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 bg-[#e6edf5] rounded-2xl p-2 neu-card shadow-[12px_12px_28px_#b8c4d6,-12px_-12px_28px_#ffffff] border border-white/80 max-h-72 overflow-y-auto space-y-1">
          {options.length > 8 && (
            <div className="p-1 mb-1 sticky top-0 bg-[#e6edf5] z-10">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full p-2.5 rounded-xl bg-[#e6edf5] neu-input text-xs font-semibold text-[#0B1B3D] placeholder:text-[#475569]/50 outline-none"
              />
            </div>
          )}
          {filteredOptions.length === 0 ? (
            <div className="p-3 text-center text-xs font-medium text-[#475569]">
              No options found
            </div>
          ) : (
            filteredOptions.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`p-3 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#0B1B3D] text-[#FFB703] shadow-md'
                      : 'text-[#0B1B3D] hover:bg-[#d5e0ee] hover:text-[#D90429]'
                  }`}
                >
                  <span className="pr-2">{opt.label}</span>
                  {isSelected && (
                    <svg className="w-4 h-4 text-[#FFB703] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Hidden input for form validation */}
      {required && (
        <input
          type="text"
          value={value}
          onChange={() => {}}
          required
          tabIndex={-1}
          className="opacity-0 absolute inset-0 pointer-events-none -z-10"
        />
      )}
    </div>
  );
}
