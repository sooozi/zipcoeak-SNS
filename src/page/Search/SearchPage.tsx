import GenreButtons from '@/common/Genre/GenreButtons';
import { useSearchMoviesQuery } from '@/queries/search/useSearchMoviesQuery';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

interface Movie {
    id: number;
    title: string;
    imageUrl: string;
    year: number;
    rating: number;
    releaseDate: string | null;
}

export default function SearchPage() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [keyword, setKeyword] = useState('');
    const [genreId, setGenreId] = useState<number | null>(null);
    const [moviesWithReleaseDates, setMoviesWithReleaseDates] = useState<
        Movie[]
    >([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const searchByKeyword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setKeyword(inputValue); // 여기서 keyword 업데이트
        // setKeyword('');
    };

    // TMDb API에서 검색된 영화 리스트 가져오기
    const { data: movies } = useSearchMoviesQuery(keyword);

    useEffect(() => {
        // 검색된 영화마다 개별적으로 개봉일을 가져옴
        const getMoviesWithReleaseDates = async () => {
            if (movies) {
                const updatedMovies = await Promise.all(
                    movies.map(async (movie: any) => {
                        // 개별 영화의 개봉일을 가져옴
                        return {
                            id: movie.id,
                            title: movie.title,
                            imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                            year: movie.release_date
                                ? movie.release_date.split('-')[0]
                                : 'N/A',
                            rating: movie.vote_average || 'N/A',
                        };
                    }),
                );
                setMoviesWithReleaseDates(updatedMovies); // 상태 업데이트
            }
        };
        getMoviesWithReleaseDates();
    }, [movies]); // movies가 변경될 때마다 개봉일을 가져옴

    // 장르 선택 시 호출 함수
    const handleGenreSelect = (genreId: number) => {
        console.log('Selected Genre ID:', genreId);
        navigate(`/movies?g=${genreId}`);
        // navigate(`/movies/genre/${genreId}`);
        setGenreId(genreId); // 장르 선택
    };

    return (
        <div className="max-w-7xl mx-auto p-8 mt-16 min-h-screen">
            <h2 className="text-5xl font-bold text-white text-center tracking-wide animate-slide-up py-20">
                Movie Search
            </h2>

            {/* 검색창 */}
            <form
                className="flex gap-3 mx-auto mb-20 max-w-[500px]"
                onSubmit={searchByKeyword}
            >
                <input
                    type="search"
                    placeholder="영화 제목을 입력하세요..."
                    value={inputValue}
                    onChange={handleChange}
                    className="flex-grow border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring focus:ring-blue-200 text-black"
                />
                <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Search className="h-4 w-4" />
                    검색
                </button>
            </form>

            {/* 장르 별 검색 */}
            <GenreButtons onGenreSelect={handleGenreSelect} />

            {/* 검색 결과 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* 검색된 영화가 없을 때 */}
                {!movies?.length && keyword && (
                    <p className="text-center text-gray-500 mt-8">
                        검색 결과가 없습니다.
                    </p>
                )}

                {/* 검색된 영화 목록 표시 */}
                {moviesWithReleaseDates.map((movie: Movie) => (
                    <div
                        key={movie.id}
                        className="bg-white rounded-lg overflow-hidden shadow-lg"
                    >
                        <img
                            src={movie.imageUrl}
                            alt={movie.title}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {movie.title}
                            </h3>
                            <p className="text-gray-500">{movie.year}</p>
                            <p className="text-yellow-500">{movie.rating}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
