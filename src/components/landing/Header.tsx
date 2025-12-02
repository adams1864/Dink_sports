"use client";

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const RED_COLOR = '#D92323';

// SVG for the Small Logo (Winged Walia Ibex)
const LogoAntelope = () => (
    <svg viewBox="0 0 100 100" fill={RED_COLOR} className="w-9 h-9 md:w-10 md:h-10 transform -scale-x-100">
        {/* Antelope Body and Head */}
        <path d="M70 20 L80 40 L60 70 L20 65 L25 40 L40 30 Z M50 20 Q 55 10 50 0 L 45 10 Z" />
        {/* Curved Horns */}
        <path d="M50 20 Q 70 5 90 20 L 85 30 Q 65 15 50 20 Z" />
        {/* Abstract Wing shape for dynamic movement */}
        <path fill="white" d="M10 40 L30 50 L10 60 Z" />
    </svg>
);

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'SHOP', href: '/products' },
    { name: 'CONTACT US', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && (pathname === '/' || pathname?.endsWith('/'))) return true;
    return pathname?.includes(href) && href !== '/';
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
        <nav className="flex justify-between items-center px-4 sm:px-8 lg:px-16 py-6 max-w-screen-2xl mx-auto relative z-30">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-2">
                <LogoAntelope />
                <div className="flex flex-col items-start">
                    <h1 className="text-xl md:text-2xl font-black tracking-tight leading-none text-gray-900">dink</h1>
                    {/* Note: Tracking set wide to match the image's style */}
                    <p className="text-[0.55rem] font-bold tracking-[0.2em] text-gray-600 uppercase mt-[-3px]">SPORTS WEAR</p>
                </div>
            </Link>

            {/* Navigation Links */}
            <ul className="hidden md:flex gap-10 lg:gap-14 font-medium text-sm tracking-wide">
                {menuItems.map((item) => (
                    <li key={item.name} className="relative cursor-pointer group uppercase text-gray-700 hover:text-[#D92323] transition-colors">
                        <Link href={item.href}>
                            <span className={isActive(item.href) ? 'text-black font-bold' : ''}>{item.name}</span>
                            {/* Red underline detail for active item */}
                            {isActive(item.href) && (
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#D92323]"></span>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Mobile Menu Button */}
            <button 
                className="md:hidden text-gray-900"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg py-4 px-6 flex flex-col gap-4">
                {menuItems.map((item) => (
                    <Link 
                        key={item.name} 
                        href={item.href}
                        className={`text-sm font-bold uppercase tracking-wide ${isActive(item.href) ? 'text-[#D92323]' : 'text-gray-700'}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        )}
    </header>
  );
}
