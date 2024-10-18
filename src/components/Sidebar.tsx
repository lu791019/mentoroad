import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  { name: 'Home', href: '/', icon: '🏠' },
  { name: 'Bookings', href: '/booking', icon: '📅' },
  { name: 'Products', href: '/products', icon: '📚' },
  { name: 'Subscriptions', href: '/subscriptions', icon: '🔁' },
  { name: 'Webinars', href: '/webinars', icon: '🎥' },
];

const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="bg-white w-64 h-full shadow-lg">
      <div className="p-4">
        <img src="/logo.png" alt="Topmate" className="h-8" />
      </div>
      <ul className="mt-6">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link href={item.href}>
              <a className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                router.pathname === item.href ? 'bg-gray-100' : ''
              }`}>
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;