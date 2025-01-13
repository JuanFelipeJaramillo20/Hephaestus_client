import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <LanguageProvider>
        <Router />
      </LanguageProvider>
    </MantineProvider>
  );
}
