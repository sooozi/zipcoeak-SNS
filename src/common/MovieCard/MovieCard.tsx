import { useState } from 'react';

// 영화 객체의 타입 정의
interface Movie {
    id: number;
    title: string;
    imageUrl: string;
    director: string;
    year: number;
    rating: number;
}

const MovieCard = ({ movie }: { movie: Movie }) => {
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
                className={`absolute inset-0 bg-black bg-opacity-75 text-white p-4 transition-all duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                <p>감독: {movie.director}</p>
                <p>개봉년도: {movie.year}</p>
                <p>평점: {movie.rating}/10</p>
            </div>
        </div>
    );
};

export default MovieCard;
