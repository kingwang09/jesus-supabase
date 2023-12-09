import { createClient } from '@supabase/supabase-js';
import { Database } from '../../supabase/database.types';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY || '';
const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_API_KEY);

const main = async () => {
    console.log('hello');
    const { error } = await supabase.from('User').insert({
        email: 'leeyeojeong@naver.com',
        name: 'lee',
    });
    if(error){
        console.error('insert error: ', error);
    }else{
        console.log('insert success.');
    }
};

main();