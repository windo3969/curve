import { Check } from 'lucide-react';
import { inTreeOrder, indexTree, type TreeNode } from '../../data/trees';

/** 샘플 학생이 어떤 경로로 목차를 골랐는지 보여 주는 읽기 전용 카드 */
export default function PickedPathCard({ name, roots, picked }: { name: string; roots: TreeNode[]; picked: string[] }) {
  const index = indexTree(roots);
  const ordered = inTreeOrder(roots, picked);
  const set = new Set(picked);

  return (
    <div className="rounded-2xl border border-curve-line bg-white p-5 sm:p-8">
      <p className="text-[17px] font-bold text-curve-ink">{name} 님은 이렇게 골랐어요</p>
      <p className="mt-1 text-[15px] text-curve-muted">추천 항목 중 두 진로를 골라 한두 단계씩 더 들어가고, 돈 벌기 가지를 더했어요.</p>

      <p className="mt-6 text-[13px] font-semibold text-curve-muted">1단계 · 추천 항목</p>
      <ul className="mt-2 flex flex-wrap gap-2" aria-label="1단계 추천 항목">
        {roots.map((r) => {
          const on = set.has(r.id);
          return (
            <li
              key={r.id}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[14px] font-medium ${
                on ? 'border-curve-blue bg-curve-blue-soft text-curve-blue' : 'border-curve-line text-slate-400'
              }`}
            >
              {on && <Check size={14} strokeWidth={2.6} aria-hidden="true" />}
              {r.tag && <span className="text-[12px] font-semibold">{r.tag} ·</span>}
              {r.title}
              <span className="sr-only">{on ? '(골랐어요)' : '(고르지 않았어요)'}</span>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 text-[13px] font-semibold text-curve-muted">완성된 목차 (7칸)</p>
      <ol className="mt-2 space-y-1.5 text-[15px] text-curve-text">
        {ordered.map((n, i) => {
          const depth = index.get(n.id)?.path.length ?? 0;
          return (
            <li key={n.id} className="flex gap-3" style={depth ? { paddingLeft: `${depth * 18}px` } : undefined}>
              <span className="w-5 shrink-0 text-center font-semibold tabular-nums text-curve-blue">{i + 1}</span>
              <span>
                {depth > 0 && <span className="mr-1 text-curve-muted" aria-hidden="true">└</span>}
                {n.title}
                {depth > 0 && <span className="ml-1.5 text-[12px] text-curve-muted">{depth + 1}단계</span>}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
