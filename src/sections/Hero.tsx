import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { hero } from '../data/landing';
import { sampleReport } from '../data/sampleReport';

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="px-3 pt-[76px] sm:px-5">
      {/* 레퍼런스의 큰 라운드 히어로 프레임 */}
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[28px] bg-curve-paper sm:rounded-[40px]">
        {/* 배경 성장 곡선 */}
        <svg
          viewBox="0 0 1280 640"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            className="curve-draw"
            style={{ ['--len' as string]: 1700 }}
            d="M-20 620 C 420 600, 620 330, 1300 60"
            fill="none"
            stroke="#DCE6FF"
            strokeWidth="70"
            strokeLinecap="round"
          />
          <path
            className="curve-draw"
            style={{ ['--len' as string]: 1700, ['--delay' as string]: '0.15s' }}
            d="M-20 620 C 420 600, 620 330, 1300 60"
            fill="none"
            stroke="#2F6BFF"
            strokeOpacity="0.55"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative grid items-center gap-8 px-6 pb-10 pt-10 sm:gap-12 sm:px-12 sm:pb-14 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-16 lg:pb-20">
          <div>
            <p className="fade-up inline-flex items-center gap-2 rounded-full border border-curve-blue/20 bg-white px-3.5 py-1.5 text-[14px] font-semibold text-curve-blue">
              <span className="h-1.5 w-1.5 rounded-full bg-curve-blue" aria-hidden="true" />
              {hero.badge}
            </p>
            <h1
              id="hero-title"
              className="fade-up mt-6 text-[36px] font-bold leading-[1.15] tracking-tight sm:text-[52px] lg:text-[62px]"
              style={{ ['--delay' as string]: '0.08s' }}
            >
              {hero.title}
            </h1>
            <p className="fade-up body-lg mt-5 max-w-[30em] text-curve-text" style={{ ['--delay' as string]: '0.16s' }}>
              {hero.subtitle}
            </p>
            <div className="fade-up mt-8 flex flex-wrap gap-3" style={{ ['--delay' as string]: '0.24s' }}>
              <ButtonLink to="/try" size="lg">
                {hero.primary} <ArrowRight size={18} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink to="#sample" variant="outline" size="lg">
                {hero.secondary}
              </ButtonLink>
            </div>
            <p className="fade-up mt-6 text-[14px] font-medium text-curve-muted sm:mt-8" style={{ ['--delay' as string]: '0.32s' }}>
              {hero.strip}
            </p>
          </div>

          <CoverStack />
        </div>
      </div>
    </section>
  );
}

/** 살짝 기울어 겹친 리포트 문서 카드 목업 */
function CoverStack() {
  const { cover, chapters } = sampleReport;
  return (
    <div
      className="fade-up relative mx-auto h-[270px] w-full max-w-[340px] sm:h-[420px] sm:max-w-[400px]"
      style={{ ['--delay' as string]: '0.3s' }}
      role="img"
      aria-label="커브 로드맵 리포트 표지와 본문 페이지가 겹쳐 있는 미리보기"
    >
      {/* 뒤 장: 2장 표 */}
      <div className="absolute left-[12%] top-4 h-[230px] w-[72%] rotate-[8deg] sm:top-6 rounded-2xl border border-curve-line bg-white p-5 shadow-[0_10px_30px_-18px_rgba(17,24,39,0.25)] sm:h-[350px]">
        <p className="hidden text-[11px] font-semibold text-curve-blue sm:block">02장</p>
        <p className="mt-1 hidden text-[14px] font-bold text-curve-ink sm:block">{chapters[1].title}</p>
        <div className="mt-4 hidden overflow-hidden sm:block rounded-lg border border-curve-line text-[10px]">
          <div className="grid grid-cols-3 bg-curve-blue-soft px-2 py-1.5 font-semibold text-curve-ink">
            {chapters[1].table!.headers.map((h) => (
              <span key={h} className="truncate">{h}</span>
            ))}
          </div>
          {chapters[1].table!.rows.slice(0, 3).map((r, i) => (
            <div key={i} className={`grid grid-cols-3 gap-1 px-2 py-1.5 ${i % 2 ? 'bg-slate-50' : ''}`}>
              {r.map((c, j) => (
                <span key={j} className="truncate text-curve-text">{c}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 중간 장: 7장 체크리스트 */}
      <div className="absolute left-[2%] top-10 hidden h-[300px] w-[72%] sm:block -rotate-[6deg] rounded-2xl border border-curve-line bg-white p-5 shadow-[0_10px_30px_-18px_rgba(17,24,39,0.25)] sm:h-[350px]">
        <p className="text-[11px] font-semibold text-curve-blue">07장</p>
        <p className="mt-1 text-[14px] font-bold text-curve-ink">이번 주 체크리스트</p>
        <ul className="mt-4 space-y-2">
          {chapters[6].checklist!.items.slice(0, 4).map((it) => (
            <li key={it} className="flex items-start gap-2 text-[11px] leading-snug text-curve-text">
              <span className="mt-[2px] h-3 w-3 shrink-0 rounded-[3px] border border-curve-blue" />
              {it}
            </li>
          ))}
        </ul>
      </div>

      {/* 앞 장: 표지 */}
      <div className="absolute right-0 top-0 h-[250px] w-[78%] rotate-[1.5deg] overflow-hidden rounded-2xl border border-curve-line bg-white p-5 sm:w-[74%] sm:p-6 shadow-[0_18px_40px_-20px_rgba(17,24,39,0.3)] sm:h-[370px]">
        <svg viewBox="0 0 300 200" className="absolute -right-4 bottom-0 w-[95%]" aria-hidden="true">
          <path d="M0 195 C 120 190, 160 70, 300 14" fill="none" stroke="#EAF0FF" strokeWidth="28" strokeLinecap="round" />
          <path d="M0 195 C 120 190, 160 70, 300 14" fill="none" stroke="#2F6BFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p className="text-[10px] font-semibold tracking-wider text-curve-blue">CURVE ROADMAP</p>
        <p className="mt-4 text-[20px] font-bold leading-tight text-curve-ink">{cover.title}</p>
        <p className="mt-2 text-[11px] text-curve-muted">{cover.studentLine}</p>
        <ol className="relative mt-4 space-y-1 text-[11px] text-curve-text sm:mt-6">
          {cover.toc.slice(0, 5).map((t) => (
            <li key={t.number} className={t.number > 3 ? 'hidden sm:list-item' : ''}>
              <span className="mr-1.5 font-semibold text-curve-blue">{t.number}</span>
              {t.title}
            </li>
          ))}
          <li className="text-curve-muted">…</li>
        </ol>
      </div>
    </div>
  );
}
