import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchTopRatedMovies = () => {
    // API 키를 URL 쿼리 파라미터로 전달
    return api.get(`/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`);
};

export const useTopRatedMoviesQuery = () => {
    return useQuery({
        queryKey: ['movie-top_rated'],
        queryFn: fetchTopRatedMovies,
    });
};
