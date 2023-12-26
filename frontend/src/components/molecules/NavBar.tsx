import React from 'react';
import { authService } from '@/services/auth/auth-service';
import NavLink from '../atoms/NavLink';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const router = useRouter()

  const onClick = async () => {
    try {
      await authService.logout()
      router.push('/');
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <nav className="bg-gray-700 p-4 flex justify-between">
      <ul className="flex items-center space-x-4 text-white">
        <li>
          <NavLink href="/home">Lista de Pedidos</NavLink>
        </li>
        <li>
          <NavLink href="/create-order">Criar Pedido</NavLink>
        </li>
      </ul>
      <button
        onClick={onClick}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Sair
      </button>
    </nav>
  );
};

export default Navbar;
