import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

interface Genre {
    id: number;
    name: string;
}

interface GenresResponse {
    genres: Genre[];
}

const fetchAllMovieGenre = (): Promise<GenresResponse> =>
    api
        .get(`genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.data); // 'res.data'를 반환하여 data를 바로 사용할 수 있게

export const useAllGenresQuery = () =>
    useQuery<GenresResponse>({
        queryKey: ['movie-all-genre'],
        queryFn: fetchAllMovieGenre,
    });
