import type { InvitationTemplateId } from '../constants/templates';
import type { EventType } from '../constants/events';

export interface Invitation {
  id: string;
  slug: string;
  event_type?: EventType | string | null;
  groom?: string;
  bride?: string;
  host_name?: string | null;
  title?: string | null;
  message: string;
  wedding_date: string;
  location_name: string;
  location_city: string;
  dress_code?: string | null;
  parents_note?: string | null;
  template?: InvitationTemplateId | string | null;
  template_id?: InvitationTemplateId | string | null;
  music_url?: string | null;
  guest_name?: string | null;
  photos?: string[];
  video_url?: string | null;
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
  message: string;
  date: string;
  location_name: string;
  location_city: string;
  dressCode?: string;
  parentsNote?: string;
  guestName?: string;
  photos?: string[];
  videoUrl?: string;
  template: InvitationTemplateId;
}
