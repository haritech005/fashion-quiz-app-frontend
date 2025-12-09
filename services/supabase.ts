// services/supabase.ts
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../constants/supabaseConfig";

// 💡 New: Use localStorage for web and AsyncStorage for native platforms
// This avoids the "window is not defined" error during web initialization.
let storage = AsyncStorage;

if (Platform.OS === "web") {
  // Check if running in a browser environment
  if (typeof window !== "undefined") {
    // Supabase auth-js will automatically use localStorage if the 'storage' option is set to null
    // or if we pass the window.localStorage object directly.
    // For Expo Web, we can safely use localStorage since it is available in the browser.
    storage = window.localStorage as any; 
  } else {
    // Fallback for non-browser web environments (like during SSR/Node initialization)
    // We can define a dummy object that implements the storage interface
    // to prevent errors, although this scenario should ideally be handled by bundler configs.
    console.warn("localStorage not available. Using a dummy storage object.");
    storage = {
        getItem: () => Promise.resolve(null),
        setItem: () => Promise.resolve(),
        removeItem: () => Promise.resolve(),
    } as any;
  }
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: storage, // Use the dynamically selected storage
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false, // RN: false
  },
});