import { Check, Target } from 'lucide-react';
import { descendantIds, inTreeOrder, indexTree, matchesGoal, type TreeNode } from '../../data/trees';

type Props = {
  roots: TreeNode[];
  picked: string[];
  onChange: (ids: string[]) => void;
  max: number;
  goal: string;
  /** 칸이 다 찬 상태에서 새 항목을 누르면 호출 */
  onFull: () => void;
};

/**
 * 목차 고르기
 * - 고른 항목 아래로 다음 주제가 펼쳐져요.
 * - 상위 항목을 빼면 그 아래에서 고른 항목도 함께 빠져요.
 * - 목차는 트리 순서로 정리돼요.
 */
export default function TreePicker({ roots, picked, onChange, max, goal, onFull }: Props) {
  const index = indexTree(roots);
  const full = picked.length >= max;

  const toggle = (node: TreeNode) => {
    if (picked.includes(node.id)) {
      const drop = new Set([node.id, ...descendantIds(node)]);
      onChange(picked.filter((id) => !drop.has(id)));
    } else if (full) {
      onFull();
    } else {
      onChange([...picked, node.id]);
    }
  };

  const ordered = inTreeOrder(roots, picked);

  return (
    <div>
      <SlotBar count={picked.length} max={max} />

      <div className="mt-6">
        <Level nodes={roots} depth={0} picked={picked} full={full} goal={goal} onToggle={toggle} />
      </div>

      <div className="mt-8 rounded-2xl border border-curve-line bg-curve-paper p-5">
        <p className="text-[14px] font-semibold text-curve-ink">완성될 목차</p>
        {ordered.length === 0 ? (
          <p className="mt-2 text-[15px] text-curve-muted">항목을 고르면 여기에 목차가 채워져요.</p>
        ) : (
          <ol className="mt-3 space-y-1.5 text-[15px] text-curve-text">
            <li className="flex gap-3 text-curve-muted">
              <span className="w-5 shrink-0 text-center">·</span>표지
            </li>
            {ordered.map((n, i) => {
              const depth = index.get(n.id)?.path.length ?? 0;
              return (
                <li key={n.id} className="flex gap-3" style={depth ? { paddingLeft: `${depth * 16}px` } : undefined}>
                  <span className="w-5 shrink-0 text-center font-semibold tabular-nums text-curve-blue">{i + 1}</span>
                  <span>
                    {depth > 0 && <span className="mr-1 text-curve-muted" aria-hidden="true">└</span>}
                    {n.title}
                  </span>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}

function SlotBar({ count, max }: { count: number; max: number }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-curve-paper px-4 py-3" aria-live="polite">
      <div className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: max }, (_, i) => (
          <span
            key={i}
            className={`h-5 w-5 rounded-md border transition-colors ${i < count ? 'border-curve-blue bg-curve-blue' : 'border-slate-300 bg-white'}`}
          />
        ))}
      </div>
      <p className="text-[15px] font-semibold tabular-nums text-curve-ink">
        {count} / {max}
        <span className="sr-only">개 항목을 골랐어요</span>
      </p>
    </div>
  );
}

function Level({
  nodes,
  depth,
  picked,
  full,
  goal,
  onToggle,
}: {
  nodes: TreeNode[];
  depth: number;
  picked: string[];
  full: boolean;
  goal: string;
  onToggle: (n: TreeNode) => void;
}) {
  const open = nodes.filter((n) => picked.includes(n.id));
  return (
    <div>
      <p className="mb-2.5 text-[13px] font-semibold text-curve-muted">
        {depth === 0 ? '1단계 · 추천 항목' : `${depth + 1}단계 · 이어서 볼 주제`}
      </p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={depth === 0 ? '1단계 추천 항목' : `${depth + 1}단계 항목`}>
        {nodes.map((n) => {
          const on = picked.includes(n.id);
          const dim = full && !on;
          const nearGoal = depth === 0 && matchesGoal(n, goal);
          return (
            <button
              key={n.id}
              type="button"
              aria-pressed={on}
              aria-disabled={dim || undefined}
              onClick={() => onToggle(n)}
              className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full border px-4 py-2 text-left text-[15px] font-medium transition ${
                on
                  ? 'border-curve-blue bg-curve-blue-soft text-curve-blue'
                  : dim
                    ? 'border-curve-line bg-white text-slate-400'
                    : 'border-curve-line bg-white text-curve-text hover:border-curve-blue/50'
              }`}
            >
              {on && <Check size={16} strokeWidth={2.6} aria-hidden="true" />}
              {n.tag && <span className={`text-[12px] font-semibold ${on ? 'text-curve-blue' : 'text-curve-muted'}`}>{n.tag} ·</span>}
              <span>{n.title}</span>
              {nearGoal && (
                <span className="ml-0.5 inline-flex items-center gap-0.5 rounded-full bg-[#EDFBF5] px-2 py-0.5 text-[11px] font-semibold text-[#0B7A59]">
                  <Target size={11} aria-hidden="true" />
                  목표와 가까워요
                </span>
              )}
            </button>
          );
        })}
      </div>

      {open.map((n) => (
        <div key={n.id} className="mt-4 border-l-2 border-curve-blue-soft pl-4 sm:ml-2">
          <p className="text-[15px] font-semibold text-curve-ink">{n.title}</p>
          <p className="mt-0.5 text-[14px] text-curve-muted">이 페이지에서 다뤄요: {n.summary}</p>
          {n.children && n.children.length > 0 ? (
            <div className="mt-3">
              <Level nodes={n.children} depth={depth + 1} picked={picked} full={full} goal={goal} onToggle={onToggle} />
            </div>
          ) : (
            <p className="mt-2 text-[13px] text-curve-muted">이 주제에서 더 이어서 볼 항목은 없어요.</p>
          )}
        </div>
      ))}
    </div>
  );
}
