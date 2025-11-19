import React, { useState, useEffect } from 'react';
import '../App.css';

const projectsData = [
    {
    title: 'Portfolio Website',
    description: 'A modern, animated portfolio built with React and CSS.',
    link: 'https://github.com/rutra8002/rutra8002.github.io',
    tags: ['React', 'CSS', 'JavaScript'],
    },
    {
    title: 'Optyka',
    description: 'A Python-based simulator of optic phenomenons. It uses the Pygame library for app development.',
    link: 'https://github.com/Hohenzoler/optyka',
    tags: ['Python', 'Pygame'],
    },
    {
    title: 'Pixel Racers',
    description: 'Simple game where you race against bots',
    link: 'https://github.com/rutra8002/pixel_racers',
    tags: ['Python', 'Pygame'],
    },
    {
    title: 'Storm Survival',
    description: 'Realistic real-time apocalypse survival game. Built during Brackeys game jam.',
    link: 'https://github.com/V8Enthusiast/StormSurvival',
    tags: ['Python', 'Pygame'],
    },
    {
    title: 'NukeTown',
    description: 'Game about uranium and his fellas created during 24 hour hackathon.',
    link: 'https://github.com/MalyszekTobias/NukeTown',
    tags: ['Python', 'Raylib'],
    },
    {
    title: 'RutraOS',
    description: 'A buggy operating system written in C.',
    link: "https://github.com/rutra8002/RutraOS",
    tags: ['C', 'Operating System'],
    },
    {
    title: 'Quiz app',
    description: 'A simple quiz application built with HTML, Tailwind, Flask, sqlite and Gemini AI for answer checking. ',
    link: 'https://github.com/rutra8002/quizapp',
    tags: ['Python', 'Flask', 'HTML', 'Tailwind', 'SQLite', 'AI'],
    },
];

function ProjectsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = projectsData.filter(project =>
      project.title.toLowerCase().includes(lowerCaseQuery) ||
      project.description.toLowerCase().includes(lowerCaseQuery) ||
      project.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredProjects(filtered);
  }, [searchQuery]);

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
  };

  return (
    <section className="projects-section" key="projects">
      <h1>Projects</h1>
      <input
        type="text"
        placeholder="Search projects..."
        className="search-bar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul className="projects-list">
        {filteredProjects.map(project => (
          <li key={project.title} className="project-item">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <strong className="project-title">{project.title}</strong>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="skill-pill project-tag"
                    onClick={(e) => {
                      e.preventDefault();
                      handleTagClick(tag);
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProjectsSection;
