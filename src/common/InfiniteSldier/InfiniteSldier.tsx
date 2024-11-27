import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

interface Movie {
    id: number;
    title: string;
    imageUrl: string;
    rating: number;
    year: number;
}

type Fn<Props> = (props: Props) => React.ReactNode;

const InfiniteSlider: Fn<{ movie: Movie[] }> = ({ movie }) => {
    const moviesPerPage = 5; // 한 페이지에 보여줄 영화 수
    const totalMoviesPerSlide = 20; // 한 슬라이드에 보여줄 총 영화 수

    const [currentIndex, setCurrentIndex] = useState(0);

    // 전체 슬라이드 페이지 수 계산 (올림)
    const totalPages = Math.ceil(movie.length / moviesPerPage);

    // 현재 페이지 계산
    const currentPage = Math.floor(currentIndex / moviesPerPage);

    // 슬라이드에 맞게 표시할 영화들만 가져옴
    const visibleMovies = movie.slice(
        currentIndex,
        currentIndex + totalMoviesPerSlide,
    );

    const goToPreviousSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - moviesPerPage);
        }
    };

    const goToNextSlide = () => {
        if (currentIndex + moviesPerPage < movie.length) {
            setCurrentIndex(currentIndex + moviesPerPage);
        }
    };

    return (
        <div className="relative w-full mx-auto overflow-hidden">
            {/* 영화 리스트 슬라이드 */}
            <div className="infinite-slider flex gap-x-4 py-4 h-full">
                {visibleMovies.map((movie, index) => (
                    <div
                        key={movie.id}
                        className="movie-title flex-none"
                        style={{ width: 'calc(20% - 1rem)' }} // 1rem만큼 간격을 빼고 설정
                    >
                        <div className="bg-gray-200 p-4 rounded-lg shadow-md h-full">
                            <h2 className="text-lg font-semibold">
                                #{index + 1}
                            </h2>
                            <h3 className="text-xl font-bold">{movie.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* 페이지네이션 Dot */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <span
                        key={index}
                        onClick={() => setCurrentIndex(index * moviesPerPage)}
                        className={`h-3 w-3 rounded-full cursor-pointer ${
                            index === currentPage ? 'bg-black' : 'bg-gray-400'
                        }`}
                    />
                ))}
            </div>

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

export default InfiniteSlider;
