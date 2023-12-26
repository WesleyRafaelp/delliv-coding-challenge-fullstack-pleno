import React from 'react';
import { Inter } from 'next/font/google';
import NavLink from '@/components/atoms/NavLink';
import SignUpForm from '@/components/molecules/SignUpForm';

const inter = Inter({ subsets: ['latin'] })

const SignUp: React.FC = () => {
  return (
    <main className={`flex h-screen flex-col ${inter.className}`}>
      <div className="flex h-screen flex-col mx-auto p-4 gap-4 justify-center items-center ">
        <h1 className="text-3xl font-bold">Cadastrar</h1>
        <SignUpForm />
        <div className="mt-4">
          <NavLink href="/">
            Ir pra login
          </NavLink>
        </div>
      </div>

    </main>

  );
};

export default SignUp;