import Image from 'next/image';
import './HeroVisual.css';

export function HeroVisual() {
  return (
    <div className="hero-final-visual">
      <div className="hero-final-image">
        <Image
          src="/images/hero/collage-2.jpg"
          alt="Creative collage of visual design, code, wireframes, color palettes and interactive worlds"
          fill
          sizes="(max-width: 540px) 100vw, 630px"
          className="object-contain"
        />
      </div>
    </div>
  );
}
