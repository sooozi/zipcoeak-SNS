// Header.tsx
import { Film, Home } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 text-white">
            <img src="/img/logo_bl.png" className="App-logo" alt="logo" />
            {/* 네비게이션 링크 */}
            <nav className="">
                <Link to="/movies" className="">
                    <Home className="mr-1" size={18} />
                    <span>무비 리스트</span>
                </Link>
                <Link
                    to="/movies"
                    className="flex items-center hover:text-gray-300 transition-colors"
                >
                    <Film className="mr-1" size={18} />
                    <span>무비 리스트</span>
                </Link>
            </nav>
        </header>
    );
};

export default Header;
