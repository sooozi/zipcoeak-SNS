import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="text-center space-y-6">
                <div className="flex justify-center">
                    <AlertCircle className="h-24 w-24 text-muted-foreground" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    404
                </h1>
                <h2 className="text-2xl font-semibold text-muted-foreground">
                    페이지를 찾을 수 없습니다
                </h2>
                <p className="text-muted-foreground max-w-[42rem] mx-auto">
                    죄송합니다. 요청하신 페이지를 찾을 수 없습니다. URL을
                    확인하시거나 아래 버튼을 클릭하여 홈페이지로 이동해주세요.
                </p>
                <div className="flex justify-center space-x-4">
                    {/* Wrap the button with a Link component */}
                    <Link href="/">
                        <a className="px-4 py-2 bg-blue-500 text-white rounded-md">
                            홈으로 돌아가기
                        </a>
                    </Link>
                    <button
                        className="px-4 py-2 border rounded-md"
                        onClick={() => window.history.back()}
                    >
                        이전 페이지로
                    </button>
                </div>
            </div>
        </div>
    );
}
