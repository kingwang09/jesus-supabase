import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Database } from '../../supabase/type/database.types';

dotenv.config();

const SUPABASE_AFFILIATE_URL = process.env.SUPABASE_AFFILIATE_URL || '';
const SUPABASE_AFFILIATE_API_KEY = process.env.SUPABASE_AFFILIATE_API_KEY || '';
console.log('SUPABASE_URL: ', SUPABASE_AFFILIATE_URL);
console.log('SUPABASE_API_KEY: ', SUPABASE_AFFILIATE_API_KEY);
const supabase = createClient<Database>(SUPABASE_AFFILIATE_URL, SUPABASE_AFFILIATE_API_KEY);

const main = async () => {
    //logic
    const pageNumber = 0;
    const pageSize = 10;
    const lastCrawlingId = 0;

    const {data, error} = await supabase.from('simple_affiliate_links')
        .select("*")
        .eq('mall_type', 'coupang')
        .not('link', 'is', null)
        .ilike('link', 'https://%')
        .gte('id', lastCrawlingId)
        .range(pageNumber * pageSize, (pageNumber + 1) * pageSize - 1) // 페이징 옵션
        .order('id', {ascending: true})
        .limit(10)

    if(error){
        console.log('error: ', error);
    }
    console.log('data: ', data);
};

main();