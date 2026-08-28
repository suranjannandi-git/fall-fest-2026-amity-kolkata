'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/resources', label: 'Resources' },
    { href: '/speakers', label: 'Speakers' },
    { href: '/team', label: 'Organizers' },
    { href: '/supporters', label: 'Supporters' },
    { href: '/about', label: 'About Us' },
    { href: '/register', label: 'Register', highlight: true },
  ];

  return (
    <nav className="bg-[#0f385f] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/Qiskit_02 - logo.png"
              alt="Qiskit Fall Fest 2026"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded transition-all duration-200 font-semibold text-sm uppercase tracking-wide ${
                  link.highlight
                    ? 'bg-[#dba921] text-[#0f385f] hover:bg-[#fecc00] font-bold'
                    : 'hover:text-[#dba921]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded hover:text-[#dba921] transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-1 border-t border-white/10 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded transition-all duration-200 font-semibold text-sm uppercase tracking-wide ${
                  link.highlight
                    ? 'bg-[#dba921] text-[#0f385f] font-bold text-center'
                    : 'hover:text-[#dba921]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
