# Supabase Setup

1. Create a Supabase project.
2. Open the Supabase SQL editor and run `supabase/schema.sql`.
3. Copy `.env.example` to `.env.local`.
4. Fill these values:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

`SUPABASE_SERVICE_ROLE_KEY` must stay server-only. Do not expose it in client code, browser logs, or public repositories.

The public invitation page only reads safe invitation fields. Guest messages are submitted and loaded through API routes so password checks and protected reads happen on the server.
