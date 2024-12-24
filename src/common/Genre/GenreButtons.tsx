import { useAllGenresQuery } from '@/queries/genre/useAllGenreQuery';

// 장르를 선택했을 때 부모에게 전달하는 함수
interface GenreButtonsProps {
    onGenreSelect: (genreId: number) => void;
}

const GenreButtons = ({ onGenreSelect }: GenreButtonsProps) => {
    const { data } = useAllGenresQuery();

    // console.log(data);

    return (
        <div className="genreButtons max-w-7xl mx-auto p-8 mt-16 min-h-screen">
            <ul className="flex gap-4">
                {data?.genres?.map(genre => (
                    <li key={genre.id}>
                        <button
                            onClick={() => onGenreSelect(genre.id)}
                            className="py-3 px-6 bg-white text-black rounded-full shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
                        >
                            {genre.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GenreButtons;
