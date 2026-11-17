import { ChevronRight, Lightbulb, Pin, Square } from 'lucide-react';
import type { Block, Page } from '../../data/trees';

export type RoadmapPage = {
  id: string;
  number: number;
  title: string;
  /** 상위 항목 제목들(트리 경로) */
  path: string[];
  tag?: string;
  page: Page;
};

/** 고른 항목 하나 = 한 페이지. 블록을 자유롭게 조합해 그려요. */
export default function ReportPage({ data }: { data: RoadmapPage }) {
  const { id, number, title, path, tag, page } = data;
  return (
    <article
      id={id}
      data-report-part={id}
      aria-labelledby={`${id}-title`}
      className="rounded-2xl border border-curve-line bg-white px-5 py-10 sm:px-12 sm:py-12"
    >
      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] font-medium text-curve-muted">
        <span className="font-semibold tabular-nums text-curve-blue">{String(number).padStart(2, '0')}</span>
        {tag && <span className="rounded-md bg-curve-blue-soft px-1.5 py-0.5 text-[12px] font-semibold text-curve-blue">{tag}</span>}
        {path.map((p) => (
          <span key={p} className="inline-flex items-center gap-1.5">
            <span>{p}</span>
            <ChevronRight size={13} aria-hidden="true" />
          </span>
        ))}
      </div>
      <h3 id={`${id}-title`} className="mt-2 text-[24px] font-bold leading-snug tracking-tight sm:text-[28px]">
        {title}
      </h3>

      <div className="mt-6 space-y-4">
        {page.intro.map((p, i) => (
          <p key={i} className="text-[17px] leading-[1.75] text-curve-text">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-8 space-y-6">
        {page.blocks.map((b, i) => (
          <BlockView key={i} block={b} label={title} />
        ))}
      </div>

      {page.sources && page.sources.length > 0 && (
        <div className="mt-8 border-t border-curve-line pt-4">
          <p className="text-[13px] font-medium text-curve-muted">출처</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-[13px] leading-relaxed text-curve-muted">
            {page.sources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      )}
    </article>
  );
}

function BlockTitle({ text }: { text?: string }) {
  return text ? <p className="mb-3 text-[17px] font-semibold text-curve-ink">{text}</p> : null;
}

function BlockView({ block: b, label }: { block: Block; label: string }) {
  switch (b.type) {
    case 'heading':
      return <h4 className="pt-2 text-[19px] font-bold text-curve-ink">{b.text}</h4>;
    case 'text':
      return (
        <div className="space-y-4">
          {b.paragraphs.map((p, i) => (
            <p key={i} className="text-[17px] leading-[1.75] text-curve-text">
              {p}
            </p>
          ))}
        </div>
      );
    case 'table':
      return (
        <div>
          <BlockTitle text={b.title} />
          <div className="overflow-x-auto rounded-xl border border-curve-line" tabIndex={0} role="region" aria-label={b.title ?? `${label} 표`}>
            <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
              <thead className="bg-curve-blue-soft">
                <tr>
                  {b.headers.map((h) => (
                    <th key={h} scope="col" className="whitespace-nowrap px-4 py-3 font-semibold text-curve-ink">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, ri) => (
                  <tr key={ri} className={`border-t border-curve-line ${ri % 2 === 1 ? 'bg-slate-50' : 'bg-white'}`}>
                    {row.map((cell, ci) =>
                      ci === 0 ? (
                        <th key={ci} scope="row" className="px-4 py-3 align-top font-medium text-curve-ink">
                          {cell}
                        </th>
                      ) : (
                        <td key={ci} className="px-4 py-3 align-top text-curve-text">
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case 'steps':
      return (
        <div>
          <BlockTitle text={b.title} />
          <ol className="space-y-3">
            {b.items.map((it, i) => (
              <li key={it.title} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-curve-blue text-[14px] font-bold text-white">
                  {i + 1}
                </span>
                <div className="pt-0.5">
                  <p className="font-semibold text-curve-ink">{it.title}</p>
                  <p className="mt-0.5 text-[16px] leading-relaxed text-curve-text">{it.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      );
    case 'checklist':
      return (
        <div>
          <BlockTitle text={b.title} />
          <ul className="space-y-2">
            {b.items.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-curve-line px-4 py-3 text-[16px]">
                <Square size={18} className="mt-[3px] shrink-0 text-curve-blue" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case 'compare':
      return (
        <div>
          <BlockTitle text={b.title} />
          <div className={`grid gap-3 ${b.columns.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
            {b.columns.map((col) => (
              <div key={col.name} className="rounded-xl border border-curve-line bg-curve-paper p-4">
                <p className="font-semibold text-curve-ink">{col.name}</p>
                <ul className="mt-2 space-y-1.5 text-[15px] leading-relaxed text-curve-text">
                  {col.points.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-curve-blue" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
    case 'timeline':
      return (
        <div>
          <BlockTitle text={b.title} />
          <ol className="relative space-y-4 border-l-2 border-curve-blue-soft pl-6">
            {b.items.map((it) => (
              <li key={it.when} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-curve-blue" aria-hidden="true" />
                <p className="text-[14px] font-semibold text-curve-blue">{it.when}</p>
                <p className="mt-0.5 text-[16px] leading-relaxed text-curve-text">{it.what}</p>
              </li>
            ))}
          </ol>
        </div>
      );
    case 'key':
      return (
        <div className="rounded-r-xl border-l-4 border-curve-blue bg-curve-blue-soft px-5 py-4">
          <p className="flex items-center gap-1.5 text-[13px] font-bold tracking-wide text-curve-blue">
            <Pin size={14} aria-hidden="true" /> 핵심
          </p>
          <p className="mt-1.5 text-[16px] font-medium leading-relaxed text-curve-ink">{b.text}</p>
        </div>
      );
    case 'tip':
      return (
        <div className="rounded-r-xl border-l-4 border-curve-mint bg-[#EDFBF5] px-5 py-4">
          <p className="flex items-center gap-1.5 text-[13px] font-bold tracking-wide text-[#0B7A59]">
            <Lightbulb size={14} aria-hidden="true" /> TIP
          </p>
          <p className="mt-1.5 text-[16px] leading-relaxed text-curve-text">{b.text}</p>
        </div>
      );
    case 'assumption':
      return (
        <p className="flex items-start gap-2 text-[15px] leading-relaxed text-curve-text">
          <span className="mt-[1px] shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-[12px] font-semibold text-slate-600">가정</span>
          <span>{b.text}</span>
        </p>
      );
  }
}
