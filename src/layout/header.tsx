// Header.tsx
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="">
            <img src="/img/logo_bl.png" className="App-logo" alt="logo" />
            {/* 네비게이션 링크 */}
            {/* <nav className="flex items-center space-x-4">
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
            </nav> */}
        </header>
    );
};

export default Header;
