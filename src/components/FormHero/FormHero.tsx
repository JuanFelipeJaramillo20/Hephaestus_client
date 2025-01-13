import { Grid, Title, Text, Image } from '@mantine/core';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import logo from '../../assets/workflow.png';

export const FormHero = () => {
  const { t } = useLanguage(); // Access the translation function

  return (
    <Grid align="center" mb="xl" style={{ padding: '2rem 0' }}>
      {/* Left Section */}
      <Grid.Col span={6}>
        <Title order={2}>{t('formHero.title')}</Title>
      </Grid.Col>

      {/* Right Section */}
      <Grid.Col span={6}>
        <Text mt="md">{t('formHero.description')}</Text>
      </Grid.Col>

      {/* Full-Width Image */}
      <Grid.Col span={12} mt="lg">
        <Image
          src={logo}
          alt={t('formHero.imageAlt')}
          fit="contain"
          radius="md"
        />
      </Grid.Col>
    </Grid>
  );
};
