'use client'
import { loginSupabase, userAuthenticated } from "@/actions";
import { supabase } from "@/lib/supabase";
import { Session } from "inspector/promises";
import { useState } from "react";

export const useAuth = () => {
    const [user, setUser] = useState<any>(null)

    const verificarAutenticacion = async () => {
        const res = await userAuthenticated();
        setUser(res)
    }

    const login = async (email: string, password: string) => {
        const session = await loginSupabase(email, password);
        setUser(session);
    };

    const logOut = async () => {
        await supabase.auth.signOut();
    };



    return {
        verificarAutenticacion,
        login,
        logOut,
        user
    }
}