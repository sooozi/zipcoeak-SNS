import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchUpComingMovies = () => {
    // API 키를 URL 쿼리 파라미터로 전달
    return api.get(
        `/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
    );
};

export const useUpComingMoviesQuery = () => {
    return useQuery({
        queryKey: ['movie-upcoming'],
        queryFn: fetchUpComingMovies,
    });
};
