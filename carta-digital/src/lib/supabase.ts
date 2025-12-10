/*
    Funcion para conectarnos a supabase y luego exportamos la conexcion

    key y url sol las claves y el api key para la conexion
*/

import { createClient } from '@supabase/supabase-js';

const key = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

export const supabase = createClient(url ?? '', key ?? '');
