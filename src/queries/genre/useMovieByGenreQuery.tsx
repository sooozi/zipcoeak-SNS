import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

interface Movie {
    id: number;
    title: string;
    imageUrl: string;
    year: string;
}

const fetchMoviesByGenre = async (genreId: string): Promise<Movie[]> => {
    const response = await api.get('/discover/movie', {
        //params => axios의 설정 객체에서 URL 쿼리 파라미터를 전달하는 방법
        params: {
            api_key: process.env.REACT_APP_API_KEY,
            with_genres: genreId,
        },
    });

    return response.data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        year: movie.release_date?.split('-')[0] || 'N/A',
    }));
};

export const useMoviesByGenreQuery = (genreId: string | undefined) =>
    useQuery<Movie[]>({
        queryKey: ['movies-by-genre', genreId],
        queryFn: () => fetchMoviesByGenre(genreId!),
        enabled: !!genreId,
    });
