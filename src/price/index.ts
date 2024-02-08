import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Database } from '../../supabase/type/database.types';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY || '';

const main = async () => {
    const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_API_KEY);

    const { data, error } = await supabase.from('simple_affiliate_links_history').select('*');
    console.log('data: ', data);
};

main();
