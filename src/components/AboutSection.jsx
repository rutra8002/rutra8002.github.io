function AboutSection() {
  const skills = ["Python", "JavaScript", "C", "HTML", "CSS"];

  return (
    <section key="about" className="about-section">
      <div className="about-intro">
        <span className="about-eyebrow">Profile</span>
        <h1>About Me</h1>
        <p className="about-summary">
          Jeff goes brr. I use Arch btw.
        </p>
      </div>
      <div className="about-panel">
        <p className="about-panel-title">Core Stack</p>
        <div className="skills-grid">
          {skills.map((skill) => (
            <span key={skill} className="skill-pill">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

