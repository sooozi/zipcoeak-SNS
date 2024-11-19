import React from 'react';
import PopularMovieList from './components/PopularMovieList/PopularMovieList';

const MovieListPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4 mt-16 max-w-[1024px]">
            <div className="px-8">
                <PopularMovieList title="Trending Movie List" />
            </div>
        </div>
    );
};

export default MovieListPage;
