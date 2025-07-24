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
          <section>
            <h1>About Me</h1>
            <p>Me About</p>
          </section>
        )}
        {activeSection === 'projects' && (
          <section>
            <h1>Projects</h1>
            <ul>
              <li>Project 1</li>
              <li>Project 2</li>
              <li>Project 3</li>
            </ul>
          </section>
        )}
        {activeSection === 'contacts' && (
          <section>
            <h1>Contacts</h1>
            <p>Email: jeffthemail</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
