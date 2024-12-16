import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchSearchMovies = (keyword: string) => {
    return api
        .get(
            `/search/movie?query=${keyword}&api_key=${process.env.REACT_APP_API_KEY}`,
        )
        .then(res => res.data.results);
};

// 검색어를 기반으로 영화 데이터를 가져오는 커스텀 훅
export const useSearchMoviesQuery = (keyword: string) => {
    return useQuery({
        queryKey: ['movie-search', keyword],
        queryFn: () => fetchSearchMovies(keyword),
        enabled: !!keyword, // keyword가 있을 때만 쿼리 실행
    });
};
