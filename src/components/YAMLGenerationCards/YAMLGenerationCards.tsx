// @ts-nocheck
import { Grid, Title, Text, Card, Group, Anchor } from '@mantine/core';
import React from 'react';
import { IconBox } from '@tabler/icons-react';
import { useLanguage } from '@/context/LanguageContext';

export const YAMLGenerationCards = () => {
  const { t } = useLanguage(); // Access the translation function

  return (
    <Grid align="center" mt="xl">
      {/* Main Title */}
      <Grid.Col span={12}>
        <Title
          order={2}
          sx={{ textAlign: 'center', marginBottom: '1rem' }}
        >
          {t('yamlCards.title')}
        </Title>
      </Grid.Col>

      {/* Cards Section */}
      {[
        {
          icon: <IconBox size={40} />,
          title: t('yamlCards.card1.title'),
          description: t('yamlCards.card1.description'),
          link: t('yamlCards.card1.link'),
          href: 'login',
        },
        {
          icon: <IconBox size={40} />,
          title: t('yamlCards.card2.title'),
          description: t('yamlCards.card2.description'),
          link: t('yamlCards.card2.link'),
          href: 'generate',
        },
        {
          icon: <IconBox size={40} />,
          title: t('yamlCards.card3.title'),
          description: t('yamlCards.card3.description'),
          link: t('yamlCards.card3.link'),
          href: 'features',
        },
      ].map((card, index) => (
        <Grid.Col span={4} key={index}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="center">{card.icon}</Group>
            <Title order={4} align="center" mt="sm">
              {card.title}
            </Title>
            <Text align="center" mt="sm">
              {card.description}
            </Text>
            <Text align="center" mt="md">
              <Anchor href={card.href}>{card.link}</Anchor>
            </Text>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
};
