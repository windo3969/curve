import { Lightbulb, Pin, Square } from 'lucide-react';
import type { ReportChapter as Chapter } from '../../data/types';

/** 리포트 한 장(章). 메인 샘플 리포트와 /try 결과 화면에서 함께 써요. */
export default function ReportChapter({ chapter, idPrefix = '' }: { chapter: Chapter; idPrefix?: string }) {
  const c = chapter;
  return (
    <article
      id={`${idPrefix}${c.id}`}
      data-report-part={c.id}
      aria-labelledby={`${idPrefix}${c.id}-title`}
      className="rounded-2xl border border-curve-line bg-white px-5 py-10 sm:px-12 sm:py-12"
    >
      {/* 1. 장 번호와 제목 */}
      <p className="text-sm font-semibold tabular-nums text-curve-blue">{String(c.number).padStart(2, '0')}장</p>
      <h3 id={`${idPrefix}${c.id}-title`} className="mt-2 text-[24px] font-bold leading-snug tracking-tight sm:text-[28px]">
        {c.title}
      </h3>

      {/* 2. 이론 한 줄 */}
      <div className="mt-6 border-y border-curve-line py-4">
        <p className="text-[13px] font-medium text-curve-muted">이번 장의 관점</p>
        <p className="mt-1 text-[16px] leading-relaxed text-curve-text">
          <strong className="font-semibold text-curve-ink">{c.theory.name}.</strong> {c.theory.line}
        </p>
      </div>

      {/* 3. 본문 */}
      <div className="mt-6 space-y-4">
        {c.paragraphs.map((p, i) => (
          <p key={i} className="text-[17px] leading-[1.75] text-curve-text">
            {p}
          </p>
        ))}
      </div>

      {/* 4. 표 */}
      {c.table && (
        <div className="mt-8 overflow-x-auto rounded-xl border border-curve-line" tabIndex={0} role="region" aria-label={`${c.title} 표`}>
          <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
            <thead className="bg-curve-blue-soft">
              <tr>
                {c.table.headers.map((h) => (
                  <th key={h} scope="col" className="whitespace-nowrap px-4 py-3 font-semibold text-curve-ink">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.table.rows.map((row, ri) => (
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
      )}

      {/* 체크리스트(7장) */}
      {c.checklist && (
        <div className="mt-8">
          <p className="text-[17px] font-semibold text-curve-ink">{c.checklist.title}</p>
          <ul className="mt-3 space-y-2">
            {c.checklist.items.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-curve-line px-4 py-3 text-[16px]">
                <Square size={18} className="mt-[3px] shrink-0 text-curve-blue" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 5. 핵심 박스 */}
      <div className="mt-8 rounded-r-xl border-l-4 border-curve-blue bg-curve-blue-soft px-5 py-4">
        <p className="flex items-center gap-1.5 text-[13px] font-bold tracking-wide text-curve-blue">
          <Pin size={14} aria-hidden="true" /> 핵심
        </p>
        <p className="mt-1.5 text-[16px] font-medium leading-relaxed text-curve-ink">{c.keyPoint}</p>
      </div>

      {/* 6. TIP 박스 */}
      <div className="mt-4 rounded-r-xl border-l-4 border-curve-mint bg-[#EDFBF5] px-5 py-4">
        <p className="flex items-center gap-1.5 text-[13px] font-bold tracking-wide text-[#0B7A59]">
          <Lightbulb size={14} aria-hidden="true" /> TIP
        </p>
        <p className="mt-1.5 text-[16px] leading-relaxed text-curve-text">{c.tip}</p>
      </div>

      {/* 7. 가정 표기 */}
      {c.assumption && (
        <p className="mt-6 flex items-start gap-2 text-[15px] leading-relaxed text-curve-text">
          <span className="mt-[1px] shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-[12px] font-semibold text-slate-600">가정</span>
          <span>{c.assumption}</span>
        </p>
      )}

      {/* 8. 출처 */}
      <div className="mt-8 border-t border-curve-line pt-4">
        <p className="text-[13px] font-medium text-curve-muted">출처</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-[13px] leading-relaxed text-curve-muted">
          {c.sources.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
    </article>
  );
}
