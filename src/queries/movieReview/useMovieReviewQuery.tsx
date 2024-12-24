import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchMovieReview = (id: string) =>
    api
        .get(`/movie/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.data); // 'res.data'를 반환하여 data를 바로 사용할 수 있게

export const useMovieReviewQuery = (id: string, p0: { suspense: boolean; }) =>
    useQuery({
        queryKey: ['movie-review', id], //query key에 ID를 포함시켜 캐싱을 ID별로 관리
        queryFn: () => fetchMovieReview(id),
    });
