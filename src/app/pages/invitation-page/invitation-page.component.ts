import { Component, OnInit, signal, computed, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
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
import { getEnvelopeShapeId, EnvelopeShapeId } from '../../constants/envelopes';

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

        <!-- Template and Event Switcher Bar (Strictly for ahmed-tia) -->
        @if (isAhmedTia()) {
          <app-template-switcher
            [activeTemplate]="currentTemplate()"
            [activeEvent]="currentEventType()"
            [activeEnvelope]="currentEnvelopeShape()"
          />
        }

        <!-- Envelope / Invitation Card Transition (Envelope Controlled by Flag) -->
        @if (flags().showEnvelope && !opened()) {
          <app-envelope
            [shape]="currentEnvelopeShape()"
            [template]="currentTemplate()"
            [eventType]="currentEventType()"
            [groom]="inv.groom || ''"
            [bride]="inv.bride || ''"
            [hostName]="inv.host_name || inv.groom || ''"
            [title]="inv.title || ''"
            [guestName]="guestName()"
            [weddingDate]="inv.wedding_date"
            [locationName]="inv.location_name"
            [locationCity]="inv.location_city"
            [quranVerse]="inv.quran_verse"
            [message]="inv.message"
            [parentsNote]="inv.parents_note"
            (openingStarted)="handleOpeningStarted()"
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

        <!-- Floating Buttons: RSVP & Guest Messages (Compact, non-intrusive) -->
        <div class="fixed bottom-4 right-4 z-[60] flex items-center gap-2 animate-fadeIn">
          @if (flags().showRsvp) {
            <button
              type="button"
              (click)="scrollToSection('rsvp-section')"
              class="flex items-center gap-1.5 rounded-full border border-amber-300/80 px-3 py-1.5 shadow-xl backdrop-blur-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 font-cairo text-xs font-black transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="تأكيد الحضور"
              title="تأكيد الحضور (RSVP)"
            >
              <span class="text-xs">✍️</span>
              <span class="leading-none">تأكيد الحضور</span>
            </button>
          }

          @if (flags().showGuestWishes) {
            <a
              [routerLink]="['/', inv.slug, 'messages']"
              [queryParams]="{ template: currentTemplate(), mode: mode(), event: currentEventType() }"
              class="flex items-center gap-1.5 rounded-full border border-emerald-400/80 px-3 py-1.5 shadow-xl backdrop-blur-xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white font-cairo text-xs font-black transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="رسائل الضيوف"
              title="صندوق المباركات"
            >
              <span class="text-xs">💌</span>
              <span class="leading-none">المباركات</span>
            </a>
          }
        </div>

        <!-- Floating Social Buttons: WhatsApp & Instagram (Compact, strictly for ahmed-tia) -->
        @if (isAhmedTia()) {
          <div class="fixed bottom-4 left-4 z-[70] flex flex-col gap-2 items-center animate-fadeIn">
            <!-- Instagram Button -->
            <a
              href="https://www.instagram.com/sws.invitation?rpxt=MWpmdHZxdzIyMm1seQ=="
              target="_blank"
              rel="noopener noreferrer"
              class="group relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-md border border-white/40 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="تابعنا على إنستجرام"
              title="تابعنا على إنستجرام"
            >
              <svg class="relative z-10 h-4 w-4 sm:h-5 sm:w-5 fill-current drop-shadow-sm" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <!-- WhatsApp Button -->
            <a
              href="https://wa.me/201007992310"
              target="_blank"
              rel="noopener noreferrer"
              class="group relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-md border border-white/40 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="تواصل عبر واتساب"
              title="تواصل عبر واتساب"
            >
              <svg class="relative z-10 h-4 w-4 sm:h-5 sm:w-5 fill-current drop-shadow-sm" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.45 0-2.87-.38-4.12-1.1l-.3-.17-3.12.82.83-3.04-.19-.31c-.8-1.29-1.22-2.79-1.22-4.44 0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29z"/>
              </svg>
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
  private router = inject(Router);
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
  envelopeQuery = signal<string | null>(null);
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

  isAhmedTia = computed<boolean>(() => {
    return this.slug() === 'ahmed-tia';
  });

  currentTemplate = computed<InvitationTemplateId>(() => {
    const query = this.templateQuery();
    if (query) {
      return getInvitationTemplateId(query);
    }
    const inv = this.invitation();
    return getInvitationTemplateId(inv?.template ?? inv?.template_id);
  });

  currentEnvelopeShape = computed<EnvelopeShapeId>(() => {
    const query = this.envelopeQuery();
    if (query) {
      return getEnvelopeShapeId(query);
    }
    const inv = this.invitation();
    return getEnvelopeShapeId(inv?.envelope_shape);
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

      const envParam = queryParams.get('envelope');
      if (envParam !== this.envelopeQuery()) {
        this.envelopeQuery.set(envParam);
        if (envParam && this.opened()) {
          this.opened.set(false); // Reset to closed so the user immediately sees and experiences the new envelope
        }
      }
      
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

    // Resolve preview image: ensure full absolute URL for WhatsApp/Facebook crawler
    const baseUrl = typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://sws-invitation.vercel.app';
    let previewImage = `${baseUrl}/images/wedding-og.jpg`;
    if (res.data.photos && res.data.photos.length > 0) {
      const first = res.data.photos[0];
      if (first.startsWith('http')) {
        previewImage = first;
      } else {
        const cleanPath = first.startsWith('/') ? first : `/images/${first}`;
        previewImage = `${baseUrl}${cleanPath}`;
      }
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

  handleOpeningStarted(): void {
    this.audioController?.play();
  }

  handleOpened(): void {
    this.opened.set(true);
    this.audioController?.play();
  }

  scrollToSection(sectionId: string): void {
    if (!this.opened()) {
      this.handleOpened();
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  }

  switchEntrance(shape: EnvelopeShapeId): void {
    this.opened.set(false);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { envelope: shape },
      queryParamsHandling: 'merge',
    });
  }
}
