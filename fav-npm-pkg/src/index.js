import { createClient } from "@supabase/supabase-js";
import { Router } from "itty-router";

const router = Router();
const supabaseUrl = "https://ioxscwccgueauykarmzo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlveHNjd2NjZ3VlYXV5a2FybXpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUwNzI5MTcsImV4cCI6MTk5MDY0ODkxN30.UJrEtHXEmAw4fT8pSmFDCggTnQkZTrRgdIc9jbSVGAw";

const supabase = createClient(supabaseUrl, supabaseKey);

// addEventListener("fetch", (event) => {
//   event.respondWith(router.handle(event.request));
// });

// router.get("/fav-pkgs", async () => {
//   const { data, error } = await supabase.from("fav_pkg").select();

//   if (error) throw error;

//   return new Response(JSON.stringify({ favPkgs: data }), {
//     headers: { "content-type": "application/json" },
//   });
// });

export default {
  async fetch(request, env) {
    return await handleRequest(request);
  },
};

async function handleRequest(request) {
  const reqBody = await request.json();
  let result = await fetch(`https://api.npms.io/v2/search?q=${reqBody.query}`);
  let response = await result.json();
  let packegeNames = response.results.map((res) => {
    return {
      name: res.package.name,
      version: res.package.version,
      description: res.package.description,
      link: res.package.links.npm,
      repo: res.package.links.repository,
    };
  });

  return new Response(JSON.stringify(packegeNames), {
    headers: {
      "Content-type": "application/json",
    },
  });
}
