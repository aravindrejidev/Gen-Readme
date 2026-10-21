'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Info } from 'lucide-react';

const LINKS = [
  { href: '/', label: 'Generator', Icon: Home },
  { href: '/about', label: 'About', Icon: Info },
];

export default function Navbar() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-[#D4FF3F]/30 bg-[#0B0B0B]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight">
          <span className="text-[#FF2DA8]">README</span>
          <span className="text-[#D4FF3F]"> Forge</span>
        </Link>
        <ul className="flex gap-1">
          {LINKS.map(({ href, label, Icon }) => {
            const active = path === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                    active
                      ? 'bg-[#FF2DA8] text-[#0B0B0B]'
                      : 'text-white/70 hover:text-[#D4FF3F]'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
