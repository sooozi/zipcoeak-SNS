import React, { useEffect, useState } from 'react';
import MovieCard from '../../../../common/MovieCard/MovieCard';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovie';

interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    year: number;
}

interface PopularMovieListProps {
    title: string;
}

const PopularMovieList: React.FC<PopularMovieListProps> = ({ title }) => {
    const [movies, setMovies] = useState<Movie[]>([]); // 전체 영화 목록
    const [visibleMovies, setVisibleMovies] = useState<Movie[]>([]); // 보여지는 영화 목록
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [totalPages, setTotalPages] = useState(0); // 총 페이지 수

    const {
        data: response,
        isLoading,
        isError,
        error,
    } = usePopularMoviesQuery(currentPage); // 현재 페이지에 해당하는 데이터를 가져옵니다.

    // 데이터가 변경될 때마다 전체 영화 목록을 업데이트하고 총 페이지 수를 계산
    useEffect(() => {
        if (response?.data?.results) {
            setMovies(prevMovies => [...prevMovies, ...response.data.results]); // 새로운 영화 목록을 추가
            setTotalPages(response.data.total_pages); // 총 페이지 수 업데이트
        }
    }, [response]);

    // 페이지 변경 시 보여지는 영화 목록 업데이트
    useEffect(() => {
        const startIndex = (currentPage - 1) * 20;
        const endIndex = currentPage * 20;
        setVisibleMovies(movies.slice(startIndex, endIndex)); // 페이지에 맞는 영화 목록만 보이게
    }, [currentPage, movies]);

    // 페이지 변경 함수
    const handlePageChange = (page: number) => {
        setCurrentPage(page); // 클릭한 페이지로 이동
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="space-y-4">
            <div className="py-20">
                <div className="items-center space-y-2">
                    <h2 className="text-7xl font-bold text-white text-center tracking-wide animate-slide-up">
                        {title}
                    </h2>
                    <p className="text-lg text-center font-medium animate-slide-up">
                        Discover the most popular movies of the moment.
                    </p>
                </div>
            </div>
            <div className="relative">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 pb-4 place-items-center">
                    {visibleMovies.length > 0 ? (
                        visibleMovies.map((movie: Movie) => {
                            const mappedMovie = {
                                id: movie.id,
                                title: movie.title,
                                imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                                year: parseInt(
                                    movie.release_date.split('-')[0],
                                ),
                                rating: movie.vote_average,
                            };

                            return (
                                <MovieCard key={movie.id} movie={mappedMovie} />
                            );
                        })
                    ) : (
                        <p>No movies available</p>
                    )}
                </div>

                {/* 페이지네이션 */}
                <div className="flex justify-center mt-4 space-x-2">
                    {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        return (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)} // 페이지 변경
                                className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
                                    currentPage === page ? 'bg-blue-700' : ''
                                }`}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PopularMovieList;
