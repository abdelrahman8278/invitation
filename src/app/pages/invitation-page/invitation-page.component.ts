import { Component, OnInit, signal, computed, inject, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { SupabaseService } from '../../services/supabase.service';
import { EnvelopeComponent } from '../../components/envelope/envelope.component';
import { InvitationCardComponent } from '../../components/invitation-card/invitation-card.component';
import { TemplateSwitcherComponent } from '../../components/template-switcher/template-switcher.component';
import type { Invitation } from '../../models/invitation.model';
import {
  getInvitationTemplateId,
  getInvitationTemplateUi,
  getInvitationThemeMode,
  getInvitationThemeVars,
  InvitationTemplateId,
  InvitationThemeMode,
} from '../../constants/templates';

@Component({
  selector: 'app-invitation-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    EnvelopeComponent,
    InvitationCardComponent,
    TemplateSwitcherComponent,
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
        class="min-h-screen flex items-center justify-center relative overflow-hidden px-3 pt-16 pb-28 sm:pb-12 lg:pt-28 {{ ui().pageBackground }}"
        [attr.data-invitation-mode]="mode()"
        [ngStyle]="themeVars()"
      >
        <!-- Background Audio Player -->
        <audio #audioPlayer loop [src]="inv.music_url || 'music.mp3'"></audio>

        <!-- Template Switcher Bar -->
        <app-template-switcher [activeTemplate]="currentTemplate()" />

        <!-- Envelope / Invitation Card Transition -->
        @if (!opened()) {
          <app-envelope
            [template]="currentTemplate()"
            [groom]="inv.groom"
            [bride]="inv.bride"
            (opened)="handleOpened()"
          />
        } @else {
          <app-invitation-card
            [id]="inv.id"
            [groom]="inv.groom"
            [bride]="inv.bride"
            [message]="inv.message"
            [date]="inv.wedding_date"
            [location_name]="inv.location_name"
            [location_city]="inv.location_city"
            [template]="currentTemplate()"
          />
        }

        <!-- Floating Button: Guest Messages Link -->
        <div class="fixed bottom-5 right-5 z-[60] sm:bottom-6 sm:right-6 animate-fadeIn">
          <a
            [routerLink]="['/', inv.slug, 'messages']"
            [queryParams]="{ template: currentTemplate(), mode: mode() }"
            class="flex min-h-12 items-center gap-2 rounded-full border px-4 py-3 transition-all duration-300 group sm:px-5 hover:scale-105 active:scale-95 {{ ui().actionButton }}"
            aria-label="رسائل الضيوف"
          >
            <svg class="h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-110 {{ ui().actionIcon }}" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span class="font-cairo text-sm font-bold">رسائل الضيوف</span>
          </a>
        </div>
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
  @ViewChild('audioPlayer') audioPlayerRef?: ElementRef<HTMLAudioElement>;

  private route = inject(ActivatedRoute);
  private supabaseService = inject(SupabaseService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  invitation = signal<Invitation | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  opened = signal<boolean>(false);

  slug = signal<string>('');
  templateQuery = signal<string | null>(null);
  modeQuery = signal<string | null>(null);

  currentTemplate = computed<InvitationTemplateId>(() => {
    const query = this.templateQuery();
    if (query) {
      return getInvitationTemplateId(query);
    }
    const inv = this.invitation();
    return getInvitationTemplateId(inv?.template ?? inv?.template_id);
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
    this.titleService.setTitle(`${res.data.groom} & ${res.data.bride} | Wedding Invitation`);
    this.metaService.updateTag({
      name: 'description',
      content: `You are cordially invited to the wedding of ${res.data.groom} and ${res.data.bride}`,
    });
  }

  handleOpened(): void {
    this.opened.set(true);
    if (this.audioPlayerRef?.nativeElement) {
      this.audioPlayerRef.nativeElement.play().catch(() => {
        // Autoplay may require user gesture on some browsers
      });
    }
  }
}
