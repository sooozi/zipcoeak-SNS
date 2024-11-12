import { ChevronRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../../../../common/MovieCard/MovieCard';
import { useUpComingMoviesQuery } from '../../../../hooks/useUpComingMovie';

interface Movie {
    id: number;
    title: string;
    imageUrl: string;
    director: string;
    year: number;
    rating: number;
}

interface UpComingMovieListProps {
    title: string;
}

const UpComingMovieList: React.FC<UpComingMovieListProps> = ({ title }) => {
    const {
        data: response,
        isLoading,
        isError,
        error,
    } = useUpComingMoviesQuery();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    // 응답 데이터가 MoviesResponse 타입임을 명시
    const movies = response?.data?.results || [];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">
                    {title}
                </h2>
                <Link to="/movies">
                    <ChevronRight className="h-4 w-4" />
                </Link>
            </div>
            <div className="relative">
                <div className="flex space-x-4 overflow-x-auto pb-4 custom-scrollbar">
                    {movies.length > 0 ? (
                        movies.map((movie: any) => {
                            // API 응답에서 필요한 데이터만 추출해서 MovieCard에 전달
                            const mappedMovie = {
                                id: movie.id,
                                title: movie.title,
                                imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                                director: movie.director || '정보 없음', // 감독 정보가 없을 경우 기본값 설정
                                year: movie.release_date.split('-')[0], // 개봉년도
                                rating: movie.vote_average, // 평점
                            };

                            return (
                                <MovieCard key={movie.id} movie={mappedMovie} />
                            );
                        })
                    ) : (
                        <p>No movies available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpComingMovieList;
