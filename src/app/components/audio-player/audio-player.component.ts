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
        class="flex items-center gap-3 rounded-full border px-3.5 py-2 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:scale-105 active:scale-95 bg-black/75 border-amber-400/40 text-amber-100 text-xs font-cairo font-bold ring-1 ring-amber-400/20"
      >
        <!-- Spinning Vinyl Disc Graphic -->
        <div class="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-stone-900 via-stone-800 to-black border border-amber-400/60 shadow-md {{ isPlaying() ? 'animate-spin-slow' : '' }}">
          <!-- Vinyl Grooves Rings -->
          <div class="absolute inset-1 rounded-full border border-stone-700/50"></div>
          <div class="absolute inset-2 rounded-full border border-stone-700/50"></div>
          <!-- Center Label -->
          <div class="h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 shadow flex items-center justify-center">
            <div class="h-0.5 w-0.5 rounded-full bg-black"></div>
          </div>
        </div>

        <div class="flex flex-col items-start leading-none text-start">
          <span class="text-[11px] font-black text-amber-300">
            {{ isPlaying() ? 'موسيقى المناسبة' : 'تشغيل الموسيقى' }}
          </span>
          <span class="text-[9px] opacity-60 font-montserrat mt-0.5">
            {{ isPlaying() ? 'Playing ♫' : 'Tap to Play' }}
          </span>
        </div>

        <!-- Animated Equalizer Bars -->
        <div class="flex items-end gap-0.5 h-3.5 w-3.5 mr-1">
          <span
            class="w-0.5 bg-amber-400 rounded-full transition-all duration-300 {{
              isPlaying() ? 'animate-bounce h-3.5' : 'h-1'
            }}"
          ></span>
          <span
            class="w-0.5 bg-amber-400 rounded-full transition-all duration-200 {{
              isPlaying() ? 'animate-pulse h-2.5' : 'h-1.5'
            }}"
          ></span>
          <span
            class="w-0.5 bg-amber-400 rounded-full transition-all duration-500 {{
              isPlaying() ? 'animate-bounce h-3' : 'h-1'
            }}"
          ></span>
        </div>
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
