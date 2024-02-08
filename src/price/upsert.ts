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
    price: 1950000,
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
        .eq('mall_type', dummyProductMeta.mallType)
        .single();
    console.log('data: ', data);


    if(data){//데이터가 존재하는 경우
        console.log('데이터 있음');

        //오늘 날짜 price_by_daily[] 찾아서 
        let priceListByDaily = data.price_by_daily as unknown as IPriceByDaily[];
        console.log('priceByDaily: ', priceListByDaily);
        const currentDateKey = formatDate();
        const dateKeyIndex = _.findIndex(priceListByDaily, {'date':currentDateKey});
        console.log('dateKeyIndex: ', dateKeyIndex);

        
        if(dateKeyIndex != -1){//이미 동일한 날짜로 수집이 된 경우
            const priceByDaily = priceListByDaily[dateKeyIndex];
            priceByDaily.priceHistory.push(dummyProductMeta.price);

            const updatePriceByDaily: IPriceByDaily = {
                date: priceByDaily.date,
                price: dummyProductMeta.price,
                priceHistory: priceByDaily.priceHistory,
                lastCrawledAt: new Date(),
            }
            console.log('updatePriceByDaily: ', updatePriceByDaily);

            //배열 교체
            priceListByDaily.splice(dateKeyIndex, 1, updatePriceByDaily);
            console.log('priceListByDaily: ', priceListByDaily);
        }else{//새로 수집된 경우
            const insertPriceByDaily: IPriceByDaily = {
                date: currentDateKey,
                price: dummyProductMeta.price,
                priceHistory: [dummyProductMeta.price],
                lastCrawledAt: new Date(),
            }
            priceListByDaily.push(insertPriceByDaily);
        }
        
        //date-key로 추출
        
        //있으면 
            //update price 
            //update price History push
            //update lastCrawledAt new Date()
        //없으면
            //insert price
            //insert price history
            //insert lastCrawledAt new Date()

        await supabase.from('simple_affiliate_links_history')
            .update({
                link: dummyProductMeta.link,
                image_url: dummyProductMeta.imageUrl,

                price_by_last_crawled: dummyProductMeta.price,
                price_by_daily: priceListByDaily as unknown as Json,
            })
            .eq('model', dummyCrawlingPayload.modelName)
            .eq('product_category_key', dummyCrawlingPayload.productCategoryKey)
            .eq('mall_type', dummyProductMeta.mallType)

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
                mall_type: dummyProductMeta.mallType,
                product_category_key: dummyCrawlingPayload.productCategoryKey,
                model: dummyCrawlingPayload.modelName,
                brand: dummyCrawlingPayload.brand,

                link: dummyProductMeta.link,
                image_url: dummyProductMeta.imageUrl,
                price_by_last_crawled: dummyProductMeta.price,
                price_by_daily: [firstPriceByDaily] as unknown as Json,
            });
    }
};

//price_by_daily

main();
