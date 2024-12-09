import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchTopRatedMovies = () =>
    // API 키를 URL 쿼리 파라미터로 전달
    api
        .get(`/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.data); // 'res.data'를 반환하여 data를 바로 사용할 수 있게

export const useTopRatedMoviesQuery = () => {
    return useQuery({
        queryKey: ['movie-top_rated'],
        queryFn: fetchTopRatedMovies,
    });
};
