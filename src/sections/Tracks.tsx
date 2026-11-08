import { ArrowRight, Check } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import Reveal from '../components/Reveal';
import { tracks } from '../data/landing';

/** 레퍼런스의 "이미지 카드 + 큰 제목" 지그재그 배치 */
export default function Tracks() {
  return (
    <section id="tracks" aria-labelledby="tracks-title" className="py-20 sm:py-28">
      <div className="container-curve">
        <Reveal className="text-center">
          <h2 id="tracks-title" className="section-title">
            {tracks.title}
          </h2>
          <p className="body-lg mt-4 text-curve-text">{tracks.subtitle}</p>
        </Reveal>

        <div className="mt-14 space-y-16 sm:space-y-20">
          {tracks.items.map((t, i) => (
            <div key={t.name} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
              <Reveal className={i % 2 ? 'md:order-2' : ''}>
                <TrackArt kind={i === 0 ? 'explore' : 'prepare'} />
              </Reveal>
              <Reveal delay={100}>
                <p className="text-[15px] font-semibold text-curve-blue">{t.when} →</p>
                <h3 className="mt-2 text-[30px] font-bold tracking-tight sm:text-[36px]">{t.name}</h3>
                <ul className="mt-6 space-y-3">
                  {t.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[17px] leading-[1.6]">
                      <Check size={20} className="mt-[3px] shrink-0 text-curve-blue" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
                <ButtonLink to="/try" className="mt-8">
                  내 커브 그려 보기 <ArrowRight size={17} aria-hidden="true" />
                </ButtonLink>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 사진 대신 쓰는 추상 일러스트 카드 */
function TrackArt({ kind }: { kind: 'explore' | 'prepare' }) {
  const label =
    kind === 'explore'
      ? '여러 갈래의 작은 곡선이 퍼져 나가는 탐색형 커브 일러스트'
      : '목표 지점까지 단계별로 오르는 준비형 커브 일러스트';
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-curve-blue-soft" role="img" aria-label={label}>
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id={`grid-${kind}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="#2F6BFF" strokeOpacity="0.08" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill={`url(#grid-${kind})`} />
        {kind === 'explore' ? (
          <>
            <circle cx="70" cy="240" r="9" fill="#2F6BFF" />
            {[
              'M70 240 C 150 236, 200 170, 330 70',
              'M70 240 C 160 238, 230 200, 340 150',
              'M70 240 C 140 230, 160 120, 250 50',
            ].map((d, i) => (
              <path key={d} d={d} fill="none" stroke="#2F6BFF" strokeWidth={i === 0 ? 3 : 2} strokeOpacity={i === 0 ? 1 : 0.45} strokeDasharray={i === 0 ? undefined : '5 6'} strokeLinecap="round" />
            ))}
            {[
              [330, 70],
              [340, 150],
              [250, 50],
            ].map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <circle cx={x} cy={y} r="16" fill="#fff" stroke="#2F6BFF" strokeOpacity="0.4" />
                <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#2F6BFF">?</text>
              </g>
            ))}
          </>
        ) : (
          <>
            <path d="M50 250 C 160 246, 220 150, 350 60" fill="none" stroke="#2F6BFF" strokeWidth="3" strokeLinecap="round" />
            {[
              [110, 240, '1'],
              [190, 200, '2'],
              [260, 135, '3'],
            ].map(([x, y, n]) => (
              <g key={n as string}>
                <circle cx={x as number} cy={y as number} r="15" fill="#fff" stroke="#2F6BFF" strokeWidth="2" />
                <text x={x as number} y={(y as number) + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#2F6BFF">{n}</text>
              </g>
            ))}
            <g>
              <line x1="350" y1="60" x2="350" y2="22" stroke="#0E2463" strokeWidth="2" />
              <path d="M350 22 L378 31 L350 40 Z" fill="#2F6BFF" />
              <circle cx="350" cy="60" r="6" fill="#0E2463" />
            </g>
          </>
        )}
      </svg>
    </div>
  );
}
