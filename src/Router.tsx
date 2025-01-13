import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { Generate } from '@/pages/Generate.page';
import { Login } from '@/pages/Login.page';
import { MainLayout } from '@/components/MainLayout/MainLayout';
import { Support } from '@/pages/Support.page';
import { Features } from '@/pages/Features.page';
import { Pricing } from '@/pages/Pricing.page';
import { Register } from '@/pages/Register.page';
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <HomePage />
      </MainLayout>
    ),
  },
  {
    path: '/generate',
    element: (
      <MainLayout>
        <Generate />
      </MainLayout>
    ),
  },
  {
    path: '/login',
    element: (
      <MainLayout>
        <Login />
      </MainLayout>
    ),
  },
  {
    path: '/support',
    element: (
      <MainLayout>
        <Support />
      </MainLayout>
    ),
  },
  {
    path: '/features',
    element: (
      <MainLayout>
        <Features />
      </MainLayout>
    ),
  },
  {
    path: '/pricing',
    element: (
      <MainLayout>
        <Pricing />
      </MainLayout>
    ),
  },
  {
    path: '/register',
    element: (
      <MainLayout>
        <Register />
      </MainLayout>
    ),
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
