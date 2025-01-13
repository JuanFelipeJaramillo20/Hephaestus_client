import {
  Container,
  Grid,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Alert,
  Group,
} from '@mantine/core';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const { t } = useLanguage(); // Access the translation function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (password !== confirmPassword) {
        setError(t('registerPage.passwordMismatch'));
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8080/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setSuccess(t('registerPage.successMessage'));
        setTimeout(() => navigate('/login'), 3000); // Redirect to login page after 3 seconds
      } else {
        const errorText = await response.text();
        setError(errorText || t('registerPage.error'));
      }
    } catch (err) {
      console.error('Error during registration', err);
      setError(t('registerPage.networkError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" mt="lg" maw={500}>
      <Grid align="center" justify="center">
        <Grid.Col span={12}>
          <Title order={2} align="center" mb="md">
            {t('registerPage.title')}
          </Title>
        </Grid.Col>

        <Grid.Col span={12}>
          {error && (
            <Alert title={t('registerPage.errorTitle')} color="red" mb="lg">
              {error}
            </Alert>
          )}
          {success && (
            <Alert title={t('registerPage.successTitle')} color="green" mb="lg">
              {success}
            </Alert>
          )}
        </Grid.Col>

        <Grid.Col span={12}>
          <TextInput
            label={t('registerPage.emailLabel')}
            placeholder={t('registerPage.emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            mb="sm"
          />
          <PasswordInput
            label={t('registerPage.passwordLabel')}
            placeholder={t('registerPage.passwordPlaceholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            mb="sm"
          />
          <PasswordInput
            label={t('registerPage.confirmPasswordLabel')}
            placeholder={t('registerPage.confirmPasswordPlaceholder')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            mb="sm"
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <Group position="center">
            <Button
              variant="filled"
              color="dark"
              loading={loading}
              onClick={handleRegister}
            >
              {t('registerPage.registerButton')}
            </Button>
            <Button
              variant="outline"
              color="gray"
              onClick={() => navigate('/login')}
            >
              {t('registerPage.backToLoginButton')}
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
