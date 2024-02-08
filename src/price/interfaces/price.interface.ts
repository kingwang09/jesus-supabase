import { Json } from "../../../supabase/type/database.types";

interface IPriceByDaily {
    date: string,//날짜별
    price: number,//최근 수집된 가격
    priceHistory: number[],//같은날 이력
    lastCrawledAt: Date,
}

export type {
    IPriceByDaily,
}