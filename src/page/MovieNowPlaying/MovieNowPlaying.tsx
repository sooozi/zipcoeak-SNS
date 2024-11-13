import React from 'react';
import TrendingMovieList from './components/NowPlayingMovieList/NowPlayingMovieList';

const MovieNowPlayingPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4 mt-16 max-w-[1024px]">
            <div className="px-8">
                <TrendingMovieList title="Movies List" />
            </div>
        </div>
    );
};

export default MovieNowPlayingPage;
