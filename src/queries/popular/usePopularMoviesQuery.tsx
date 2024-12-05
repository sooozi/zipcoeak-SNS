import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchPopularMovies = () => {
    return api
        .get(`/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.data); // 'res.data'를 반환하여 data를 바로 사용할 수 있게
};

// const fetchPopularMovies = () => {
//     api.get(`/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`).then(
//         res => res.data,
//     ); // 반환값 없음 / return 키워드가 없기 때문에 함수 호출 시 아무것도 반환하지 않음
// };

// React Query로 인기 영화 데이터를 가져오는 커스텀 훅
export const usePopularMoviesQuery = () => {
    return useQuery({
        queryKey: ['movie-popular'],
        queryFn: fetchPopularMovies,
    });
};
