// @ts-nocheck
import React from 'react';
import { Container, Grid, Title, Text, Image, Card, useMantineTheme, Group } from '@mantine/core';
import { IconPigMoney, IconHeartHandshake, IconSchool } from '@tabler/icons-react';
import { useLanguage } from '@/context/LanguageContext';
import studentBudgetImage from '@/assets/budget.jpg';

export const Pricing = () => {
  const { t } = useLanguage();
  const theme = useMantineTheme();

  return (
    <Container mt="lg">
      {/* Page Title */}
      <Grid align="center" justify="center" mb="xl">
        <Grid.Col span={12} style={{ textAlign: 'center' }}>
          <Title order={2} color={theme.colors.blue[6]}>
            {t('pricingPage.title')}
          </Title>
          <Text color="dimmed" mt="sm">
            {t('pricingPage.subtitle')}
          </Text>
        </Grid.Col>
      </Grid>

      {/* Pricing Information */}
      <Grid align="center" justify="center">
        <Grid.Col span={12} style={{ textAlign: 'center' }}>
          <Card shadow="sm" padding="xl" radius="md" withBorder>
            <Group position="center" mb="md">
              <IconPigMoney size={50} color={theme.colors.orange[6]} />
              <IconHeartHandshake size={50} color={theme.colors.teal[6]} />
              <IconSchool size={50} color={theme.colors.blue[6]} />
            </Group>

            <Title order={3} mb="sm">
              {t('pricingPage.heading')}
            </Title>
            <Text size="lg" mb="md">
              {t('pricingPage.description')}
            </Text>
            <div
              style={{
                height: 200,
                width: 300,
                margin: '0 auto',
                border: `1px solid ${theme.colors.gray[3]}`,
                borderRadius: theme.radius.md,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                src={studentBudgetImage}
                alt={t('pricingPage.imageAlt')}
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
