/**
 * 섹션 사이를 잇는 얇은 곡선 조각.
 * 페이지 전체가 하나의 오르막 곡선처럼 이어지는 느낌을 줘요(3~4곳에만 사용).
 */
export default function CurveLine({ flip = false }: { flip?: boolean }) {
  return (
    <div className="container-curve pointer-events-none" aria-hidden="true">
      <svg viewBox="0 0 1120 90" className="h-[56px] w-full sm:h-[90px]" preserveAspectRatio="none">
        <path
          d={flip ? 'M1120 88 C 760 84, 420 70, 0 4' : 'M0 88 C 360 84, 700 70, 1120 4'}
          fill="none"
          stroke="#2F6BFF"
          strokeOpacity="0.22"
          strokeWidth="1.5"
          strokeDasharray="2 7"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
