export interface Outfit {
  id: number;
  title: string;
  image: string;          // URL from Supabase storage
  category?: string;      // casual, formal, traditional, etc.
  description?: string;   // optional text
  embedding?: number[];   // AI vector (if needed for similarity)
}
