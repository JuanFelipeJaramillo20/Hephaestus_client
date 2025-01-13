import { Grid, Title, Text, Image } from '@mantine/core';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import logo from '../../assets/providers_1.jpg';

export const Workflows = () => {
  const { t } = useLanguage(); // Access the translation function

  return (
    <Grid align="center" mb="xl" style={{ padding: '2rem 0' }}>
      {/* Left Section */}
      <Grid.Col span={6}>
        <Title order={2}>{t('workflows.title')}</Title>
        <Text mt="md">{t('workflows.description')}</Text>
      </Grid.Col>

      {/* Right Section */}
      <Grid.Col span={6}>
        <Image
          src={logo}
          alt={t('workflows.imageAlt')}
          fit="contain"
          radius="md"
        />
      </Grid.Col>
    </Grid>
  );
};
