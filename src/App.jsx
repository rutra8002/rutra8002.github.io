import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ContactsSection from './components/ContactsSection';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavClick = (section) => {
    setActiveSection(section);
    setDrawerOpen(false);
  };

  return (
    <div>
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        handleNavClick={handleNavClick}
      />
      <main>
        {activeSection === 'about' && <AboutSection />}
        {activeSection === 'projects' && <ProjectsSection />}
        {activeSection === 'contacts' && <ContactsSection />}
      </main>
    </div>
  );
}

export default App;
