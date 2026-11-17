import type { RoadmapReport } from '../../lib/generateReport';
import ReportCover from './ReportCover';
import ReportPage from './ReportPage';
import { ReportShell, type ViewerPart } from './ReportViewer';

/** 표지 + 고른 항목 페이지들을 목차·탭과 함께 보여 줘요(메인 샘플과 체험 결과 공용) */
export default function RoadmapViewer({
  report,
  coverId,
  tailLink,
}: {
  report: RoadmapReport;
  coverId: string;
  tailLink?: { href: string; label: string };
}) {
  const parts: ViewerPart[] = [
    { id: coverId, short: '표지', label: '표지', content: <ReportCover cover={report.cover} id={coverId} /> },
    ...report.pages.map((p) => ({
      id: p.id,
      short: `${p.number} ${p.title.length > 7 ? `${p.title.slice(0, 7)}…` : p.title}`,
      label: p.title,
      depth: p.path.length,
      content: <ReportPage data={p} />,
    })),
  ];
  return <ReportShell parts={parts} tailLink={tailLink} />;
}
