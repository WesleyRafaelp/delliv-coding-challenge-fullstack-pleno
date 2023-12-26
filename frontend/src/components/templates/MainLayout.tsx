import React from 'react';
import Navbar from '../molecules/NavBar';

const MainLayout = ({ children }: any) => {
  return (
    <div className="flex flex-col mx-auto p-4 gap-4">
     
      <header>
        <h1 className="text-3xl font-bold">Sistema de Rastreamento de Entregas</h1>
      </header>
      <Navbar/>
      <main>{children}</main>
      <footer>
        <p>&copy; 2023 Sistema de Rastreamento de Entregas</p>
      </footer>
    </div>
  );
};

export default MainLayout;
