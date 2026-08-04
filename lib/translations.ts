export type Language = 'en' | 'hi';

export interface TranslationSchema {
  header: {
    orgTitle: string;
    orgSubtitle: string;
    formTitle: string;
    formSubtitle: string;
    loginRequiredNotice: string;
    loggedInAs: string;
    switchAccount: string;
    switchLang: string;
  };
  authModal: {
    title: string;
    subtitle: string;
    googleButton: string;
    close: string;
  };
  form: {
    nssRegNoLabel: string;
    nssRegNoPlaceholder: string;
    nameLabel: string;
    namePlaceholder: string;
    yearLabel: string;
    yearPlaceholder: string;
    categoryLabel: string;
    categoryPlaceholder: string;
    branchLabel: string;
    branchPlaceholder: string;
    fatherNameLabel: string;
    fatherNamePlaceholder: string;
    dobLabel: string;
    dobPlaceholder: string;
    genderLabel: string;
    genderPlaceholder: string;
    contactLabel: string;
    contactPlaceholder: string;
    contactNote: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailNote: string;
    bloodGroupLabel: string;
    bloodGroupPlaceholder: string;
    addressLabel: string;
    addressPlaceholder: string;
    submitButton: string;
    submittingButton: string;
    requiredField: string;
  };
  options: {
    years: { value: string; label: string }[];
    categories: { value: string; label: string }[];
    branches: { value: string; label: string }[];
    genders: { value: string; label: string }[];
    bloodGroups: { value: string; label: string }[];
  };
  status: {
    alreadySubmittedTitle: string;
    alreadySubmittedMsg: string;
    successTitle: string;
    successMsg: string;
    errorGmailOnly: string;
    errorPhoneDigits: string;
    errorRequired: string;
    errorGeneral: string;
    switchAccountBtn: string;
  };
  footer: {
    copyright: string;
    contactPrefix: string;
    adminEmail: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    header: {
      orgTitle: 'NATIONAL SERVICE SCHEME (NSS)',
      orgSubtitle: 'IET DAVV, Indore',
      formTitle: 'Volunteer Registration Form',
      formSubtitle: 'Join us in serving the nation with dedication and passion',
      loginRequiredNotice: 'Please sign in with Google to fill out the registration form.',
      loggedInAs: 'Logged in as:',
      switchAccount: 'Switch Account',
      switchLang: 'हिंदी',
    },
    authModal: {
      title: 'Google Sign-In Required',
      subtitle: 'To fill out the NSS Volunteer Registration Form, please sign in with your Google Account.',
      googleButton: 'Continue with Google',
      close: 'Close',
    },
    form: {
      nssRegNoLabel: 'NSS Reg. No.',
      nssRegNoPlaceholder: 'Enter your NSS Registration Number',
      nameLabel: 'Name Of Volunteer',
      namePlaceholder: 'Full Name (as per official record)',
      yearLabel: 'Year',
      yearPlaceholder: 'Select Year',
      categoryLabel: 'Category',
      categoryPlaceholder: 'Select Category',
      branchLabel: 'Branch',
      branchPlaceholder: 'Select Branch',
      fatherNameLabel: "Father's Name",
      fatherNamePlaceholder: "Enter Father's Full Name",
      dobLabel: 'Date of Birth (DOB)',
      dobPlaceholder: 'Select DOB',
      genderLabel: 'Gender',
      genderPlaceholder: 'Select Gender',
      contactLabel: 'Contact Number',
      contactPlaceholder: '10-digit mobile number',
      contactNote: 'Format: 10 digits (do not enter +91)',
      emailLabel: 'Email Address',
      emailPlaceholder: 'yourname@gmail.com',
      emailNote: 'Must be a valid @gmail.com address',
      bloodGroupLabel: 'Blood Group (Optional)',
      bloodGroupPlaceholder: 'Select Blood Group',
      addressLabel: 'Current Address',
      addressPlaceholder: 'Enter your present residence address...',
      submitButton: 'Submit Registration Form',
      submittingButton: 'Recording Response...',
      requiredField: 'This field is required',
    },
    options: {
      years: [
        { value: '1st', label: '1st Year' },
        { value: '2nd', label: '2nd Year' },
        { value: '3rd', label: '3rd Year' },
      ],
      categories: [
        { value: 'GEN', label: 'GEN (General)' },
        { value: 'OBC', label: 'OBC (Other Backward Class)' },
        { value: 'SC', label: 'SC (Scheduled Caste)' },
        { value: 'ST', label: 'ST (Scheduled Tribe)' },
        { value: 'Minority', label: 'Minority' },
      ],
      branches: [
        { value: 'CS', label: 'Computer Science (CS)' },
        { value: 'IT', label: 'Information Technology (IT)' },
        { value: 'ETC', label: 'Electronics & Telecommunication (ETC)' },
        { value: 'EI', label: 'Electrical & Instrumentation (EI)' },
        { value: 'Mech', label: 'Mechanical (Mech)' },
        { value: 'Civil', label: 'Civil' },
        { value: 'B Des', label: 'B Design (B Des)' },
        { value: 'CSBS', label: 'Computer Science & Business System (CSBS)' },
      ],
      genders: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' },
      ],
      bloodGroups: [
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'B-', label: 'B-' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' },
        { value: 'AB+', label: 'AB+' },
        { value: 'AB-', label: 'AB-' },
      ],
    },
    status: {
      alreadySubmittedTitle: 'Response Recorded',
      alreadySubmittedMsg: 'Your response has been recorded. Thank you! You have already submitted a form with this Google account.',
      successTitle: 'Thank You!',
      successMsg: "Your response has been recorded thank you! You'll get information soon.",
      errorGmailOnly: 'Please enter a valid @gmail.com email address.',
      errorPhoneDigits: 'Please enter exactly 10 digits for your contact number without +91.',
      errorRequired: 'Please fill in all mandatory fields correctly.',
      errorGeneral: 'An error occurred while submitting your registration. Please try again.',
      switchAccountBtn: 'Switch Google Account',
    },
    footer: {
      copyright: 'All rights reserved to NSS IET DAVV.',
      contactPrefix: 'For any form-related issues, contact admin at',
      adminEmail: 'hello@uthkarshmandloi.in',
    },
  },
  hi: {
    header: {
      orgTitle: 'राष्ट्रीय सेवा योजना (NSS)',
      orgSubtitle: 'आई.ई.टी. डी.ए.वी.वी., इंदौर',
      formTitle: 'स्वयंसेवक पंजीकरण फॉर्म',
      formSubtitle: 'समर्पण और उत्साह के साथ राष्ट्र सेवा में हमारे साथ जुड़ें',
      loginRequiredNotice: 'पंजीकरण फॉर्म भरने के लिए कृपया Google के साथ साइन इन करें।',
      loggedInAs: 'लॉग इन खाते:',
      switchAccount: 'खाता बदलें',
      switchLang: 'English',
    },
    authModal: {
      title: 'Google साइन-इन आवश्यक है',
      subtitle: 'NSS स्वयंसेवक पंजीकरण फॉर्म भरने के लिए, कृपया अपने Google खाते से साइन इन करें।',
      googleButton: 'Google के साथ आगे बढ़ें',
      close: 'बंद करें',
    },
    form: {
      nssRegNoLabel: 'एन.एस.एस. पंजीकरण संख्या',
      nssRegNoPlaceholder: 'अपनी एन.एस.एस. पंजीकरण संख्या दर्ज करें',
      nameLabel: 'स्वयंसेवक का नाम',
      namePlaceholder: 'पूरा नाम (आधिकारिक रिकॉर्ड के अनुसार)',
      yearLabel: 'वर्ष',
      yearPlaceholder: 'वर्ष चुनें',
      categoryLabel: 'वर्ग / श्रेणी',
      categoryPlaceholder: 'वर्ग चुनें',
      branchLabel: 'शाखा (ब्रांच)',
      branchPlaceholder: 'शाखा चुनें',
      fatherNameLabel: 'पिता का नाम',
      fatherNamePlaceholder: 'पिता का पूरा नाम दर्ज करें',
      dobLabel: 'जन्म तिथि (DOB)',
      dobPlaceholder: 'जन्म तिथि चुनें',
      genderLabel: 'लिंग',
      genderPlaceholder: 'लिंग चुनें',
      contactLabel: 'संपर्क नंबर',
      contactPlaceholder: '10-अंकों का मोबाइल नंबर',
      contactNote: 'प्रारूप: केवल 10 अंक (+91 दर्ज न करें)',
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'yourname@gmail.com',
      emailNote: 'केवल मान्य @gmail.com ईमेल ही स्वीकार्य है',
      bloodGroupLabel: 'रक्त समूह (वैकल्पिक)',
      bloodGroupPlaceholder: 'रक्त समूह चुनें',
      addressLabel: 'वर्तमान पता',
      addressPlaceholder: 'अपना वर्तमान निवास स्थान का पता दर्ज करें...',
      submitButton: 'पंजीकरण फॉर्म सबमिट करें',
      submittingButton: 'प्रतिक्रिया दर्ज की जा रही है...',
      requiredField: 'यह क्षेत्र अनिवार्य है',
    },
    options: {
      years: [
        { value: '1st', label: 'प्रथम वर्ष (1st Year)' },
        { value: '2nd', label: 'द्वितीय वर्ष (2nd Year)' },
        { value: '3rd', label: 'तृतीय वर्ष (3rd Year)' },
      ],
      categories: [
        { value: 'GEN', label: 'सामान्य (GEN)' },
        { value: 'OBC', label: 'अन्य पिछड़ा वर्ग (OBC)' },
        { value: 'SC', label: 'अनुसूचित जाति (SC)' },
        { value: 'ST', label: 'अनुसूचित जनजाति (ST)' },
        { value: 'Minority', label: 'अल्पसंख्यक (Minority)' },
      ],
      branches: [
        { value: 'CS', label: 'कंप्यूटर साइंस (CS)' },
        { value: 'IT', label: 'इन्फॉर्मेशन टेक्नोलॉजी (IT)' },
        { value: 'ETC', label: 'इलेक्ट्रॉनिक्स एंड टेलीकम्युनिकेशन (ETC)' },
        { value: 'EI', label: 'इलेक्ट्रिकल एंड इंस्ट्रूमेंटेशन (EI)' },
        { value: 'Mech', label: 'मैकेनिकल (Mech)' },
        { value: 'Civil', label: 'सिविल (Civil)' },
        { value: 'B Des', label: 'बी डिजाइन (B Des)' },
        { value: 'CSBS', label: 'कंप्यूटर साइंस एंड बिजनेस सिस्टम (CSBS)' },
      ],
      genders: [
        { value: 'Male', label: 'पुरुष (Male)' },
        { value: 'Female', label: 'महिला (Female)' },
        { value: 'Other', label: 'अन्य (Other)' },
      ],
      bloodGroups: [
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'B-', label: 'B-' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' },
        { value: 'AB+', label: 'AB+' },
        { value: 'AB-', label: 'AB-' },
      ],
    },
    status: {
      alreadySubmittedTitle: 'प्रतिक्रिया दर्ज की गई',
      alreadySubmittedMsg: 'आपकी प्रतिक्रिया दर्ज कर ली गई है। धन्यवाद! आप इस Google खाते से पहले ही फॉर्म सबमिट कर चुके हैं।',
      successTitle: 'धन्यवाद!',
      successMsg: 'आपकी प्रतिक्रिया दर्ज कर ली गई है। धन्यवाद! आपको जल्द ही जानकारी मिलेगी।',
      errorGmailOnly: 'कृपया एक मान्य @gmail.com ईमेल पता दर्ज करें।',
      errorPhoneDigits: 'कृपया बिना +91 के अपने संपर्क नंबर के लिए ठीक 10 अंक दर्ज करें।',
      errorRequired: 'कृपया सभी अनिवार्य फ़ील्ड सही ढंग से भरें।',
      errorGeneral: 'आपका पंजीकरण जमा करते समय एक त्रुटि हुई। कृपया पुनः प्रयास करें।',
      switchAccountBtn: 'गूगल खाता बदलें',
    },
    footer: {
      copyright: 'सर्वाधिकार सुरक्षित - राष्ट्रीय सेवा योजना, आई.ई.टी. डी.ए.वी.वी.',
      contactPrefix: 'फॉर्म से संबंधित किसी भी समस्या के लिए एडमिन से संपर्क करें:',
      adminEmail: 'hello@uthkarshmandloi.in',
    },
  },
};
