// Supabase publishable credentials (safe to expose in the client bundle).
// Override via environment variables in production if needed.
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://embgaxvyeekbcazcxnwx.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtYmdheHZ5ZWVrYmNhemN4bnd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3MDM2OTgsImV4cCI6MjEwMDI3OTY5OH0.Acg6A3_NiUm7iWppIM5Z5b0cA0KztfU6huJ43Jw2mUg";

export const SITE_URL = "https://ayselagency.com";
