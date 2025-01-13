import { Grid, Title, Text, Button, Image } from '@mantine/core';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import logo from '../../assets/ci-cd.png';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const { t } = useLanguage(); // Access the t function for translations
  const navigate = useNavigate();

  const handleClickGetStarted = () => {
    navigate('/login');
  }

  const handleClickLearnMore = () => {
    navigate('/features');
  }

  return (
    <Grid align="center" style={{ padding: '2rem 0' }}>
      {/* Left Content */}
      <Grid.Col span={6}>
        <Title order={1}>{t('hero.title')}</Title>
        <Text mt="md">{t('hero.description')}</Text>
        <div style={{ marginTop: '1.5rem' }}>
          <Button mr="xs" size="md" variant="filled" color="dark" onClick={handleClickGetStarted}>
            {t('hero.getStarted')}
          </Button>
          <Button size="md" variant="outline" onClick={handleClickLearnMore}>
            {t('hero.learnMore')}
          </Button>
        </div>
      </Grid.Col>

      {/* Right Content - Image */}
      <Grid.Col span={6}>
        <Image
          src={logo}
          alt={t('hero.imageAlt')}
          fit="contain"
          radius="md"
        />
      </Grid.Col>
    </Grid>
  );
};
