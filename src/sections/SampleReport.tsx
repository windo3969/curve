import { ArrowRight, Info } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import Reveal from '../components/Reveal';
import ReportViewer from '../components/report/ReportViewer';
import { sample } from '../data/landing';
import { sampleReport } from '../data/sampleReport';

export default function SampleReport() {
  return (
    <section id="sample" aria-labelledby="sample-title" className="bg-curve-paper py-20 sm:py-28">
      <div className="container-curve">
        <Reveal className="mx-auto max-w-[640px] text-center">
          <p className="eyebrow">{sample.eyebrow}</p>
          <h2 id="sample-title" className="section-title mt-3">
            {sample.title}
          </h2>
          <p className="body-lg mt-4 text-curve-text">{sample.subtitle}</p>
          <p className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-curve-blue-soft px-3.5 py-1.5 text-[14px] font-medium text-curve-blue">
            <Info size={15} aria-hidden="true" />
            {sample.badge}
          </p>
        </Reveal>

        <div className="mt-12">
          <ReportViewer report={sampleReport} />
        </div>

        <div className="mt-12 text-center">
          <ButtonLink to="/try" size="lg">
            {sample.cta} <ArrowRight size={18} aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
