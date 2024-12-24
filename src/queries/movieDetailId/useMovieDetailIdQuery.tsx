import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

// API에서 '현재 상영 중인 영화' 데이터를 가져오는 함수
const fetchMovieDetail = (id: string, language: string) =>
    api
        // .get(
        //     `/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=ko-KR`,
        // )
        .get(`/movie/${id}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: language, // language 파라미터를 params로 전달
            },
        })
        .then(res => res.data); // 'res.data'를 반환하여 data를 바로 사용할 수 있게

export const useMovieDetailQuery = (
    id: string,
    language: string,
    options?: { suspense: boolean },
) =>
    useQuery({
        queryKey: ['movie-detail'],
        queryFn: () => fetchMovieDetail(id, language),
        ...options,
    });
