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
  subtitle: '뭘 찾아봐야 할지 몰라도 괜찮아요. 추천 항목을 따라 고르다 보면, 나만의 커리어 로드맵 목차가 완성돼요.',
  primary: '내 로드맵 받기',
  secondary: '샘플 리포트 보기',
  strip: '내가 고른 7개 항목 · 표지 포함 8페이지 문서',
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
      title: '목차를 직접 골라요.',
      body: '추천 항목에서 최대 7개를 골라요. 고른 항목 아래로 이어서 볼 주제가 열려서, 깊게 파도 넓게 봐도 돼요.',
    },
    {
      title: '나만의 로드맵을 받아요.',
      body: '커브가 우리 학교와 최신 채용·시험 정보를 조사해, 고른 항목마다 한 페이지로 정리해 드려요.',
    },
  ],
};

export const sample = {
  eyebrow: '샘플 리포트',
  title: '이런 문서를 받게 돼요',
  subtitle: '가상의 학생 한 명이 직접 고른 7개 항목으로 만든 예시 리포트예요. 어떻게 골랐는지와 결과 문서 전체를 그대로 보여 드려요.',
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
      title: '내가 고른 목차',
      body: '무엇을 담을지 내가 직접 골라요. 같은 학과라도 같은 문서는 없어요.',
    },
    {
      icon: 'sparkle',
      title: 'MBTI는 참고만',
      body: '성향은 힌트일 뿐이에요. 성격 유형으로 진로를 정해 주지 않아요.',
    },
  ],
} as const;

export const tracks = {
  title: '넓게 봐도, 깊게 파도',
  subtitle: '같은 7칸으로 두 가지 방식이 돼요. 고르는 방법은 내가 정해요.',
  items: [
    {
      when: '아직 모르겠다면',
      name: '넓게 보기',
      points: ['1단계에서 여러 진로를 한 장씩 골라요', '후보를 나란히 놓고 비교해요', '마음에 드는 하나가 생기면 다음엔 깊게 파 봐요'],
    },
    {
      when: '가고 싶은 길이 있다면',
      name: '깊게 파기',
      points: ['한 진로를 골라 이어지는 주제로 계속 내려가요', '준비 순서부터 경험 정리까지 한 문서에 담겨요', '7칸을 모두 한 길에 써도 돼요'],
    },
  ],
};

export const feedback = {
  title: '커브를 같이 만들어 주세요',
  subtitle: '지금은 체험 기간이에요. 샘플을 보거나 직접 골라 본 뒤 느낀 점을 알려 주시면 서비스에 바로 반영할게요.',
  q1: '이런 로드맵이 얼마나 도움이 될 것 같나요?',
  q2: '목차를 직접 고르는 방식은 어땠나요?',
  q2Options: ['재미있었어요', '괜찮았어요', '고르기 어려웠어요', '아직 안 해 봤어요'],
  q3: '추천에 없어서 아쉬웠던 항목이 있나요?',
  q3Placeholder: '예: 게임 회사 기획자, 교환학생 준비',
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
