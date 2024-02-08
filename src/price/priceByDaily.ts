import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Database } from '../../supabase/type/database.types';
import { getDateKey } from '../utils/date.util';
dotenv.config();

const main = async () => {
    const dateString = getDateKey(2024, 12, 31);
    console.log(dateString);
    
};

main();
