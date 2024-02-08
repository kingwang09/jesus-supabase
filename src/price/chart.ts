import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Database } from '../../supabase/type/database.types';
import { IPriceByDaily } from './interfaces/price.interface';
import { IChart, IChartBodyByDate } from './interfaces/chart.interface';
import { CrawlingMallType } from './interfaces/crawling.interface';
import { convertStringToEnum, stringToEnum } from '../utils/string.util';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY || '';

const main = async () => {
    const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_API_KEY);

    const { data, error } = await supabase
        .from('simple_affiliate_links_history')
        .select()
        .eq('product_category_key', 'tv')
        .eq('model', '삼성 이건희 헌정 모델');
    if(data){
       //제품에 대해 mallType별 데이터가 있을 것임.
       let chart: IChart[] = [];
       for(const value of data){
        console.log(`mallType=${value.mall_type}, value=${value.price_by_last_crawled}`);
        const mallType = convertStringToEnum(CrawlingMallType, value.mall_type);
        const priceListByDaily = value.price_by_daily as unknown as IPriceByDaily[]; //map dateKey:price
        const priceListByDateKey: IChartBodyByDate[] = priceListByDaily.map((v) => {
            return {
                dateKey: v.date,
                price: v.price,
            }
        });
        chart.push({
            mallType: mallType,
            chartBody: priceListByDateKey,
        })
       }
       console.log(chart);
    }
};

main();
