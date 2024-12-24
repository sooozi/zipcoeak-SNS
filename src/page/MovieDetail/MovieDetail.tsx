import { useMovieDetailQuery } from '@/queries/movieDetailId/useMovieDetailIdQuery';
import { useMovieReviewQuery } from '@/queries/movieReview/useMovieReviewQuery';
import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
    const { id } = useParams<{ id: string }>(); // URL에서 영화 ID 추출

    //이전코드
    // const { data: movieData, isLoading: isLoadingMovieData } =
    //     useMovieDetailQuery(id || ''); // 영화 데이터 가져오기
    // const { data: movieReviews, isLoading: isLoadingReviews } =
    //     useMovieReviewQuery(id || ''); // 영화 리뷰 데이터 가져오기

    // suspense: true 옵션 추가 => 로딩 코드 해결
    // suspense: true 옵션을 쿼리 훅에 넣어주면,
    // React Query가 Suspense 컴포넌트와 함께 사용할 수 있도록 로딩 상태를 자동으로 처리
    const movieDataQuery = useMovieDetailQuery(id || '', { suspense: true });
    const movieReviewsQuery = useMovieReviewQuery(id || '', { suspense: true });

    const { data: movieData } = movieDataQuery;
    const { data: movieReviews } = movieReviewsQuery;

    // 영화 정보가 없는 경우 처리
    if (!movieData) return <div>No movie details available</div>;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="container mx-auto p-4 mt-16 max-w-[1024px]">
                <div className="flex flex-col items-center">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                        alt={movieData.title}
                        className="w-80 h-auto object-cover"
                    />
                    <h2 className="text-3xl font-bold mt-4">
                        {movieData.title}
                    </h2>
                    <p className="text-lg text-gray-700">
                        Release Year:{' '}
                        {new Date(movieData.release_date).getFullYear()}
                    </p>
                    <p className="text-lg text-gray-700">
                        Rating: {movieData.vote_average}/10
                    </p>
                    <p className="mt-4 text-lg">{movieData.overview}</p>
                </div>

                {/* 리뷰 섹션 */}
                <div className="mt-8 w-full">
                    <h3 className="text-2xl font-bold">Reviews</h3>
                    {/* movieReviews가 정의되고, results 배열이 있을 경우 확인 */}
                    {movieReviews?.results?.length > 0 ? (
                        <ul>
                            {movieReviews.results.map((review: any) => (
                                <li key={review.id} className="mt-4">
                                    <h4 className="text-xl font-semibold">
                                        {review.author}
                                    </h4>
                                    <p>{review.content}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No reviews available</p>
                    )}
                </div>
            </div>
        </Suspense>
    );
};

export default MovieDetail;
