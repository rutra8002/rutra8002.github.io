import './App.css';
import { useState } from 'react';

function App() {
  const [activeSection, setActiveSection] = useState('about');

  return (
    <div>
      <nav className="navbar">
        <button onClick={() => setActiveSection('about')} className={activeSection === 'about' ? 'active' : ''}>About Me</button>
        <button onClick={() => setActiveSection('projects')} className={activeSection === 'projects' ? 'active' : ''}>Projects</button>
        <button onClick={() => setActiveSection('contacts')} className={activeSection === 'contacts' ? 'active' : ''}>Contacts</button>
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
