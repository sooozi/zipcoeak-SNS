import { Search } from 'lucide-react';

interface Movie {
    id: number;
    title: string;
    imageUrl: string;
    year: number;
    rating: number;
}

export default function SearchPage() {
    return (
        <div className="max-w-7xl mx-auto p-8 mt-16">
            <h2 className="text-5xl font-bold text-white text-center tracking-wide animate-slide-up py-20">
                Movie Search
            </h2>

            <form className="flex gap-3 mx-auto mb-20 max-w-[500px]">
                <input
                    type="search"
                    placeholder="영화 제목을 입력하세요..."
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
                <p className="text-center text-gray-500 mt-8">
                    검색 결과가 없습니다.
                </p>
            </div>
        </div>
    );
}
