import { createClient } from '@supabase/supabase-js';
import { Database } from '../../supabase/database.types';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY || '';
const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_API_KEY);

const main = async () => {
    //logic
    const {error} = await supabase.from('User').update({name: 'lee-update'}).eq('email', 'leeyeojeong@naver.com');

    if(error){
        console.error('update error...');
    }else{
        console.log('update success...');
    }
};

main();