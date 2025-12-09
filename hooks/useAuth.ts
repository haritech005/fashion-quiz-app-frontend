// hooks/useAuth.ts
import { useEffect } from "react";
import { supabase } from "../services/supabase";
import { useAuthStore } from "../store/authStore";
import type { Session } from "@supabase/supabase-js";

export const useAuth = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const setSession = useAuthStore((s) => s.setSession);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    // Initial session
    supabase.auth
      .getSession()
      .then(({ data: { session }, error }) => {
        if (!mounted) return;
        if (error) console.warn("getSession error:", error);

        setSession(session ?? null);
        setUser(session?.user ?? null);
      })
      .catch(() => {
        if (mounted) {
          setSession(null);
          setUser(null);
        }
      })
      .finally(() => mounted && setLoading(false));

    // Auth listener
    const { data } = supabase.auth.onAuthStateChange(
      (_event, session: Session | null) => {
        if (!mounted) return;
        setSession(session ?? null);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      mounted = false;
      data.subscription.unsubscribe(); // ✅ Correct
    };
  }, [setUser, setSession, setLoading]);
};
