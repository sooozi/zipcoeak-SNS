import {
    Movie,
    useSearchMoviesQuery,
} from '@/queries/search/useSearchMoviesQuery';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchPage() {
    const [inputValue, setInputValue] = useState('');
    const [keyword, setKeyword] = useState('');

    // 입력값 변경 시 inputValue 상태 업데이트
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    // 검색 버튼 클릭 시 호출되어 입력값을 keyword로 설정
    const searchByKeyword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setKeyword(inputValue);
    };

    const { data: movies, isFetching } = useSearchMoviesQuery(keyword);

    return (
        <div className="max-w-7xl mx-auto p-8 mt-16 min-h-screen">
            <h2 className="text-5xl font-bold text-white text-center tracking-wide animate-slide-up py-20">
                Movie Search
            </h2>

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

            {isFetching && (
                <p className="text-center text-gray-500 mt-8">로딩 중...</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {!movies?.length && keyword && !isFetching && (
                    <p className="text-center text-gray-500 mt-8">
                        검색 결과가 없습니다.
                    </p>
                )}

                {movies?.map((movie: Movie) => (
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