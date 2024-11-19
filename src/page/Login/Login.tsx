import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('nickname', nickname); // 닉네임 로컬 스토리지에 저장
        // setNickname(nickname); // 상태 갱신
        navigate('/'); // 홈 화면으로 이동
        window.location.reload(); // 페이지 새로고침 => 새로고침하지 않으면 바뀐 닉네임이 헤더에 노출되지 않아 새로고침 코드 추가
    };

    //로그인 후 로그인 페이지로 이동 불가하여 해당 코드 주석
    // useEffect(() => {
    //     const storedNickname = localStorage.getItem('nickname'); // 로컬 스토리지에서 닉네임을 가져와 상태에 반영
    //     if (storedNickname) {
    //         setNickname(storedNickname);
    //     }
    // }, []); // 컴포넌트가 마운트(렌더링)될 때만 실행

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
