import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ContactsSection from './components/ContactsSection';
import AchievementsSection from './components/AchievementsSection.tsx';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavClick = (section) => {
    setActiveSection(section);
    setDrawerOpen(false);
  };

  const sections = {
    about: <AboutSection />,
    projects: <ProjectsSection />,
    contacts: <ContactsSection />,
    achievements: <AchievementsSection />,
  };

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 -z-10 bg-linear-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e]" />
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        handleNavClick={handleNavClick}
      />
      <main className="max-w-4xl mx-auto px-6 pt-24 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {sections[activeSection]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
