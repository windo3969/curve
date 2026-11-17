import type { DeptTree } from './types';

/**
 * 컴퓨터학부 추천 트리(확정본). 지금은 제목과 요약만 있어요.
 * 페이지 본문은 이후 단계에서 채워요.
 */
export const csTree: DeptTree = {
  id: 'cs',
  name: '컴퓨터학부',
  careers: [
    {
      id: 'cs-backend',
      title: '백엔드 개발자',
      summary: '하는 일, 필요한 역량, 학년별 준비 순서',
      goalKeywords: ['백엔드', '개발자', '서버', '개발'],
      children: [
        {
          id: 'cs-coding-test',
          title: '코딩 테스트',
          summary: '출제 유형, 준비 순서, 연습 방법',
          children: [{ id: 'cs-algo-club', title: '알고리즘 동아리와 대회', summary: '교내 동아리, 대회 종류, 참여 방법' }],
        },
        {
          id: 'cs-portfolio',
          title: '포트폴리오 프로젝트',
          summary: '주제 고르기, 팀 구성, 결과물 보여 주는 법',
          children: [{ id: 'cs-opensource', title: '오픈소스 기여', summary: '시작하는 법, 기여 경험 정리하기' }],
        },
        {
          id: 'cs-intern',
          title: '인턴십과 채용 시즌',
          summary: '공채와 수시 채용, 인턴 지원 시기, 준비물',
          children: [{ id: 'cs-resume', title: '개발자 이력서와 기술 면접', summary: '이력서 구성, 면접 유형, 연습 방법' }],
        },
        { id: 'cs-roles', title: '개발 직군 비교', summary: '백엔드·프론트엔드·데브옵스·모바일의 하루와 필요한 역량' },
      ],
    },
    {
      id: 'cs-data',
      title: '데이터 분석가',
      summary: '하는 일, 분석가와 엔지니어의 차이, 준비 순서',
      goalKeywords: ['데이터', '분석'],
      children: [
        { id: 'cs-sql-stats', title: 'SQL과 통계 기초', summary: '무엇부터 배울지, 수업과 독학 조합' },
        {
          id: 'cs-data-contest',
          title: '데이터 분석 공모전',
          summary: '공모전 종류, 팀 구성, 결과물 정리',
          children: [{ id: 'cs-data-portfolio', title: '분석 포트폴리오 만들기', summary: '주제 고르기, 분석 보고서 쓰는 법' }],
        },
        { id: 'cs-data-cert', title: '데이터 자격증', summary: '종류 비교, 언제 따면 좋은지' },
      ],
    },
    {
      id: 'cs-ai',
      title: 'AI 엔지니어',
      summary: '하는 일, 학부와 대학원 진로의 차이',
      goalKeywords: ['AI', '인공지능', '머신러닝', '딥러닝'],
      children: [
        { id: 'cs-ai-math', title: 'AI에 필요한 수학', summary: '필요한 과목, 수강 순서' },
        {
          id: 'cs-ug-research',
          title: '학부 연구생',
          summary: '연구실 찾는 법, 컨택 방법, 기대할 수 있는 것',
          children: [{ id: 'cs-grad', title: '대학원 진학 판단', summary: '석사와 박사, 취업과 비교, 준비 시기' }],
        },
      ],
    },
    {
      id: 'cs-public',
      title: '공공기관 전산직',
      summary: '하는 일, 채용 구조, 일반 기업과의 차이',
      goalKeywords: ['공기업', '공공기관', '전산', '공무원'],
      children: [
        { id: 'cs-ncs', title: 'NCS 필기', summary: '출제 영역, 준비 기간, 공부 방법' },
        { id: 'cs-major-exam', title: '전공 필기(전산학)', summary: '출제 범위, 학교 수업과 겹치는 부분' },
        { id: 'cs-ipe', title: '정보처리기사', summary: '시험 구조, 준비 시기, 다른 IT 자격증과 비교' },
      ],
    },
    {
      id: 'cs-security',
      title: '정보보안 전문가',
      summary: '보안 분야 종류, 필요한 역량, 준비 순서',
      goalKeywords: ['보안', '해킹'],
      children: [
        { id: 'cs-ctf', title: '보안 동아리와 해킹 대회', summary: '동아리 찾기, 대회(CTF) 참여 방법' },
        { id: 'cs-sec-edu', title: '보안 교육 과정과 자격증', summary: '교육 프로그램 종류, 자격증 비교' },
      ],
    },
  ],
};
