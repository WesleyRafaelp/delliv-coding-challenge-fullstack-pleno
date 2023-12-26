import Image from 'next/image'
import { Inter } from 'next/font/google'
import MainLayout from '@/components/templates/MainLayout'
import OrderList from '@/components/organisms/OrderList'
import { withSessionHOC } from '@/services/auth/session'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
    <main className={`flex min-h-screen flex-col ${inter.className}`}>
      <MainLayout>
        <OrderList />
      </MainLayout>

    </main>
  )
}

export default withSessionHOC(Home);