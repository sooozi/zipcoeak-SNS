// import { useQuery } from '@tanstack/react-query';
// import api from '../utils/api';

// const fetchPopularMovies = () => {
//     // API 키를 URL 쿼리 파라미터로 전달
//     return api.get(
//         `/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
//     );
// };

// export const usePopularMoviesQuery = () => {
//     return useQuery({
//         queryKey: ['movie-popular'],
//         queryFn: fetchPopularMovies,
//     });
// };

import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchPopularMovies = (page: number = 1) => {
    return api.get(
        `/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${page}`,
    );
};

export const usePopularMoviesQuery = (page: number) => {
    return useQuery({
        queryKey: ['movie-popular', page], // 페이지 번호를 쿼리 키에 포함시켜 캐시 구분
        queryFn: () => fetchPopularMovies(page), // 페이지 번호를 fetch 함수에 전달
    });
};
