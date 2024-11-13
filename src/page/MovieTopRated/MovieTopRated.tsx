import React from 'react';
import TopRatedList from './components/TopRatedList/TopRatedList';

const MovieTopRatedPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4 mt-16 max-w-[1024px]">
            <div className="px-8">
                <TopRatedList title="Top Rated" />
            </div>
        </div>
    );
};

export default MovieTopRatedPage;
