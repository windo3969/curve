import { BookOpenCheck, Fingerprint, Layers, RefreshCw, School, type LucideIcon } from 'lucide-react';
import Reveal from '../components/Reveal';
import { promise } from '../data/landing';

const icons: Record<string, LucideIcon> = {
  school: School,
  refresh: RefreshCw,
  file: BookOpenCheck,
  layers: Layers,
  sparkle: Fingerprint,
};

/** 레퍼런스의 짙은 라운드 패널 + 라인 아이콘 그리드 */
export default function PromiseSection() {
  return (
    <section id="promise" aria-labelledby="promise-title" className="px-3 sm:px-5">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[28px] bg-curve-deep py-20 text-white sm:rounded-[48px] sm:py-28">
        <svg viewBox="0 0 1280 500" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M-20 480 C 420 470, 640 260, 1300 40" fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="container-curve relative">
          <Reveal className="mx-auto max-w-[640px] text-center">
            <h2 id="promise-title" className="section-title !text-white">
              {promise.title}
            </h2>
            <p className="body-lg mt-4 text-white/75">{promise.subtitle}</p>
          </Reveal>

          <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {promise.items.map((it, i) => {
              const Icon = icons[it.icon];
              return (
                <Reveal as="li" key={it.title} delay={i * 80} className="text-center">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-white/25 text-white">
                    <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-[18px] font-bold !text-white">{it.title}</h3>
                  <p className="mx-auto mt-2 max-w-[22em] text-[15px] leading-[1.7] text-white/75">{it.body}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
