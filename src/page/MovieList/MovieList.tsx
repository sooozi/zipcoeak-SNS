import React from 'react';
import PopularMovieList from '../Home/components/PopularMovieList/PopularMovieList';

const MovieListPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1>안녕</h1>
            <PopularMovieList title="Popular Movies" />
        </div>
    );
};

export default MovieListPage;
