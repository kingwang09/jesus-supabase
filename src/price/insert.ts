import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Database } from '../../supabase/type/database.types';
import { CrawledProductMeta, CrawlingMallType, CrawlingPayload } from './interfaces/crawling.interface';
import { IPriceByDaily } from './interfaces/price.interface';
import { formatDate } from '../utils/date.util';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY || '';

const dummyCrawlingPayload: CrawlingPayload = {
    danawaUrl: '',
    mallType: CrawlingMallType.ALL,
    productId: 1,
    productCategoryKey: 'tv',
    productCategoryName: '티브이',
    modelName: '삼성 이건희 헌정 모델',
    brand: '삼성',
    basePrice: 150000,
    retryCount: 1,
};
const dummyProductMeta: CrawledProductMeta = {
    price: 1800000,
    link: '쿠팡상세링크',
    productTitle: '삼성 이재용 무죄 판결 헌정 모델',
    imageUrl: '이미지링크',
    mallType: CrawlingMallType.COUPANG,
};

const main = async () => {
    const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_API_KEY);

    const { data, error } = await supabase
        .from('simple_affiliate_links_history')
        .select("*")
        .eq('model', dummyCrawlingPayload.modelName)
        .eq('product_category_key', dummyCrawlingPayload.productCategoryKey)
        .single();
    console.log('data: ', data);

    if(data){//데이터가 존재하는 경우
        console.log('데이터 있음');
    }else{//없는 경우
        console.log('데이터 없음');
        const firstPriceByDaily: IPriceByDaily = {
            date: formatDate(),
            price: dummyProductMeta.price,
            priceHistory: [dummyProductMeta.price],
            lastCrawledAt: new Date(),
        };
        await supabase.from('simple_affiliate_links_history')
            .insert({
                product_category_key: dummyCrawlingPayload.productCategoryKey,
                model: dummyCrawlingPayload.modelName,
                brand: dummyCrawlingPayload.brand,
                link: dummyProductMeta.link,
                image_url: dummyProductMeta.imageUrl,

                mall_type: dummyProductMeta.mallType,
                price_by_last_crawled: dummyProductMeta.price,
                price_by_daily: JSON.stringify([firstPriceByDaily]),
            });
    }
};

//price_by_daily

main();
