import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Database } from '../supabase/type/database.types';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY || '';

const main = async () => {
    console.log('hello');
    const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_API_KEY);

    // const { data, error } = await supabase.from('shopping_list').select();
    // if(error){
    //     console.log('error: ', error);
    // }
    // console.log('data: ', data);

    const {data, error} = await supabase.rpc('shopping_list_increment_copied_count', {shopping_list_id: 1});
    if(error){
        console.log('error: ', error);
    }
    console.log('result: ', data);
};

main();
