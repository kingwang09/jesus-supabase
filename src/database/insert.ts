import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';
import moment from 'moment-timezone';
import { Database } from '../../supabase/type/database.types';



const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY || '';
const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_API_KEY);

const main = async () => {
    console.log('hello');
    const expiredAt = moment().add(1, 'days').toDate().toISOString();
    console.log('test: ', expiredAt);
    const kstDate = moment(expiredAt).tz('Asia/Seoul');
    console.log(kstDate.format());
    // const { error } = await supabase.from('user_membership').insert({
    //     expiredAt: expiredAt,
    //     status: 'completed',
    //     payment: {},
    //     membershipId: 1,
    //     userId: 1,
    // });
    // if(error){
    //     console.error('insert error: ', error);
    // }else{
    //     console.log('insert success.');
    // }
};

main();