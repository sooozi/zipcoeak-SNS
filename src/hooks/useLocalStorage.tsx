import { useState } from 'react';

/**
 * useLocalStorage: 로컬 스토리지를 쉽게 관리하는 커스텀 훅
 * @param key - 로컬 스토리지에서 사용할 키
 * @param initialValue - 초기값
 */

function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            // 데이터가 JSON으로 파싱 가능한 경우에만 파싱
            return item // 로컬 스토리지에서 읽어온 데이터가 존재하면 실행
                ? isJsonString(item) // 데이터가 JSON 문자열인지 확인
                    ? JSON.parse(item) // JSON 문자열이면 객체로 변환 (파싱)
                    : item // JSON 문자열이 아니면 원래 문자열 그대로 반환
                : initialValue; // 로컬 스토리지에서 읽어온 데이터가 없으면 초기값을 반환
        } catch (error) {
            console.error(`Error reading localStorage key "${key}"`, error);
            return initialValue;
        }
    });

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}"`, error);
        }
    };

    return [storedValue, setValue] as const;
}

// JSON 문자열 여부 확인 함수
function isJsonString(str: string) {
    try {
        JSON.parse(str);
        return true;
    } catch {
        return false;
    }
}

export default useLocalStorage;
