import React from 'react';
import UpcomingMovieList from './components/UpcomingList/UpcomingList';

const MovieUpcomingPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4 mt-16 max-w-[1024px]">
            <div className="px-8">
                <UpcomingMovieList title="Upcoming Movie List" />
            </div>
        </div>
    );
};

export default MovieUpcomingPage;
