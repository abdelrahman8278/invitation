import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import type { GuestMessage, Invitation } from '../models/invitation.model';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  get supabase(): SupabaseClient {
    return this.client;
  }

  async getInvitationBySlug(slug: string): Promise<{ data: Invitation | null; error: string | null }> {
    try {
      const { data, error } = await this.client
        .from('invitations')
        .select(`
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
        `)
        .eq('slug', slug)
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: data as Invitation, error: null };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error occurred';
      return { data: null, error: msg };
    }
  }

  async submitGuestMessage(
    invitationId: string,
    name: string,
    message: string
  ): Promise<{ success: boolean; error: string | null }> {
    try {
      const trimmedName = name.trim().slice(0, 80);
      const trimmedMessage = message.trim().slice(0, 800);

      if (!invitationId || !trimmedName || !trimmedMessage) {
        return { success: false, error: 'الاسم والرسالة مطلوبان' };
      }

      const { error } = await this.client
        .from('guest_messages')
        .insert({
          invitation_id: invitationId,
          name: trimmedName,
          message: trimmedMessage,
        });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error occurred';
      return { success: false, error: msg };
    }
  }

  async getGuestMessages(
    slug: string,
    password: string
  ): Promise<{ messages: GuestMessage[]; error: string | null }> {
    try {
      const trimmedSlug = slug.trim();
      const trimmedPassword = password.trim();

      if (!trimmedSlug || !trimmedPassword) {
        return { messages: [], error: 'كلمة المرور واسم الرابط مطلوبان' };
      }

      // First try calling the get_guest_messages RPC function (recommended secure definer function)
      const { data: rpcData, error: rpcError } = await this.client.rpc('get_guest_messages', {
        p_slug: trimmedSlug,
        p_password: trimmedPassword,
      });

      if (!rpcError && Array.isArray(rpcData)) {
        return { messages: rpcData as GuestMessage[], error: null };
      }

      // Fallback: direct query if RLS/policy allows
      const { data: invitation } = await this.client
        .from('invitations')
        .select('id')
        .eq('slug', trimmedSlug)
        .single();

      if (!invitation) {
        return { messages: [], error: 'الدعوة غير موجودة' };
      }

      const { data: messages, error: messagesError } = await this.client
        .from('guest_messages')
        .select('id, invitation_id, name, message, created_at')
        .eq('invitation_id', invitation.id)
        .order('created_at', { ascending: false });

      if (messagesError) {
        return { messages: [], error: rpcError?.message || messagesError.message };
      }

      return { messages: (messages as GuestMessage[]) || [], error: null };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error occurred';
      return { messages: [], error: msg };
    }
  }
}
