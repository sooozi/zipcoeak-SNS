import {
    Calendar,
    LogIn,
    Play,
    Search,
    TrendingUp,
    Trophy,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [nickname, setNickname] = useState<string | null>(null);

    // 페이지 로드 시 로컬 스토리지에서 닉네임을 가져와서 상태 업데이트
    useEffect(() => {
        const storedNickname = localStorage.getItem('nickname');
        if (storedNickname) {
            setNickname(storedNickname);
        }

        // 스크롤 이벤트 처리
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // 로컬 스토리지에서 닉네임 변경 사항을 감지하여 상태 업데이트
        const handleStorageChange = () => {
            const updatedNickname = localStorage.getItem('nickname');
            setNickname(updatedNickname);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('storage', handleStorageChange); // 이벤트 리스너 정리
        };
    }, []); // 컴포넌트가 마운트될 때만 실행

    // 로그아웃 함수
    const handleLogout = () => {
        localStorage.removeItem('nickname');
        setNickname(null); // 상태 업데이트
    };

    return (
        <header
            className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 
            ${scrolled ? 'shadow-xl backdrop-blur-sm' : 'shadow-lg'}`}
            style={{
                background: scrolled
                    ? 'linear-gradient(to right, rgba(55, 65, 81, 0.5), rgba(55, 65, 81, 0.5))'
                    : 'linear-gradient(to right, rgba(31, 41, 55, 1), rgba(31, 41, 55, 1))',
                transition:
                    'background 0.5s ease, box-shadow 0.5s ease, backdrop-filter 0.5s ease',
            }}
        >
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between h-16">
                    {/* 로고 */}
                    <Link to="/" className="flex items-center">
                        <img
                            src="/img/logo_bl.png"
                            className="App-logo w-32 filter invert transition-all duration-500"
                            alt="logo"
                        />
                    </Link>

                    {/* 중앙 메뉴 */}
                    <ul className="flex space-x-8 mx-auto">
                        {/* <li>
                            <Link to="/">
                                <div className="flex items-center hover:text-gray-300 transition-colors duration-300">
                                    <Home className="mr-1" size={18} />
                                    <span>Home</span>
                                </div>
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/nowPlayingList">
                                <div className="flex items-center hover:text-gray-300 transition-colors duration-300">
                                    <Play className="mr-1" size={18} />
                                    <span>Now Playing</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/movieList">
                                <div className="flex items-center hover:text-gray-300 transition-colors duration-300">
                                    <TrendingUp className="mr-1" size={18} />
                                    <span>Trending</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/topRatedList">
                                <div className="flex items-center hover:text-gray-300 transition-colors duration-300">
                                    <Trophy className="mr-1" size={18} />
                                    <span>Top Rated</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/upcomingList">
                                <div className="flex items-center hover:text-gray-300 transition-colors duration-300">
                                    <Calendar className="mr-1" size={18} />
                                    <span>Upcoming</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/search">
                                <div className="flex items-center hover:text-gray-300 transition-colors duration-300">
                                    <Search className="mr-1" size={18} />
                                    <span>Search</span>
                                </div>
                            </Link>
                        </li>
                    </ul>

                    {/* 로그인 버튼 또는 닉네임 */}
                    <div className="">
                        {nickname ? (
                            <div className="flex items-center">
                                <span className="text-white">
                                    🙋‍♀️ Hi! {nickname}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="ml-4 bg-gray-900 text-white text-xs font-semibold py-1 px-3 rounded-full text-sm hover:bg-red-900"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="hover:text-gray-300 transition-colors duration-300"
                            >
                                <div className="flex items-center hover:text-gray-300 transition-colors duration-300">
                                    <LogIn className="mr-1" size={18} />
                                    <span>Login</span>
                                </div>
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
