import aspectRatio from '@tailwindcss/aspect-ratio';
import lineClamp from '@tailwindcss/line-clamp';

export default {
    content: [
        './src/**/*.{html,js,jsx,ts,tsx}', // Tailwind가 적용될 파일 경로
    ],
    theme: {
        extend: {},
    },
    plugins: [
        lineClamp, // 기존 플러그인
        aspectRatio, // 새로 추가된 aspect-ratio 플러그인
    ],
};
