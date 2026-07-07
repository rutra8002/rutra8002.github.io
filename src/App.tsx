import { useState, type ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ContactsSection from './components/ContactsSection';
import AchievementsSection from './components/AchievementsSection';
import TerminalDock from './components/TerminalDock';

type Section = 'about' | 'projects' | 'contacts' | 'achievements';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('about');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleNavClick = (section: Section) => {
    setActiveSection(section);
    setDrawerOpen(false);
  };

  const sections: Record<Section, ReactElement> = {
    about: <AboutSection />,
    projects: <ProjectsSection />,
    contacts: <ContactsSection />,
    achievements: <AchievementsSection />,
  };

    return (
        <div className="min-h-screen font-mono bg-[#0a0b10] text-slate-200 selection:bg-emerald-500 selection:text-black transition-colors duration-300">
            <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#141620_1px,transparent_1px),linear-gradient(to_bottom,#141620_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />


            <Navbar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                handleNavClick={handleNavClick}
            />

            <main className="max-w-5xl mx-auto px-6 pt-28 pb-32">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, scale: 0.99, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.99, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        {sections[activeSection]}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* wierd terminal */}
            <TerminalDock onNavigate={handleNavClick} />
        </div>
    );
}

export default App;
