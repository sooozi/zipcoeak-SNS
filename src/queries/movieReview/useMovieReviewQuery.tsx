// const fetchMovieReview = (id: string) =>
//     api
//         .get(`/movie/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}`)
//         .then(res => res.data); // 'res.data'를 반환하여 data를 바로 사용할 수 있게

// export const useMovieReviewQuery = (id: string, p0: { suspense: boolean }) =>
//     useQuery({
//         queryKey: ['movie-review', id], //query key에 ID를 포함시켜 캐싱을 ID별로 관리
//         queryFn: () => fetchMovieReview(id),
//     });

import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchMovieReview = (id: string, language: string) =>
    api
        .get(`/movie/${id}/reviews`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: language, // language 파라미터를 params로 전달
            },
        })
        .then(res => res.data); // 'res.data'를 반환하여 데이터 바로 사용 가능

export const useMovieReviewQuery = (
    id: string,
    language: string,
    options?: { suspense: boolean },
) =>
    useQuery({
        queryKey: ['movie-review', id], // 캐싱을 ID별로 관리
        queryFn: () => fetchMovieReview(id, language), // ID와 language를 전달
        ...options, // options로 받은 suspense를 쿼리 훅에 전달
    });
