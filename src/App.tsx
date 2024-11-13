// App.tsx
import React from 'react';
import { Route, Routes } from 'react-router';
import AppLayout from './layout/AppLayout';
import Home from './page/Home/Home';
import LoginPage from './page/Login/Login';
import MoviePage from './page/Movies/Movies';
import MovieDetailPage from './page/MoviesDetail/MoviesDetail';
import NotFoundPage from './page/NotFoundPage/NotFoundPage';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="movies">
                    <Route index element={<MoviePage />} />
                    <Route path=":id" element={<MovieDetailPage />} />
                </Route>
                <Route path="login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default App;
