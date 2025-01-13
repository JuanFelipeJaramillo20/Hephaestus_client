// @ts-nocheck
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button, TextInput, Textarea, Container, Title, Group, Alert } from '@mantine/core';
import { IconMail } from '@tabler/icons-react';

export const Support = () => {
  const { t } = useLanguage(); // Access the translation function
  const [formValues, setFormValues] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:8080/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        setSuccess(t('support.success'));
        setFormValues({ name: '', email: '', message: '' });
      } else {
        setError(t('support.error'));
      }
    } catch (err) {
      setError(t('support.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container mt="sm">
      <Title order={2} mb="lg">
        {t('support.title')}
      </Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          label={t('support.form.name')}
          placeholder={t('support.form.namePlaceholder')}
          required
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
          mb="md"
        />
        <TextInput
          label={t('support.form.email')}
          placeholder={t('support.form.emailPlaceholder')}
          required
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          mb="md"
        />
        <Textarea
          label={t('support.form.message')}
          placeholder={t('support.form.messagePlaceholder')}
          required
          name="message"
          value={formValues.message}
          onChange={handleInputChange}
          autosize
          minRows={4}
          mb="md"
        />
        {success && <Alert color="green" mb="md">{success}</Alert>}
        {error && <Alert color="red" mb="md">{error}</Alert>}
        <Group position="right">
          <Button type="submit" loading={loading} leftIcon={<IconMail size={16} />}>
            {t('support.form.submit')}
          </Button>
        </Group>
      </form>
    </Container>
  );
};
