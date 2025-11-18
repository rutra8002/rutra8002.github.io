import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

function ContactsSection() {
  return (
    <section key="contacts">
      <h1>Contacts</h1>
      <p><FaEnvelope style={{verticalAlign:'middle',marginRight:8,color:'#667eea'}}/>Email: <a href="mailto:contact@rutra.me" style={{color:'#667eea',textDecoration:'underline'}}>contact@rutra.me</a></p>
      <p><FaLinkedin style={{verticalAlign:'middle',marginRight:8,color:'#764ba2'}}/>LinkedIn: <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" style={{color:'#764ba2',textDecoration:'underline'}}>linkedin.com/</a></p>
      <p><FaGithub style={{verticalAlign:'middle',marginRight:8,color:'#fff'}}/>GitHub: <a href="https://github.com/rutra8002" target="_blank" rel="noopener noreferrer" style={{color:'#fff',textDecoration:'underline'}}>github.com/rutra8002</a></p>
    </section>
  );
}

export default ContactsSection;
