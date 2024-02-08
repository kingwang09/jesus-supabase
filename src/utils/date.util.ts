
const formatDate = (year?: number, month?:number, day?: number) => {
    let currentDate = new Date();
    if(year && month && day){
        currentDate = new Date(year, month - 1, day);
    }
    const yearStr = currentDate.getFullYear();
    const monthStr = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
    const dayStr = String(currentDate.getDate()).padStart(2, '0');
    return `${yearStr}-${monthStr}-${dayStr}`;
}

export {
    formatDate
}