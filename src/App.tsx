// App.tsx
import React from 'react';
import { Route, Routes } from 'react-router';
import AppLayout from './layout/AppLayout';
import Home from './page/Home/Home';
import LoginPage from './page/Login/Login';
import MovieDetailPage from './page/MovieDetail/MovieDetail';
import MovieListPage from './page/MovieList/MovieList';
import MovieNowPlayingPage from './page/MovieNowPlaying/MovieNowPlaying';
import MovieTopRatedPage from './page/MovieTopRated/MovieTopRated';
import MovieUpcomingPage from './page/MovieUpcoming/MovieUpcoming';
import NotFoundPage from './page/NotFoundPage/NotFoundPage';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="movieList">
                    <Route index element={<MovieListPage />} />
                    <Route path=":id" element={<MovieDetailPage />} />
                </Route>
                <Route
                    path="nowPlayingList"
                    element={<MovieNowPlayingPage />}
                />
                <Route path="topRatedList" element={<MovieTopRatedPage />} />
                <Route path="upcomingList" element={<MovieUpcomingPage />} />

                <Route path="login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default App;
