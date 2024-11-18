import { Outlet } from 'react-router';
import '../index.css';
import Header from './header';

const AppLayout = () => {
    return (
        <div className="bg-gray-800 text-white">
            <Header></Header>
            <Outlet />
        </div>
    );
};

export default AppLayout;
