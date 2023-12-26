import React from 'react';
import OrderForm from '../components/molecules/OrderForm';
import MainLayout from '@/components/templates/MainLayout';
import { Inter } from 'next/font/google'
import { withSessionHOC } from '@/services/auth/session';
const inter = Inter({ subsets: ['latin'] })

const CreateOrderPage: React.FC = () => {
    return (
        <main className={`flex min-h-screen flex-col ${inter.className}`}>
            <MainLayout>
                <OrderForm />
            </MainLayout>
        </main>
    );
};

export default withSessionHOC(CreateOrderPage);