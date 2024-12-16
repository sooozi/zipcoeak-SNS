import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

export interface Movie {
    id: number;
    title: string;
    imageUrl: string;
    year: string;
    rating: number;
    releaseDate: string | null;
}

const fetchSearchMovies = async (keyword: string): Promise<Movie[]> => {
    if (!keyword) return [];
    const { data } = await api.get(
        `/search/movie?query=${keyword}&api_key=${process.env.REACT_APP_API_KEY}`,
    );

    // 데이터를 쿼리 함수 내부에서 가공
    return data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
        rating: movie.vote_average || 'N/A',
        releaseDate: movie.release_date || null,
    }));
};

// 검색어를 기반으로 영화 데이터를 가져오는 쿼리
export const useSearchMoviesQuery = (keyword: string) => {
    return useQuery({
        queryKey: ['movie-search', keyword],
        queryFn: () => fetchSearchMovies(keyword),
        enabled: !!keyword, // keyword가 있을 때만 실행
    });
};