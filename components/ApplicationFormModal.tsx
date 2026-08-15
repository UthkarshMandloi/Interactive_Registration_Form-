"use client";

import React from 'react';
import Image from 'next/image';

export interface ApplicationFormData {
  institute?: string;
  nssRegNo?: string;
  name: string;
  course?: string;
  year: string;
  category: string;
  branch: string;
  fatherName: string;
  motherName?: string;
  dob: string;
  gender: string;
  contactNo: string;
  email: string;
  bloodGroup?: string;
  height?: string;
  address?: string;
  interests?: string;
  interestedVertical?: string;
  nssCertificate?: string;
}

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ApplicationFormData;
}

export default function ApplicationFormModal({ isOpen, onClose, data }: ApplicationFormModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const isMale = data.gender?.toLowerCase() === 'male' || data.gender?.toLowerCase() === 'पुरुष';
  const isFemale = data.gender?.toLowerCase() === 'female' || data.gender?.toLowerCase() === 'महिला';

  const catUpper = (data.category || '').toUpperCase();
  const isGeneral = catUpper.includes('GEN') || catUpper.includes('GENERAL') || catUpper.includes('सामान्य');
  const isSC = catUpper.includes('SC') || catUpper.includes('अनुसूचित जाति');
  const isST = catUpper.includes('ST') || catUpper.includes('अनुसूचित जनजाति');
  const isOBC = catUpper.includes('OBC') || catUpper.includes('पिछड़ा');
  const isMinority = catUpper.includes('MINORITY') || catUpper.includes('अल्पसंख्यक');

  const interestsStr = (data.interests || '').toLowerCase();
  const isSinging = interestsStr.includes('singing') || interestsStr.includes('गायन');
  const isDancing = interestsStr.includes('dancing') || interestsStr.includes('नृत्य');
  const isSpeech = interestsStr.includes('speech') || interestsStr.includes('भाषण');
  const isSocialService = interestsStr.includes('social') || interestsStr.includes('समाजसेवा');
  const isOtherInterest = interestsStr.includes('other') || interestsStr.includes('अन्य');

  const certUpper = (data.nssCertificate || '').toUpperCase().trim();
  const hasCertA = /\bA\b/.test(certUpper);
  const hasCertB = /\bB\b/.test(certUpper);
  const hasCertC = /\bC\b/.test(certUpper);
  const hasCertNone = certUpper === 'NONE' || certUpper === 'नहीं' || certUpper.includes('NONE') || certUpper.includes('नहीं') || (!hasCertA && !hasCertB && !hasCertC);

  const formattedDob = data.dob
    ? new Date(data.dob).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '';

  const courseDisplay = data.course === 'UG' 
    ? 'UG (B.Tech / B.Des)' 
    : data.course === 'PG' 
    ? 'PG (M.Tech)' 
    : data.course || '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto bg-black/70 backdrop-blur-sm print-modal-backdrop">
      
      {/* Embedded Print CSS Rules */}
      <style>{`
        @page {
          size: A4 portrait;
          margin: 0 !important;
        }
        @media print {
          /* Hide non-printable website elements */
          header, footer, main, .no-print {
            display: none !important;
          }
          
          /* Prepare page container */
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #000000 !important;
            width: 100% !important;
            height: auto !important;
            overflow: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Convert modal overlay into static container for print */
          .print-modal-backdrop {
            position: static !important;
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
            display: block !important;
            width: 100% !important;
            height: auto !important;
          }

          .print-modal-container {
            position: static !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            background: #ffffff !important;
          }

          #nss-application-form-print-area {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            min-height: 277mm !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 8mm 12mm !important;
            box-sizing: border-box !important;
            background: #ffffff !important;
            color: #000000 !important;
          }
        }
      `}</style>

      {/* Container Card */}
      <div className="relative bg-white text-black w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-auto print-modal-container">
        
        {/* Top Control Bar (Hidden during print) */}
        <div className="no-print bg-[#0B1B3D] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#D90429] flex items-center justify-center font-bold text-xs">
              NSS
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">DAVV NSS Application Form (Session 2026-27)</h3>
              <p className="text-xs text-white/70">राष्ट्रीय सेवा योजना में प्रवेश हेतु आवेदन पत्र (सत्र 2026-27)</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#D90429] hover:bg-[#b00320] text-white rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shadow-md cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Download PDF / Print</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer text-sm font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Printable Form Content */}
        <div id="nss-application-form-print-area" className="p-6 sm:p-10 font-serif text-black bg-white flex flex-col justify-between min-h-[750px]">
          
          <div>
            {/* Form Header */}
            <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-4">
              {/* Left NSS Emblem */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/R.png"
                  alt="NSS Emblem"
                  width={72}
                  height={72}
                  className="object-contain w-14 h-14 sm:w-18 sm:h-18"
                />
              </div>

              {/* Center Heading */}
              <div className="text-center flex-1 px-2">
                <h1 className="text-lg sm:text-xl font-black text-black mb-0.5 font-sans tracking-wide">
                  राष्ट्रीय सेवा योजना
                </h1>
                <h2 className="text-sm sm:text-base font-bold text-black mb-0.5 font-sans">
                  देवी अहिल्या विश्वविद्यालय, इंदौर (DAVV)
                </h2>
                <p className="text-xs sm:text-xs font-bold text-black font-sans">
                  विद्यार्थियों के लिए राष्ट्रीय सेवा योजना में प्रवेश हेतु आवेदन पत्र (सत्र 2026-27)
                </p>
              </div>

              {/* Right DAVV Emblem */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/davv_logo.png"
                  alt="DAVV Emblem"
                  width={72}
                  height={72}
                  className="object-contain w-14 h-14 sm:w-18 sm:h-18"
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-[13px] font-medium leading-relaxed">
              
              {/* 1. Institution Name */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">1. संस्था का नाम:</span>
                <span className="flex-1 border-b border-black px-1 font-semibold text-black">
                  {data.institute || "Institute of Engineering & Technology (IET DAVV), Indore"}
                </span>
              </div>

              {/* 2. Student Name */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">2. विद्यार्थी का नाम:</span>
                <span className="flex-1 border-b border-black px-1 font-semibold text-black uppercase tracking-wider">
                  {data.name}
                </span>
              </div>

              {/* 3. Father's Name */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">3. पिता का नाम:</span>
                <span className="flex-1 border-b border-black px-1 font-semibold text-black uppercase">
                  {data.fatherName}
                </span>
              </div>

              {/* 4. Mother's Name */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">4. माता का नाम:</span>
                <span className="flex-1 border-b border-black px-1 font-semibold text-black uppercase">
                  {data.motherName}
                </span>
              </div>

              {/* 5. Date of Birth */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">5. जन्म तिथि:</span>
                <span className="flex-1 border-b border-black px-1 font-semibold text-black">
                  {formattedDob || data.dob}
                </span>
              </div>

              {/* 6. Gender */}
              <div className="flex items-center flex-wrap gap-4">
                <span className="font-bold min-w-[145px] text-black">6. लिंग (Gender):</span>
                <div className="flex items-center space-x-6">
                  <label className="inline-flex items-center space-x-1.5">
                    <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] font-bold ${isMale ? 'bg-black text-white' : ''}`}>
                      {isMale ? '✓' : ''}
                    </span>
                    <span>पुरुष (Male)</span>
                  </label>
                  <label className="inline-flex items-center space-x-1.5">
                    <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] font-bold ${isFemale ? 'bg-black text-white' : ''}`}>
                      {isFemale ? '✓' : ''}
                    </span>
                    <span>महिला (Female)</span>
                  </label>
                </div>
              </div>

              {/* 7. Category */}
              <div className="space-y-1">
                <div className="flex items-start flex-wrap gap-x-4 gap-y-1">
                  <span className="font-bold min-w-[145px] text-black">7. जाति वर्ग (Category):</span>
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap gap-x-5 gap-y-1">
                      <label className="inline-flex items-center space-x-1.5">
                        <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] font-bold ${isGeneral ? 'bg-black text-white' : ''}`}>
                          {isGeneral ? '✓' : ''}
                        </span>
                        <span>सामान्य (General)</span>
                      </label>
                      <label className="inline-flex items-center space-x-1.5">
                        <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] font-bold ${isSC ? 'bg-black text-white' : ''}`}>
                          {isSC ? '✓' : ''}
                        </span>
                        <span>अनुसूचित जाति (SC)</span>
                      </label>
                      <label className="inline-flex items-center space-x-1.5">
                        <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] font-bold ${isST ? 'bg-black text-white' : ''}`}>
                          {isST ? '✓' : ''}
                        </span>
                        <span>अनुसूचित जनजाति (ST)</span>
                      </label>
                    </div>
                    <div className="flex flex-wrap gap-x-5 gap-y-1">
                      <label className="inline-flex items-center space-x-1.5">
                        <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] font-bold ${isOBC ? 'bg-black text-white' : ''}`}>
                          {isOBC ? '✓' : ''}
                        </span>
                        <span>पिछड़ा वर्ग (OBC)</span>
                      </label>
                      <label className="inline-flex items-center space-x-1.5">
                        <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] font-bold ${isMinority ? 'bg-black text-white' : ''}`}>
                          {isMinority ? '✓' : ''}
                        </span>
                        <span>अल्पसंख्यक (Minority)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* 8. Class / Branch */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">8. कक्षा / शाखा:</span>
                <span className="flex-1 border-b border-black px-1 font-semibold text-black">
                  {data.branch}
                </span>
              </div>

              {/* 9. Semester / Year */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">9. सेमेस्टर, वर्ष:</span>
                <span className="flex-1 border-b border-black px-1 font-semibold text-black">
                  {data.year}
                </span>
              </div>

              {/* 10. Mobile Number */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">10. मोबाइल नम्बर:</span>
                <span className="flex-1 border-b border-black px-1 font-semibold text-black">
                  +91 {data.contactNo}
                </span>
              </div>

              {/* 11. Email ID */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">11. ई-मेल आई.डी.:</span>
                <span className="flex-1 border-b border-black px-1 font-semibold text-black">
                  {data.email}
                </span>
              </div>

              {/* 12. Blood Group */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">12. ब्लड ग्रुप:</span>
                <span className="flex-1 border-b border-black px-1 font-semibold text-black">
                  {data.bloodGroup || 'N/A'}
                </span>
              </div>

              {/* 13. Height */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">13. ऊँचाई (Height):</span>
                <span className="flex-1 border-b border-black px-1 font-semibold text-black">
                  {data.height || 'N/A'}
                </span>
              </div>

              {/* 14. Interests */}
              <div className="space-y-1">
                <div className="flex items-start flex-wrap gap-x-4 gap-y-1">
                  <span className="font-bold min-w-[145px] text-black">14. अभिरुचि (Interests):</span>
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap gap-x-6 gap-y-1">
                      <label className="inline-flex items-center space-x-1.5">
                        <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] ${isSinging ? 'bg-black text-white font-bold' : ''}`}>
                          {isSinging ? '✓' : ''}
                        </span>
                        <span>गायन (Singing)</span>
                      </label>
                      <label className="inline-flex items-center space-x-1.5">
                        <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] ${isDancing ? 'bg-black text-white font-bold' : ''}`}>
                          {isDancing ? '✓' : ''}
                        </span>
                        <span>नृत्य (Dancing)</span>
                      </label>
                      <label className="inline-flex items-center space-x-1.5">
                        <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] ${isSpeech ? 'bg-black text-white font-bold' : ''}`}>
                          {isSpeech ? '✓' : ''}
                        </span>
                        <span>भाषण (Speech)</span>
                      </label>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-1">
                      <label className="inline-flex items-center space-x-1.5">
                        <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] ${isSocialService ? 'bg-black text-white font-bold' : ''}`}>
                          {isSocialService ? '✓' : ''}
                        </span>
                        <span>समाजसेवा (Social Service)</span>
                      </label>
                      <label className="inline-flex items-center space-x-1.5">
                        <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] ${isOtherInterest ? 'bg-black text-white font-bold' : ''}`}>
                          {isOtherInterest ? '✓' : ''}
                        </span>
                        <span>अन्य (Other): <span className="border-b border-black inline-block min-w-[100px] px-1 font-semibold">{isOtherInterest ? data.interests : ''}</span></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* 15. Interested Vertical */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">15. इच्छुक वर्टिकल (Vertical):</span>
                <span className="flex-1 border-b border-black px-1 font-semibold text-black">
                  {data.interestedVertical || 'N/A'}
                </span>
              </div>

              {/* 16. Previous NSS Certificate */}
              <div className="flex items-center flex-wrap gap-4">
                <span className="font-bold min-w-[145px] text-black">16. रा.से.यो का पूर्व में प्रमाण पत्र:</span>
                <div className="flex items-center space-x-6">
                  <label className="inline-flex items-center space-x-1.5">
                    <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] ${hasCertNone ? 'bg-black text-white font-bold' : ''}`}>
                      {hasCertNone ? '✓' : ''}
                    </span>
                    <span>नहीं (None)</span>
                  </label>
                  <label className="inline-flex items-center space-x-1.5">
                    <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] ${hasCertA ? 'bg-black text-white font-bold' : ''}`}>
                      {hasCertA ? '✓' : ''}
                    </span>
                    <span>A</span>
                  </label>
                  <label className="inline-flex items-center space-x-1.5">
                    <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] ${hasCertB ? 'bg-black text-white font-bold' : ''}`}>
                      {hasCertB ? '✓' : ''}
                    </span>
                    <span>B</span>
                  </label>
                  <label className="inline-flex items-center space-x-1.5">
                    <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] ${hasCertC ? 'bg-black text-white font-bold' : ''}`}>
                      {hasCertC ? '✓' : ''}
                    </span>
                    <span>C</span>
                  </label>
                </div>
              </div>

              {/* 17. Social Service Experience */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">17. सामाजिक सेवा का पूर्व अनुभव (यदि हो तो):</span>
                <span className="flex-1 border-b border-black px-1 font-semibold text-black">
                  {data.nssRegNo ? `NSS Registration Number: ${data.nssRegNo}` : 'N/A'}
                </span>
              </div>

              {/* Address Info if present */}
              {data.address && (
                <div className="pt-1">
                  <span className="font-bold text-black">वर्तमान पता (Current Address): </span>
                  <span className="font-semibold text-black border-b border-black px-1 inline-block w-full">{data.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Signatures Section */}
          <div className="mt-auto pt-8 flex items-end justify-between text-xs sm:text-xs font-bold text-black">
            <div className="text-center">
              <p className="mb-0.5">स्वयंसेवक/स्वयंसेविका</p>
              <div className="w-44 border-b border-black mb-0.5"></div>
              <p>हस्ताक्षर</p>
            </div>
            <div className="text-center">
              <p className="mb-0.5">कार्यक्रम अधिकारी</p>
              <div className="w-44 border-b border-black mb-0.5"></div>
              <p>हस्ताक्षर</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
