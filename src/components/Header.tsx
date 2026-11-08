import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { ButtonLink } from './Button';
import { nav, hero } from '../data/landing';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onLanding = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 모바일 메뉴: Esc로 닫기, 화면이 넓어지면 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia('(min-width: 768px)');
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'border-b border-curve-line bg-white/95 backdrop-blur' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-curve flex h-[68px] items-center justify-between gap-3">
        <Link to="/" className="shrink-0 rounded-md" aria-label="커브 홈으로" onClick={() => setOpen(false)}>
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

        <div className="flex items-center gap-1.5">
          <ButtonLink to="/try" size="sm">
            {hero.primary}
          </ButtonLink>
          {onLanding && (
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full text-curve-ink transition hover:bg-curve-blue-soft md:hidden"
              aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          )}
        </div>
      </div>

      {onLanding && open && (
        <nav id="mobile-menu" aria-label="페이지 내 이동" className="border-t border-curve-line bg-white md:hidden">
          <ul className="container-curve py-2">
            {[...nav, { label: '피드백 남기기', href: '#feedback' }].map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center rounded-xl px-2 text-[17px] font-medium text-curve-ink transition hover:bg-curve-blue-soft hover:text-curve-blue"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
