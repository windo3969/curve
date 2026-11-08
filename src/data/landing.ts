/** 랜딩 페이지 문구. 문구를 고칠 때는 이 파일만 수정하면 돼요. */

export const nav = [
  { label: '작동 방식', href: '#how' },
  { label: '샘플 리포트', href: '#sample' },
  { label: '약속', href: '#promise' },
  { label: 'FAQ', href: '#faq' },
];

export const hero = {
  badge: '전국 모든 대학 · 지금 무료 체험 중',
  title: '같은 학과, 다른 커브.',
  subtitle: '학교·학과·고민만 알려 주세요. 나만을 위한 커리어 로드맵 문서를 그려 드릴게요.',
  primary: '내 로드맵 받기',
  secondary: '샘플 리포트 보기',
  strip: '표지 + 7개 장 · 8페이지 문서 · 이번 주 체크리스트',
};

export const empathy = {
  title: '이런 고민, 해 본 적 있죠?',
  items: [
    { icon: 'compass', text: '진로가 아직 없어요. 뭘 좋아하는지도 모르겠어요.' },
    { icon: 'split', text: '공무원이냐 취업이냐, 몇 달째 고민 중이에요.' },
    { icon: 'graduation', text: '학점은 괜찮은데, 그다음에 뭘 해야 할지 막막해요.' },
    { icon: 'pause', text: '다들 뭔가 하고 있는데 나만 멈춰 있는 것 같아요.' },
  ],
  closingBefore: '정답을 정해 드리진 않아요. 대신 ',
  closingStrong: '지금 내 위치에서 다음 걸음',
  closingAfter: '을 함께 찾아요.',
} as const;

export const how = {
  eyebrow: '작동 방식',
  title: '세 단계면 충분해요',
  steps: [
    {
      title: '나를 알려 주세요.',
      body: '학교, 학과, 학년, 관심 분야, 목표와 고민, 성향(MBTI 등)',
    },
    {
      title: '커브가 조사하고 분석해요.',
      body: '우리 학교의 실제 학과·장학·상담 정보와 최신 채용·시험 정보를 찾아 반영해요.',
    },
    {
      title: '나만의 로드맵을 받아요.',
      body: '표지와 7개 장으로 된 8페이지 문서를 받아요. 이번 주 체크리스트까지 들어 있어요.',
    },
  ],
};

export const sample = {
  eyebrow: '샘플 리포트',
  title: '이런 문서를 받게 돼요',
  subtitle: '가상의 학생 한 명을 위해 만든 예시 리포트예요. 7개 장 전체를 그대로 읽어 보세요.',
  badge: '예시 리포트 · 등장 인물과 학교는 가상입니다',
  cta: '나도 이런 리포트 받아 보기',
  skipToFeedback: '읽다가 바로 의견 남기기',
  feedbackShort: '의견 남기기',
};

export const promise = {
  title: '커브의 약속',
  subtitle: '믿을 만한 두세 학번 위 선배처럼, 아는 건 분명하게 말하고 모르는 건 모른다고 말해요.',
  items: [
    {
      icon: 'school',
      title: '우리 학교의 진짜 정보',
      body: '학과 소개, 장학, 취업박람회, 상담 창구까지 내 학교에 실제로 있는 정보를 담아요.',
    },
    {
      icon: 'refresh',
      title: '지금의 정보',
      body: '시험 제도 개편, 채용 공고처럼 바뀌는 정보는 매번 새로 조사해요.',
    },
    {
      icon: 'file',
      title: '정직한 문서',
      body: '가정은 가정이라고 적어요. 확인된 것만 사실로 쓰고, 출처를 남겨요.',
    },
    {
      icon: 'layers',
      title: '겹치지 않는 문서',
      body: '학생마다 다른 이론과 틀을 써요. 같은 학과라도 같은 문서는 없어요.',
    },
    {
      icon: 'sparkle',
      title: 'MBTI는 참고만',
      body: '성향은 힌트일 뿐이에요. 성격 유형으로 진로를 정해 주지 않아요.',
    },
  ],
} as const;

export const tracks = {
  title: '진로가 정해졌든, 아니든',
  subtitle: '지금 내 상황에 맞춰 문서의 방향이 달라져요.',
  items: [
    {
      when: '아직 모르겠다면',
      name: '탐색형 커브',
      points: ['관심과 강점을 정리하는 질문지', '후보 진로 3개로 좁히기', '학기 안에 해 볼 수 있는 작은 실험'],
    },
    {
      when: '목표가 분명하다면',
      name: '준비형 커브',
      points: ['목표까지 거꾸로 짠 준비 순서', '학기별 마일스톤', '놓치기 쉬운 일정(시험, 공채 시즌, 박람회)'],
    },
  ],
};

export const feedback = {
  title: '커브를 같이 만들어 주세요',
  subtitle: '지금은 체험 기간이에요. 샘플을 보고 느낀 점을 알려 주시면 서비스에 바로 반영할게요.',
  q1: '샘플 리포트가 얼마나 도움이 될 것 같나요?',
  q2: '가장 유용해 보인 장(여러 개 골라도 돼요)',
  q3: '빠졌거나 더 있었으면 하는 내용',
  q3Placeholder: '예: 대외활동 추천이 더 구체적이면 좋겠어요',
  q4School: '학교(선택)',
  q4Grade: '학년(선택)',
  q5: '출시 소식을 받을 이메일(선택)',
  submit: '피드백 보내기',
  sending: '보내는 중…',
  done: '고마워요! 소중히 읽을게요.',
  doneSub: '보내 주신 의견은 다음 버전에 반영할게요.',
  again: '다른 의견도 보내기',
  error: '전송에 실패했어요. 잠시 후 다시 시도해 주세요.',
  privacy: '입력하신 정보는 서비스 개선에만 쓰고, 이메일은 출시 소식 안내에만 사용해요.',
  needRating: '도움 정도를 1~5점 중에 골라 주세요.',
};

export const faqSection = { title: '자주 묻는 질문' };

export const finalCta = {
  title: '오늘의 고민이,\n다음 학기의 커브가 되도록.',
  button: '내 커브 그리기',
};

export const footer = {
  intro: '대학생을 위한 맞춤 커리어 로드맵 문서, 커브.',
  email: 'hello@curve.example',
  privacy: '개인정보처리방침',
  copyright: '© 2026 Curve',
};
