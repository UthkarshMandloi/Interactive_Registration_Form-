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
    instituteLabel: string;
    institutePlaceholder: string;
    nssRegNoLabel: string;
    nssRegNoPlaceholder: string;
    nssRegNoBadge: string;
    nssRegNoTooltip: string;
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
    motherNameLabel: string;
    motherNamePlaceholder: string;
    courseLabel: string;
    coursePlaceholder: string;
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
    heightLabel: string;
    heightPlaceholder: string;
    interestsLabel: string;
    interestsPlaceholder: string;
    otherInterestLabel: string;
    otherInterestPlaceholder: string;
    interestedVerticalLabel: string;
    interestedVerticalPlaceholder: string;
    nssCertificateLabel: string;
    nssCertificatePlaceholder: string;
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
    courses: { value: string; label: string }[];
    genders: { value: string; label: string }[];
    bloodGroups: { value: string; label: string }[];
    interests: { value: string; label: string }[];
    interestedVerticals: { value: string; label: string }[];
    nssCertificates: { value: string; label: string }[];
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
    downloadFormBtn: string;
    viewFormBtn: string;
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
      instituteLabel: 'Institute Name',
      institutePlaceholder: 'Institute of Engineering & Technology (IET DAVV), Indore',
      nssRegNoLabel: 'NSS Reg. No.',
      nssRegNoPlaceholder: 'Enter your NSS Registration Number',
      nssRegNoBadge: '(if you have)',
      nssRegNoTooltip: 'If you have an existing NSS Registration Number, please mention it here. Otherwise, you can leave it blank.',
      nameLabel: 'Name Of Volunteer',
      namePlaceholder: 'Full Name (as per official record)',
      yearLabel: 'Year',
      yearPlaceholder: 'Select Year',
      categoryLabel: 'Category',
      categoryPlaceholder: 'Select Category',
      branchLabel: 'Branch',
      branchPlaceholder: 'Enter your Branch',
      fatherNameLabel: "Father's Name",
      fatherNamePlaceholder: "Enter Father's Full Name",
      motherNameLabel: "Mother's Name",
      motherNamePlaceholder: "Enter Mother's Full Name",
      courseLabel: 'Course',
      coursePlaceholder: 'Select Course (UG / PG)',
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
      heightLabel: 'Height',
      heightPlaceholder: 'Enter height (e.g. 170 cm)',
      interestsLabel: 'Interests',
      interestsPlaceholder: 'Select your interests',
      otherInterestLabel: 'Specify Other Interest',
      otherInterestPlaceholder: 'Enter your interest...',
      interestedVerticalLabel: 'Interested Vertical',
      interestedVerticalPlaceholder: 'Select Interested Vertical',
      nssCertificateLabel: 'Previous NSS Certificate',
      nssCertificatePlaceholder: 'Select certificate if any',
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
        { value: '4th', label: '4th Year' },
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
        { value: 'EEE', label: 'Electrical & Electronics (EEE)' },
        { value: 'Mech', label: 'Mechanical (Mech)' },
        { value: 'Civil', label: 'Civil' },
        { value: 'B Des', label: 'B Design (B Des)' },
        { value: 'CSBS', label: 'Computer Science & Business System (CSBS)' },
        { value: 'IP', label: 'Industrial & Production (IP)' },
        { value: 'MTech', label: 'M.Tech' },
      ],
      courses: [
        { value: 'UG', label: 'UG (B.Tech / B.Des)' },
        { value: 'PG', label: 'PG (M.Tech)' },
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
      interests: [
        { value: 'Singing', label: 'Singing' },
        { value: 'Dancing', label: 'Dancing' },
        { value: 'Speech', label: 'Speech' },
        { value: 'Social Service', label: 'Social Service' },
        { value: 'Other', label: 'Other' },
      ],
      interestedVerticals: [
        { value: 'Events & Outreach', label: 'Events & Outreach' },
        { value: 'Art & Creativity Cell', label: 'Art & Creativity Cell' },
        { value: 'NSS Editorial (Content)', label: 'NSS Editorial (Content)' },
        { value: 'Pixel Crew (Production)', label: 'Pixel Crew (Production)' },
        { value: 'Impact Innovators (SocioTech)', label: 'Impact Innovators (SocioTech)' },
        { value: 'Design Studio', label: 'Design Studio' },
        { value: 'Technical', label: 'Technical' },
      ],
      nssCertificates: [
        { value: 'None', label: 'None' },
        { value: 'A Certificate', label: 'A Certificate' },
        { value: 'B Certificate', label: 'B Certificate' },
        { value: 'C Certificate', label: 'C Certificate' },
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
      downloadFormBtn: 'Download / Print Application Form',
      viewFormBtn: 'View Application Form',
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
      instituteLabel: 'संस्था का नाम',
      institutePlaceholder: 'Institute of Engineering & Technology (IET DAVV), Indore',
      nssRegNoLabel: 'एन.एस.एस. पंजीकरण संख्या',
      nssRegNoPlaceholder: 'अपनी एन.एस.एस. पंजीकरण संख्या दर्ज करें',
      nssRegNoBadge: '(यदि आपके पास है)',
      nssRegNoTooltip: 'यदि आपके पास पुरानी एन.एस.एस. पंजीकरण संख्या है तो दर्ज करें, अन्यथा इसे खाली छोड़ सकते हैं।',
      nameLabel: 'स्वयंसेवक का नाम',
      namePlaceholder: 'पूरा नाम (आधिकारिक रिकॉर्ड के अनुसार)',
      yearLabel: 'वर्ष',
      yearPlaceholder: 'वर्ष चुनें',
      categoryLabel: 'वर्ग / श्रेणी',
      categoryPlaceholder: 'वर्ग चुनें',
      branchLabel: 'शाखा (ब्रांच)',
      branchPlaceholder: 'अपनी शाखा दर्ज करें',
      fatherNameLabel: 'पिता का नाम',
      fatherNamePlaceholder: 'पिता का पूरा नाम दर्ज करें',
      motherNameLabel: 'माता का नाम',
      motherNamePlaceholder: 'माता का पूरा नाम दर्ज करें',
      courseLabel: 'कोर्स',
      coursePlaceholder: 'कोर्स चुनें (UG / PG)',
      dobLabel: 'जन्म तिथि',
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
      heightLabel: 'ऊँचाई',
      heightPlaceholder: 'ऊँचाई दर्ज करें (उदा. 170 सेमी)',
      interestsLabel: 'अभिरुचि',
      interestsPlaceholder: 'अपनी अभिरुचि चुनें',
      otherInterestLabel: 'अन्य अभिरुचि',
      otherInterestPlaceholder: 'अपनी अभिरुचि दर्ज करें...',
      interestedVerticalLabel: 'इच्छुक वर्टिकल',
      interestedVerticalPlaceholder: 'इच्छुक वर्टिकल चुनें',
      nssCertificateLabel: 'रा.से.यो का पूर्व में प्रमाण पत्र',
      nssCertificatePlaceholder: 'प्रमाण पत्र चुनें (यदि हो तो)',
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
        { value: '4th', label: 'चतुर्थ वर्ष (4th Year)' },
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
        { value: 'EEE', label: 'इलेक्ट्रिकल एंड इलेक्ट्रॉनिक्स (EEE)' },
        { value: 'Mech', label: 'मैकेनिकल (Mech)' },
        { value: 'Civil', label: 'सिविल (Civil)' },
        { value: 'B Des', label: 'बी डिजाइन (B Des)' },
        { value: 'CSBS', label: 'कंप्यूटर साइंस एंड बिजनेस सिस्टम (CSBS)' },
        { value: 'IP', label: 'इंडस्ट्रियल एंड प्रोडक्शन (IP)' },
        { value: 'MTech', label: 'एम.टेक (M.Tech)' },
      ],
      courses: [
        { value: 'UG', label: 'UG (B.Tech / B.Des)' },
        { value: 'PG', label: 'PG (M.Tech)' },
      ],
      genders: [
        { value: 'Male', label: 'पुरुष' },
        { value: 'Female', label: 'महिला' },
        { value: 'Other', label: 'अन्य' },
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
      interests: [
        { value: 'Singing', label: 'गायन' },
        { value: 'Dancing', label: 'नृत्य' },
        { value: 'Speech', label: 'भाषण' },
        { value: 'Social Service', label: 'समाजसेवा' },
        { value: 'Other', label: 'अन्य' },
      ],
      interestedVerticals: [
        { value: 'Events & Outreach', label: 'Events & Outreach' },
        { value: 'Art & Creativity Cell', label: 'Art & Creativity Cell' },
        { value: 'NSS Editorial (Content)', label: 'NSS Editorial (Content)' },
        { value: 'Pixel Crew (Production)', label: 'Pixel Crew (Production)' },
        { value: 'Impact Innovators (SocioTech)', label: 'Impact Innovators (SocioTech)' },
        { value: 'Design Studio', label: 'Design Studio' },
        { value: 'Technical', label: 'Technical' },
      ],
      nssCertificates: [
        { value: 'None', label: 'कोई नहीं' },
        { value: 'A Certificate', label: 'A प्रमाण पत्र' },
        { value: 'B Certificate', label: 'B प्रमाण पत्र' },
        { value: 'C Certificate', label: 'C प्रमाण पत्र' },
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
      downloadFormBtn: 'आवेदन पत्र डाउनलोड / प्रिंट करें',
      viewFormBtn: 'आवेदन पत्र देखें',
    },
    footer: {
      copyright: 'सर्वाधिकार सुरक्षित - राष्ट्रीय सेवा योजना, आई.ई.टी. डी.ए.वी.वी.',
      contactPrefix: 'फॉर्म से संबंधित किसी भी समस्या के लिए एडमिन से संपर्क करें:',
      adminEmail: 'hello@uthkarshmandloi.in',
    },
  },
};
