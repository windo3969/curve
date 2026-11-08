import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import CurveLine from '../components/CurveLine';
import Hero from '../sections/Hero';
import Empathy from '../sections/Empathy';
import HowItWorks from '../sections/HowItWorks';
import SampleReport from '../sections/SampleReport';
import PromiseSection from '../sections/Promise';
import Tracks from '../sections/Tracks';
import Feedback from '../sections/Feedback';
import Faq from '../sections/Faq';
import FinalCta from '../sections/FinalCta';

export default function Landing() {
  const { hash } = useLocation();

  // 다른 페이지에서 /#feedback 처럼 들어왔을 때 해당 섹션으로 이동
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const t = window.setTimeout(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: 'instant' });
    }, 60);
    return () => window.clearTimeout(t);
  }, [hash]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-curve-blue px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        본문으로 건너뛰기
      </a>
      <Header />
      <main id="main">
        <Hero />
        <CurveLine />
        <Empathy />
        <CurveLine flip />
        <HowItWorks />
        <SampleReport />
        <div className="h-20 sm:h-28" />
        <PromiseSection />
        <Tracks />
        <CurveLine />
        <Feedback />
        <Faq />
        <FinalCta />
      </main>
    </>
  );
}
