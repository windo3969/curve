import { FileText, Search, UserRound, type LucideIcon } from 'lucide-react';
import Reveal from '../components/Reveal';
import { how } from '../data/landing';

const icons: LucideIcon[] = [UserRound, Search, FileText];

export default function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="py-20 sm:py-28">
      <div className="container-curve">
        <Reveal className="text-center">
          <p className="eyebrow">{how.eyebrow}</p>
          <h2 id="how-title" className="section-title mt-3">
            {how.title}
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-6 md:grid-cols-3 md:gap-10">
          {how.steps.map((s, i) => {
            const Icon = icons[i];
            return (
              <Reveal as="li" key={s.title} delay={i * 120} className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-curve-blue text-white">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-curve-muted">STEP {i + 1}</span>
                </div>
                <h3 className="mt-5 text-[21px] font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[16px] leading-[1.7] text-curve-text">{s.body}</p>

                {/* 단계 사이 곡선 화살표 */}
                {i < how.steps.length - 1 && <StepArrow />}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function StepArrow() {
  return (
    <>
      {/* 데스크톱: 오른쪽으로 오르는 곡선 */}
      <svg
        viewBox="0 0 80 40"
        className="absolute -right-[58px] top-1 hidden h-10 w-20 md:block"
        aria-hidden="true"
      >
        <path d="M4 34 C 30 34, 44 10, 70 8" fill="none" stroke="#2F6BFF" strokeOpacity="0.5" strokeWidth="1.6" strokeDasharray="3 4" strokeLinecap="round" />
        <path d="M64 3 L71 8 L64 13" fill="none" stroke="#2F6BFF" strokeOpacity="0.6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* 모바일: 아래로 내려가는 곡선 */}
      <svg viewBox="0 0 40 40" className="mx-6 mt-4 h-8 w-8 md:hidden" aria-hidden="true">
        <path d="M8 4 C 8 22, 28 18, 28 34" fill="none" stroke="#2F6BFF" strokeOpacity="0.5" strokeWidth="1.6" strokeDasharray="3 4" strokeLinecap="round" />
        <path d="M23 29 L28 35 L33 29" fill="none" stroke="#2F6BFF" strokeOpacity="0.6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
}
