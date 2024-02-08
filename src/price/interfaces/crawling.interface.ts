enum CrawlingMallType {
    ALL = 'all',
    COUPANG = 'coupang',
    ELEVENTH_STREET = 'eleventhStreet',
    HMALL = 'hMall',
    OHOUSE = 'oHouse',
    HI_MART = 'hiMart',
}

interface CrawlingPayload {
    danawaUrl: string;
    mallType: CrawlingMallType;
    productId: number;
    productCategoryKey: string;
    productCategoryName: string;
    productName?: string;
    modelName: string;
    brand: string;
    basePrice: number;
    retryCount: number;
}

interface CrawledProductMeta {
    price: number;
    link?: string;
    productTitle: string;
    imageUrl?: string;
    //strategy: CrawlingStrategy;
    mallType: CrawlingMallType;
}
export type { CrawlingPayload, CrawledProductMeta }
export { CrawlingMallType }