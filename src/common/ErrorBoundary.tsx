// React에서 Component 클래스를 가져오고, 타입 정의를 위해 ReactNode를 가져옴
// * ReactNode : React에서 사용할 수 있는 모든 종류의 렌더링 가능한 요소를 의미하는 타입!
import React, { Component, ReactNode } from 'react';

// 자식요소 타입정의
interface ErrorBoundaryProps {
    // ErrorBoundary는 자식 컴포넌트를 받아야 하므로 이를 ReactNode로 타입 지정
    children: ReactNode;
}

// 내부상태 관리를 위한 타입정의
interface ErrorBoundaryState {
    hasError: boolean; // 에러 발생 여부를 나타내는 상태
    error: Error | null; // 발생한 에러 객체를 저장
}

// ErrorBoundary는 에러 처리를 담당하는 특수한 컴포넌트로,
// 클래스형 컴포넌트에서만 지원되는 라이프사이클 메서드를 필요로 하여 class로 만들어졌다.
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    // constructor : 상태 초기화 및 props를 부모 클래스에 전달, 클래스가 생성될 때 자동으로 호출
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            // 초기 상태 설정: 에러 없고(hasError: false), 에러 객체는 null
            hasError: false,
            error: null,
        };
    }

    // 정적 메서드: 에러 발생 시 상태 업데이트
    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    // 에러를 잡아내고 추가적인 작업(예: 로그 기록)을 수행
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // 에러와 추가 정보를 콘솔에 출력
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    // retry 메서드 : retry 버튼 클릭 시 호출
    handleRetry = () => {
        // 에러 상태를 초기화하여 리렌더링을 트리거
        this.setState({
            hasError: false,
            error: null,
        });
    };

    render() {
        if (this.state.hasError) {
            // 에러가 발생한 경우 에러 메시지, retry 버튼 노출
            return (
                <div>
                    <p>Error occurred: {this.state.error?.message}</p>
                    <button onClick={this.handleRetry}>Retry</button>
                </div>
            );
        }

        // 에러가 없는 경우 자식 컴포넌트를 렌더링
        return this.props.children;
    }
}

export default ErrorBoundary;
