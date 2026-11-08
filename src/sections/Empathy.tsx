import { Compass, GitFork, GraduationCap, PauseCircle, type LucideIcon } from 'lucide-react';
import Reveal from '../components/Reveal';
import { empathy } from '../data/landing';

const icons: Record<string, LucideIcon> = {
  compass: Compass,
  split: GitFork,
  graduation: GraduationCap,
  pause: PauseCircle,
};

export default function Empathy() {
  return (
    <section id="empathy" aria-labelledby="empathy-title" className="py-20 sm:py-28">
      <div className="container-curve">
        <Reveal className="text-center">
          <h2 id="empathy-title" className="section-title">
            {empathy.title}
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {empathy.items.map((it, i) => {
            const Icon = icons[it.icon];
            return (
              <Reveal as="li" key={it.text} delay={i * 80}>
                <div className="flex h-full min-h-[200px] flex-col justify-between rounded-3xl border border-curve-line bg-white p-6 transition hover:border-curve-blue/40">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-curve-blue-soft text-curve-blue">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <p className="mt-8 text-[17px] font-medium leading-[1.6] text-curve-ink">“{it.text}”</p>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-12 text-center">
          <p className="body-lg text-curve-text">
            {empathy.closingBefore}
            <strong className="font-semibold text-curve-blue">{empathy.closingStrong}</strong>
            {empathy.closingAfter}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
