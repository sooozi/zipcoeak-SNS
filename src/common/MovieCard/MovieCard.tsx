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

//제네릭 함수 타입을 정의하는 코드
type Fn<Props> = (props: Props) => React.ReactNode;

const MovieCard: Fn<{ movie: Movie }> = ({ movie }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [releaseDate, setReleaseDate] = useState<string | null>(null); // 개봉일 상태
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/movieList/${movie.id}`);
    };

    //movie.id가 변경될 때마다 fetchReleaseDate(movie.id)를 호출하는 역할
    //fetchReleaseDate는 비동기 함수이기 때문에, 이 코드에서는 fetchReleaseDate가 완료될 때까지 기다리지 않고 바로 다음 코드가 실행
    //이로 인해 개봉일 정보가 상태에 반영되지 않음
    // useEffect(() => {
    //     if (!movie.id) return; // movie.id가 없으면 fetch 호출하지 않음
    //     fetchReleaseDate(movie.id);
    // }, [movie.id]);

    // 🚨 위 코드의 문제점
    // fetchReleaseDate를 호출했지만, 그 결과를 어떻게 처리할지 명확하게 지정되지 않았음
    // 비동기 함수 실행 결과를 처리하지 않은 상태였기 때문에 releaseDate가 업데이트되지 않는 문제가 발생

    useEffect(() => {
        if (!movie.id) return; // movie.id가 없으면 fetch 호출하지 않음

        // fetchReleaseDate를 호출하고, 그 결과를 상태에 저장
        // 비동기 작업을 처리하기 위한 별도의 함수 정의
        const getReleaseDate = async () => {
            const date = await fetchReleaseDate(movie.id); // 결과를 기다림
            setReleaseDate(date); // 결과를 상태에 설정
        };

        getReleaseDate();
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
