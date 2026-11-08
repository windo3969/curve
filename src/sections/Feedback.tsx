import { useState, type FormEvent } from 'react';
import { CheckCircle2, Star } from 'lucide-react';
import { Button } from '../components/Button';
import Reveal from '../components/Reveal';
import { FEEDBACK_ENDPOINT } from '../config';
import { feedback as copy } from '../data/landing';
import { sampleReport } from '../data/sampleReport';
import { grades } from '../data/tryForm';

type Status = 'idle' | 'sending' | 'done' | 'error';

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [chapters, setChapters] = useState<number[]>([]);
  const [missing, setMissing] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [ratingError, setRatingError] = useState(false);

  const toggleChapter = (n: number) =>
    setChapters((cur) => (cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n].sort()));

  const reset = () => {
    setRating(0);
    setChapters([]);
    setMissing('');
    setSchool('');
    setGrade('');
    setEmail('');
    setStatus('idle');
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!rating) {
      setRatingError(true);
      return;
    }
    const payload = {
      rating,
      usefulChapters: chapters,
      missing,
      school,
      grade,
      email,
      submittedAt: new Date().toISOString(),
    };
    setStatus('sending');
    try {
      if (!FEEDBACK_ENDPOINT) {
        console.log('[Curve feedback]', payload);
      } else {
        const res = await fetch(FEEDBACK_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(String(res.status));
      }
      setStatus('done');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="feedback" aria-labelledby="feedback-title" className="py-20 sm:py-28">
      <div className="container-curve">
        <Reveal>
          <div className="rounded-[28px] bg-curve-blue-soft px-5 py-12 sm:rounded-[40px] sm:px-12 sm:py-16 lg:px-20">
            <div className="mx-auto max-w-[680px]">
              <div className="text-center">
                <h2 id="feedback-title" className="section-title">
                  {copy.title}
                </h2>
                <p className="body-lg mt-4 text-curve-text">{copy.subtitle}</p>
              </div>

              {status === 'done' ? (
                <div className="mt-10 rounded-2xl bg-white p-10 text-center" role="status" aria-live="polite">
                  <CheckCircle2 size={44} className="mx-auto text-curve-blue" aria-hidden="true" />
                  <p className="mt-4 text-[22px] font-bold text-curve-ink">{copy.done}</p>
                  <p className="mt-2 text-curve-text">{copy.doneSub}</p>
                  <Button variant="outline" className="mt-6" onClick={reset}>
                    {copy.again}
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-10 space-y-8 rounded-2xl bg-white p-6 sm:p-10" noValidate>
                  {/* 1. 별점 */}
                  <fieldset>
                    <legend className="text-[17px] font-semibold text-curve-ink">
                      1. {copy.q1} <span className="text-curve-blue">*</span>
                    </legend>
                    <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label={copy.q1}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          role="radio"
                          aria-checked={rating === n}
                          aria-label={`${n}점`}
                          onClick={() => {
                            setRating(n);
                            setRatingError(false);
                          }}
                          className={`flex h-12 min-w-[56px] items-center justify-center gap-1 rounded-xl border px-3 text-[16px] font-semibold transition ${
                            rating >= n
                              ? 'border-curve-blue bg-curve-blue text-white'
                              : 'border-curve-line bg-white text-curve-text hover:border-curve-blue/50'
                          }`}
                        >
                          <Star size={16} fill={rating >= n ? 'currentColor' : 'none'} aria-hidden="true" />
                          {n}
                        </button>
                      ))}
                    </div>
                    {ratingError && (
                      <p className="mt-2 text-[14px] font-medium text-red-600" role="alert">
                        {copy.needRating}
                      </p>
                    )}
                  </fieldset>

                  {/* 2. 유용한 장 */}
                  <fieldset>
                    <legend className="text-[17px] font-semibold text-curve-ink">2. {copy.q2}</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {sampleReport.chapters.map((c) => (
                        <button
                          key={c.number}
                          type="button"
                          className="chip"
                          aria-pressed={chapters.includes(c.number)}
                          onClick={() => toggleChapter(c.number)}
                        >
                          {c.number}장 {c.title.split(':')[0]}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {/* 3. 자유 입력 */}
                  <div>
                    <label htmlFor="fb-missing" className="text-[17px] font-semibold text-curve-ink">
                      3. {copy.q3}
                    </label>
                    <textarea
                      id="fb-missing"
                      rows={4}
                      value={missing}
                      onChange={(e) => setMissing(e.target.value)}
                      placeholder={copy.q3Placeholder}
                      className="input-curve mt-3 resize-y"
                    />
                  </div>

                  {/* 4. 학교 / 학년 */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fb-school" className="text-[15px] font-semibold text-curve-ink">
                        4. {copy.q4School}
                      </label>
                      <input id="fb-school" value={school} onChange={(e) => setSchool(e.target.value)} className="input-curve mt-2" autoComplete="organization" />
                    </div>
                    <div>
                      <label htmlFor="fb-grade" className="text-[15px] font-semibold text-curve-ink">
                        {copy.q4Grade}
                      </label>
                      <select id="fb-grade" value={grade} onChange={(e) => setGrade(e.target.value)} className="input-curve mt-2">
                        <option value="">선택 안 함</option>
                        {grades.map((g) => (
                          <option key={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 5. 이메일 */}
                  <div>
                    <label htmlFor="fb-email" className="text-[17px] font-semibold text-curve-ink">
                      5. {copy.q5}
                    </label>
                    <input
                      id="fb-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="input-curve mt-3"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-[15px] font-medium text-red-600" role="alert">
                      {copy.error}
                    </p>
                  )}

                  <div className="space-y-3">
                    <Button type="submit" size="lg" className="w-full" disabled={status === 'sending'}>
                      {status === 'sending' ? copy.sending : copy.submit}
                    </Button>
                    <p className="text-center text-[13px] text-curve-muted">{copy.privacy}</p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
