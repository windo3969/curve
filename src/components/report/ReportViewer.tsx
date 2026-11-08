import { useEffect, useRef, useState } from 'react';
import type { Report } from '../../data/types';
import ReportCover from './ReportCover';
import ReportChapter from './ReportChapter';

/**
 * 리포트 전체 보기
 * - 데스크톱: 왼쪽 sticky 목차 + 오른쪽 본문, 스크롤 위치에 따라 현재 장 강조
 * - 모바일: 위쪽 가로 스크롤 탭
 */
export default function ReportViewer({ report, idPrefix = '' }: { report: Report; idPrefix?: string }) {
  const items = [
    { id: `${idPrefix}cover`, short: '표지', label: '표지' },
    ...report.chapters.map((c) => ({ id: `${idPrefix}${c.id}`, short: `${c.number}장`, label: c.title })),
  ];
  const [active, setActive] = useState(items[0].id);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;
    const parts = Array.from(root.querySelectorAll<HTMLElement>('[data-report-part]'));
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top);
          else visible.delete(e.target.id);
        });
        // 화면 위쪽 기준선에 가장 가까운 장을 현재 장으로
        const first = parts.find((p) => visible.has(p.id));
        if (first) setActive(first.id);
      },
      { rootMargin: '-140px 0px -55% 0px', threshold: 0 },
    );
    parts.forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, [report]);

  // 모바일 탭: 현재 탭이 보이도록 가로 스크롤
  useEffect(() => {
    const tab = tabsRef.current?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    const bar = tabsRef.current;
    if (tab && bar) bar.scrollTo({ left: tab.offsetLeft - 16, behavior: 'smooth' });
  }, [active]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    setActive(id);
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <div ref={rootRef} className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
      {/* 모바일 탭 */}
      <div className="sticky top-[68px] z-30 -mx-5 mb-6 border-b border-curve-line bg-white/95 backdrop-blur sm:-mx-8 lg:hidden">
        <div ref={tabsRef} className="no-scrollbar flex gap-1 overflow-x-auto px-5 py-2 sm:px-8" role="tablist" aria-label="리포트 장 이동">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              data-tab={it.id}
              role="tab"
              aria-selected={active === it.id}
              onClick={go(it.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-[15px] font-medium transition ${
                active === it.id ? 'bg-curve-blue text-white' : 'text-curve-text hover:bg-curve-blue-soft'
              }`}
            >
              {it.short}
            </a>
          ))}
        </div>
      </div>

      {/* 데스크톱 목차 */}
      <nav aria-label="리포트 목차" className="hidden lg:block">
        <div className="sticky top-[100px]">
          <p className="mb-3 text-sm font-semibold text-curve-muted">목차</p>
          <ol className="relative space-y-0.5 border-l border-curve-line">
            {items.map((it, i) => {
              const on = active === it.id;
              return (
                <li key={it.id}>
                  <a
                    href={`#${it.id}`}
                    onClick={go(it.id)}
                    aria-current={on ? 'true' : undefined}
                    className={`-ml-px flex gap-2 border-l-2 py-2 pl-4 pr-2 text-[15px] leading-snug transition ${
                      on
                        ? 'border-curve-blue font-semibold text-curve-blue'
                        : 'border-transparent text-curve-text hover:text-curve-ink'
                    }`}
                  >
                    <span className="w-4 shrink-0 tabular-nums">{i === 0 ? '·' : i}</span>
                    <span>{it.label}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </nav>

      {/* 본문 */}
      <div className="mx-auto w-full max-w-[720px] space-y-6 lg:mx-0">
        <ReportCover cover={report.cover} id={`${idPrefix}cover`} />
        {report.chapters.map((c) => (
          <ReportChapter key={c.id} chapter={c} idPrefix={idPrefix} />
        ))}
      </div>
    </div>
  );
}
