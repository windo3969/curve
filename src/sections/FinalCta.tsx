import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import { finalCta } from '../data/landing';

/** 레퍼런스의 마지막 큰 패널: 큰 문장 + 버튼, 패널 안쪽 하단에 푸터 */
export default function FinalCta() {
  return (
    <section aria-labelledby="final-title" className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[28px] bg-curve-deep text-white sm:rounded-[48px]">
        <svg viewBox="0 0 1280 520" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 h-[68%] w-full" aria-hidden="true">
          <path d="M-20 500 C 420 490, 640 260, 1300 30" fill="none" stroke="#2F6BFF" strokeOpacity="0.35" strokeWidth="60" strokeLinecap="round" />
          <path d="M-20 500 C 420 490, 640 260, 1300 30" fill="none" stroke="#9DB8FF" strokeOpacity="0.7" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="container-curve relative pb-10 pt-24 sm:pt-32">
          <Reveal className="text-center">
            <h2
              id="final-title"
              className="whitespace-pre-line text-[32px] font-bold leading-[1.25] tracking-tight !text-white sm:text-[48px] lg:text-[56px]"
            >
              {finalCta.title}
            </h2>
            <ButtonLink to="/try" variant="light" size="lg" className="mt-10">
              {finalCta.button} <ArrowRight size={18} aria-hidden="true" />
            </ButtonLink>
          </Reveal>
          <div className="mt-24 sm:mt-32">
            <Footer />
          </div>
        </div>
      </div>
    </section>
  );
}
