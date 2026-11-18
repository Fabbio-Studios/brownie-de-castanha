import { useEffect } from 'react';
import {
  INSTAGRAM_URL,
  STORY_SECTIONS,
  StorySectionId,
} from '../data/brandStory';

interface EditorialDrawerProps {
  activeSection: StorySectionId | null;
  onClose: () => void;
  onSelectSection: (section: StorySectionId) => void;
}

const SECTION_ORDER: { id: StorySectionId; label: string }[] = [
  { id: 'historia', label: 'Nossa história' },
  { id: 'origem', label: 'Nossa origem' },
  { id: 'brownie', label: 'O brownie' },
  { id: 'ingredientes', label: 'Ingredientes' },
  { id: 'especial', label: 'O que torna especial' },
  { id: 'sabor', label: 'Descubra o sabor' },
  { id: 'contato', label: 'Contato' },
];

export function EditorialDrawer({
  activeSection,
  onClose,
  onSelectSection,
}: EditorialDrawerProps) {

  useEffect(() => {
    if (!activeSection) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSection, onClose]);

  if (!activeSection) {
    return null;
  }

  const content = STORY_SECTIONS[activeSection];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="editorial-drawer-title"
      className="fixed inset-0 z-20 flex justify-end bg-black/25 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl h-full bg-white text-black px-6 sm:px-10 py-8 sm:py-10 flex flex-col justify-between overflow-y-auto shadow-2xl"
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-black/10">
            <span className="text-[14px] text-black/60">{content.kicker}</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar painel"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-black/15 text-black hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 2L12 12M12 2L2 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="pt-8 sm:pt-10">
            <h2
              id="editorial-drawer-title"
              className="font-heading text-[28px] sm:text-[36px] leading-[1.12] tracking-tight text-black mb-5"
            >
              {content.title}
            </h2>

            <p className="text-[19px] sm:text-[21px] leading-[1.35] text-black mb-6">
              {content.lead}
            </p>

            <div className="space-y-4 text-[16px] sm:text-[17px] leading-[1.55] text-black/80">
              {content.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {activeSection === 'contato' && (
              <div className="mt-8 pt-6 border-t border-black/10 flex flex-wrap items-center gap-3">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-black text-white border border-black rounded-full text-[14px] px-5 py-2.5 hover:bg-white hover:text-black hover:border-black/15 transition-colors duration-200"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0"
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
                  <span>Falar no Instagram</span>
                </a>
              </div>
            )}

            <p className="mt-8 pt-6 border-t border-black/10 text-[16px] text-black">
              {content.statement}
            </p>
          </div>
        </div>

        <nav
          aria-label="Seções da história"
          className="pt-8 mt-8 border-t border-black/10 flex flex-wrap gap-2"
        >
          {SECTION_ORDER.map((item) => {
            const isActive = item.id === activeSection;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectSection(item.id)}
                className={`rounded-full text-[13px] px-3.5 py-1.5 border transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black/15 hover:bg-black hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
