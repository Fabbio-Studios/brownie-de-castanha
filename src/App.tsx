import { useState } from 'react';
import { EditorialDrawer } from './components/EditorialDrawer';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ScrubVideoBackground } from './components/ScrubVideoBackground';
import { StorySectionId } from './data/brandStory';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<StorySectionId | null>(
    null,
  );

  const handleSelectSection = (section: StorySectionId) => {
    setMenuOpen(false);
    setActiveSection(section);
  };

  const handleResetHome = () => {
    setMenuOpen(false);
    setActiveSection(null);
  };

  return (
    <div id="top" className="relative min-h-screen w-full overflow-hidden">
      <ScrubVideoBackground />

      <Navbar
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        onSelectSection={handleSelectSection}
        onResetHome={handleResetHome}
      />

      <HeroSection onSelectSection={handleSelectSection} />

      <Footer />

      <EditorialDrawer
        activeSection={activeSection}
        onClose={() => setActiveSection(null)}
        onSelectSection={handleSelectSection}
      />
    </div>
  );
}
