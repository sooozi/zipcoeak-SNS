'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

// 예시 영화 데이터
const sampleMovies = [
    {
        id: 1,
        title: '인셉션',
        year: 2010,
        rating: 8.8,
        poster: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 2,
        title: '인터스텔라',
        year: 2014,
        rating: 8.6,
        poster: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 3,
        title: '다크 나이트',
        year: 2008,
        rating: 9.0,
        poster: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 4,
        title: '매트릭스',
        year: 1999,
        rating: 8.7,
        poster: '/placeholder.svg?height=400&width=300',
    },
];

interface Movie {
    id: number;
    title: string;
    imageUrl: string;
    year: number;
    rating: number;
}

const MovieCard = ({ movie }: { movie: Movie }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="max-w-[250px] flex-shrink-0 relative overflow-hidden group rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
        >
            <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-full aspect-[3/4] object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-103 group-hover:blur-sm"
                width={300}
                height={400}
            />
            <div
                className={`absolute inset-0 bg-black bg-opacity-75 text-white p-4 transition-all duration-500 ease-in-out transform ${isHovered ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
            >
                <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                <p>Release Year: {movie.year}</p>
                <p>Rating: {movie.rating}/10</p>
            </div>
        </div>
    );
};

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(sampleMovies);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const filteredResults = sampleMovies.filter(movie =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setSearchResults(filteredResults);
    };

    return (
        <div className="max-w-7xl mx-auto p-8 mt-16">
            <h2 className="text-5xl font-bold text-white text-center tracking-wide animate-slide-up py-20">
                Movie Search
            </h2>

            <form
                onSubmit={handleSearch}
                className="flex gap-3 mx-auto mb-20 max-w-[500px]"
            >
                <input
                    type="search"
                    placeholder="영화 제목을 입력하세요..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="flex-grow border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                />
                <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Search className="h-4 w-4" />
                    검색
                </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.length > 0 ? (
                    searchResults.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={{
                                id: movie.id,
                                title: movie.title,
                                imageUrl: movie.poster,
                                year: movie.year,
                                rating: movie.rating,
                            }}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-8">
                        검색 결과가 없습니다.
                    </p>
                )}
            </div>
        </div>
    );
}
