import dotenv from 'dotenv';
dotenv.config();
import { createClient } from "@supabase/supabase-js";
import moment from 'moment-timezone';
import { Database } from '../../supabase/type/database.types';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY || '';
const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_API_KEY);
async function main(){
    // const {data, error} = await supabase.from('user_membership').select().eq('id', 2).single();
    // if(error){
    //     console.log('error: ', error);
    // }
    const expiredAtByUTC = '2024-09-03T08:20:28.747458'; //data?.expiredAt;
    console.log('expiredAtByUTC: ', expiredAtByUTC);
    // UTF 날짜 문자열을 KST로 변환
    const kstDate = moment(expiredAtByUTC).tz('Asia/Seoul');
    console.log(kstDate.format());
}
main();