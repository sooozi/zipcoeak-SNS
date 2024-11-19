import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

// 인기 영화 데이터를 가져오는 함수
const fetchPopularMovies = () => {
    return api.get(
        `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`, // Webpack 환경변수 사용
    );
};

// React Query로 인기 영화 데이터를 가져오는 커스텀 훅
export const usePopularMoviesQuery = () => {
    return useQuery({
        queryKey: ['movie-popular'],
        queryFn: fetchPopularMovies,
    });
};
