// Header.tsx
import { Film, Home } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 text-white">
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between h-16">
                    <Link to="/" className="">
                        <img
                            src="/img/logo_bl.png"
                            className="App-logo w-32 filter invert"
                            alt="logo"
                        />
                    </Link>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/">
                                <div className="flex items-center hover:text-gray-300 transition-colors">
                                    <Home className="mr-1" size={18} />
                                    <span>홈</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/movies">
                                <div className="flex items-center hover:text-gray-300 transition-colors">
                                    <Film className="mr-1" size={18} />
                                    <span>무비 리스트</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
