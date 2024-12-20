import ErrorBoundary from '@/common/ErrorBoundary';
import { useMoviesByGenreQuery } from '@/queries/genre/useMovieByGenreQuery';
import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

export default function GenrePage() {
    const { genreId } = useParams<{ genreId: string }>(); // URL 경로에서 genreId 추출

    const { data: movies } = useMoviesByGenreQuery(genreId);

    return (
        <div className="max-w-7xl mx-auto p-8 mt-16 min-h-screen">
            <h2 className="text-4xl font-bold mb-6">Movies by Genre</h2>

            {/* 영화 리스트 */}
            <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {movies?.map(movie => (
                            <div
                                key={movie.id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden"
                            >
                                <img
                                    src={movie.imageUrl}
                                    alt={movie.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-black">
                                        {movie.title}
                                    </h3>
                                    <p className="text-gray-500">
                                        {movie.year}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Suspense>
            </ErrorBoundary>
        </div>
    );
}
