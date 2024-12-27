import ErrorBoundary from '@/common/ErrorBoundary';
import React, { Suspense } from 'react';
// import BannerSlider from '../Home/components/BannerSlider/BannerSlider';
// import PopularMovieList from '../Home/components/PopularMovieList/PopularMovieList';
// import TopRatedMovieList from '../Home/components/TopRatedMovieList/TopRatedMovieList';
// import UpComingMovieList from '../Home/components/UpComingMovieList/UpComingMovieList';
// React.lazy로 동적 import 처리
const BannerSlider = React.lazy(
    () => import('../Home/components/BannerSlider/BannerSlider'),
);
const PopularMovieList = React.lazy(
    () => import('../Home/components/PopularMovieList/PopularMovieList'),
);
const TopRatedMovieList = React.lazy(
    () => import('../Home/components/TopRatedMovieList/TopRatedMovieList'),
);
const UpComingMovieList = React.lazy(
    () => import('../Home/components/UpComingMovieList/UpComingMovieList'),
);

export default function Home() {
    return (
        <div className="space-y-8 mt-16">
            <div className="w-full h-screen">
                <ErrorBoundary>
                    <Suspense fallback={<p>Loading...</p>}>
                        <BannerSlider />
                    </Suspense>
                </ErrorBoundary>
            </div>

            <div className="px-8">
                <ErrorBoundary>
                    <Suspense fallback={<p>Loading upcoming movies...</p>}>
                        <UpComingMovieList title="🎬 Upcoming Movies" />
                    </Suspense>
                </ErrorBoundary>
            </div>
            <div className="px-8">
                <ErrorBoundary>
                    <Suspense fallback={<p>Loading popular movies...</p>}>
                        <PopularMovieList title="🔥 Popular Movies" />
                    </Suspense>
                </ErrorBoundary>
            </div>
            <div className="px-8">
                <ErrorBoundary>
                    <Suspense fallback={<p>Loading top-rated movies...</p>}>
                        <TopRatedMovieList title="🌟 Recommended Movies" />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </div>
    );
}
