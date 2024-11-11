import ReactDOM from 'react-dom/client'; // createRoot를 사용하기 위한 새로운 import
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!); // createRoot를 사용
root.render(<App />); // 렌더링
