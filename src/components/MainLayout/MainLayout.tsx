// @ts-nocheck
import React from 'react';
import { Container } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Container fluid>
      <Navbar />
      {children}
      <Footer />
    </Container>
  );
};
