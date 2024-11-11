// Header.tsx
import { Film, Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// 타입 정의 (필요에 따라 수정)
interface HeaderProps {
    title: string;
    subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <header className="bg-blue-500 p-4 text-white">
            <img src="/img/logo_bl.png" className="App-logo" alt="logo" />
            <h1 className="text-3xl">{title}</h1>
            {/* 네비게이션 링크 */}
            <nav className="flex items-center space-x-4">
                <Link
                    href="/movies"
                    className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-primary"
                >
                    <Film className="h-4 w-4" />
                    <span>무비 리스트</span>
                </Link>
                <Link
                    href="/search"
                    className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-primary"
                >
                    <Search className="h-4 w-4" />
                    <span>검색</span>
                </Link>
            </nav>
        </header>
    );
};

export default Header;
