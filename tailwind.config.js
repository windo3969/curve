/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'curve-blue': '#2F6BFF',
        'curve-blue-soft': '#EAF0FF',
        'curve-ink': '#111827',
        'curve-text': '#374151',
        'curve-muted': '#6B7280',
        'curve-line': '#E5E7EB',
        'curve-mint': '#12B886',
        // 레퍼런스 디자인의 짙은 패널(딥 그린 자리)을 블루 계열로 옮긴 색
        'curve-deep': '#0E2463',
        // 레퍼런스의 크림 배경을 아주 옅게 옮긴 섹션 배경
        'curve-paper': '#F7F8FB',
      },
      fontFamily: {
        sans: ['Pretendard Variable', 'Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: { content: '1120px' },
    },
  },
  plugins: [],
};
