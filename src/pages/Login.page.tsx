import { Container, Grid, TextInput, PasswordInput, Button, Title, Alert, Group } from '@mantine/core';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { t } = useLanguage(); // Access the translation function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.text();
        localStorage.setItem('authToken', result.split(' ')[1]);
        navigate('/generate')
      } else {
        const errorText = await response.text();
        setError(errorText || t('loginPage.error'));
      }
    } catch (err) {
      console.error('Error creating loginPage', err);
      setError(t('loginPage.networkError'));
    } finally {
      setLoading(false);
    }
  };

  const handleContinueWithoutLogin = () => {
    navigate('/generate');
  };

  const handleNavigateToRegister = () => {
    navigate('/register');
  }

  return (
    <Container size="sm" mt="lg" maw={500}>
      <Grid align="center" justify="center">
        <Grid.Col span={12}>
          <Title order={2} align="center" mb="md">
            {t('loginPage.title')}
          </Title>
        </Grid.Col>

        <Grid.Col span={12}>
          {error && (
            <Alert title={t('loginPage.errorTitle')} color="red" mb="lg">
              {error}
            </Alert>
          )}
        </Grid.Col>

        <Grid.Col span={12}>
          <TextInput
            label={t('loginPage.emailLabel')}
            placeholder={t('loginPage.emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            mb="sm"
          />
          <PasswordInput
            label={t('loginPage.passwordLabel')}
            placeholder={t('loginPage.passwordPlaceholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            mb="sm"
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <Group position="center">
            <Button variant="filled" color="dark" loading={loading} onClick={handleLogin}>
              {t('loginPage.loginButton')}
            </Button>
            <Button variant="outline" color="gray" onClick={handleContinueWithoutLogin}>
              {t('loginPage.continueWithoutLoginButton')}
            </Button>
            <Button
              variant="subtle"
              color="blue"
              onClick={handleNavigateToRegister}
            >
              {t('loginPage.registerButton')}
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
