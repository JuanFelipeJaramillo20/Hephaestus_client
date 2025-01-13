import React from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconLanguage } from '@tabler/icons-react';
import { useLanguage } from '@/context/LanguageContext';

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Tooltip label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}>
      <ActionIcon
        variant="outline"
        onClick={toggleLanguage}
        style={{ cursor: 'pointer' }}
        size="lg"
      >
        <IconLanguage size={20} />
      </ActionIcon>
    </Tooltip>
  );
};
