// App.tsx
import React from 'react';
import Header from './layout/header';

const App: React.FC = () => {
    return (
        <div>
            <Header
                title="Welcome to My Website"
                subtitle="This is a subtitle"
            />
            <div>앱 페이지</div>
        </div>
    );
};

export default App;
