import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Database } from '../supabase/database.types';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY || '';

const main = async () => {
    console.log('hello');
    const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_API_KEY);

    const { data, error } = await supabase.from('User').select('email');
    console.log('data: ', data);
    if(data){
        for(const element of data){
            console.log(`email: ${element.email}`);
        }
    }
};

main();
