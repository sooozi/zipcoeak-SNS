import './Carousel.css';

interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
}

const Carousel = ({ movies }: { movies: Movie[] }) => {
    const duplicatedMovies = [...movies, ...movies]; // 배열 두 번 복제

    return (
        <div className="relative w-full mx-auto">
            {/* 무한 캐러셀 슬라이드 */}
            <div className="overflow-hidden">
                <div className="carousel-container flex gap-x-4 py-4 h-full">
                    {duplicatedMovies.map(movie => (
                        <div
                            key={movie.id}
                            className="movie-content flex-none"
                            style={{ width: 'calc(10% - 1rem)' }}
                        >
                            <div
                                className="relative bg-gray-200 rounded-lg shadow-md h-full aspect-w-1 aspect-h-1 overflow-hidden"
                                style={{
                                    backgroundImage: `url(https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${movie.poster_path})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                {/* 영화 제목 */}
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm font-medium text-center">
                                    {movie.title}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
