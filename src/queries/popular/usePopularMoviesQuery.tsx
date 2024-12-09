import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchPopularMovies = () =>
    api
        .get(`/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.data); // 'res.data'를 반환하여 data를 바로 사용할 수 있게

// React Query로 인기 영화 데이터를 가져오는 커스텀 훅
export const usePopularMoviesQuery = () =>
    useQuery({
        queryKey: ['movie-popular'],
        queryFn: fetchPopularMovies,
    });
