// App.tsx
import AppLayout from '@/layout/AppLayout';
import GenrePage from '@/page/Genre/GenrePage';
import Home from '@/page/Home/Home';
import LoginPage from '@/page/Login/Login';
import MovieDetailPage from '@/page/MovieDetail/MovieDetail';
import MovieListPage from '@/page/MovieList/MovieList';
import MovieNowPlayingPage from '@/page/MovieNowPlaying/MovieNowPlaying';
import MovieTopRatedPage from '@/page/MovieTopRated/MovieTopRated';
import MovieUpcomingPage from '@/page/MovieUpcoming/MovieUpcoming';
import NotFoundPage from '@/page/NotFoundPage/NotFoundPage';
import SearchPage from '@/page/Search/SearchPage';
import { Route, Routes } from 'react-router';

const App = () => {
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

                {/* 장르별 영화 목록을 처리하는 페이지 */}
                <Route path="movies" element={<GenrePage />} />
                <Route path="/genre/:genreId" element={<GenrePage />} />

                <Route path="login" element={<LoginPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default App;
