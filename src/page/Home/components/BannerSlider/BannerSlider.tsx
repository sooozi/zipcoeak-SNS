import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import arrows from lucide-react
import { useState } from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovie';

interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
}

interface Banner {
    id: number;
    title: string;
    imageUrl: string;
    overview: string;
}

const BannerSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // usePopularMoviesQuery 훅을 사용하여 인기 영화 데이터 가져오기
    const { data, isLoading, isError, error } = usePopularMoviesQuery();

    // 로딩 중이거나 에러 발생 시 대체 UI 표시
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    const movies = data?.data?.results || []; // 영화 목록

    // BannerData 구조로 매핑
    const bannerData: Banner[] = movies.map((movie: Movie) => {
        return {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            imageUrl: `https://media.themoviedb.org/t/p/w533_and_h300_bestv2${movie.poster_path}`, // 포스터 이미지 URL
        };
    });

    const goToNextSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % bannerData.length); // 다음 슬라이드로 이동
    };

    const goToPreviousSlide = () => {
        setCurrentIndex(
            prevIndex =>
                (prevIndex - 1 + bannerData.length) % bannerData.length,
        ); // 이전 슬라이드로 이동
    };

    const currentBanner = bannerData[currentIndex];

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* 배경 흐림 효과 */}
            <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm z-20"></div>

            {/* 슬라이드 이미지 애니메이션: scale과 rotate 효과 */}
            <motion.div
                key={currentBanner.id}
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(${currentBanner.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                initial={{ opacity: 0, scale: 1.2, rotate: 10 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
            />

            {/* 배너 텍스트 애니메이션 */}
            <motion.div
                className="absolute inset-0 flex justify-center items-center z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <div className="text-white text-center px-5 md:px-10 max-w-[1024px]">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        {currentBanner.title}
                    </h2>
                    <p className="text-lg mb-4 mx-8 md:mx-20 line-clamp-3">
                        {currentBanner.overview}
                    </p>
                </div>
            </motion.div>

            {/* 이전, 다음 버튼 */}
            <button
                onClick={goToPreviousSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full opacity-50 hover:opacity-100 z-40"
            >
                <ChevronLeft size={22} color="black" />{' '}
                {/* 사용된 왼쪽 화살표 아이콘 */}
            </button>
            <button
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full opacity-50 hover:opacity-100 z-40"
            >
                <ChevronRight size={22} color="black" />{' '}
                {/* 사용된 오른쪽 화살표 아이콘 */}
            </button>
        </div>
    );
};

export default BannerSlider;
