# Supabase Integration for notes_frontend

## Overview
This Vite React app uses [Supabase](https://supabase.com/) for backend features such as authentication and notes database storage.

## Client Initialization
- Supabase is initialized in `src/supabaseClient.js`.
- **Supabase URL:** `https://mzxyorlnbfdkneiezgjz.supabase.co`
- **Supabase Key:** Project anon public key is embedded for frontend usage.

## Setup Details
- The [@supabase/supabase-js](https://github.com/supabase/supabase-js) SDK is installed as the API client.
- Use `import { supabase } from "./supabaseClient";` in React components or logic to interact with Supabase (for data fetching, CRUD operations, Auth, etc).

## Security Note
The provided key is the anon public key, meant for browser clients. Do not expose service role keys in frontend code.

---

## Example Usage

```js
import { supabase } from "./supabaseClient";

// Fetch notes (example table: "notes")
async function fetchNotes() {
  let { data, error } = await supabase.from("notes").select("*");
  if (error) throw error;
  return data;
}
```

---

## Next Steps

- Add Supabase CRUD logic for notes (create, read, update, delete).
- Implement authentication if needed.
- If a Supabase table schema for notes does not yet exist, create it in the Supabase dashboard (or code backend migration).

