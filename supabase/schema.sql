create extension if not exists pgcrypto;

create table if not exists public.invitations (
    id uuid primary key default gen_random_uuid(),
    slug text not null unique,
    groom text not null,
    bride text not null,
    message text not null,
    wedding_date timestamptz not null,
    location_name text not null,
    location_city text not null default '',
    template text,
    template_id text,
    music_url text,
    access_password text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint invitations_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table if not exists public.guest_messages (
    id uuid primary key default gen_random_uuid(),
    invitation_id uuid not null references public.invitations(id) on delete cascade,
    name text not null,
    message text not null,
    created_at timestamptz not null default now(),
    constraint guest_messages_name_length check (char_length(trim(name)) between 1 and 80),
    constraint guest_messages_message_length check (char_length(trim(message)) between 1 and 800)
);

create index if not exists invitations_slug_idx on public.invitations(slug);
create index if not exists guest_messages_invitation_created_idx
    on public.guest_messages(invitation_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists invitations_set_updated_at on public.invitations;
create trigger invitations_set_updated_at
before update on public.invitations
for each row
execute function public.set_updated_at();

alter table public.invitations enable row level security;
alter table public.guest_messages enable row level security;

revoke all on table public.invitations from anon, authenticated;
revoke all on table public.guest_messages from anon, authenticated;

grant select (
    id,
    slug,
    groom,
    bride,
    message,
    wedding_date,
    location_name,
    location_city,
    template,
    template_id,
    music_url
) on public.invitations to anon, authenticated;

grant insert (invitation_id, name, message) on public.guest_messages to anon, authenticated;

drop policy if exists "Public can read invitation display data" on public.invitations;
create policy "Public can read invitation display data"
on public.invitations
for select
to anon, authenticated
using (true);

drop policy if exists "Public can leave guest messages" on public.guest_messages;
create policy "Public can leave guest messages"
on public.guest_messages
for insert
to anon, authenticated
with check (
    char_length(trim(name)) between 1 and 80
    and char_length(trim(message)) between 1 and 800
    and exists (
        select 1
        from public.invitations
        where invitations.id = guest_messages.invitation_id
    )
);

-- Do not add a public select policy for guest_messages.
-- The app reads those rows through server-side API routes.
