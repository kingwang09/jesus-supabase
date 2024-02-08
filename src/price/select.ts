import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Database } from '../../supabase/type/database.types';
import { IPriceByDaily } from './interfaces/price.interface';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY || '';



const main = async () => {
    const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_API_KEY);

    const { data, error } = await supabase.from('simple_affiliate_links_history').select();
    if(data){
        for(const history of data){
            console.log('history: ', history);
            const price_by_daily = history.price_by_daily as unknown as IPriceByDaily[];
            console.log('price_by_daily: ', price_by_daily);
            for(const priceDaily of price_by_daily){
                console.log('priceDaily: ', priceDaily);
                console.log('priceDaily: ', priceDaily.date);
                console.log('priceDaily: ', priceDaily.price);
                console.log('priceDaily: ', priceDaily.priceHistory);
                console.log('priceDaily: ', priceDaily.priceHistory.length);
                console.log('priceDaily: ', priceDaily.lastCrawledAt);
            }
            
        }
    }
};

main();
