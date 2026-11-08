/** 체험 화면(/try) 문구 */

export const categories = ['진로/취업', '학점', '돈 벌기', '인간관계', '자기계발', '취미여가', '연애'] as const;
export type Category = (typeof categories)[number];
/** 관심 카테고리는 우선순위 순서대로 최대 3개까지 골라요 */
export const MAX_CATEGORIES = 3;

/** 앞으로 1년간 이미 세워 둔 계획(중복 선택) */
export const plans = ['재학', '알바', '군대', '여행', '자격증/대외활동/공모전', '동아리', '기타'] as const;
export type Plan = (typeof plans)[number];

export const grades = ['1학년', '2학년', '3학년', '4학년', '초과학기'] as const;
export type Grade = (typeof grades)[number];

export const mbtiTypes = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ',
] as const;

export const tryCopy = {
  steps: [
    { title: '먼저, 어떻게 불러 드릴까요?', hint: '이름 대신 닉네임도 괜찮아요.' },
    { title: '어느 학교, 어느 학과인가요?', hint: '학교 공개 정보를 찾는 데 써요.' },
    { title: '요즘 어떤 쪽이 가장 신경 쓰이나요?', hint: '중요한 순서대로 최대 3개까지 골라 주세요. 누른 순서가 우선순위가 돼요.' },
    { title: '지금 목표가 있나요?', hint: '없어도 괜찮아요. 그럼 탐색형 커브로 그려 드려요.' },
    { title: '지금부터 1년 동안 이미 세워 둔 계획이 있나요?', hint: '해당하는 것을 모두 골라 주세요. 없으면 그냥 넘어가도 돼요.' },
    { title: '성향을 알려 주세요.', hint: 'MBTI는 참고용으로만 써요.' },
  ],
  labels: {
    name: '이름 또는 닉네임',
    age: '나이',
    school: '학교',
    dept: '학과',
    grade: '학년',
    goal: '목표',
    noGoal: '아직 없어요',
    planEtc: '기타 계획',
    skipMbti: '모름 / 건너뛰기',
  },
  placeholders: {
    name: '예: 하린',
    age: '예: 21',
    school: '예: 커브대학교',
    dept: '예: 경영학과',
    goal: '예: 공기업 사무직, 마케터, 대학원 진학',
    planEtc: '예: 교환학생 준비, 편입 준비',
  },
  required: {
    schoolDept: '학교, 학과, 학년을 모두 입력해 주세요.',
    category: '관심 카테고리를 하나 이상 골라 주세요.',
    categoryMax: '최대 3개까지 고를 수 있어요. 바꾸려면 고른 항목을 한 번 더 눌러 빼 주세요.',
  },
  prev: '이전',
  next: '다음',
  submit: '로드맵 그리기',
  enterHint: 'Enter 키로 다음 단계로 넘어갈 수 있어요.',
  loading: (school: string, dept: string) => [
    `${school} ${dept} 정보를 찾고 있어요`,
    '관심 분야에 맞는 이론을 고르고 있어요',
    '이번 주 체크리스트를 정리하고 있어요',
  ],
  resultNotice: '체험용 미리보기예요. 실제 서비스에서는 AI가 학교와 최신 정보를 조사해서 작성해요.',
  feedback: '피드백 남기기',
  restart: '처음부터 다시',
};
