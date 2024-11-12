import { ChevronRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
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
    const {
        data: response,
        isLoading,
        isError,
        error,
    } = usePopularMoviesQuery();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

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
                        movies.map((movie: Movie) => {
                            // API 응답에서 필요한 데이터만 추출해서 MovieCard에 전달
                            const mappedMovie = {
                                id: movie.id,
                                title: movie.title,
                                imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                                year: parseInt(
                                    movie.release_date.split('-')[0],
                                ),
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

export default PopularMovieList;
