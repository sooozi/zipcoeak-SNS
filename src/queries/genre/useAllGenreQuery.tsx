import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

interface Genre {
    id: number;
    name: string;
}

interface GenresResponse {
    genres: Genre[];
}

//return이 없는 이유
//fetchAllMovieGenre 함수에서 api.get()을 사용하여 API 요청을 보내고 그 반환값을 그대로 반환하기 때문
//return 없이 api.get()에서 반환된 값을 then()에서 직접 반환하는 방식
const fetchAllMovieGenre = (): Promise<GenresResponse> =>
    api
        .get(`genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.data); // 'res.data'를 반환하여 data를 바로 사용할 수 있게

export const useAllGenresQuery = () =>
    useQuery<GenresResponse>({
        queryKey: ['movie-all-genre'],
        queryFn: fetchAllMovieGenre,
    });
