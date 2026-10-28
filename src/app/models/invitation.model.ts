import type { InvitationTemplateId } from '../constants/templates';
import type { EventType } from '../constants/events';
import type { InvitationFlags } from '../constants/defaults';

export interface Invitation {
  id: string;
  slug: string;
  event_type?: EventType | string | null;
  groom?: string;
  bride?: string;
  host_name?: string | null;
  title?: string | null;
  eyebrow_text?: string | null;
  quran_verse?: string | null;
  parents_note?: string | null;
  message: string;
  wedding_date: string;
  location_name: string;
  location_city: string;
  google_maps_url?: string | null;
  waze_url?: string | null;
  dress_code?: string | null;
  template?: InvitationTemplateId | string | null;
  template_id?: InvitationTemplateId | string | null;
  music_url?: string | null;
  guest_name?: string | null;
  photos?: string[];
  video_url?: string | null;
  flags?: Partial<InvitationFlags> | Record<string, boolean> | null;
  is_active?: boolean;
}

export interface GuestMessage {
  id: string;
  invitation_id: string;
  name: string;
  message: string;
  created_at?: string;
}

export interface RsvpResponse {
  id?: string;
  invitation_id: string;
  name: string;
  phone?: string;
  attending: boolean;
  guests_count: number;
  notes?: string;
  created_at?: string;
}

export interface InvitationCardProps {
  id: string;
  slug: string;
  eventType?: EventType | string;
  groom?: string;
  bride?: string;
  hostName?: string;
  title?: string;
  eyebrowText?: string;
  quranVerse?: string;
  message: string;
  date: string;
  location_name: string;
  location_city: string;
  googleMapsUrl?: string;
  wazeUrl?: string;
  dressCode?: string;
  parentsNote?: string;
  guestName?: string;
  photos?: string[];
  videoUrl?: string;
  template: InvitationTemplateId;
  flags?: Partial<InvitationFlags>;
}
