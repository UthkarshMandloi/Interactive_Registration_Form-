"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleAuthModal from '@/components/GoogleAuthModal';
import NssLogoLoader from '@/components/NssLogoLoader';
import CustomSelect from '@/components/CustomSelect';
import { translations, Language } from '@/lib/translations';

interface UserSession {
  email: string;
  name?: string;
  picture?: string;
}

export default function RegistrationPage() {
  const [lang, setLang] = useState<Language>('en');
  const [user, setUser] = useState<UserSession | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'checking' | 'submitting' | 'success' | 'already_submitted'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [draftSaved, setDraftSaved] = useState(false);

  const showNssRegNo = process.env.NEXT_PUBLIC_SHOW_NSS_REG_NO === 'true';

  const [form, setForm] = useState({
    nssRegNo: '',
    name: '',
    year: '',
    category: '',
    branch: '',
    fatherName: '',
    dob: '',
    gender: '',
    contactNo: '',
    email: '',
    bloodGroup: '',
    address: '',
  });

  const t = translations[lang];
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto check session from localStorage on mount & auto-prompt Google login on phone/Chrome
  useEffect(() => {
    const savedUser = localStorage.getItem('nss_user_session');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        checkSubmissionStatusAndLoadDraft(parsed.email);
      } catch (e) {
        localStorage.removeItem('nss_user_session');
      }
    } else {
      setIsAuthModalOpen(true);
    }
  }, []);

  // Sync Google Auth email into form email field
  useEffect(() => {
    if (user?.email) {
      setForm((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  // Debounced Autosave (Local & Cloud across devices)
  useEffect(() => {
    if (!user?.email || status === 'success' || status === 'already_submitted') return;

    const hasData = Object.entries(form).some(([key, val]) => key !== 'email' && Boolean(val.trim()));
    if (!hasData) return;

    localStorage.setItem(`nss_draft_${user.email}`, JSON.stringify(form));
    setDraftSaved(true);

    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(() => {
      fetch('/api/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, draftData: form }),
      }).catch((err) => console.error('Cloud draft autosave error:', err));
    }, 1500);

    return () => {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    };
  }, [form, user, status]);

  const checkSubmissionStatusAndLoadDraft = async (email: string) => {
    setStatus('checking');
    try {
      const res = await fetch(`/api/check-submission?email=${encodeURIComponent(email)}`);
      const data = await res.json();

      if (data.submitted) {
        setStatus('already_submitted');
        return;
      }

      // Load draft from localStorage first (fast)
      const localDraft = localStorage.getItem(`nss_draft_${email}`);
      if (localDraft) {
        try {
          const parsedLocal = JSON.parse(localDraft);
          setForm((prev) => ({ ...prev, ...parsedLocal, email }));
        } catch (e) {}
      }

      // Fetch saved draft from Cloud Google Sheet
      const draftRes = await fetch(`/api/draft?email=${encodeURIComponent(email)}`);
      const draftData = await draftRes.json();
      if (draftData.draft) {
        setForm((prev) => ({
          ...prev,
          ...draftData.draft,
          email,
        }));
        localStorage.setItem(`nss_draft_${email}`, JSON.stringify(draftData.draft));
      }
      
      setStatus('idle');
    } catch (err) {
      console.error('Failed to check submission or load draft', err);
      setStatus('idle');
    }
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleFieldInteraction = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    }
  };

  const handleGoogleSuccess = (userData: UserSession) => {
    setUser(userData);
    localStorage.setItem('nss_user_session', JSON.stringify(userData));
    setIsAuthModalOpen(false);
    checkSubmissionStatusAndLoadDraft(userData.email);
  };

  const handleSwitchAccount = () => {
    setIsAuthModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const cleanPhone = form.contactNo.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMessage(t.status.errorPhoneDigits);
      return;
    }

    if (!form.email.toLowerCase().trim().endsWith('@gmail.com')) {
      setErrorMessage(t.status.errorGmailOnly);
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          googleEmail: user.email,
          nssRegNo: form.nssRegNo,
          name: form.name,
          year: form.year,
          category: form.category,
          branch: form.branch,
          fatherName: form.fatherName,
          dob: form.dob,
          gender: form.gender,
          contactNo: cleanPhone,
          email: form.email,
          bloodGroup: form.bloodGroup,
          address: form.address,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        localStorage.removeItem(`nss_draft_${user.email}`);
        fetch(`/api/draft?email=${encodeURIComponent(user.email)}`, { method: 'DELETE' }).catch(() => {});
      } else if (res.status === 409 || data.error === 'ALREADY_SUBMITTED') {
        setStatus('already_submitted');
      } else {
        setErrorMessage(data.error || t.status.errorGeneral);
        setStatus('idle');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(t.status.errorGeneral);
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#e6edf5] text-[#0B1B3D] selection:bg-[#0B1B3D] selection:text-white">
      
      {/* Top Header */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        t={t}
        user={user}
        onSwitchAccount={handleSwitchAccount}
      />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:px-8 sm:py-10 flex flex-col justify-center">
        
        {/* Banner Section */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-block p-4 sm:p-5 rounded-3xl bg-[#e6edf5] neu-card shadow-[10px_10px_20px_#c2cfd6,-10px_-10px_20px_#ffffff] mb-5">
            <Image
              src="/R.png"
              alt="NSS Logo"
              width={96}
              height={96}
              className="object-contain w-16 h-16 sm:w-24 sm:h-24 mx-auto"
              priority
            />
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0B1B3D] tracking-tight uppercase leading-tight mb-2">
            {t.header.orgTitle}
          </h1>
          <h2 className="text-base sm:text-2xl font-black text-[#D90429] tracking-wide mb-2">
            {t.header.orgSubtitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] max-w-lg mx-auto font-medium">
            {t.header.formSubtitle}
          </p>
        </div>

        {/* Animated NSS Logo Loader during checking / initial fetch */}
        {status === 'checking' ? (
          <NssLogoLoader t={t} />
        ) : status === 'success' ? (
          /* Status Screen: Success */
          <div className="bg-[#e6edf5] rounded-3xl p-6 sm:p-12 text-center neu-card shadow-[16px_16px_36px_#c2cfd6,-16px_-16px_36px_#ffffff] border border-white/80">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 neu-knob">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0B1B3D] mb-3">
              {t.status.successTitle}
            </h3>
            <p className="text-sm sm:text-lg text-[#475569] max-w-lg mx-auto leading-relaxed mb-8 font-medium">
              {t.status.successMsg}
            </p>
            <div className="p-4 rounded-2xl bg-[#e6edf5] neu-input text-xs font-bold text-[#0B1B3D] max-w-xs mx-auto">
              NSS (National Service Scheme), IET DAVV
            </div>
          </div>
        ) : status === 'already_submitted' ? (
          /* Status Screen: Already Submitted */
          <div className="bg-[#e6edf5] rounded-3xl p-6 sm:p-12 text-center neu-card shadow-[16px_16px_36px_#c2cfd6,-16px_-16px_36px_#ffffff] border border-white/80">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 neu-knob">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0B1B3D] mb-3">
              {t.status.alreadySubmittedTitle}
            </h3>
            <p className="text-sm sm:text-base text-[#475569] max-w-lg mx-auto leading-relaxed mb-8 font-medium">
              {t.status.alreadySubmittedMsg}
            </p>
            <button
              onClick={handleSwitchAccount}
              className="px-6 py-3 rounded-full bg-[#0B1B3D] text-white text-xs uppercase tracking-widest font-black transition neu-btn-primary cursor-pointer"
            >
              {t.status.switchAccountBtn}
            </button>
          </div>
        ) : (
          /* Main Neumorphic Registration Form Card */
          <div className="bg-[#e6edf5] p-6 sm:p-10 rounded-3xl neu-card shadow-[18px_18px_40px_#beccd9,-18px_-18px_40px_#ffffff] border border-white/80 relative">
            
            {!user ? (
              <div 
                onClick={() => setIsAuthModalOpen(true)}
                className="mb-6 p-4 rounded-2xl bg-[#e6edf5] neu-card shadow-[6px_6px_12px_#c2cfd6,-6px_-6px_12px_#ffffff] border border-[#FFB703]/80 flex items-center justify-between cursor-pointer hover:scale-[1.01] transition group"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-3 h-3 rounded-full bg-[#D90429] animate-ping" />
                  <p className="text-xs sm:text-sm font-bold text-[#0B1B3D]">
                    {t.header.loginRequiredNotice}
                  </p>
                </div>
                <span className="text-xs bg-[#0B1B3D] text-[#FFB703] px-3.5 py-1.5 rounded-full font-black uppercase tracking-wider group-hover:scale-105 transition shadow-sm">
                  Login
                </span>
              </div>
            ) : draftSaved ? (
              <div className="mb-6 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Draft auto-saved across devices</span>
                </div>
                <span className="text-[10px] text-emerald-600/80 font-normal">Synced with Google Account</span>
              </div>
            ) : null}

            {/* General Error Message Alert */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-[#D90429]/10 border border-[#D90429]/30 text-[#D90429] text-xs sm:text-sm font-bold flex items-center space-x-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* NSS Registration Number */}
                {showNssRegNo && (
                  <div className="space-y-2 md:col-span-2">
                    <div className="flex items-center space-x-2">
                      <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                        {t.form.nssRegNoLabel}
                      </label>
                      <span className="text-[10px] font-bold text-[#475569] bg-[#c2cfd6]/40 px-2 py-0.5 rounded-full select-none">
                        {t.form.nssRegNoBadge}
                      </span>
                      <div className="relative group inline-flex items-center">
                        <button
                          type="button"
                          aria-label="NSS Reg No Info"
                          className="w-5 h-5 rounded-full bg-[#e6edf5] neu-knob flex items-center justify-center text-[#0B1B3D] hover:text-[#D90429] transition text-xs font-bold focus:outline-none"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                        {/* Tooltip Popup on Hover */}
                        <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 hidden group-hover:block group-focus-within:block w-64 p-3 bg-[#0B1B3D] text-white text-[11px] font-medium rounded-xl shadow-xl z-30 text-center leading-relaxed">
                          {t.form.nssRegNoTooltip}
                          <div className="absolute top-full left-4 sm:left-1/2 sm:-translate-x-1/2 border-4 border-transparent border-t-[#0B1B3D]" />
                        </div>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={form.nssRegNo}
                      onFocus={handleFieldInteraction}
                      onChange={(e) => setForm({ ...form, nssRegNo: e.target.value })}
                      placeholder={t.form.nssRegNoPlaceholder}
                      className="w-full p-4 rounded-2xl bg-[#e6edf5] neu-input text-[#0B1B3D] placeholder:text-[#475569]/40 outline-none text-sm font-medium"
                    />
                  </div>
                )}

                {/* Name Of Volunteer */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.nameLabel} <span className="text-[#D90429]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onFocus={handleFieldInteraction}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t.form.namePlaceholder}
                    className="w-full p-4 rounded-2xl bg-[#e6edf5] neu-input text-[#0B1B3D] placeholder:text-[#475569]/40 outline-none text-sm font-medium"
                  />
                </div>

                {/* Year Dropdown */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.yearLabel} <span className="text-[#D90429]">*</span>
                  </label>
                  <CustomSelect
                    required
                    value={form.year}
                    onChange={(val) => setForm({ ...form, year: val })}
                    options={t.options.years}
                    placeholder={t.form.yearPlaceholder}
                    onFocus={handleFieldInteraction}
                  />
                </div>

                {/* Category Dropdown */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.categoryLabel} <span className="text-[#D90429]">*</span>
                  </label>
                  <CustomSelect
                    required
                    value={form.category}
                    onChange={(val) => setForm({ ...form, category: val })}
                    options={t.options.categories}
                    placeholder={t.form.categoryPlaceholder}
                    onFocus={handleFieldInteraction}
                  />
                </div>

                {/* Branch Input */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.branchLabel} <span className="text-[#D90429]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={form.branch}
                    onFocus={handleFieldInteraction}
                    onChange={(e) => setForm({ ...form, branch: e.target.value })}
                    placeholder={t.form.branchPlaceholder}
                    className="w-full p-4 rounded-2xl bg-[#e6edf5] neu-input text-[#0B1B3D] placeholder:text-[#475569]/40 outline-none text-sm font-medium"
                  />
                </div>

                {/* Father's Name */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.fatherNameLabel} <span className="text-[#D90429]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={form.fatherName}
                    onFocus={handleFieldInteraction}
                    onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
                    placeholder={t.form.fatherNamePlaceholder}
                    className="w-full p-4 rounded-2xl bg-[#e6edf5] neu-input text-[#0B1B3D] placeholder:text-[#475569]/40 outline-none text-sm font-medium"
                  />
                </div>

                {/* DOB (Clean Neumorphic Datepicker) */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.dobLabel} <span className="text-[#D90429]">*</span>
                  </label>
                  <input
                    required
                    type="date"
                    value={form.dob}
                    onFocus={handleFieldInteraction}
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                    className="w-full p-4 rounded-2xl bg-[#e6edf5] neu-input text-[#0B1B3D] outline-none text-sm font-semibold cursor-pointer"
                  />
                </div>

                {/* Gender Dropdown */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.genderLabel} <span className="text-[#D90429]">*</span>
                  </label>
                  <CustomSelect
                    required
                    value={form.gender}
                    onChange={(val) => setForm({ ...form, gender: val })}
                    options={t.options.genders}
                    placeholder={t.form.genderPlaceholder}
                    onFocus={handleFieldInteraction}
                  />
                </div>

                {/* Contact Number (+91 visual prefix, 10 digit input) */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.contactLabel} <span className="text-[#D90429]">*</span>
                  </label>
                  <div className="flex items-center rounded-2xl bg-[#e6edf5] neu-input overflow-hidden">
                    <span className="px-4 py-4 text-sm font-black text-[#0B1B3D] border-r border-[#c2cfd6]/50 bg-[#c2cfd6]/20 select-none">
                      +91
                    </span>
                    <input
                      required
                      type="tel"
                      maxLength={10}
                      value={form.contactNo}
                      onFocus={handleFieldInteraction}
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D/g, '');
                        setForm({ ...form, contactNo: digitsOnly });
                      }}
                      placeholder={t.form.contactPlaceholder}
                      className="w-full p-4 bg-transparent text-[#0B1B3D] placeholder:text-[#475569]/40 outline-none text-sm font-medium"
                    />
                  </div>
                  <p className="text-[11px] text-[#475569] font-medium ml-1">{t.form.contactNote}</p>
                </div>

                {/* Email Address (Gmail Only) */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.emailLabel} <span className="text-[#D90429]">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onFocus={handleFieldInteraction}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t.form.emailPlaceholder}
                    className="w-full p-4 rounded-2xl bg-[#e6edf5] neu-input text-[#0B1B3D] placeholder:text-[#475569]/40 outline-none text-sm font-medium"
                  />
                  <p className="text-[11px] text-[#475569] font-medium ml-1">{t.form.emailNote}</p>
                </div>

                {/* Blood Group (Optional Dropdown) */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.bloodGroupLabel}
                  </label>
                  <CustomSelect
                    value={form.bloodGroup}
                    onChange={(val) => setForm({ ...form, bloodGroup: val })}
                    options={t.options.bloodGroups}
                    placeholder={t.form.bloodGroupPlaceholder}
                    onFocus={handleFieldInteraction}
                  />
                </div>

                {/* Current Address */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider ml-1">
                    {t.form.addressLabel} <span className="text-[#D90429]">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={form.address}
                    onFocus={handleFieldInteraction}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder={t.form.addressPlaceholder}
                    className="w-full p-4 rounded-2xl bg-[#e6edf5] neu-input text-[#0B1B3D] placeholder:text-[#475569]/40 outline-none text-sm font-medium resize-y"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-5 text-white font-black text-base sm:text-lg uppercase tracking-widest rounded-full neu-btn-primary cursor-pointer mt-4 flex items-center justify-center space-x-2"
              >
                {status === 'submitting' ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t.form.submittingButton}</span>
                  </div>
                ) : (
                  <span>{t.form.submitButton}</span>
                )}
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer t={t} />

      {/* Google Auth Intercept Popup */}
      <GoogleAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleGoogleSuccess}
        t={t}
      />
    </div>
  );
}