import React from 'react';
import NowPlayingMovieList from './components/NowPlayingMovieList/NowPlayingMovieList';

const MovieNowPlayingPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4 mt-16 max-w-[1024px]">
            <div className="px-8">
                <NowPlayingMovieList title="Now Playing Movie List" />
            </div>
        </div>
    );
};

export default MovieNowPlayingPage;
