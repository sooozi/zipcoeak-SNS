'use client';

import axios from 'axios';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// 영화 객체의 타입 정의
interface Movie {
    id: number;
    title: string;
    imageUrl: string;
    director: string;
    year: number;
    rating: number;
}

function MovieCard({ movie }: { movie: Movie }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="w-[250px] flex-shrink-0 relative overflow-hidden group rounded-lg shadow-md"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
        >
            <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-full aspect-[3/4] object-cover"
                width={300}
                height={400}
            />
            <div
                className={`absolute inset-0 bg-black bg-opacity-75 text-white p-4 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            >
                <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                <p>감독: {movie.director}</p>
                <p>개봉년도: {movie.year}</p>
                <p>평점: {movie.rating}/10</p>
            </div>
        </div>
    );
}

function MovieList({ title, movies }: { title: string; movies: Movie[] }) {
    return (
        <div className="space-y-4">
            <Link to="/movies">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        {title}
                    </h2>
                    <ChevronRight className="h-4 w-4" />
                </div>
            </Link>
            <div className="relative">
                <div className="flex space-x-4 overflow-x-auto pb-4 custom-scrollbar">
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        // TMDb API에서 영화 목록 가져오기
        const fetchMovies = async () => {
            const apiKey = import.meta.env.VITE_TMDB_API_KEY;
            const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`;

            try {
                const response = await axios.get(url);
                const moviesData = response.data.results.map((movie: any) => ({
                    id: movie.id,
                    title: movie.title,
                    imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    director: movie.director || '정보 없음', // TMDb API에서 감독 정보는 별도로 요청해야 할 수도 있습니다.
                    year: new Date(movie.release_date).getFullYear(),
                    rating: movie.vote_average,
                }));
                setMovies(moviesData);
            } catch (error) {
                console.error('영화 정보를 불러오는 데 실패했습니다:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="space-y-8 p-8">
            <MovieList title="최신 영화" movies={movies} />
            <MovieList title="인기 영화" movies={movies} />
            <MovieList title="추천 영화" movies={movies} />
        </div>
    );
}
