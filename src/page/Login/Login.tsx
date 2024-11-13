import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // 닉네임을 로컬 스토리지에 저장
        localStorage.setItem('nickname', nickname);
        navigate('/'); // 로그인 후 홈 화면으로 이동
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-xs p-8 rounded-lg shadow-lg bg-gray-600">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Nickname Login
                </h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label
                            htmlFor="nickname"
                            className="block text-sm font-bold mb-2"
                        >
                            Nickname
                        </label>
                        <input
                            type="text"
                            id="nickname"
                            placeholder="Enter your nickname"
                            className="w-full px-3 py-2 border text-gray-900 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                            required
                            onChange={e => setNickname(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
