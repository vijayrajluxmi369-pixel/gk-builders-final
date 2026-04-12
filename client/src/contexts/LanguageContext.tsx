import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    'form.title': 'Service Contract Form',
    'form.subtitle': 'Submit your project details and let us prepare a formal contract for you',
    'form.clientDetails': 'Client Details',
    'form.fullName': 'Full Name',
    'form.phoneNumber': 'Phone Number',
    'form.emailAddress': 'Email Address',
    'form.siteAddress': 'Site Address',
    'form.projectDetails': 'Project Details',
    'form.serviceType': 'Service Type',
    'form.estimatedBudget': 'Estimated Budget',
    'form.projectStartDate': 'Project Start Date',
    'form.projectDescription': 'Project Description',
    'form.termsConditions': 'Terms & Conditions',
    'form.agreeToTerms': 'I agree to the service terms of GK Builders',
    'form.readAndAgree': 'I have read and agree to the GK Builders Service Terms',
    'form.submit': 'Submit Contract Request',
    'form.download': 'Download Form',
    'form.clear': 'Clear Form',
    'form.required': 'All fields marked with * are required. Our team will review your submission and contact you within 24 business hours to finalize the contract.',
    'form.placeholder.name': 'Enter your full name',
    'form.placeholder.phone': 'Enter your phone number',
    'form.placeholder.email': 'Enter your email address',
    'form.placeholder.address': 'Enter project site address',
    'form.placeholder.description': 'Describe your project requirements',
    'success.title': 'Contract Request Submitted Successfully!',
    'success.message': 'GK Builders will contact you within 24 hours',
    'success.details': 'We have received your contract request and forwarded it to our team. You will receive a call or email from us shortly to discuss your project details and finalize the contract.',
    'validation.fillRequired': 'Please fill in all required fields',
    'validation.agreeTerms': 'You must agree to the service terms of GK Builders',
    'validation.readTerms': 'You must read and agree to the GK Builders Service Terms',
    'validation.validDate': 'Please select a valid project start date',
    'validation.submitSuccess': 'Contract request submitted successfully!',
    'validation.submitError': 'Failed to submit contract request. Please try again.',
    'terms.paymentSchedule': 'Payment Schedule: Payment will be made as per the agreed schedule (advance, during construction, and final payment).',
    'terms.materialQuality': 'Material Quality: All materials used will be of premium quality as per specifications discussed.',
    'terms.projectTimeline': 'Project Timeline: The project will be completed within the agreed timeline. Any delays due to unforeseen circumstances will be communicated in advance.',
    'terms.siteAccess': 'Site Access: The client must provide unrestricted access to the site during working hours.',
    'terms.designChanges': 'Design Changes: Any changes to the design or scope must be approved in writing and may incur additional costs.',
  },
  hi: {
    'form.title': 'सेवा अनुबंध प्रपत्र',
    'form.subtitle': 'अपने प्रोजेक्ट विवरण जमा करें और हमें आपके लिए एक औपचारिक अनुबंध तैयार करने दें',
    'form.clientDetails': 'ग्राहक विवरण',
    'form.fullName': 'पूरा नाम',
    'form.phoneNumber': 'फोन नंबर',
    'form.emailAddress': 'ईमेल पता',
    'form.siteAddress': 'साइट पता',
    'form.projectDetails': 'प्रोजेक्ट विवरण',
    'form.serviceType': 'सेवा का प्रकार',
    'form.estimatedBudget': 'अनुमानित बजट',
    'form.projectStartDate': 'प्रोजेक्ट शुरुआत तारीख',
    'form.projectDescription': 'प्रोजेक्ट विवरण',
    'form.termsConditions': 'शर्तें और शर्तें',
    'form.agreeToTerms': 'मैं GK Builders की सेवा शर्तों से सहमत हूँ',
    'form.readAndAgree': 'मैंने GK Builders सेवा शर्तें पढ़ी हैं और सहमत हूँ',
    'form.submit': 'अनुबंध अनुरोध जमा करें',
    'form.download': 'फॉर्म डाउनलोड करें',
    'form.clear': 'फॉर्म साफ करें',
    'form.required': '* से चिह्नित सभी फील्ड आवश्यक हैं। हमारी टीम आपके सबमिशन की समीक्षा करेगी और अनुबंध को अंतिम रूप देने के लिए 24 व्यावसायिक घंटों के भीतर आपसे संपर्क करेगी।',
    'form.placeholder.name': 'अपना पूरा नाम दर्ज करें',
    'form.placeholder.phone': 'अपना फोन नंबर दर्ज करें',
    'form.placeholder.email': 'अपना ईमेल पता दर्ज करें',
    'form.placeholder.address': 'प्रोजेक्ट साइट का पता दर्ज करें',
    'form.placeholder.description': 'अपनी प्रोजेक्ट आवश्यकताओं का वर्णन करें',
    'success.title': 'अनुबंध अनुरोध सफलतापूर्वक जमा किया गया!',
    'success.message': 'GK Builders 24 घंटों के भीतर आपसे संपर्क करेगा',
    'success.details': 'हमने आपके अनुबंध अनुरोध को प्राप्त किया है और इसे हमारी टीम को भेज दिया है। आपको जल्द ही हमारी ओर से एक कॉल या ईमेल मिलेगा ताकि आपके प्रोजेक्ट विवरण पर चर्चा की जा सके और अनुबंध को अंतिम रूप दिया जा सके।',
    'validation.fillRequired': 'कृपया सभी आवश्यक फील्ड भरें',
    'validation.agreeTerms': 'आपको GK Builders की सेवा शर्तों से सहमत होना चाहिए',
    'validation.readTerms': 'आपको GK Builders सेवा शर्तें पढ़नी चाहिए और सहमत होना चाहिए',
    'validation.validDate': 'कृपया एक वैध प्रोजेक्ट शुरुआत तारीख चुनें',
    'validation.submitSuccess': 'अनुबंध अनुरोध सफलतापूर्वक जमा किया गया!',
    'validation.submitError': 'अनुबंध अनुरोध जमा करने में विफल। कृपया पुनः प्रयास करें।',
    'terms.paymentSchedule': 'भुगतान अनुसूची: भुगतान सहमत अनुसूची के अनुसार किया जाएगा (अग्रिम, निर्माण के दौरान, और अंतिम भुगतान)।',
    'terms.materialQuality': 'सामग्री की गुणवत्ता: सभी उपयोग की जाने वाली सामग्री चर्चा की गई विशिष्टताओं के अनुसार प्रीमियम गुणवत्ता की होगी।',
    'terms.projectTimeline': 'प्रोजेक्ट समयसीमा: प्रोजेक्ट सहमत समयसीमा के भीतर पूरा किया जाएगा। किसी भी अप्रत्याशित परिस्थितियों के कारण देरी को पहले से ही संचारित किया जाएगा।',
    'terms.siteAccess': 'साइट पहुंच: ग्राहक को कार्य घंटों के दौरान साइट तक अप्रतिबंधित पहुंच प्रदान करनी चाहिए।',
    'terms.designChanges': 'डिजाइन परिवर्तन: डिजाइन या दायरे में कोई भी परिवर्तन लिखित रूप में अनुमोदित होना चाहिए और अतिरिक्त लागत लग सकती है।',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
