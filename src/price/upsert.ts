import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Database, Json } from '../../supabase/type/database.types';
import { CrawledProductMeta, CrawlingMallType, CrawlingPayload } from './interfaces/crawling.interface';
import { IPriceByDaily } from './interfaces/price.interface';
import { formatDate } from '../utils/date.util';
import _ from 'lodash';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY || '';
const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_API_KEY);

const main = async (crawlingPayload: CrawlingPayload, productMeta: CrawledProductMeta) => {
    //크롤링 이력 쌓기 시작 -> mall_type & categoryKey & model
    const { data, error } = await supabase
        .from('simple_affiliate_links_history')
        .select("*")
        .eq('mall_type', productMeta.mallType)
        .eq('product_category_key', crawlingPayload.productCategoryKey)
        .eq('model', crawlingPayload.modelName)
        .single();
    console.log('select one: ', data);


    //mall_type & categoryKey & model 데이터가 존재하는 경우,
    if(data){
        //오늘 날짜 price_by_daily[] 찾아서 
        await updatePriceByDaily(data.price_by_daily as unknown as IPriceByDaily[], crawlingPayload, productMeta);
    }else{//없는 경우
        console.log('데이터 없음');
        await insertPriceHistoryByDaily(crawlingPayload, productMeta);
    }
};
const updatePriceByDaily = async (priceListByDaily: IPriceByDaily[], crawlingPayload: CrawlingPayload, productMeta: CrawledProductMeta) => {
    let _priceListByDaily = priceListByDaily;//data.price_by_daily as unknown as IPriceByDaily[];
    console.log('priceByDaily: ', priceListByDaily);
    const currentDateKey = formatDate();
    const dateKeyIndex = _.findIndex(priceListByDaily, {'date':currentDateKey});
    console.log('dateKeyIndex: ', dateKeyIndex);

    
    if(dateKeyIndex != -1){//이미 동일한 날짜로 수집이 된 경우
        const updatePriceByDaily = getUpdatePriceByDaily(dateKeyIndex, _priceListByDaily, productMeta.price);
        
        //최신 수집된 가격으로 날짜 배열 교체
        _priceListByDaily.splice(dateKeyIndex, 1, updatePriceByDaily);
        console.log('priceListByDaily: ', _priceListByDaily);
    }else{//새로 수집된 경우
        const insertPriceByDaily: IPriceByDaily = {
            date: currentDateKey,
            price: productMeta.price,
            priceHistory: [productMeta.price],
            lastCrawledAt: new Date(),
        }
        //최신 수집된 가격으로 날짜 배열 추가
        _priceListByDaily.push(insertPriceByDaily);
    }


    await supabase.from('simple_affiliate_links_history')
        .update({
            link: productMeta.link,
            image_url: productMeta.imageUrl,

            price_by_last_crawled: productMeta.price,
            price_by_daily: _priceListByDaily as unknown as Json,
        })
        .eq('model', crawlingPayload.modelName)
        .eq('product_category_key', crawlingPayload.productCategoryKey)
        .eq('mall_type', productMeta.mallType)
};

const getUpdatePriceByDaily = (dateKeyIndex: number, priceListByDaily: IPriceByDaily[], latestPrice: number): IPriceByDaily => {
    const priceByDaily = priceListByDaily[dateKeyIndex];
    priceByDaily.priceHistory.push(latestPrice);

    const updatePriceByDaily: IPriceByDaily = {
        date: priceByDaily.date,
        price: latestPrice,
        priceHistory: priceByDaily.priceHistory,
        lastCrawledAt: new Date(),
    }
    console.log('[getUpdatePriceByDaily] updatePriceByDaily=', updatePriceByDaily);
    return updatePriceByDaily;
} ;

const insertPriceHistoryByDaily = async (crawlingPayload: CrawlingPayload, productMeta: CrawledProductMeta) => {
    const firstPriceByDaily: IPriceByDaily = {
        date: formatDate(),
        price: productMeta.price,
        priceHistory: [productMeta.price],
        lastCrawledAt: new Date(),
    };
    await supabase.from('simple_affiliate_links_history')
        .insert({
            mall_type: productMeta.mallType,
            product_category_key: crawlingPayload.productCategoryKey,
            model: crawlingPayload.modelName,
            brand: crawlingPayload.brand,

            link: productMeta.link,
            image_url: productMeta.imageUrl,
            price_by_last_crawled: productMeta.price,
            price_by_daily: [firstPriceByDaily] as unknown as Json,
        });
};

//price_by_daily
const dummyCrawlingPayload1: CrawlingPayload = {
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
const dummyProductMeta1: CrawledProductMeta = {
    price: 1950000,
    link: '쿠팡상세링크',
    productTitle: '삼성 이재용 무죄 판결 헌정 모델',
    imageUrl: '이미지링크',
    mallType: CrawlingMallType.COUPANG,
};
main(dummyCrawlingPayload1, dummyProductMeta1,);
