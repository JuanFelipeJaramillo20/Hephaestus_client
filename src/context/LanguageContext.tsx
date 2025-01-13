import React, { createContext, ReactNode, useContext, useState } from 'react';
import { translations } from '@/translations/Translations'; // Import your translations object

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string; // Function to fetch translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));
  };

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.'); // Split nested keys, e.g., "navbar.getStarted"
    let result: any = translations[language]; // Start with the translations for the current language

    for (const currentKey of keys) {
      if (result && typeof result === 'object' && currentKey in result) {
        result = result[currentKey];
      } else {
        console.error(`Translation key "${key}" not found`);
        return key; // Return the key itself if the translation is missing
      }
    }

    if (typeof result === 'string') {
      return result; // Return the resolved string
    }
      console.error(`Translation for key "${key}" is not a string`);
      return key; // Return the key itself if the result is not a string

  };


  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
