import type { InvitationTemplateId } from '../constants/templates';

export interface Invitation {
  id: string;
  slug: string;
  groom: string;
  bride: string;
  message: string;
  wedding_date: string;
  location_name: string;
  location_city: string;
  template?: InvitationTemplateId | string | null;
  template_id?: InvitationTemplateId | string | null;
  music_url?: string | null;
}

export interface GuestMessage {
  id: string;
  invitation_id: string;
  name: string;
  message: string;
  created_at?: string;
}

export interface InvitationCardProps {
  id: string;
  groom: string;
  bride: string;
  message: string;
  date: string;
  location_name: string;
  location_city: string;
  template: InvitationTemplateId;
}
