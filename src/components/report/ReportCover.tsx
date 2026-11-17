export type CoverData = {
  title: string;
  studentLine: string;
  toc: { number?: number; title: string; depth?: number }[];
  /** 표지에 보여 줄 입력 요약(관심 우선순위, 1년 계획 등) */
  meta?: { label: string; value: string }[];
};

export default function ReportCover({ cover, id = 'cover' }: { cover: CoverData; id?: string }) {
  return (
    <article
      id={id}
      data-report-part="cover"
      aria-label="표지"
      className="relative overflow-hidden rounded-2xl border border-curve-line bg-white px-6 py-12 sm:px-12 sm:py-16"
    >
      <svg
        viewBox="0 0 600 300"
        className="pointer-events-none absolute -right-10 bottom-0 w-[85%] opacity-90"
        aria-hidden="true"
      >
        <path d="M0 290 C 260 280, 330 90, 600 20" fill="none" stroke="#EAF0FF" strokeWidth="44" strokeLinecap="round" />
        <path d="M0 290 C 260 280, 330 90, 600 20" fill="none" stroke="#2F6BFF" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <div className="relative">
        <p className="text-sm font-semibold tracking-wide text-curve-blue">CURVE ROADMAP · 표지</p>
        <h3 className="mt-5 text-[28px] font-bold leading-tight tracking-tight sm:text-[36px]">{cover.title}</h3>
        <p className="mt-3 text-[16px] text-curve-muted sm:text-[17px]">{cover.studentLine}</p>

        {cover.meta && cover.meta.length > 0 && (
          <dl className="mt-6 grid gap-x-6 gap-y-2 text-[15px] sm:grid-cols-[auto_1fr]">
            {cover.meta.map((m) => (
              <div key={m.label} className="contents">
                <dt className="font-medium text-curve-muted">{m.label}</dt>
                <dd className="text-curve-text">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-10 max-w-[440px] rounded-xl border border-curve-line bg-white/90 p-5 backdrop-blur-sm">
          <p className="text-sm font-semibold text-curve-ink">목차</p>
          <ol className="mt-3 space-y-2 text-[15px] text-curve-text">
            {cover.toc.map((t, i) => (
              <li key={`${t.title}-${i}`} className="flex gap-3" style={t.depth ? { paddingLeft: `${t.depth * 16}px` } : undefined}>
                <span className="w-5 shrink-0 font-semibold tabular-nums text-curve-blue">{t.number ?? i + 1}</span>
                <span>
                  {t.depth ? <span className="mr-1 text-curve-muted" aria-hidden="true">└</span> : null}
                  {t.title}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}
