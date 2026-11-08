import type { Report, ReportChapter } from '../data/types';
import { ch3Explore, ch4, ch5, ch6, sampleReport } from '../data/sampleReport';
import type { Category, Grade, Plan } from '../data/tryForm';

export type TryInput = {
  name: string;
  age: string;
  school: string;
  dept: string;
  grade: Grade | '';
  categories: Category[]; // 우선순위 순서(최대 3개)
  goal: string;
  noGoal: boolean;
  plans: Plan[]; // 앞으로 1년간 세워 둔 계획
  planEtc: string; // '기타' 내용
  mbti: string; // '' = 모름
};

/**
 * 체험용 목업 리포트를 만들어요.
 * 지금은 샘플 리포트 템플릿에 입력값을 끼워 넣지만,
 * 나중에 실제 API 호출로 바꿀 수 있게 async 함수로 둬요.
 */
export async function generateReport(input: TryInput): Promise<Report> {
  const name = input.name.trim() || '학생';
  const school = input.school.trim();
  const dept = input.dept.trim();
  const grade = input.grade || '2학년';
  const hasGoal = !input.noGoal && input.goal.trim().length > 0;
  const goal = input.goal.trim();
  const picked = new Set(input.categories);
  const planList = input.plans.map((p) => (p === '기타' && input.planEtc.trim() ? `기타(${input.planEtc.trim()})` : p));
  const military = input.plans.includes('군대');
  const term = '2026년 2학기';
  const assumeSchool = `[가정] 실제 서비스에서는 ${school} 공식 홈페이지 정보를 조사해 반영합니다.`;

  const stage = stageOf(grade);
  const swapName = (s: string) => s.replaceAll('하린 님', `${name} 님`);
  const personalize = (ch: ReportChapter): ReportChapter => ({
    ...ch,
    paragraphs: ch.paragraphs.map(swapName),
    keyPoint: swapName(ch.keyPoint),
    tip: swapName(ch.tip),
  });

  // 1장. 현재 진단
  const ch1: ReportChapter = {
    id: 'ch1',
    number: 1,
    title: '현재 진단',
    theory: sampleReport.chapters[0].theory,
    paragraphs: [
      `${name} 님은 지금 ${grade}이고, ${stage.where} 시점이에요. ${stage.reassure}`,
      `요즘 가장 신경 쓰이는 쪽을 ${input.categories.map((c, i) => `${i + 1}순위 ${c}`).join(', ')} 순서로 골라 주셨어요. 이 순서대로 시간을 나눠 쓰도록 리포트를 짰어요.`,
      planList.length
        ? `앞으로 1년 동안 ${planList.join(', ')} 계획이 있다고 알려 주셨어요. 로드맵은 이 계획을 그대로 두고, 그 사이에 넣을 수 있는 작은 행동 위주로 짰어요.${military ? ' 입대 전과 복무 중에 할 일은 7장에 나눠 적었어요.' : ''}`
        : '앞으로 1년 계획은 아직 비어 있어요. 그래서 이 리포트는 큰 결정보다 이번 학기에 할 수 있는 작은 첫 행동에 초점을 맞췄어요.',
    ],
    table: {
      headers: ['우선순위', '영역', '이번 학기에 볼 것'],
      rows: [
        ...input.categories.map((c, i) => [`${i + 1}순위`, c, focusOf(c, hasGoal ? goal : '', stage.study)]),
        ['1년 계획', planList.length ? planList.join(', ') : '아직 없음', planList.length ? '계획 사이 빈 시간 찾기' : '이번 학기 안의 작은 계획부터'],
      ],
    },
    keyPoint: hasGoal
      ? `"${goal}"까지 남은 거리를 학기 단위로 나눠 보는 것이 지금 가장 먼저 할 일이에요.`
      : '지금 필요한 것은 스펙이 아니라, 후보를 직접 비교해 볼 경험이에요.',
    tip: sampleReport.chapters[0].tip,
    assumption: `이번 학기는 ${term}로 가정했어요. 우선순위는 고르신 순서를 그대로 따랐어요.`,
    sources: sampleReport.chapters[0].sources,
  };

  // 2장. 학과·진로 분석
  const ch2: ReportChapter = {
    id: 'ch2',
    number: 2,
    title: '학과·진로 분석',
    theory: sampleReport.chapters[1].theory,
    paragraphs: [
      `${dept}에서 갈 수 있는 길은 생각보다 넓어요. 넓다는 것은 장점이지만, 스스로 방향을 고르지 않으면 막연해지기 쉽다는 뜻이기도 해요.`,
      hasGoal
        ? `${name} 님의 목표인 "${goal}"이 어떤 흥미 유형에 가까운지 먼저 확인하고, 그 유형이 실제 내 흥미와 맞는지 점검해 보세요.`
        : `아직 목표가 없다면, 먼저 내 흥미가 6가지 유형 중 어디에 가까운지 확인하는 것부터 시작해요.`,
    ],
    table: {
      headers: ['확인할 정보', '어디서 찾나요', '왜 필요한가요'],
      rows: [
        ['학과 교육과정', `${school} ${dept} 홈페이지`, '전공 심화 과목과 진출 분야 연결'],
        ['졸업생 진로 현황', '학과 사무실, 경력개발센터', '선배들이 실제로 간 길 확인'],
        ['흥미검사', '경력개발센터', '감이 아니라 결과로 비교하기'],
      ],
    },
    keyPoint: '어떤 길이 더 좋은지가 아니라, 어떤 하루를 보내고 싶은지로 비교해 보세요.',
    tip: sampleReport.chapters[1].tip,
    assumption: assumeSchool,
    sources: [sampleReport.chapters[1].sources[0]],
  };

  // 3장. 목표 유무에 따라 탐색형 / 준비형
  const ch3: ReportChapter = hasGoal
    ? {
        id: 'ch3',
        number: 3,
        title: '진로 심화: 목표까지 거꾸로 짜기',
        theory: {
          name: '로크(Locke)와 레이섬(Latham)의 목표설정이론',
          line: '구체적이고 조금 어려운 목표는 막연한 목표보다 노력을 더 오래 이어가게 해요. 큰 목표는 중간 목표로 쪼갤 때 힘이 생겨요.',
        },
        paragraphs: [
          `${name} 님은 "${goal}"이라는 목표가 있어요. 이럴 때는 목표 시점에서 거꾸로 거슬러 올라와 지금 할 일을 정하는 편이 빨라요.`,
          '아래 마일스톤은 일반적인 준비 순서예요. 시험 일정이나 채용 시기는 해마다 바뀔 수 있으니, 학기마다 한 번씩 최신 공고를 확인하세요.',
        ],
        table: {
          headers: ['시기', '마일스톤', '확인할 것'],
          rows: [
            ['이번 학기', '목표 직무·시험의 요건 정리', '공식 채용 공고, 시험 안내문'],
            ['다음 방학', '부족한 요건 하나 채우기', '자격증, 어학, 관련 경험'],
            ['다음 학기', '실전 준비 시작', '스터디, 모의 시험, 포트폴리오'],
            ['목표 직전 학기', '지원·응시', '공채 시즌, 박람회 일정'],
          ],
        },
        keyPoint: '목표를 학기 단위 마일스톤으로 쪼개 두면, 이번 학기에 할 일이 하나로 좁혀져요.',
        tip: '놓치기 쉬운 일정(시험 접수, 공채 시즌, 취업박람회)은 지금 바로 캘린더에 알림으로 등록해 두세요.',
        assumption: `채용·시험 일정은 일반적인 흐름을 기준으로 적었어요. 실제 서비스에서는 최신 공고를 조사해 반영해요.`,
        sources: ['Locke, E. A., & Latham, G. P. (2002). Building a practically useful theory of goal setting and task motivation. American Psychologist, 57(9).'],
      }
    : {
        ...personalize(ch3Explore),
        paragraphs: [
          ch3Explore.paragraphs[0],
          '이번 학기에는 관심 가는 후보를 2~3개 고르고, 각각 한 번씩 몸으로 겪어 보는 것을 목표로 잡았어요.',
        ],
        table: {
          headers: ['실험', '예시', '걸리는 시간'],
          rows: [
            ['1시간짜리', '관심 직무 현직자 인터뷰 영상 3개 보기', '1시간'],
            ['하루짜리', '교내 학회·동아리 설명회 참석', '반나절'],
            ['한 달짜리', '소규모 공모전이나 프로젝트 1개 참여', '4주'],
          ],
        },
      };

  // 4~6장은 샘플 템플릿을 이름만 바꿔 재사용
  const ch4p: ReportChapter = {
    ...personalize(ch4),
    paragraphs: [
      '학점은 대부분의 진로에서 기본 조건이 되지만, 쓰이는 방식은 진로마다 달라요. 서류 기준으로 보는 곳도 있고, 관련 과목 이수 여부를 보는 곳도 있어요.',
      `그래서 이번 학기에는 전체 평점보다 ${hasGoal ? '목표와 연결되는' : '여러 후보에 함께 쓸 수 있는'} 과목을 고르는 데 집중하는 걸 추천해요.`,
    ],
    table: {
      headers: ['과목 유형', '고르는 기준', '이유'],
      rows: [
        ['공통', `${dept} 전공 기초·필수`, '어느 진로든 기본이 됨'],
        ['연결 과목', hasGoal ? `"${goal}"과 직접 관련된 과목` : '후보 진로와 관련된 과목', '경험과 포트폴리오로 연결'],
        ['교양·타 전공', '관심 분야 맛보기', '새 후보를 발견할 기회'],
      ],
    },
    assumption: assumeSchool,
  };

  const ch5p: ReportChapter = {
    ...personalize(ch5),
    paragraphs: [
      '"남들은 다 앞서가는 것 같다"는 느낌은 많은 대학생이 겪는 일이에요. 남의 결과만 보이고 과정은 안 보이기 때문이에요.',
      ch5.paragraphs[1],
    ],
    tip: input.mbti
      ? `${input.mbti} 성향이라고 알려 주셨어요. 다만 MBTI는 참고용일 뿐이니, 실제로 어떤 자리에서 힘이 났는지를 기준으로 삼으세요.`
      : '성향보다 중요한 건 경험이에요. 최근 한 달 동안 어떤 자리에서 힘이 났는지 떠올려 보세요.',
    assumption: `창구 이름과 운영 방식은 학교마다 달라요. ${assumeSchool}`,
  };

  const ch6p = personalize(ch6);

  // 7장. 시기별 로드맵
  const ch7: ReportChapter = {
    id: 'ch7',
    number: 7,
    title: '시기별 로드맵과 이번 주 체크리스트',
    theory: sampleReport.chapters[6].theory,
    paragraphs: [
      `아래 로드맵은 한 번에 다 하라는 뜻이 아니에요. 지금 칸만 보고, 다음 칸은 다음 학기의 ${name} 님이 고치면 돼요.`,
      ...(military
        ? ['군 복무 계획이 있어서, 입대 전에는 휴학·입대 절차를 먼저 챙기고 복무 중에는 자격증 공부나 저축처럼 혼자 이어갈 수 있는 일을 두는 것을 추천해요. 입대 시기에 맞춰 아래 칸을 옮겨 쓰세요.']
        : []),
    ],
    table: {
      headers: ['시기', '진로', '학업', '생활'],
      rows: stage.roadmap(hasGoal),
    },
    checklist: {
      title: '이번 주 체크리스트',
      items: [
        '수요일 공강 시간에 경력개발센터 상담 예약하기',
        hasGoal
          ? `목요일 밤, "${goal}" 관련 최신 공고나 시험 안내 하나 찾아 읽기`
          : '목요일 밤, 관심 직무 인터뷰 영상 1개 보고 점수 적기',
        military
          ? '금요일 저녁, 학과 사무실 안내에서 휴학·입대 절차 확인하기'
          : `금요일 저녁, ${school} ${dept} 홈페이지에서 교육과정 확인하기`,
        picked.has('돈 벌기') ? '주말에 진로 통장 개설하고 자동이체 설정하기' : '주말에 다음 주 계획 30분 세우기',
        '일요일 10분, 이번 주 돌아보기',
      ],
    },
    keyPoint: '이번 주에는 다섯 개 중 두 개만 해도 충분해요. 커브는 한 번에 꺾이지 않고, 조금씩 올라가요.',
    tip: sampleReport.chapters[6].tip,
    sources: sampleReport.chapters[6].sources,
  };

  const chapters = [ch1, ch2, ch3, ch4p, ch5p, ch6p, ch7];
  return {
    cover: {
      title: `${name} 님의 커브 로드맵`,
      studentLine: `${school} ${dept} ${grade} · ${term}`,
      date: term,
      toc: chapters.map((c) => ({ number: c.number, title: c.title })),
    },
    chapters,
  };
}

/** 1장 표: 카테고리별로 이번 학기에 볼 것 */
function focusOf(c: Category, goal: string, study: string): string {
  switch (c) {
    case '진로/취업':
      return goal ? `목표 "${goal}"의 요건 정리` : '후보를 좁히는 작은 실험';
    case '학점':
      return `${study} · 연결 과목 고르기`;
    case '돈 벌기':
      return '아르바이트·장학금으로 수입 만들기(가정)';
    case '인간관계':
      return '비교의 부담 줄이고 선배 연결하기';
    case '자기계발':
      return '습관과 루틴 하나 만들기';
    case '취미여가':
      return '쉬는 시간을 일정에 먼저 넣기';
    case '연애':
      return '관계와 내 일정의 균형 잡기';
  }
}

function stageOf(grade: Grade | '2학년') {
  const base = {
    '1학년': {
      where: '대학 생활에 적응하며 전공을 처음 만나는',
      reassure: '지금은 정답을 찾기보다 여러 가지를 맛보기에 좋은 때예요.',
      study: '전공 기초를 쌓는 시기',
      terms: ['1학년 2학기(지금)', '1학년 겨울방학', '2학년 1학기', '2학년 여름방학'],
    },
    '2학년': {
      where: '전공 기초를 마치고 전공 심화로 넘어가는',
      reassure: '지금 진로가 확실하지 않은 것은 늦은 게 아니라, 탐색을 시작하기에 딱 맞는 때예요.',
      study: '전공 심화 진입 시점',
      terms: ['2학년 2학기(지금)', '2학년 겨울방학', '3학년 1학기', '3학년 여름방학'],
    },
    '3학년': {
      where: '전공 심화와 진로 준비가 함께 시작되는',
      reassure: '방향을 좁히기 시작할 때지만, 아직 바꿀 시간도 충분해요.',
      study: '전공 심화 과정',
      terms: ['3학년 2학기(지금)', '3학년 겨울방학', '4학년 1학기', '4학년 여름방학'],
    },
    '4학년': {
      where: '졸업과 첫 진로를 함께 준비하는',
      reassure: '할 일이 많아 보이지만, 우선순위만 정하면 하나씩 해낼 수 있어요.',
      study: '졸업 요건 마무리',
      terms: ['4학년 2학기(지금)', '졸업 전 겨울방학', '졸업 후 상반기', '졸업 후 하반기'],
    },
    초과학기: {
      where: '졸업을 앞두고 진로를 마무리하는',
      reassure: '조금 더 시간을 쓰는 것은 흔한 선택이에요. 이 학기를 준비에 온전히 쓰면 돼요.',
      study: '남은 학점과 졸업 요건 정리',
      terms: ['이번 학기(지금)', '다음 방학', '다음 상반기', '다음 하반기'],
    },
  }[grade];

  return {
    ...base,
    roadmap: (hasGoal: boolean): string[][] => {
      const [t1, t2, t3, t4] = base.terms;
      return hasGoal
        ? [
            [t1, '목표 요건 정리', '연결 과목 중심', '일정 캘린더 만들기'],
            [t2, '부족한 요건 하나 채우기', '관련 자격증 탐색', '선배 멘토 1명 만들기'],
            [t3, '실전 준비 시작', '전공 심화', '스터디 참여'],
            [t4, '지원·응시 또는 인턴', '부족한 과목 보완', '생활 리듬 점검'],
          ]
        : [
            [t1, '후보 2~3개 실험 시작', '공통 과목 중심', '진로 통장 만들기'],
            [t2, '실험 점수로 1순위 정하기', '관련 자격증 하나 탐색', '선배 멘토 1명 만들기'],
            [t3, '1순위 쪽 활동 본격 시작', '전공 심화', '학회나 동아리 참여'],
            [t4, '인턴 또는 시험 준비 시작', '부족한 과목 보완', '생활 리듬 점검'],
          ];
    },
  };
}
