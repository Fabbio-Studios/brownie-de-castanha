export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-[2] w-full px-5 sm:px-8 md:px-10 py-3 sm:py-4 border-t border-black/[0.08] bg-[#f4f3ee]/80 backdrop-blur-[2px] md:bg-transparent md:backdrop-blur-none">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-6 text-[11px] sm:text-[12px] leading-snug text-black/55">
        <p className="whitespace-nowrap">
          © {currentYear} Brownie de Castanha. Todos os direitos reservados.
        </p>

        <p className="text-black/50">
          Calangos Marketing · Fabbio Studios · 7º Ano A · JEPP Sebrae
        </p>
      </div>
    </footer>
  );
}
