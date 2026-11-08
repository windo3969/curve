import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowLeft, ArrowRight, Check, Info, RotateCcw, MessageSquareHeart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button, ButtonLink } from '../components/Button';
import ReportViewer from '../components/report/ReportViewer';
import {
  categories,
  grades,
  mbtiTypes,
  plans,
  MAX_CATEGORIES,
  tryCopy as copy,
  type Category,
  type Grade,
  type Plan,
} from '../data/tryForm';
import { generateReport, type TryInput } from '../lib/generateReport';
import type { Report } from '../data/types';

const STORAGE_KEY = 'curve-try-input';
const empty: TryInput = {
  name: '',
  age: '',
  school: '',
  dept: '',
  grade: '',
  categories: [],
  goal: '',
  noGoal: false,
  plans: [],
  planEtc: '',
  mbti: '',
};

function load(): TryInput {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const v = { ...empty, ...JSON.parse(raw) } as TryInput;
    // 이전 버전에 저장된 값 중 지금 없는 선택지는 걸러 내요
    v.categories = (v.categories ?? []).filter((c) => categories.includes(c)).slice(0, MAX_CATEGORIES);
    v.plans = (v.plans ?? []).filter((p) => plans.includes(p));
    return v;
  } catch {
    return empty;
  }
}
function save(v: TryInput) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(v));
  } catch {
    /* 저장 불가 환경(시크릿 창 등)에서는 무시 */
  }
}

type Phase = 'form' | 'loading' | 'result';

export default function Try() {
  const [input, setInput] = useState<TryInput>(load);
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>('form');
  const [error, setError] = useState('');
  const [report, setReport] = useState<Report | null>(null);
  const [msgIndex, setMsgIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const total = copy.steps.length;

  useEffect(() => save(input), [input]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [phase]);
  useEffect(() => {
    // 단계가 바뀌면 첫 입력 칸에 포커스
    const el = panelRef.current?.querySelector<HTMLElement>('input, textarea, button[data-first]');
    el?.focus({ preventScroll: true });
  }, [step, phase]);

  const set = <K extends keyof TryInput>(k: K, v: TryInput[K]) => {
    setInput((cur) => ({ ...cur, [k]: v }));
    setError('');
  };

  const validate = (s: number) => {
    if (s === 1 && (!input.school.trim() || !input.dept.trim() || !input.grade)) return copy.required.schoolDept;
    if (s === 2 && input.categories.length === 0) return copy.required.category;
    return '';
  };

  const next = () => {
    const msg = validate(step);
    if (msg) {
      setError(msg);
      return;
    }
    if (step < total - 1) setStep(step + 1);
    else void submit();
  };
  const prev = () => {
    setError('');
    setStep((s) => Math.max(0, s - 1));
  };

  const submit = async () => {
    // 필수 항목 최종 확인
    for (const s of [1, 2]) {
      const msg = validate(s);
      if (msg) {
        setStep(s);
        setError(msg);
        return;
      }
    }
    setPhase('loading');
    setMsgIndex(0);
    const timers = [900, 1800].map((ms, i) => window.setTimeout(() => setMsgIndex(i + 1), ms));
    const [r] = await Promise.all([generateReport(input), new Promise((res) => setTimeout(res, 2700))]);
    timers.forEach(clearTimeout);
    setReport(r);
    setPhase('result');
  };

  const restart = () => {
    setInput(empty);
    setStep(0);
    setReport(null);
    setError('');
    setPhase('form');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter' || e.shiftKey || e.nativeEvent.isComposing) return;
    const tag = (e.target as HTMLElement).tagName;
    if (tag === 'TEXTAREA' || tag === 'BUTTON' || tag === 'A') return;
    e.preventDefault();
    next();
  };

  return (
    <>
      <Header />
      <main id="main" className="min-h-screen bg-curve-paper pt-[68px]">
        {phase === 'form' && (
          <div className="container-curve py-10 sm:py-16">
            <div className="mx-auto max-w-[640px]">
              <CurveProgress value={(step + 1) / total} label={`${step + 1} / ${total}`} />

              <div
                ref={panelRef}
                onKeyDown={onKeyDown}
                className="mt-8 rounded-[28px] border border-curve-line bg-white p-6 sm:p-10"
              >
                <p className="text-sm font-semibold text-curve-blue">
                  질문 {step + 1}
                </p>
                <h1 className="mt-2 text-[26px] font-bold leading-snug tracking-tight sm:text-[30px]">
                  {copy.steps[step].title}
                </h1>
                <p className="mt-2 text-[16px] text-curve-muted">{copy.steps[step].hint}</p>

                <div className="mt-8">
                  <StepFields step={step} input={input} set={set} onError={setError} />
                </div>

                {error && (
                  <p className="mt-5 text-[15px] font-medium text-red-600" role="alert">
                    {error}
                  </p>
                )}

                <div className="mt-10 flex items-center justify-between gap-3">
                  <Button variant="ghost" onClick={prev} disabled={step === 0} className="!px-2">
                    <ArrowLeft size={18} aria-hidden="true" /> {copy.prev}
                  </Button>
                  <Button onClick={next}>
                    {step === total - 1 ? copy.submit : copy.next} <ArrowRight size={18} aria-hidden="true" />
                  </Button>
                </div>
              </div>
              <p className="mt-4 hidden text-center text-[13px] text-curve-muted sm:block">{copy.enterHint}</p>
            </div>
          </div>
        )}

        {phase === 'loading' && (
          <div className="container-curve grid min-h-[calc(100vh-68px)] place-items-center py-16">
            <div className="text-center" role="status" aria-live="polite">
              <svg viewBox="0 0 200 120" className="mx-auto h-28 w-48" aria-hidden="true">
                <path d="M10 110 C 80 106, 110 40, 190 12" fill="none" stroke="#EAF0FF" strokeWidth="10" strokeLinecap="round" />
                <path className="curve-loop" d="M10 110 C 80 106, 110 40, 190 12" fill="none" stroke="#2F6BFF" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <ul className="mt-8 space-y-3">
                {copy.loading(input.school.trim(), input.dept.trim()).map((m, i) => (
                  <li
                    key={m}
                    className={`text-[17px] transition-all duration-500 ${
                      i < msgIndex ? 'text-curve-muted' : i === msgIndex ? 'font-semibold text-curve-ink' : 'text-curve-line'
                    }`}
                  >
                    {i < msgIndex ? '✓ ' : ''}
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {phase === 'result' && report && (
          <div className="container-curve py-10 sm:py-14">
            <div className="mx-auto mb-10 flex max-w-[960px] items-start gap-3 rounded-2xl border border-curve-blue/20 bg-curve-blue-soft px-5 py-4 text-[15px] leading-relaxed text-curve-ink">
              <Info size={18} className="mt-[3px] shrink-0 text-curve-blue" aria-hidden="true" />
              <p>{copy.resultNotice}</p>
            </div>

            <ReportViewer report={report} idPrefix="r-" />

            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <ButtonLink to="/#feedback" size="lg">
                <MessageSquareHeart size={18} aria-hidden="true" /> {copy.feedback}
              </ButtonLink>
              <Button variant="outline" size="lg" onClick={restart}>
                <RotateCcw size={18} aria-hidden="true" /> {copy.restart}
              </Button>
            </div>
          </div>
        )}

        <div className="container-curve pb-10">
          <Footer onDark={false} />
        </div>
      </main>
    </>
  );
}

/** 곡선 모양 진행 바 */
function CurveProgress({ value, label }: { value: number; label: string }) {
  const d = 'M4 36 C 180 34, 300 8, 596 4';
  return (
    <div className="flex items-end gap-4">
      <svg
        viewBox="0 0 600 40"
        preserveAspectRatio="none"
        className="h-10 flex-1"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value * 100)}
        aria-label="진행 상황"
      >
        <path d={d} fill="none" stroke="#E5E7EB" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path
          d={d}
          pathLength={100}
          fill="none"
          stroke="#2F6BFF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="100"
          strokeDashoffset={100 - value * 100}
          vectorEffect="non-scaling-stroke"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <span className="shrink-0 text-sm font-semibold tabular-nums text-curve-muted">{label}</span>
    </div>
  );
}

function StepFields({
  step,
  input,
  set,
  onError,
}: {
  step: number;
  input: TryInput;
  set: <K extends keyof TryInput>(k: K, v: TryInput[K]) => void;
  onError: (msg: string) => void;
}) {
  const l = copy.labels;
  const ph = copy.placeholders;

  if (step === 0)
    return (
      <div className="grid gap-5 sm:grid-cols-[1fr_140px]">
        <Field id="t-name" label={l.name}>
          <input id="t-name" className="input-curve" value={input.name} onChange={(e) => set('name', e.target.value)} placeholder={ph.name} autoComplete="nickname" />
        </Field>
        <Field id="t-age" label={l.age}>
          <input id="t-age" className="input-curve" inputMode="numeric" value={input.age} onChange={(e) => set('age', e.target.value.replace(/\D/g, '').slice(0, 2))} placeholder={ph.age} />
        </Field>
      </div>
    );

  if (step === 1)
    return (
      <div className="space-y-5">
        <Field id="t-school" label={l.school} required>
          <input id="t-school" className="input-curve" value={input.school} onChange={(e) => set('school', e.target.value)} placeholder={ph.school} />
        </Field>
        <Field id="t-dept" label={l.dept} required>
          <input id="t-dept" className="input-curve" value={input.dept} onChange={(e) => set('dept', e.target.value)} placeholder={ph.dept} />
        </Field>
        <fieldset>
          <legend className="text-[15px] font-semibold text-curve-ink">
            {l.grade} <span className="text-curve-blue">*</span>
          </legend>
          <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label={l.grade}>
            {grades.map((g) => (
              <button key={g} type="button" role="radio" aria-checked={input.grade === g} className="chip" onClick={() => set('grade', g as Grade)}>
                {g}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
    );

  if (step === 2) {
    const full = input.categories.length >= MAX_CATEGORIES;
    return (
      <div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c, i) => {
            const rank = input.categories.indexOf(c) + 1;
            const on = rank > 0;
            return (
              <button
                key={c}
                type="button"
                data-first={i === 0 ? '' : undefined}
                aria-pressed={on}
                aria-label={on ? `${c}, ${rank}순위` : c}
                className={`chip !py-3 !text-[16px] ${on ? '!pl-2.5 !pr-5' : '!px-5'} ${!on && full ? 'opacity-50' : ''}`}
                onClick={() => {
                  if (on) set('categories', input.categories.filter((x) => x !== c));
                  else if (full) onError(copy.required.categoryMax);
                  else set('categories', [...input.categories, c] as Category[]);
                }}
              >
                {on && (
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-curve-blue text-[13px] font-bold text-white" aria-hidden="true">
                    {rank}
                  </span>
                )}
                {c}
              </button>
            );
          })}
        </div>
        <ol className="mt-6 grid gap-2 sm:grid-cols-3" aria-label="고른 우선순위">
          {Array.from({ length: MAX_CATEGORIES }, (_, i) => {
            const c = input.categories[i];
            return (
              <li
                key={i}
                className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-[15px] ${
                  c ? 'border-curve-blue/30 bg-curve-blue-soft text-curve-ink' : 'border-dashed border-curve-line text-curve-muted'
                }`}
              >
                <span className="font-semibold tabular-nums text-curve-blue">{i + 1}순위</span>
                <span className={c ? 'font-medium' : ''}>{c ?? '비어 있음'}</span>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  if (step === 3)
    return (
      <div className="space-y-4">
        <Field id="t-goal" label={l.goal}>
          <textarea
            id="t-goal"
            rows={3}
            className="input-curve resize-y disabled:bg-slate-50 disabled:text-curve-muted"
            value={input.goal}
            disabled={input.noGoal}
            onChange={(e) => set('goal', e.target.value)}
            placeholder={ph.goal}
          />
        </Field>
        <label className="inline-flex cursor-pointer items-center gap-2.5 text-[16px] text-curve-ink">
          <input
            type="checkbox"
            className="h-5 w-5 accent-[#2F6BFF]"
            checked={input.noGoal}
            onChange={(e) => set('noGoal', e.target.checked)}
          />
          {l.noGoal}
        </label>
      </div>
    );

  if (step === 4)
    return (
      <div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="1년 계획">
          {plans.map((p, i) => {
            const on = input.plans.includes(p);
            return (
              <button
                key={p}
                type="button"
                data-first={i === 0 ? '' : undefined}
                aria-pressed={on}
                className="chip !px-5 !py-3 !text-[16px]"
                onClick={() => set('plans', on ? input.plans.filter((x) => x !== p) : ([...input.plans, p] as Plan[]))}
              >
                <span
                  className={`grid h-5 w-5 place-items-center rounded-[6px] border ${on ? 'border-curve-blue bg-curve-blue text-white' : 'border-slate-300'}`}
                  aria-hidden="true"
                >
                  {on && <Check size={14} strokeWidth={3} />}
                </span>
                {p}
              </button>
            );
          })}
        </div>
        {input.plans.includes('기타') && (
          <div className="mt-5">
            <Field id="t-plan-etc" label={l.planEtc}>
              <input
                id="t-plan-etc"
                className="input-curve"
                value={input.planEtc}
                onChange={(e) => set('planEtc', e.target.value)}
                placeholder={ph.planEtc}
              />
            </Field>
          </div>
        )}
      </div>
    );

  return (
    <div>
      <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label="MBTI">
        {mbtiTypes.map((m, i) => (
          <button
            key={m}
            type="button"
            role="radio"
            data-first={i === 0 ? '' : undefined}
            aria-checked={input.mbti === m}
            onClick={() => set('mbti', input.mbti === m ? '' : m)}
            className="chip justify-center !px-2 font-semibold tracking-wide"
          >
            {m}
          </button>
        ))}
      </div>
      <button type="button" role="radio" aria-checked={input.mbti === ''} onClick={() => set('mbti', '')} className="chip mt-3 w-full justify-center">
        {l.skipMbti}
      </button>
      <p className="mt-4 text-[14px] text-curve-muted">MBTI는 참고용으로만 써요. 성격 유형으로 진로를 정하지 않아요.</p>
    </div>
  );
}

function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-[15px] font-semibold text-curve-ink">
        {label} {required && <span className="text-curve-blue">*</span>}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

