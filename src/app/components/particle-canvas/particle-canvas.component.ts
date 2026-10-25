import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
  input,
  effect,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { InvitationTemplateId } from '../../constants/templates';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  rotation: number;
  rotSpeed: number;
  type: 'sparkle' | 'petal' | 'dust';
}

@Component({
  selector: 'app-particle-canvas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas
      #particleCanvas
      class="pointer-events-none fixed inset-0 z-[25] h-full w-full opacity-70"
    ></canvas>
  `,
})
export class ParticleCanvasComponent implements OnInit, OnDestroy {
  @ViewChild('particleCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  template = input<InvitationTemplateId>('royal-emerald-gold');

  private platformId = inject(PLATFORM_ID);
  private ctx: CanvasRenderingContext2D | null = null;
  private animId: number | null = null;
  private particles: Particle[] = [];
  private width = 0;
  private height = 0;

  constructor() {
    effect(() => {
      // Re-init particles on template change
      this.template();
      if (this.ctx) {
        this.createParticles();
      }
    });
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.handleResize();

    window.addEventListener('resize', this.onResize);
    this.createParticles();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
    }
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.onResize);
    }
  }

  private onResize = () => {
    this.handleResize();
    this.createParticles();
  };

  private handleResize(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = this.width;
    canvas.height = this.height;
  }

  private getPalette(): { colors: string[]; type: 'sparkle' | 'petal' | 'dust' } {
    const t = this.template();
    if (t.includes('rose') || t.includes('pink') || t.includes('floral')) {
      return {
        colors: ['#f472b6', '#fda4af', '#fb7185', '#ffe4e6', '#fbcfe8'],
        type: 'petal',
      };
    }
    if (t.includes('midnight') || t.includes('aurora') || t.includes('gradient')) {
      return {
        colors: ['#38bdf8', '#818cf8', '#e879f9', '#fef08a', '#ffffff'],
        type: 'sparkle',
      };
    }
    if (t.includes('sage') || t.includes('botanical')) {
      return {
        colors: ['#86efac', '#bbf7d0', '#dcfce7', '#fef08a'],
        type: 'petal',
      };
    }
    // Royal gold & dark defaults
    return {
      colors: ['#f59e0b', '#fbbf24', '#fef08a', '#d97706', '#ffffff'],
      type: 'sparkle',
    };
  }

  private createParticles(): void {
    const count = Math.min(35, Math.floor(this.width / 40));
    const palette = this.getPalette();
    this.particles = [];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 4 + 1.5,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: -(Math.random() * 0.8 + 0.3),
        opacity: Math.random() * 0.7 + 0.2,
        color: palette.colors[Math.floor(Math.random() * palette.colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        type: palette.type,
      });
    }
  }

  private animate = () => {
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (const p of this.particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;

      // Wrap around
      if (p.y < -20) {
        p.y = this.height + 20;
        p.x = Math.random() * this.width;
      }
      if (p.x < -20) p.x = this.width + 20;
      if (p.x > this.width + 20) p.x = -20;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.globalAlpha = p.opacity;

      if (p.type === 'petal') {
        // Draw soft petal
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, p.size * 2, p.size, 0, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        // Draw 4-point sparkle star
        this.ctx.fillStyle = p.color;
        this.ctx.shadowBlur = p.size * 2;
        this.ctx.shadowColor = p.color;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -p.size * 2);
        this.ctx.quadraticCurveTo(0, 0, p.size * 2, 0);
        this.ctx.quadraticCurveTo(0, 0, 0, p.size * 2);
        this.ctx.quadraticCurveTo(0, 0, -p.size * 2, 0);
        this.ctx.quadraticCurveTo(0, 0, 0, -p.size * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    this.animId = requestAnimationFrame(this.animate);
  };
}
