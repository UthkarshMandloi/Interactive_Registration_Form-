"use client";

import React from 'react';
import Image from 'next/image';

export interface ApplicationFormData {
  institute?: string;
  nssRegNo?: string;
  name: string;
  year: string;
  category: string;
  branch: string;
  fatherName: string;
  dob: string;
  gender: string;
  contactNo: string;
  email: string;
  bloodGroup?: string;
  address?: string;
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

  const formattedDob = data.dob
    ? new Date(data.dob).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '';

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
              <h3 className="font-bold text-sm sm:text-base">DAVV NSS Application Form</h3>
              <p className="text-xs text-white/70">राष्ट्रीय सेवा योजना में प्रवेश हेतु आवेदन पत्र</p>
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

        {/* Printable Form Content (Full height layout pushing signature to bottom) */}
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
                  विद्यार्थियों के लिए राष्ट्रीय सेवा योजना में प्रवेश हेतु आवेदन पत्र
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

            {/* Form Fields (1 to 18) */}
            <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-[13px] font-medium leading-relaxed">
              
              {/* 1. Institution Name */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">1. संस्था का नाम:</span>
                <span className="flex-1 border-b border-black px-1 font-semibold text-black">
                  {data.institute || "Institute of Engineering & Technology (IET DAVV), Indore"}
                </span>
              </div>

              {/* 2. Student Name */}
              <div className="space-y-1">
                <div className="flex items-baseline">
                  <span className="font-bold min-w-[145px] text-black">2. विद्यार्थी का नाम:</span>
                  <span className="w-20 font-bold text-black">हिन्दी में :</span>
                  <span className="flex-1 border-b border-black px-1 font-semibold text-black"></span>
                </div>
                <div className="flex items-baseline pl-[145px]">
                  <span className="w-20 font-bold text-black">अंग्रेजी में :</span>
                  <span className="flex-1 border-b border-black px-1 font-bold uppercase tracking-wider text-black">
                    {data.name}
                  </span>
                </div>
              </div>

              {/* 3. Father's Name */}
              <div className="space-y-1">
                <div className="flex items-baseline">
                  <span className="font-bold min-w-[145px] text-black">3. पिता का नाम:</span>
                  <span className="w-20 font-bold text-black">हिन्दी में :</span>
                  <span className="flex-1 border-b border-black px-1 font-semibold text-black"></span>
                </div>
                <div className="flex items-baseline pl-[145px]">
                  <span className="w-20 font-bold text-black">अंग्रेजी में :</span>
                  <span className="flex-1 border-b border-black px-1 font-semibold uppercase text-black">
                    {data.fatherName}
                  </span>
                </div>
              </div>

              {/* 4. Mother's Name */}
              <div className="space-y-1">
                <div className="flex items-baseline">
                  <span className="font-bold min-w-[145px] text-black">4. माता का नाम:</span>
                  <span className="w-20 font-bold text-black">हिन्दी में :</span>
                  <span className="flex-1 border-b border-black px-1"></span>
                </div>
                <div className="flex items-baseline pl-[145px]">
                  <span className="w-20 font-bold text-black">अंग्रेजी में :</span>
                  <span className="flex-1 border-b border-black px-1"></span>
                </div>
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
                    {/* Category Row 1 */}
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
                    {/* Category Row 2 */}
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

              {/* 8. Class */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">8. कक्षा:</span>
                <span className="flex-1 border-b border-black px-1 font-semibold text-black">
                  {data.branch}
                </span>
              </div>

              {/* 9. Semester, Year */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">9. सेमेस्टर, वर्ष:</span>
                <span className="flex-1 border-b border-black px-1 font-semibold text-black">
                  {data.year}
                </span>
              </div>

              {/* 10. Fee Receipt Details */}
              <div className="flex items-baseline flex-wrap gap-x-4 gap-y-1">
                <span className="font-bold min-w-[145px] text-black">10. शुल्क रसीद का विवरण:</span>
                <div className="flex-1 flex flex-wrap gap-x-6 gap-y-1">
                  <span>प्रवेश रसीद संख्या: <span className="border-b border-black inline-block min-w-[140px] px-1"></span></span>
                  <span>दिनांक: <span className="border-b border-black inline-block min-w-[140px] px-1"></span></span>
                </div>
              </div>

              {/* 11. Mobile Number */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">11. मोबाइल नम्बर:</span>
                <span className="flex-1 border-b border-black px-1 font-semibold text-black">
                  +91 {data.contactNo}
                </span>
              </div>

              {/* 12. Email ID */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">12. ई-मेल आई.डी.:</span>
                <span className="flex-1 border-b border-black px-1 font-semibold text-black">
                  {data.email}
                </span>
              </div>

              {/* 13. Aadhaar Number */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">13. आधार नम्बर:</span>
                <span className="flex-1 border-b border-black px-1"></span>
              </div>

              {/* 14. Blood Group */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">14. ब्लड ग्रुप:</span>
                <span className="flex-1 border-b border-black px-1 font-semibold text-black">
                  {data.bloodGroup || 'N/A'}
                </span>
              </div>

              {/* 15. Height */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">15. ऊँचाई:</span>
                <span className="flex-1 border-b border-black px-1"></span>
              </div>

              {/* 16. Interests */}
              <div className="space-y-1">
                <div className="flex items-start flex-wrap gap-x-4 gap-y-1">
                  <span className="font-bold min-w-[145px] text-black">16. अभिरुचि (Interests):</span>
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap gap-x-6 gap-y-1">
                      <label className="inline-flex items-center space-x-1.5">
                        <span className="w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px]"></span>
                        <span>गायन (Singing)</span>
                      </label>
                      <label className="inline-flex items-center space-x-1.5">
                        <span className="w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px]"></span>
                        <span>नृत्य (Dancing)</span>
                      </label>
                      <label className="inline-flex items-center space-x-1.5">
                        <span className="w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px]"></span>
                        <span>भाषण (Speech)</span>
                      </label>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-1">
                      <label className="inline-flex items-center space-x-1.5">
                        <span className="w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] bg-black text-white font-bold">✓</span>
                        <span>समाजसेवा (Social Service)</span>
                      </label>
                      <label className="inline-flex items-center space-x-1.5">
                        <span className="w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px]"></span>
                        <span>अन्य (Other): <span className="border-b border-black inline-block min-w-[100px]"></span></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* 17. Previous NSS Certificate */}
              <div className="flex items-center flex-wrap gap-4">
                <span className="font-bold min-w-[145px] text-black">17. रा.से.यो का पूर्व में प्रमाण पत्र:</span>
                <div className="flex items-center space-x-6">
                  <label className="inline-flex items-center space-x-1.5">
                    <span className="w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px]"></span>
                    <span>A</span>
                  </label>
                  <label className="inline-flex items-center space-x-1.5">
                    <span className="w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px]"></span>
                    <span>B</span>
                  </label>
                  <label className="inline-flex items-center space-x-1.5">
                    <span className="w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px]"></span>
                    <span>C</span>
                  </label>
                </div>
              </div>

              {/* 18. Social Service Experience */}
              <div className="flex items-baseline">
                <span className="font-bold min-w-[145px] text-black">18. सामाजिक सेवा का पूर्व अनुभव (यदि हो तो)</span>
                <span className="flex-1 border-b border-black px-1 font-semibold text-black">
                  {data.nssRegNo ? `NSS Registration Number: ${data.nssRegNo}` : ''}
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

          {/* Bottom Signatures Section (Pushed to bottom of page) */}
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
