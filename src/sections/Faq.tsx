import { useState } from 'react';
import { Plus } from 'lucide-react';
import Reveal from '../components/Reveal';
import { faq } from '../data/faq';
import { faqSection } from '../data/landing';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" aria-labelledby="faq-title" className="pb-20 sm:pb-28">
      <div className="container-curve">
        <Reveal className="text-center">
          <h2 id="faq-title" className="section-title">
            {faqSection.title}
          </h2>
        </Reveal>
        <ul className="mx-auto mt-12 max-w-[760px] divide-y divide-curve-line border-y border-curve-line">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-[17px] font-semibold text-curve-ink sm:text-[18px]"
                  >
                    {item.q}
                    <Plus
                      size={20}
                      className={`shrink-0 text-curve-blue transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-8 text-[16px] leading-[1.75] text-curve-text">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
