import React from 'react';
import LoginForm from '../components/molecules/LoginForm';
import { Inter } from 'next/font/google';
import NavLink from '@/components/atoms/NavLink';

const inter = Inter({ subsets: ['latin'] })

const Login: React.FC = () => {
  return (
    <main className={`flex h-screen flex-col ${inter.className}`}>
      <div className="flex h-screen flex-col mx-auto p-4 gap-4 justify-center items-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <LoginForm />
        <div className="mt-4">
          <NavLink href="/signup">
            Cadastre-se aqui.
          </NavLink>
        </div>
      </div>

    </main>
  );
};

export default Login;
