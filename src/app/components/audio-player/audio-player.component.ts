import { Component, input, signal, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-[90] animate-fadeIn">
      <audio
        #audioElement
        loop
        [src]="src() || 'music.mp3'"
        (play)="isPlaying.set(true)"
        (pause)="isPlaying.set(false)"
      ></audio>

      <button
        type="button"
        (click)="togglePlay()"
        [attr.aria-label]="isPlaying() ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'"
        [class]="'group flex items-center gap-2.5 rounded-full border px-3.5 py-2 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-xs font-cairo font-bold ' +
          (isPlaying()
            ? 'bg-black/85 border-amber-400/80 text-amber-100 ring-2 ring-amber-400/40 shadow-amber-500/20'
            : 'bg-black/70 border-white/20 text-stone-300 hover:border-amber-400/40')"
      >
        <!-- Icon: Vinyl disc with Play/Pause state -->
        <div
          class="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-stone-900 via-stone-800 to-black border shadow-md transition-all duration-300"
          [ngClass]="isPlaying() ? 'border-amber-400 animate-spin-slow' : 'border-stone-600'"
        >
          <!-- Vinyl Grooves Rings -->
          <div class="absolute inset-1 rounded-full border border-stone-700/50"></div>
          <div class="absolute inset-2 rounded-full border border-stone-700/50"></div>

          <!-- Center Action Icon: Pause ⏸ when playing, Play ▶ when stopped -->
          <div
            class="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-stone-950 shadow-sm transition-transform duration-200 group-hover:scale-110"
          >
            @if (isPlaying()) {
              <span class="text-[9px] font-black leading-none select-none">⏸</span>
            } @else {
              <span class="text-[8px] font-black leading-none ml-0.5 select-none">▶</span>
            }
          </div>
        </div>

        <div class="flex flex-col items-start leading-none text-start">
          <div class="flex items-center gap-1.5">
            <span
              class="text-[11px] font-black transition-colors"
              [ngClass]="isPlaying() ? 'text-amber-300' : 'text-stone-200'"
            >
              {{ isPlaying() ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى' }}
            </span>
            @if (isPlaying()) {
              <span class="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            }
          </div>
          <span
            class="text-[9px] font-montserrat mt-0.5"
            [ngClass]="isPlaying() ? 'text-amber-200/70 font-semibold' : 'text-stone-400 opacity-75'"
          >
            {{ isPlaying() ? 'اضغط للإيقاف ⏸' : 'اضغط للتشغيل ▶' }}
          </span>
        </div>

        <!-- Animated Equalizer when playing, or mute badge when paused -->
        @if (isPlaying()) {
          <div class="flex items-end gap-0.5 h-3.5 w-3.5 mr-0.5" title="الموسيقى تعمل">
            <span class="w-0.5 bg-amber-400 rounded-full animate-bounce h-3.5"></span>
            <span class="w-0.5 bg-amber-400 rounded-full animate-pulse h-2.5"></span>
            <span class="w-0.5 bg-amber-400 rounded-full animate-bounce h-3"></span>
          </div>
        } @else {
          <span class="text-xs text-stone-400 mr-0.5 opacity-60">🔇</span>
        }
      </button>
    </div>
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
export class AudioPlayerComponent implements OnInit {
  @ViewChild('audioElement') audioRef?: ElementRef<HTMLAudioElement>;

  src = input<string | null | undefined>('music.mp3');
  autoPlayOnGesture = input<boolean>(false);

  isPlaying = signal<boolean>(false);

  ngOnInit(): void {
    // Component initialized
  }

  play(): void {
    if (this.audioRef?.nativeElement) {
      this.audioRef.nativeElement.play().then(() => {
        this.isPlaying.set(true);
      }).catch(() => {
        // Handled by browser policy
      });
    }
  }

  pause(): void {
    if (this.audioRef?.nativeElement) {
      this.audioRef.nativeElement.pause();
      this.isPlaying.set(false);
    }
  }

  togglePlay(): void {
    if (this.isPlaying()) {
      this.pause();
    } else {
      this.play();
    }
  }
}
