export type ReportTable = { headers: string[]; rows: string[][] };

export type ReportChapter = {
  id: string; // 'ch1' ~ 'ch7'
  number: number; // 1 ~ 7
  title: string;
  theory: { name: string; line: string };
  paragraphs: string[];
  table?: ReportTable;
  /** 7장처럼 표 대신(또는 표와 함께) 체크박스 목록을 보여 줄 때 */
  checklist?: { title: string; items: string[] };
  keyPoint: string; // 핵심 박스
  tip: string; // TIP 박스
  assumption?: string; // 가정 표기
  sources: string[];
};

export type Report = {
  cover: {
    title: string;
    studentLine: string; // 예: '커브대학교 경영학과 2학년 · 김하린'
    date: string;
    toc: { number: number; title: string }[];
  };
  chapters: ReportChapter[];
};
