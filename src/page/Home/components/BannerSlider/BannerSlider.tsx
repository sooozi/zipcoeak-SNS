import { usePopularMoviesQuery } from '@/queries/popular/usePopularMoviesQuery';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

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

    // BannerData 구조로 매핑, poster_path가 없으면 기본 이미지로 대체
    const bannerData: Banner[] = movies?.map((movie: Movie) => {
        return {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            imageUrl: movie.poster_path
                ? `https://media.themoviedb.org/t/p/w533_and_h300_bestv2${movie.poster_path}`
                : 'https://via.placeholder.com/533x300?text=No+Image', // 포스터가 없으면 대체 이미지 사용
        };
    });

    const goToNextSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % bannerData.length); // 다음 슬라이드로 이동
    };

    const goToPreviousSlide = () => {
        setCurrentIndex(
            prevIndex =>
                (prevIndex - 1 + bannerData.length) % bannerData.length,
        );
    };

    const currentBanner = bannerData[currentIndex];

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* 배경 흐림 효과 */}
            <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm z-20"></div>

            <motion.div
                key={currentBanner.id}
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(${currentBanner.imageUrl})`, // imageUrl을 사용
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'contrast(1.1) brightness(1.1)',
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
                <ChevronLeft size={22} color="black" />
            </button>
            <button
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full opacity-50 hover:opacity-100 z-40"
            >
                <ChevronRight size={22} color="black" />
            </button>
        </div>
    );
};

export default BannerSlider;
