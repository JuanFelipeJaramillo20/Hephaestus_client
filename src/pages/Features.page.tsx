// @ts-nocheck
import React from 'react';
import { Container, Grid, Title, Text, Image, Group, useMantineTheme, Card } from '@mantine/core';
import { useLanguage } from '@/context/LanguageContext';
import { IconFileText, IconHistory, IconSettings, IconCode } from '@tabler/icons-react';
import generateImage from '@/assets/yml.jpg';
import sonarqubeImage from '@/assets/sonarqube.webp';
import historyImage from '@/assets/history.png';
import settings from '@/assets/settings.webp';

export const Features = () => {
  const { t } = useLanguage(); // Translation function
  const theme = useMantineTheme(); // Theme support (light/dark)

  // List of features with descriptions, icons/images
  const features = [
    {
      title: t('features.generateYaml.title'),
      description: t('features.generateYaml.description'),
      icon: <IconFileText size={50} color={theme.colors.blue[6]} />,
      image: generateImage,
    },
    {
      title: t('features.fileHistory.title'),
      description: t('features.fileHistory.description'),
      icon: <IconHistory size={50} color={theme.colors.green[6]} />,
      image: historyImage,
    },
    {
      title: t('features.sonarQube.title'),
      description: t('features.sonarQube.description'),
      icon: <IconCode size={50} color={theme.colors.teal[6]} />,
      image: sonarqubeImage,
    },
    {
      title: t('features.configuration.title'),
      description: t('features.configuration.description'),
      icon: <IconSettings size={50} color={theme.colors.orange[6]} />,
      image: settings,
    },
  ];

  return (
    <Container mt="lg">
      <Grid align="center" justify="center" mb="xl">
        <Grid.Col span={12} style={{ textAlign: 'center' }}>
          <Title order={2}>{t('featuresPage.title')}</Title>
          <Text color="dimmed" mt="sm">
            {t('featuresPage.subtitle')}
          </Text>
        </Grid.Col>
      </Grid>

      <Grid gutter="lg">
        {features.map((feature, index) => (
          <Grid.Col key={index} md={6} lg={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group position="center" mb="md">
                {feature.icon}
              </Group>
              <Title order={4} align="center" mb="sm">
                {feature.title}
              </Title>
              <Text align="center" mb="md">
                {feature.description}
              </Text>
              {feature.image && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fit="cover" // Ensures the image fills the space while maintaining its aspect ratio
                    width={300} // Set consistent width
                    height={200} // Set consistent height
                    radius="sm"
                    style={{
                      objectFit: 'contain', // Ensures the image fits within the bounds
                      border: `1px solid ${theme.colors.gray[3]}`,
                      borderRadius: 8,
                    }}
                  />
                </div>
              )}
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};
