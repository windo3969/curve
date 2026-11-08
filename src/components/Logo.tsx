type Props = { tone?: 'dark' | 'light'; className?: string };

/** 커브 로고: 왼쪽 아래에서 오른쪽 위로 오르는 곡선 + "Curve" 워드마크 */
export default function Logo({ tone = 'dark', className = '' }: Props) {
  const text = tone === 'dark' ? 'text-curve-ink' : 'text-white';
  const stroke = tone === 'dark' ? '#2F6BFF' : '#9DB8FF';
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} aria-label="커브(Curve)">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 26 C 14 25, 16 9, 27 6" fill="none" stroke={stroke} strokeWidth="3.4" strokeLinecap="round" />
        <circle cx="27" cy="6" r="2.6" fill={stroke} />
      </svg>
      <span className={`text-[21px] font-bold tracking-tight ${text}`}>Curve</span>
    </span>
  );
}
