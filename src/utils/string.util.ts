

function stringToEnum<T>(enumObj: { [s: string]: T }, str: string): T | null {
    if (Object.values(enumObj).includes(str as T)) {
        return enumObj[str as keyof typeof enumObj];
    }
    return null;
}

// function stringToEnum<T>(enumObj: T, str: string): T[keyof T] | undefined {
//     if (Object.values(enumObj).includes(str)) {
//         return str as T[keyof T];
//     }
//     return undefined;
// }

function convertStringToEnum<T>(enumObj: { [key: string]: T }, value: string): T | null {
    // Enum의 값 중에서 주어진 문자열과 일치하는 값을 찾습니다.
    const enumKey = Object.keys(enumObj).find(key => enumObj[key] === value);
    if (enumKey) {
        return enumObj[enumKey];
    }
    // 일치하는 Enum 값이 없을 경우 undefined 반환
    return null;
}
export {
    stringToEnum, convertStringToEnum
}