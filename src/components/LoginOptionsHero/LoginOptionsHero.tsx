import { Grid, Title, Text, Image, Button } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import logo from '../../assets/rocket_1.jpg';

export const LoginOptionsHero = () => {
  const { t } = useLanguage(); // Access the translation function
  const navigate = useNavigate(); // React Router's navigate function

  return (
    <Grid align="center">
      {/* Left Column */}
      <Grid.Col span={6}>
        <Title order={2} mb="md">
          {t('loginOptionsHero.title')}
        </Title>
        <Text mb="lg">{t('loginOptionsHero.description')}</Text>
        <div>
          <Button variant="filled" color="dark" mr="sm" onClick={() => navigate('/login')}>
            {t('loginOptionsHero.login')}
          </Button>
          <Button variant="outline" color="dark" onClick={() => navigate('/register')}>
            {t('loginOptionsHero.register')}
          </Button>
        </div>
      </Grid.Col>

      {/* Right Column */}
      <Grid.Col span={6}>
        <Image src={logo} alt={t('loginOptionsHero.imageAlt')} fit="contain" radius="md"/>
      </Grid.Col>
    </Grid>
  );
};
