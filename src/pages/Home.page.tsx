// @ts-nocheck
import React from 'react';
import { Container } from '@mantine/core';
import { Hero } from '@/components/Hero/Hero';
import { FormHero } from '@/components/FormHero/FormHero';
import { Workflows } from '@/components/Workflows/Workflows';
import { YAMLGenerationCards } from '@/components/YAMLGenerationCards/YAMLGenerationCards';
import { LoginOptionsHero } from '@/components/LoginOptionsHero/LoginOptionsHero';

export const HomePage = () => {
  return (
    <Container fluid>
      <Hero />
      <FormHero />
      <Workflows />
      <YAMLGenerationCards />
      <LoginOptionsHero />
    </Container>
  );
};
