'use client';

import BannerSlider from '../Home/components/BannerSlider/BannerSlider';
import PopularMovieList from '../Home/components/PopularMovieList/PopularMovieList';
import TopRatedMovieList from '../Home/components/TopRatedMovieList/TopRatedMovieList';
import UpComingMovieList from '../Home/components/UpComingMovieList/UpComingMovieList';

export default function Home() {
    return (
        <div className="space-y-8 mt-16">
            <div className="w-full h-screen">
                <BannerSlider />
            </div>

            <div className="px-8">
                <UpComingMovieList title="🎬 Upcoming Movies" />
            </div>
            <div className="px-8">
                <PopularMovieList title="🔥 Popular Movies" />
            </div>
            <div className="px-8">
                <TopRatedMovieList title="🌟 Recommended Movies" />
            </div>
        </div>
    );
}
