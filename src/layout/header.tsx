import { Film, Home, LogIn } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 
            ${scrolled ? 'shadow-xl backdrop-blur-sm' : 'shadow-lg'}`}
            style={{
                background: scrolled
                    ? 'linear-gradient(to right, rgba(55, 65, 81, 0.5), rgba(55, 65, 81, 0.5))' // 투명도 적용된 그라데이션
                    : 'linear-gradient(to right, rgba(31, 41, 55, 1), rgba(31, 41, 55, 1))', // 기본 불투명 그라데이션
                transition:
                    'background 0.5s ease, box-shadow 0.5s ease, backdrop-filter 0.5s ease', // 모든 스타일에 트랜지션 추가
            }}
        >
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between h-16">
                    {/* Logo on the left */}
                    <Link to="/" className="">
                        <img
                            src="/img/logo_bl.png"
                            className="App-logo w-32 filter invert transition-all duration-500"
                            alt="logo"
                        />
                    </Link>

                    {/* Central menu */}
                    <ul className="flex space-x-4 mx-auto">
                        <li>
                            <Link to="/">
                                <div className="flex items-center hover:text-gray-300 transition-colors duration-300">
                                    <Home className="mr-1" size={18} />
                                    <span>Home</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/movies">
                                <div className="flex items-center hover:text-gray-300 transition-colors duration-300">
                                    <Film className="mr-1" size={18} />
                                    <span>Movie List</span>
                                </div>
                            </Link>
                        </li>
                    </ul>

                    {/* Login button on the right */}
                    <div className="ml-auto">
                        <Link
                            to="/login"
                            className="hover:text-gray-300 transition-colors duration-300"
                        >
                            <div className="flex items-center hover:text-gray-300 transition-colors duration-300">
                                <LogIn className="mr-1" size={18} />
                                <span>Login</span>
                            </div>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
