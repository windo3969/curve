import type { DeptTree } from './types';

/**
 * 경영학과 추천 트리(확정본). 지금은 제목과 요약만 있어요.
 * 메인 페이지 샘플 경로(마케팅·공기업 사무직·장학금)는 다음 단계에서 본문을 채워요.
 */
export const bizTree: DeptTree = {
  id: 'biz',
  name: '경영학과',
  careers: [
    {
      id: 'biz-marketing',
      title: '마케팅',
      summary: '직무 종류(브랜드·퍼포먼스·콘텐츠), 필요한 역량',
      goalKeywords: ['마케팅', '마케터', '브랜드', '광고'],
      children: [
        {
          id: 'biz-mkt-contest',
          title: '마케팅 공모전',
          summary: '공모전 종류, 기획서 구조, 팀 구성',
          children: [{ id: 'biz-contest-story', title: '공모전 경험 정리하기', summary: '포트폴리오와 자소서에 쓰는 법' }],
        },
        { id: 'biz-data-mkt', title: '데이터 기반 마케팅 기초', summary: '필요한 도구, 배우는 순서' },
        { id: 'biz-mkt-club', title: '마케팅 학회', summary: '학회 활동 내용, 고르는 기준' },
      ],
    },
    {
      id: 'biz-finance',
      title: '재무·회계',
      summary: '직무 종류, 금융권과 일반 기업의 차이',
      goalKeywords: ['재무', '회계', '금융', '은행', '증권', 'CPA', '회계사'],
      children: [
        {
          id: 'biz-cpa',
          title: '공인회계사(CPA)',
          summary: '시험 구조, 준비 기간, 휴학 여부 판단',
          children: [{ id: 'biz-cpa-or-job', title: '시험 준비와 취업 병행 판단', summary: '두 길의 장단점, 결정 시점' }],
        },
        { id: 'biz-fin-cert', title: '회계·재무 자격증', summary: '종류 비교, 언제 따면 좋은지' },
        { id: 'biz-bank', title: '금융권 채용', summary: '은행·증권·보험 차이, 채용 구조' },
      ],
    },
    {
      id: 'biz-hr',
      title: '인사·조직(HR)',
      summary: '하는 일, 직무 종류, 필요한 역량',
      goalKeywords: ['인사', 'HR', '조직', '노무'],
      children: [
        { id: 'biz-hr-intern', title: 'HR 인턴과 직무 탐색', summary: '인턴 찾는 법, 미리 해 볼 수 있는 것' },
        { id: 'biz-labor', title: '공인노무사 준비 판단', summary: '하는 일, 시험 구조, 준비 기간' },
      ],
    },
    {
      id: 'biz-public',
      title: '공기업 사무직',
      summary: '채용 구조, 기관 종류, 일반 기업과의 차이',
      goalKeywords: ['공기업', '공공기관', '공사', '공단'],
      children: [
        { id: 'biz-ncs', title: 'NCS 필기', summary: '출제 영역, 준비 기간, 공부 방법' },
        { id: 'biz-major-exam', title: '전공 필기(경영·경제)', summary: '출제 범위, 학교 수업과 겹치는 부분' },
        { id: 'biz-public-intern', title: '공기업 체험형 인턴', summary: '지원 방법, 얻는 경험' },
      ],
    },
    {
      id: 'biz-consulting',
      title: '컨설팅·전략',
      summary: '하는 일, 회사 유형, 필요한 역량',
      goalKeywords: ['컨설팅', '컨설턴트', '전략'],
      children: [
        { id: 'biz-case', title: '케이스 인터뷰', summary: '면접 방식, 연습 방법' },
        { id: 'biz-strategy-club', title: '경영 전략 학회', summary: '활동 내용, 얻는 경험' },
      ],
    },
    {
      id: 'biz-startup',
      title: '창업·스타트업',
      summary: '창업과 스타트업 취업의 차이',
      goalKeywords: ['창업', '스타트업'],
      children: [
        {
          id: 'biz-startup-support',
          title: '교내 창업 지원 프로그램',
          summary: '지원 내용, 신청 방법',
          children: [{ id: 'biz-startup-club', title: '창업 동아리와 경진대회', summary: '활동 내용, 준비 과정' }],
        },
        { id: 'biz-startup-intern', title: '스타트업 인턴', summary: '회사 찾는 법, 일하는 방식' },
      ],
    },
  ],
};
