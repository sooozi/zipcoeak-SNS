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
    const { data } = usePopularMoviesQuery();

    const movies = data?.data?.results || []; // 영화 목록

    // BannerData 구조로 매핑, poster_path가 없으면 기본 이미지로 대체
    const bannerData: Banner[] =
        movies?.map((movie: Movie) => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            imageUrl: movie.poster_path
                ? `https://media.themoviedb.org/t/p/w533_and_h300_bestv2${movie.poster_path}`
                : 'https://via.placeholder.com/500x750.png?text=No+Image', // 포스터가 없으면 대체 이미지 사용
        })) || [];

    // 배너 데이터가 없다면 처리할 수 있는 조건 추가
    if (bannerData.length === 0) {
        return <div>배너를 로드할 수 없습니다.</div>;
    }

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
        <div
            className="relative w-full overflow-hidden"
            style={{ height: 'calc(100vh - 4rem)' }}
        >
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
                <div className="text-white text-center px-5 md:px-10 max-w-[1024px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        {currentBanner.title}
                    </h2>
                    <p className="text-lg mx-8 md:mx-20 line-clamp-3">
                        {currentBanner.overview}
                    </p>
                </div>
            </motion.div>

            {/* 이전, 다음 버튼 */}
            <button
                onClick={goToPreviousSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 transform bg-white p-2 rounded-full opacity-50 hover:opacity-100 z-40"
            >
                <ChevronLeft size={22} color="black" />
            </button>
            <button
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 transform bg-white p-2 rounded-full opacity-50 hover:opacity-100 z-40"
            >
                <ChevronRight size={22} color="black" />
            </button>
        </div>
    );
};

export default BannerSlider;
