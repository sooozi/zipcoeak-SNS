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

// 'movies'가 객체일 가능성도 있기 때문에, 배열로 지정
const InfiniteSldier: Fn<{ movie: Movie[] }> = ({ movie }) => {
    // 영화 20개만 노출
    const [visibleMovies, setVisibleMovies] = useState<Movie[]>(
        movie.slice(0, 20),
    );

    const goToPreviousSlide = () => {};

    const goToNextSlide = () => {};

    return (
        <div className="relative w-full mx-auto overflow-hidden">
            <div className="infinite-slider flex gap-x-4 overflow-x-auto py-4 h-full">
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

export default InfiniteSldier;
