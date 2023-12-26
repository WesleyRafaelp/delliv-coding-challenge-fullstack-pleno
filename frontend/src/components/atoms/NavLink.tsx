import React from 'react';
import { useRouter } from 'next/router';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const router = useRouter();

  const isActive = router.pathname === href;

  return (
    <a href={href} className={`text-white-700
        hover:text-blue-500
        ${isActive ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent'}
        transition-all duration-300 ease-in-out
        cursor-pointer
        font-semibold
        text-xl
      `}>
      {children}
    </a>
  );
};

export default NavLink;
