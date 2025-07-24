import './App.css';
import { useState } from 'react';

function App() {
  const [activeSection, setActiveSection] = useState('about');

  return (
    <div>
      <nav className="navbar">
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
            <p>Email: <a href="mailto:jeffthemail@gmail.com" style={{color:'#ff8c00',textDecoration:'underline'}}>jeffthemail@gmail.com</a></p>
            <p>LinkedIn: <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" style={{color:'#ff0080',textDecoration:'underline'}}>linkedin.com/</a></p>
            <p>GitHub: <a href="https://github.com/rutra8002" target="_blank" rel="noopener noreferrer" style={{color:'#fff',textDecoration:'underline'}}>github.com/rutra8002</a></p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
