'use client'
import { loginSupabase, userAuthenticated } from "@/actions";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export const useAuth = () => {
    const [user, setUser] = useState<any>(null)


    const login = async (email: string, password: string) => {
        const session = await loginSupabase(email, password);
        setUser(session);
    };

    const logOut = async () => {
        await supabase.auth.signOut();
    };



    return {
        login,
        logOut,
        user
    }
}