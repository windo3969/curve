import { Mail } from 'lucide-react';
import Logo from './Logo';
import { footer } from '../data/landing';

/** 레퍼런스 디자인처럼 짙은 마지막 패널 안쪽 하단에 놓이는 푸터 */
export default function Footer({ onDark = true }: { onDark?: boolean }) {
  const muted = onDark ? 'text-white/70' : 'text-curve-muted';
  const line = onDark ? 'border-white/15' : 'border-curve-line';
  return (
    <footer className={`border-t ${line} pt-8`}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <Logo tone={onDark ? 'light' : 'dark'} />
          <p className={`text-[15px] ${muted}`}>{footer.intro}</p>
        </div>
        <div className={`flex flex-col gap-3 text-[15px] md:items-end ${muted}`}>
          <a
            href={`mailto:${footer.email}`}
            className={`inline-flex items-center gap-2 underline-offset-4 hover:underline ${onDark ? 'hover:text-white' : 'hover:text-curve-ink'}`}
          >
            <Mail size={16} aria-hidden="true" /> {footer.email}
          </a>
          <div className="flex items-center gap-4">
            <a href="#" className={`underline-offset-4 hover:underline ${onDark ? 'hover:text-white' : 'hover:text-curve-ink'}`}>
              {footer.privacy}
            </a>
            <span>{footer.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
