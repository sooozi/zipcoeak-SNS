import lineClamp from '@tailwindcss/line-clamp';

export default {
    content: [
        './src/**/*.{html,js,jsx,ts,tsx}', // Tailwind가 적용될 파일 경로
    ],
    theme: {
        extend: {},
    },
    plugins: [lineClamp], // 플러그인 추가
};
