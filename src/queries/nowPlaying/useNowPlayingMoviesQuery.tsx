import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

// API에서 '현재 상영 중인 영화' 데이터를 가져오는 함수
const fetchNowPlayingMovies = () => {
    // API 요청을 보내고, `api.get`은 GET 요청을 보냅니다.
    return api.get(
        `/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`,
    );
};

// useQuery를 사용하여 API 요청을 처리하는 커스텀 훅입니다.
// 이 훅은 데이터를 요청하고, 로딩 상태, 오류 상태 등을 관리합니다.
export const useNowPlayingMoviesQuery = () => {
    return useQuery({
        // queryKey는 쿼리를 고유하게 식별할 수 있는 키입니다.
        // 같은 queryKey를 가진 쿼리는 React Query에서 동일한 데이터를 재사용하고, 캐시합니다.
        queryKey: ['movie-now-playing'],

        // queryFn은 실제 데이터를 가져오는 함수입니다.
        // 이 함수는 API 호출을 처리하고, 그 결과를 React Query에서 사용할 수 있도록 반환합니다.
        queryFn: fetchNowPlayingMovies,
    });
};
