import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Database } from '../../supabase/type/database.types';

dotenv.config();
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY || '';
const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_API_KEY);

const main = async () => {
    //logic
    const pageNumber = 0;
    const pageSize = 10;
    const lastCrawlingId = 0;

    const {data, error} = await supabase
        .from('array_test')
        .select()
        //.contains('textarray', ['Hello'])
        //.filter('textarray','in', '("하이")')
        //.not('textarray', '@>', ['Hello'])
        //.not('textarray', 'cs', '{"Hello"}') 
        .not('number_array', 'cs', '{1}') 
        .limit(10)

    if(error){
        console.log('error: ', error);
    }
    console.log('data: ', data);
};

main();