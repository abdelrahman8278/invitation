import { Component, OnInit, signal, computed, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { SupabaseService } from '../../services/supabase.service';
import { EnvelopeComponent } from '../../components/envelope/envelope.component';
import { InvitationCardComponent } from '../../components/invitation-card/invitation-card.component';
import { TemplateSwitcherComponent } from '../../components/template-switcher/template-switcher.component';
import { AudioPlayerComponent } from '../../components/audio-player/audio-player.component';
import type { Invitation } from '../../models/invitation.model';
import {
  getInvitationTemplateId,
  getInvitationTemplateUi,
  getInvitationThemeMode,
  getInvitationThemeVars,
  InvitationTemplateId,
  InvitationThemeMode,
} from '../../constants/templates';
import { getEventCategoryConfig } from '../../constants/events';
import { resolveFlags, resolveMusicUrl, InvitationFlags } from '../../constants/defaults';

@Component({
  selector: 'app-invitation-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    EnvelopeComponent,
    InvitationCardComponent,
    TemplateSwitcherComponent,
    AudioPlayerComponent,
  ],
  template: `
    @if (loading()) {
      <div class="min-h-screen flex items-center justify-center bg-stone-900 text-amber-200">
        <div class="flex flex-col items-center gap-4">
          <div class="h-10 w-10 animate-spin rounded-full border-4 border-amber-400 border-t-transparent"></div>
          <p class="font-cairo text-sm">جارِ تحميل الدعوة...</p>
        </div>
      </div>
    } @else if (error() || !invitation()) {
      <div class="min-h-screen flex items-center justify-center bg-stone-900 text-stone-300 px-4">
        <div class="text-center max-w-md p-8 rounded-3xl bg-stone-800/80 border border-stone-700 shadow-2xl">
          <div class="text-5xl mb-4">💌</div>
          <h1 class="font-cairo text-2xl font-bold mb-2 text-white">الدعوة غير موجودة</h1>
          <p class="font-cairo text-sm text-stone-400 mb-6">
            عذراً، لم نتمكن من العثور على بطاقة الدعوة المطلوبة.
          </p>
        </div>
      </div>
    } @else {
      @let inv = invitation()!;
      <main
        class="min-h-screen flex items-center justify-center relative overflow-hidden px-2 sm:px-4 pt-16 pb-20 sm:pt-20 sm:pb-24 {{ ui().pageBackground }}"
        [attr.data-invitation-mode]="mode()"
        [ngStyle]="themeVars()"
      >
        <!-- Floating Audio Player Control with Equalizer (Controlled by Flag) -->
        @if (flags().showMusic) {
          <app-audio-player
            #audioController
            [src]="resolveMusicUrl(inv.music_url)"
          />
        }

        <!-- Template and Event Switcher Bar (Only visible for default client: ahmed-tia) -->
        @if (isDefaultClient()) {
          <app-template-switcher
            [activeTemplate]="currentTemplate()"
            [activeEvent]="currentEventType()"
          />
        }

        <!-- Envelope / Invitation Card Transition (Envelope Controlled by Flag) -->
        @if (flags().showEnvelope && !opened()) {
          <app-envelope
            [template]="currentTemplate()"
            [eventType]="currentEventType()"
            [groom]="inv.groom || ''"
            [bride]="inv.bride || ''"
            [hostName]="inv.host_name || inv.groom || ''"
            [title]="inv.title || ''"
            [guestName]="guestName()"
            (opened)="handleOpened()"
          />
        } @else {
          <app-invitation-card
            [id]="inv.id"
            [slug]="inv.slug"
            [eventType]="currentEventType()"
            [groom]="inv.groom || ''"
            [bride]="inv.bride || ''"
            [hostName]="inv.host_name || inv.groom || ''"
            [title]="inv.title || ''"
            [eyebrowText]="inv.eyebrow_text"
            [quranVerse]="inv.quran_verse"
            [message]="inv.message"
            [date]="inv.wedding_date"
            [location_name]="inv.location_name"
            [location_city]="inv.location_city"
            [googleMapsUrl]="inv.google_maps_url"
            [wazeUrl]="inv.waze_url"
            [dressCode]="inv.dress_code || ''"
            [parentsNote]="inv.parents_note || ''"
            [guestName]="guestName()"
            [photos]="inv.photos"
            [template]="currentTemplate()"
            [flags]="flags()"
          />
        }

        <!-- Floating Button: Guest Messages Link (Controlled by Flag) -->
        @if (flags().showGuestWishes) {
          <div class="fixed bottom-5 right-5 z-[60] sm:bottom-6 sm:right-6 animate-fadeIn">
            <a
              [routerLink]="['/', inv.slug, 'messages']"
              [queryParams]="{ template: currentTemplate(), mode: mode(), event: currentEventType() }"
              class="flex min-h-12 items-center gap-2 rounded-full border px-4 py-3 transition-all duration-300 group sm:px-5 hover:scale-105 active:scale-95 {{ ui().actionButton }}"
              aria-label="رسائل الضيوف"
            >
              <svg class="h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-110 {{ ui().actionIcon }}" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span class="font-cairo text-sm font-bold">رسائل الضيوف</span>
            </a>
          </div>
        }
      </main>
    }
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.4s ease-out forwards;
    }
  `]
})
export class InvitationPageComponent implements OnInit {
  @ViewChild('audioController') audioController?: AudioPlayerComponent;

  private route = inject(ActivatedRoute);
  private supabaseService = inject(SupabaseService);
  private titleService = inject(Title);
  metaService = inject(Meta);

  resolveMusicUrl = resolveMusicUrl;

  invitation = signal<Invitation | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  opened = signal<boolean>(false);

  slug = signal<string>('');
  templateQuery = signal<string | null>(null);
  modeQuery = signal<string | null>(null);
  eventQuery = signal<string | null>(null);
  guestName = signal<string>('');

  // Resolved flags for current invitation
  flags = computed<Required<InvitationFlags>>(() => {
    return resolveFlags(this.invitation()?.flags);
  });

  isDefaultClient = computed<boolean>(() => {
    const s = this.slug();
    return s === 'ahmed-tia' || s === 'demo';
  });

  currentTemplate = computed<InvitationTemplateId>(() => {
    const query = this.templateQuery();
    if (query) {
      return getInvitationTemplateId(query);
    }
    const inv = this.invitation();
    return getInvitationTemplateId(inv?.template ?? inv?.template_id);
  });

  currentEventType = computed<string>(() => {
    const query = this.eventQuery();
    if (query) {
      return query;
    }
    const inv = this.invitation();
    return inv?.event_type || 'wedding';
  });

  mode = computed<InvitationThemeMode>(() => {
    return getInvitationThemeMode(this.modeQuery());
  });

  ui = computed(() => getInvitationTemplateUi(this.currentTemplate()));
  themeVars = computed(() => getInvitationThemeVars(this.mode()));

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug') ?? '';
      this.slug.set(slug);
      if (slug) {
        this.fetchInvitation(slug);
      }
    });

    this.route.queryParamMap.subscribe(queryParams => {
      this.templateQuery.set(queryParams.get('template'));
      this.modeQuery.set(queryParams.get('mode'));
      this.eventQuery.set(queryParams.get('event') || queryParams.get('type'));
      
      // Guest Name parameter support (?to=... or ?guest=...)
      const guest = queryParams.get('to') || queryParams.get('guest');
      if (guest) {
        this.guestName.set(guest.replaceAll('_', ' ').replaceAll('-', ' '));
      } else {
        this.guestName.set('');
      }
    });
  }

  async fetchInvitation(slug: string): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    const res = await this.supabaseService.getInvitationBySlug(slug);

    this.loading.set(false);
    if (res.error || !res.data) {
      this.error.set(res.error || 'Invitation not found');
      return;
    }

    this.invitation.set(res.data);

    // If envelope flag is turned off, mark as opened immediately
    if (res.data.flags && res.data.flags.showEnvelope === false) {
      this.opened.set(true);
    }

    const eventConfig = getEventCategoryConfig(this.currentEventType());
    const displayTitle = res.data.groom && res.data.bride
      ? `${res.data.groom} & ${res.data.bride}`
      : (res.data.host_name || res.data.title || res.data.groom || 'دعوة');

    const pageTitle = `${displayTitle} | ${eventConfig.name}`;
    const pageDescription = res.data.message || eventConfig.description;

    // Resolve preview image: first photo from invitation or default wedding-3.jpeg
    let previewImage = '/images/wedding-3.jpeg';
    if (res.data.photos && res.data.photos.length > 0) {
      const first = res.data.photos[0];
      previewImage = first.startsWith('http') || first.startsWith('/') ? first : `/images/${first}`;
    }

    this.titleService.setTitle(pageTitle);
    this.metaService.updateTag({ name: 'description', content: pageDescription });
    this.metaService.updateTag({ property: 'og:title', content: pageTitle });
    this.metaService.updateTag({ property: 'og:description', content: pageDescription });
    this.metaService.updateTag({ property: 'og:image', content: previewImage });
    this.metaService.updateTag({ property: 'og:image:secure_url', content: previewImage });
    this.metaService.updateTag({ name: 'twitter:title', content: pageTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: pageDescription });
    this.metaService.updateTag({ name: 'twitter:image', content: previewImage });
  }

  handleOpened(): void {
    this.opened.set(true);
    this.audioController?.play();
  }
}
