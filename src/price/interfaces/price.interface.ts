import { Json } from "../../../supabase/type/database.types";

interface IPriceByDaily {
    date: string,
    price: number,
    priceHistory: number[],
    lastCrawledAt: Date,
}

export type {
    IPriceByDaily,
}