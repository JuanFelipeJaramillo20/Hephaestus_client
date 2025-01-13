// @ts-nocheck
import {
  Container,
  Grid,
  Title,
  Text,
  Input,
  Button,
  Anchor,
  Divider,
  Image,
  Notification
} from '@mantine/core';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandYoutube,
} from '@tabler/icons-react';
import { useLanguage } from '@/context/LanguageContext';
import logo from '../../assets/logo.jpg';
import { useState } from 'react';

const Footer = () => {
  const { t } = useLanguage(); // Access the translation function
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubscribe = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setStatus('error');
    }
  };


  return (
    <Container fluid style={{ borderTop: '1px solid #eaeaea', padding: '20px' }} mt="md">
      {/* Top Section */}
      <Grid gutter="lg" justify="space-between" align="flex-start">
        {/* Logo and Newsletter */}
        <Grid.Col span={6}>
          <Image src={logo} alt="Logo" h={60} w={60} fit="contain" radius="md" />
          <Text size="sm" mb="sm">
            {t('footer.newsletterDescription')}
          </Text>
          <Grid>
            <Grid.Col span={8}>
              <Input
                size="sm"
                placeholder={t('footer.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Button variant="outline" onClick={handleSubscribe}>
                {t('footer.join')}
              </Button>
            </Grid.Col>
          </Grid>
          {status === 'success' && (
            <Notification title={t('footer.success')} color="green" mt="sm">
              {t('footer.subscriptionSuccess')} {t('footer.confirmationEmailSent')}
            </Notification>
          )}
          {status === 'error' && (
            <Notification title={t('footer.error')} color="red" mt="sm">
              {t('footer.subscriptionError')}
            </Notification>
          )}
          <Text size="xs" mt="xs" color="dimmed">
            {t('footer.privacyDisclaimer')}
          </Text>
        </Grid.Col>

        {/* Helpful Links */}
        <Grid.Col span={2} style={{ display: 'flex', flexDirection: 'column' }}>
          <Title order={5} mb="xs">
            {t('footer.helpfulLinks')}
          </Title>
          <Anchor href="#getting-started" size="sm">
            {t('footer.gettingStarted')}
          </Anchor>
          <Anchor href="/support" size="sm">
            {t('footer.supportCenter')}
          </Anchor>
          <Anchor href="#documentation" size="sm">
            {t('footer.documentation')}
          </Anchor>
        </Grid.Col>

        {/* Resources */}
        <Grid.Col span={2} style={{ display: 'flex', flexDirection: 'column' }}>
          <Title order={5} mb="xs">
            {t('footer.resources')}
          </Title>
          <Anchor href="#blog-posts" size="sm">
            {t('footer.blogPosts')}
          </Anchor>
          <Anchor href="#webinars" size="sm">
            {t('footer.webinars')}
          </Anchor>
          <Anchor href="#case-studies" size="sm">
            {t('footer.caseStudies')}
          </Anchor>
          <Anchor href="#success-stories" size="sm">
            {t('footer.successStories')}
          </Anchor>
          <Anchor href="#user-guides" size="sm">
            {t('footer.userGuides')}
          </Anchor>
        </Grid.Col>

        {/* Social Media Links */}
        <Grid.Col span={2} style={{ display: 'flex', flexDirection: 'column' }}>
          <Title order={5} mb="xs">
            {t('footer.connectWithUs')}
          </Title>
          <Anchor href="https://www.youtube.com/watch?v=0-M0t1nQnWQ" size="sm" mb="xs" target="_blank" rel="noopener noreferrer">
            <IconBrandFacebook size={16} /> {t('footer.facebook')}
          </Anchor>
          <Anchor href="https://www.youtube.com/watch?v=ro1asnqR3Bs" size="sm" mb="xs" target="_blank" rel="noopener noreferrer">
            <IconBrandInstagram size={16} /> {t('footer.instagram')}
          </Anchor>
          <Anchor href="https://www.youtube.com/watch?v=qPdPjWkJZF8" size="sm" mb="xs" target="_blank" rel="noopener noreferrer">
            <IconBrandTwitter size={16} /> {t('footer.twitter')}
          </Anchor>
          <Anchor href="https://www.linkedin.com/in/juan-felipe-jaramillo-losada/" size="sm" mb="xs" target="_blank" rel="noopener noreferrer">
            <IconBrandLinkedin size={16} /> {t('footer.linkedin')}
          </Anchor>
          <Anchor href="https://www.youtube.com/watch?v=mLW35YMzELE" size="sm" mb="xs" target="_blank" rel="noopener noreferrer">
            <IconBrandYoutube size={16} /> {t('footer.youtube')}
          </Anchor>
        </Grid.Col>
      </Grid>

      <Divider my="lg" />

      {/* Bottom Section */}
      <Grid justify="space-between" align="center">
        <Grid.Col md={6} sm={12}>
          <Text size="xs" color="dimmed">
            {t('footer.copyright')}
          </Text>
        </Grid.Col>
        <Grid.Col
          md={6}
          sm={12}
          style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
        >
          <Anchor href="#privacy-policy" size="xs">
            {t('footer.privacyPolicy')}
          </Anchor>
          <Anchor href="#terms-of-service" size="xs">
            {t('footer.termsOfService')}
          </Anchor>
          <Anchor href="#cookie-settings" size="xs">
            {t('footer.cookieSettings')}
          </Anchor>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Footer;
