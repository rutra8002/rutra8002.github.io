import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar({ activeSection, setActiveSection, drawerOpen, setDrawerOpen, handleNavClick }) {
  return (
    <nav className="navbar">
      <div className="navbar-desktop">
        <span
          onClick={() => setActiveSection('about')}
          className={activeSection === 'about' ? 'nav-item active' : 'nav-item'}
        >
          About Me
        </span>
        <span
          onClick={() => setActiveSection('projects')}
          className={activeSection === 'projects' ? 'nav-item active' : 'nav-item'}
        >
          Projects
        </span>
        <span
          onClick={() => setActiveSection('contacts')}
          className={activeSection === 'contacts' ? 'nav-item active' : 'nav-item'}
        >
          Contacts
        </span>
      </div>
      <button className="drawer-toggle" onClick={() => setDrawerOpen(!drawerOpen)} aria-label="Open menu">
        {drawerOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      <div className={`side-drawer${drawerOpen ? ' open' : ''}`}>
        <span
          onClick={() => handleNavClick('about')}
          className={activeSection === 'about' ? 'nav-item active' : 'nav-item'}
        >
          About Me
        </span>
        <span
          onClick={() => handleNavClick('projects')}
          className={activeSection === 'projects' ? 'nav-item active' : 'nav-item'}
        >
          Projects
        </span>
        <span
          onClick={() => handleNavClick('contacts')}
          className={activeSection === 'contacts' ? 'nav-item active' : 'nav-item'}
        >
          Contacts
        </span>
      </div>
    </nav>
  );
}

export default Navbar;

