# 커브(Curve) 홈페이지

같은 학과, 다른 커브. 대학생 맞춤 커리어 로드맵 서비스의 소개 페이지와 체험 화면이에요.

- `/` 메인 랜딩 페이지(①~⑩ 섹션, 샘플 리포트 7개 장 전체 공개)
- `/try` 체험 화면(스텝 폼 → 생성 중 → 목업 결과)

Vite + React + TypeScript + Tailwind CSS, 백엔드 없는 정적 사이트예요.

## 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ 에 정적 파일 생성
npm run preview  # 빌드 결과 미리보기
```

`dist/`를 Vercel이나 Netlify에 그대로 올리면 돼요. `/try` 새로고침용 SPA 리라이트 설정(`vercel.json`, `public/_redirects`)이 들어 있어요.

## 피드백 엔드포인트 설정

`src/config.ts`의 `FEEDBACK_ENDPOINT`에 주소를 넣으세요.

```ts
export const FEEDBACK_ENDPOINT = 'https://formspree.io/f/xxxxxxx';
```

- 비어 있으면 전송하지 않고 브라우저 콘솔에 `[Curve feedback]`으로 출력한 뒤 완료 메시지를 보여 줘요.
- 값이 있으면 JSON(`rating`, `usefulChapters`, `missing`, `school`, `grade`, `email`, `submittedAt`)을 POST로 보내요.
- Google Apps Script를 쓸 때는 웹 앱을 "모든 사용자" 접근으로 배포하고 `doPost(e)`에서 `JSON.parse(e.postData.contents)`로 받으면 돼요.

## 문구 수정 위치

모든 텍스트는 `src/data/` 아래에 모여 있어요.

| 파일 | 내용 |
|---|---|
| `src/data/landing.ts` | 랜딩 페이지 섹션 문구(히어로, 공감, 작동 방식, 약속, 두 갈래, 피드백 폼, 마지막 CTA, 푸터 이메일) |
| `src/data/sampleReport.ts` | 샘플 리포트 표지와 1~7장 |
| `src/data/faq.ts` | 자주 묻는 질문 |
| `src/data/tryForm.ts` | 체험 화면 질문, 선택지, 로딩 메시지 |
| `src/lib/generateReport.ts` | 체험 결과 목업 생성 로직(나중에 실제 API 호출로 교체) |

## 디자인 메모

- 색상 토큰은 `tailwind.config.js`에 있어요(`curve-blue`, `curve-blue-soft`, `curve-ink`, `curve-text`, `curve-muted`, `curve-line`, `curve-mint`).
- 레퍼런스 디자인의 짙은 라운드 패널과 옅은 배경 프레임은 `curve-deep`, `curve-paper` 두 토큰으로 옮겼어요.
- `prefers-reduced-motion` 설정이면 모든 애니메이션이 꺼져요(`src/index.css`).
