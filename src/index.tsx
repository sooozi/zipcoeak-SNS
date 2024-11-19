import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root')!);
// const queryClient = new QueryClient();
// root.render(
//     <QueryClientProvider client={queryClient}>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     </QueryClientProvider>,
// );
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    const queryClient = new QueryClient();

    root.render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>,
    );
} else {
    console.error('Root element not found.');
}
