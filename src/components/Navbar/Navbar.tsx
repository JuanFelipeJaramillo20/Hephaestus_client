import React from 'react';
import { Grid, Image, Text, useMantineTheme, Anchor } from '@mantine/core';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle/LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';
import logo from '@/assets/logo.jpg';

export const Navbar = () => {
  const theme = useMantineTheme(); // Access the current theme
  const { t } = useLanguage(); // Access the `t` function from the context

  return (
    <div
      style={{
        padding: '1rem 2rem',
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[5]
            : theme.colors.gray[2]
        }`,
        boxShadow:
          theme.colorScheme === 'dark'
            ? '0 2px 4px rgba(0, 0, 0, 0.6)'
            : '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Grid align="center" justify="space-between">
        {/* Logo and Project Title */}
        <Grid.Col span="content">
          <Anchor href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Image src={logo} alt="Logo" h={60} w={60} fit="contain" radius="md" />
            <Text
              ml="md"
              size="lg"
              weight={700}
              style={{
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.gray[0]
                    : theme.colors.dark[9],
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              Hephaestus
            </Text>
          </Anchor>
        </Grid.Col>

        {/* Navigation Links */}
        <Grid.Col span="auto" style={{ textAlign: 'right' }}>
          <nav
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            <a
              href="/login"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: '500',
                padding: '0.5rem',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = theme.colors.blue[6])
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'inherit')
              }
            >
              {t('navbar.getStarted')}
            </a>
            <a
              href="/features"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: '500',
                padding: '0.5rem',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = theme.colors.blue[6])
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'inherit')
              }
            >
              {t('navbar.features')}
            </a>
            <a
              href="/pricing"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: '500',
                padding: '0.5rem',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = theme.colors.blue[6])
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'inherit')
              }
            >
              {t('navbar.pricing')}
            </a>
            <a
              href="/support"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: '500',
                padding: '0.5rem',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = theme.colors.blue[6])
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'inherit')
              }
            >
              {t('navbar.support')}
            </a>

            {/* Toggles */}
            <LanguageToggle />
            <ColorSchemeToggle />
          </nav>
        </Grid.Col>
      </Grid>
    </div>
  );
};
