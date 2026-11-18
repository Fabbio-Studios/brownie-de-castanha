import { useEffect, useState } from 'react';
import { INSTAGRAM_URL, StorySectionId } from '../data/brandStory';
import { useTypewriter } from '../hooks/useTypewriter';

interface HeroSectionProps {
  onSelectSection: (section: StorySectionId) => void;
}

const TYPEWRITER_COPY =
  'Tem história em cada pedaço. Inspirado na nossa terra, feito para transformar chocolate e castanha em um daqueles sabores que você não esquece.';

const WHITE_PILLS: { label: string; section: StorySectionId }[] = [
  { label: 'Conheça nossa história', section: 'historia' },
  { label: 'O que torna especial', section: 'especial' },
  { label: 'De onde vem a castanha', section: 'origem' },
  { label: 'Descubra o sabor', section: 'sabor' },
];

export function HeroSection({ onSelectSection }: HeroSectionProps) {
  const { displayed, done } = useTypewriter(TYPEWRITER_COPY, 38, 600);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setButtonsVisible(true);
    }, 400);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  return (
    <main className="relative z-[1] h-screen flex flex-col justify-end pb-16 sm:pb-20 md:justify-center md:pb-8 px-5 sm:px-8 md:px-10 overflow-hidden">
      <div className="max-w-xl md:max-w-[46%] lg:max-w-[540px] xl:max-w-xl relative z-10">
        <div
          aria-hidden="true"
          className="pointer-events-none select-none mb-2.5 sm:mb-3 hero-blurred-label animate-fade-up"
        >
          Uma história que começa em Santa Maria,
          <br />e ganha forma em chocolate e castanha.
        </div>

        <h1 className="hero-display-title italic text-black mb-3 sm:mb-4 animate-fade-up">
          O <span className="font-[720] text-[#5c3317]">melhor</span>{' '}
          <span className="not-italic">brownie</span>
        </h1>

        <p className="text-black mb-5 sm:mb-6 hero-typewriter-text">
          {displayed}
          {!done && (
            <span
              aria-hidden="true"
              className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-cursor-blink"
            />
          )}
        </p>

        <div
          className={`flex flex-wrap items-center gap-y-1 transition-[opacity,transform] duration-[400ms] ease-out ${
            buttonsVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-[8px]'
          }`}
        >
          {WHITE_PILLS.map((pill) => (
            <button
              key={pill.section}
              type="button"
              onClick={() => onSelectSection(pill.section)}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.35em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white hover:-translate-y-[1px] transition-all duration-200 cursor-pointer"
            >
              {pill.label}
            </button>
          ))}

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Falar com a gente no Instagram"
            aria-label="Falar com a gente no Instagram"
            className="group inline-flex items-center justify-center w-fit max-w-full bg-black text-white border border-black rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.35em] mx-[0.2em] mb-[0.4em] gap-2 whitespace-nowrap hover:bg-white hover:text-black hover:border-black/15 hover:-translate-y-[1px] transition-all duration-200 cursor-pointer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="shrink-0 transition-transform duration-200 group-hover:scale-110"
            >
              <rect
                x="2.5"
                y="2.5"
                width="19"
                height="19"
                rx="5.5"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="12"
                cy="12"
                r="4.25"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
            </svg>
            <span>Fale com a gente</span>
          </a>
        </div>
      </div>
    </main>
  );
}
