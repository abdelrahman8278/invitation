import { Component, input, signal, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DEFAULT_FALLBACK_MUSIC } from '../../constants/defaults';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-[90] animate-fadeIn">
      <audio
        #audioElement
        loop
        preload="auto"
        [src]="src() || defaultMusic"
        (play)="isPlaying.set(true)"
        (pause)="isPlaying.set(false)"
      ></audio>

      <button
        type="button"
        (click)="togglePlay()"
        [attr.aria-label]="isPlaying() ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'"
        [class]="'group flex items-center gap-2 rounded-full border px-2.5 py-1.5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 text-xs font-cairo font-bold ' +
          (isPlaying()
            ? 'bg-black/85 border-amber-400/80 text-amber-300 ring-2 ring-amber-400/40 shadow-amber-500/20'
            : 'bg-black/70 border-white/20 text-stone-200 hover:border-amber-400/40')"
      >
        <!-- Mini Vinyl disc with spinning animation when playing -->
        <div
          class="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-stone-900 to-black border shadow-sm transition-all duration-300"
          [ngClass]="isPlaying() ? 'border-amber-400 animate-spin-slow' : 'border-stone-600'"
        >
          <div
            class="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-amber-400 text-stone-950 text-[7px] font-black leading-none"
          >
            @if (isPlaying()) {
              <span>⏸</span>
            } @else {
              <span class="ml-0.5">▶</span>
            }
          </div>
        </div>

        <span class="text-[11px] font-black">
          {{ isPlaying() ? 'إيقاف' : 'موسيقى' }}
        </span>

        @if (isPlaying()) {
          <div class="flex items-end gap-0.5 h-2.5 w-2.5">
            <span class="w-0.5 bg-amber-400 rounded-full animate-bounce h-2.5"></span>
            <span class="w-0.5 bg-amber-400 rounded-full animate-pulse h-1.5"></span>
            <span class="w-0.5 bg-amber-400 rounded-full animate-bounce h-2"></span>
          </div>
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

  readonly defaultMusic = DEFAULT_FALLBACK_MUSIC;
  src = input<string | null | undefined>(DEFAULT_FALLBACK_MUSIC);
  autoPlayOnGesture = input<boolean>(false);

  isPlaying = signal<boolean>(false);

  ngOnInit(): void {
    // Component initialized
  }

  play(): void {
    if (this.audioRef?.nativeElement) {
      const audio = this.audioRef.nativeElement;
      audio.muted = false;
      audio.volume = 1.0;
      const targetSrc = this.src() || this.defaultMusic;
      if (!audio.src || !audio.src.includes('mp3')) {
        audio.src = targetSrc;
      }
      audio.play().then(() => {
        this.isPlaying.set(true);
      }).catch((err) => {
        console.warn('Audio play handled:', err);
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
