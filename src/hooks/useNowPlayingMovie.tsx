import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchNowPlayingMovies = () => {
    // API 키를 URL 쿼리 파라미터로 전달
    return api.get(
        `/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
    );
};

export const useNowPlayingMoviesQuery = () => {
    return useQuery({
        queryKey: ['movie-popular'],
        queryFn: fetchNowPlayingMovies,
    });
};
