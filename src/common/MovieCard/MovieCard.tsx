import { fetchReleaseDate } from '@/apis/tmdb';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Movie {
    id: number;
    title: string;
    imageUrl: string;
    rating: number;
    year: number;
}

// interface ReleaseDatesResponse {
//     iso_3166_1: string; //국가: 한국
//     release_dates: { release_date: string }[];
// }

type Fn<Props> = (props: Props) => React.ReactNode;

// const MovieCard = ({ movie }: { movie: Movie }) => {
const MovieCard: Fn<{ movie: Movie }> = ({ movie }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [releaseDate, setReleaseDate] = useState<string | null>(null); // 개봉일 상태
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/movieList/${movie.id}`);
    };

    useEffect(() => {
        if (!movie.id) return; // movie.id가 없으면 fetch 호출하지 않음
        fetchReleaseDate(movie.id);
    }, [movie.id]);

    // Release Date 포맷팅
    const formatReleaseDate = (date: string) => {
        const releaseDateObj = new Date(date);
        const year = releaseDateObj.getFullYear();
        const month = String(releaseDateObj.getMonth() + 1).padStart(2, '0');
        const day = String(releaseDateObj.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    // Rating을 소수 둘째자리까지 포맷팅
    const formatRating = (rating: number) => {
        return rating.toFixed(2); // 소수 둘째자리까지 표시
    };

    return (
        <div
            className="max-w-[250px] flex-shrink-0 relative overflow-hidden group rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer"
            onMouseEnter={() => setIsHovered(true)} // 마우스를 요소에 올렸을 때
            onMouseLeave={() => setIsHovered(false)} // 마우스를 요소에서 뗐을 때
            onClick={handleCardClick}
        >
            <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-full aspect-[3/4] object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-103 group-hover:blur-sm"
                width={300}
                height={400}
            />
            <div
                className={`absolute inset-0 bg-black bg-opacity-75 text-white p-4 transition-all duration-500 ease-in-out transform ${
                    isHovered ? 'opacity-100' : 'opacity-0 translate-y-10'
                }`}
            >
                <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                {releaseDate ? (
                    <p>🗓️ Release: {formatReleaseDate(releaseDate)}</p>
                ) : (
                    <p>🗓️ Release: {movie.year}</p>
                )}
                <p className="">
                    🏆 Rating:{' '}
                    <span
                        className=""
                        style={{
                            color:
                                movie.rating >= 8
                                    ? '#ffdf6d'
                                    : movie.rating <= 5
                                      ? '#5d7ba3'
                                      : 'inherit',
                        }}
                    >
                        {formatRating(movie.rating)}
                    </span>
                    /10
                </p>
            </div>
        </div>
    );
};

export default MovieCard;
