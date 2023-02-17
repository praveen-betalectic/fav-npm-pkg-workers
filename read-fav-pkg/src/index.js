import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ioxscwccgueauykarmzo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlveHNjd2NjZ3VlYXV5a2FybXpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUwNzI5MTcsImV4cCI6MTk5MDY0ODkxN30.UJrEtHXEmAw4fT8pSmFDCggTnQkZTrRgdIc9jbSVGAw";

const supabase = createClient(supabaseUrl, supabaseKey);

export default {
  async fetch(request, env) {
    return await handleRequest(request);
  },
};

async function handleRequest(request) {
  const { data, error } = await supabase.from("fav_pkg").select();

  if (error) throw error;

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-type": "application/json",
    },
  });
}
