import './App.css';
import { useState } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavClick = (section) => {
    setActiveSection(section);
    setDrawerOpen(false);
  };

  return (
    <div>
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
      <main>
        {activeSection === 'about' && (
          <section key="about">
            <h1>About Me</h1>
            <p>
              Hi! I'm Jeff. I use Arch
            </p>
            <p>
              <strong>Skills:</strong> Python, JavaScript, C, HTML, CSS
            </p>
          </section>
        )}
        {activeSection === 'projects' && (
          <section key="projects">
            <h1>Projects</h1>
            <ul>
              <li>
                <a href="https://github.com/rutra8002/rutra8002.github.io" target="_blank" rel="noopener noreferrer" style={{display:'block',color:'inherit',textDecoration:'none',width:'100%',height:'100%'}}>
                  <strong>Portfolio Website</strong><br/>
                  A modern, animated portfolio built with React and CSS.<br/>
                </a>
              </li>
              <li>
                <a href="https://github.com/Hohenzoler/optyka" target="_blank" rel="noopener noreferrer" style={{display:'block',color:'inherit',textDecoration:'none',width:'100%',height:'100%'}}>
                  <strong>Optyka</strong><br/>
                  A Python-based simulator of optic phenomenons. It uses the Pygame library for app development.<br/>
                </a>
              </li>
              <li>
                <a href="https://github.com/rutra8002/pixel_racers" target="_blank" rel="noopener noreferrer" style={{display:'block',color:'inherit',textDecoration:'none',width:'100%',height:'100%'}}>
                  <strong>Pixel Racers</strong><br/>
                  Simple game where you race against bots<br/>
                </a>
              </li>
            </ul>
          </section>
        )}
        {activeSection === 'contacts' && (
          <section key="contacts">
            <h1>Contacts</h1>
            <p><FaEnvelope style={{verticalAlign:'middle',marginRight:8,color:'#ff8c00'}}/>Email: <a href="mailto:jeffthemail@gmail.com" style={{color:'#ff8c00',textDecoration:'underline'}}>jeffthemail@gmail.com</a></p>
            <p><FaLinkedin style={{verticalAlign:'middle',marginRight:8,color:'#ff0080'}}/>LinkedIn: <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" style={{color:'#ff0080',textDecoration:'underline'}}>linkedin.com/</a></p>
            <p><FaGithub style={{verticalAlign:'middle',marginRight:8,color:'#fff'}}/>GitHub: <a href="https://github.com/rutra8002" target="_blank" rel="noopener noreferrer" style={{color:'#fff',textDecoration:'underline'}}>github.com/rutra8002</a></p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
