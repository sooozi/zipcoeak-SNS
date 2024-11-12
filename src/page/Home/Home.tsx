'use client';

import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
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

// 더미 데이터 (추가 정보 포함)
const moviesData: Movie[] = [
    {
        id: 1,
        title: '인셉션',
        imageUrl: '/placeholder.svg?height=400&width=300',
        director: '크리스토퍼 놀란',
        year: 2010,
        rating: 8.8,
    },
    {
        id: 2,
        title: '다크 나이트',
        imageUrl: '/placeholder.svg?height=400&width=300',
        director: '크리스토퍼 놀란',
        year: 2008,
        rating: 9.0,
    },
    {
        id: 3,
        title: '인터스텔라',
        imageUrl: '/placeholder.svg?height=400&width=300',
        director: '크리스토퍼 놀란',
        year: 2014,
        rating: 8.6,
    },
    {
        id: 4,
        title: '매트릭스',
        imageUrl: '/placeholder.svg?height=400&width=300',
        director: '워쇼스키 자매',
        year: 1999,
        rating: 8.7,
    },
    {
        id: 5,
        title: '글래디에이터',
        imageUrl: '/placeholder.svg?height=400&width=300',
        director: '리들리 스콧',
        year: 2000,
        rating: 8.5,
    },
    {
        id: 6,
        title: '쇼생크 탈출',
        imageUrl: '/placeholder.svg?height=400&width=300',
        director: '프랭크 다라본트',
        year: 1994,
        rating: 9.3,
    },
];

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
            <Link to="/">
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
    return (
        <div className="space-y-8 p-8">
            <MovieList title="최신 영화" movies={moviesData} />
            <MovieList title="인기 영화" movies={moviesData} />
            <MovieList title="추천 영화" movies={moviesData} />
        </div>
    );
}
