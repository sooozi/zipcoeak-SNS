// export default function sum(a: number, b: number): number {
//     return a + b;
// }
const sum = (a: number | string, b: number): number => {
    return Number(a) + b; // 문자열을 숫자로 변환
};

export default sum;
