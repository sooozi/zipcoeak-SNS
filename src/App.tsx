// App.tsx
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
import SearchPage from './page/Search/SearchPage';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="movieList">
                    <Route index element={<MovieListPage />} />
                    <Route path=":id" element={<MovieDetailPage />} />
                </Route>
                <Route path="nowPlayingList">
                    <Route index element={<MovieNowPlayingPage />} />
                    <Route path=":id" element={<MovieDetailPage />} />
                </Route>
                <Route path="topRatedList">
                    <Route index element={<MovieTopRatedPage />} />
                    <Route path=":id" element={<MovieDetailPage />} />
                </Route>
                <Route path="upcomingList">
                    <Route index element={<MovieUpcomingPage />} />
                    <Route path=":id" element={<MovieDetailPage />} />
                </Route>

                <Route path="login" element={<LoginPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default App;
