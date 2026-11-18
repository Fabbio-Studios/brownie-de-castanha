import { StorySectionId } from '../data/brandStory';

interface NavbarProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
  onSelectSection: (section: StorySectionId) => void;
  onResetHome: () => void;
}

const NAV_ITEMS: { label: string; section: StorySectionId }[] = [
  { label: 'Nossa origem', section: 'origem' },
  { label: 'O brownie', section: 'brownie' },
  { label: 'Ingredientes', section: 'ingredientes' },
  { label: 'Contato', section: 'contato' },
];

export function Navbar({
  menuOpen,
  onToggleMenu,
  onSelectSection,
  onResetHome,
}: NavbarProps) {
  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    section: StorySectionId,
  ) => {
    event.preventDefault();
    onSelectSection(section);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 w-full px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center gap-4 lg:gap-8">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onResetHome();
          }}
          className="flex flex-row items-center gap-2 sm:gap-3 cursor-pointer shrink-0"
        >
          <span className="font-heading text-black text-[19px] sm:text-[22px] md:text-[clamp(17px,1.8vw,26px)] tracking-tight leading-none whitespace-nowrap">
            Brownie de Castanha
          </span>
          <span
            aria-hidden="true"
            className="inline-block text-[22px] sm:text-[26px] md:text-[clamp(20px,2vw,30px)] text-black select-none tracking-[-0.02em] leading-none animate-slow-spin"
          >
            ✳︎
          </span>
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden md:flex flex-row items-center md:text-[clamp(13px,1.5vw,23px)] text-black min-w-0"
        >
          {NAV_ITEMS.map((item, index) => (
            <span key={item.section} className="inline-flex items-center">
              <a
                href={`#${item.section}`}
                onClick={(e) => handleNavClick(e, item.section)}
                className="hover:opacity-60 transition-opacity whitespace-nowrap"
              >
                {item.label}
              </a>
              {index < NAV_ITEMS.length - 1 && (
                <span className="whitespace-pre">, </span>
              )}
            </span>
          ))}
        </nav>

        <a
          href="#historia"
          onClick={(e) => handleNavClick(e, 'historia')}
          className="hidden md:inline-block md:text-[clamp(13px,1.5vw,23px)] text-black underline underline-offset-2 hover:opacity-60 transition-opacity whitespace-nowrap shrink-0"
        >
          Conheça nossa história
        </a>

        <button
          type="button"
          onClick={onToggleMenu}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] p-2 cursor-pointer"
        >
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[9] md:hidden bg-white/95 backdrop-blur-sm flex flex-col justify-center items-start px-8 gap-8 transition-opacity duration-300 ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.section}
            href={`#${item.section}`}
            tabIndex={menuOpen ? 0 : -1}
            onClick={(e) => handleNavClick(e, item.section)}
            className="text-[32px] font-medium text-black hover:opacity-60 transition-opacity"
          >
            {item.label}
          </a>
        ))}

        <a
          href="#historia"
          tabIndex={menuOpen ? 0 : -1}
          onClick={(e) => handleNavClick(e, 'historia')}
          className="text-[32px] font-medium text-black underline underline-offset-4 hover:opacity-60 transition-opacity"
        >
          Conheça nossa história
        </a>
      </div>
    </>
  );
}
