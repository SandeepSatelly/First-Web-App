import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tcemdaeqlctlqentpjup.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjZW1kYWVxbGN0bHFlbnRwanVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg0MDI1NjksImV4cCI6MTk5Mzk3ODU2OX0.TpLPnWWn9SUwTn4Ne2pdl-vmv3Qn7f0YXxGxiHVVR8w";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
