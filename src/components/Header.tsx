import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { ButtonLink } from './Button';
import { nav, hero } from '../data/landing';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const onLanding = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-curve-line bg-white/95 backdrop-blur' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-curve flex h-[68px] items-center justify-between gap-4">
        <Link to="/" className="shrink-0 rounded-md" aria-label="커브 홈으로">
          <Logo />
        </Link>

        {onLanding && (
          <nav
            aria-label="페이지 내 이동"
            className="hidden items-center gap-1 rounded-full border border-curve-line bg-white/90 p-1 md:flex"
          >
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-full px-4 py-2 text-[15px] font-medium text-curve-text transition hover:bg-curve-blue-soft hover:text-curve-blue"
              >
                {n.label}
              </a>
            ))}
          </nav>
        )}

        <ButtonLink to="/try" size="sm">
          {hero.primary}
        </ButtonLink>
      </div>
    </header>
  );
}
