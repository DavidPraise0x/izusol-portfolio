import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Mail,
  MapPin,
  Copy,
  Check,
  Menu,
  X,
  ChevronRight,
  Database,
  Code,
  Cpu,
  TrendingUp
} from 'lucide-react';

const GithubIcon = ({ className, size = 20 }: { className?: string; size?: number }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// Project type definition
interface Project {
  id: number;
  title: string;
  desc: string;
  category: 'Data Science';
  stack: string[];
  codeUrl: string;
  demoUrl?: string;
  gradient: string;
  imageUrl?: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: 'E-commerce Customer Segmentation and Value Analysis',
    desc: 'This project applies RFM (Recency, Frequency, Monetary) analysis to segment an e-commerce customer base and uncover key behavioral patterns. The goal is to identify high-value, at-risk, and lost customers, enabling more targeted marketing, improved retention strategies, and smarter use of marketing',
    category: 'Data Science',
    stack: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
    codeUrl: 'https://github.com/izusol/-E-commerce-Customer-Segmentation-and-Value-Analysis-RFM-',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    imageUrl: '/sentiment_analysis.png'
  },
  {
    id: 2,
    title: 'Nigerian Electricity Demand Forecaster',
    desc: 'This project focuses on forecasting hourly electricity demand based on historical consumption data from commercial and industrial sites across Nigeria.',
    category: 'Data Science',
    stack: ['Python', 'Statsmodels', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
    codeUrl: 'https://github.com/izusol/NG-Electricity-Demand-Forecast',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    imageUrl: '/mental_health_chatbot.png'
  }
];

export default function App() {
  // Navigation active state
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Typewriter effect state
  const roles = ['a Data Scientist', 'an AI/ML Engineer', 'a Python Developer', 'the Batman'];
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Project filtering state
  const [filter, setFilter] = useState<'All' | 'AI / ML & Data Science'>('All');

  // Copy Email state
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Scroll orbs translation
  const [scrollY, setScrollY] = useState(0);

  // Typewriter loop logic
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at full word
      setIsDeleting(true);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      typingSpeed = 500; // Pause before new word
    }

    const timer = setTimeout(() => {
      setRoleText(
        isDeleting
          ? currentRole.substring(0, charIndex - 1)
          : currentRole.substring(0, charIndex + 1)
      );
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  // Navbar and Scroll adjustments
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Active tab highlighting based on section scroll offset
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Email Copy Action
  const copyEmail = () => {
    navigator.clipboard.writeText('izuasomba.work@gmail.com').then(() => {
      setCopied(true);
      setShowToast(true);
      setTimeout(() => {
        setCopied(false);
      }, 2500);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    });
  };

  const filteredProjects = filter === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === filter);

  return (
    <div className="portfolio-app">
      {/* ========== BACKGROUND SYSTEM ========== */}
      <div className="hero-bg">
        <div
          className="hero-orb hero-orb-1"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div
          className="hero-orb hero-orb-2"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
        <div className="hero-grid" />
      </div>

      {/* ========== NAVIGATION ========== */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <div className="nav-container">


          <div className="nav-links">
            {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
                onClick={() => {
                  setActiveSection(section);
                  setMenuOpen(false);
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>

          <a
            href="https://github.com/izusol"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            <GithubIcon className="icon" size={15} />
            GitHub
            <ExternalLink size={11} style={{ marginLeft: 2 }} />
          </a>

          <button
            className="nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ========== HERO SECTION ========== */}
      <section id="home" className="hero">
        <div className="hero-content">


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-avatar"
          >
            <img
              src="https://avatars.githubusercontent.com/u/68485163?v=4"
              alt="Izuchukwu"
              className="avatar-img"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-title"
          >
            Hi, I'm <span className="gradient-text">Izuchukwu. </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-typewriter"
          >
            <span className="typewriter-prefix">I'm  </span>
            <span className="typewriter-text">{roleText}</span>
            <span className="typewriter-cursor">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hero-description"
          >
            As a Data Scientist, I build models that help businesses make smarter decisions. I love the process of training algorithms—plus, computers are just easier to teach than people lol.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hero-actions"
          >
            <a href="#projects" className="btn btn-primary">
              View Projects
              <ChevronRight size={16} />
            </a>
            <a href="#contact" className="btn btn-outline">
              Get in Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="hero-stats"
          >
            <div className="stat">
              <span className="stat-number">2+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">10+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">3+</span>
              <span className="stat-label">Core Technologies</span>
            </div>
          </motion.div>
        </div>

      </section>

      {/* ========== ABOUT SECTION ========== */}
      <section id="about" className="section about">
        <div className="container">
          <div className="section-label">About</div>
          <h2 className="section-title">A little about me</h2>

          <div className="about-grid">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="about-text"
            >
              <p>
                I am a <strong>Data Scientist</strong> specializing in <strong>AI and machine learning</strong>. I focus on building scalable solutions that drive measurable business value, transforming raw data into intelligent, revenue-generating systems.
              </p>
              <p>
                With a strong foundation in Python and SQL, I have successfully deployed over 10 models into production. These models operate with 85-90% accuracy and have generated more than $2M in revenue impact.
              </p>
              <p>
                Beyond my core work, you will find me actively contributing to open-source projects to help advance the data science community.
              </p>

              <div className="about-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon">📍</div>
                  <div>
                    <span className="highlight-label">Location</span>
                    <span className="highlight-value">Lagos, Nigeria</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">🎓</div>
                  <div>
                    <span className="highlight-label">Focus</span>
                    <span className="highlight-value">AI/ML & Data Science</span>
                  </div>
                </div>

              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="about-card"
            >
              <div className="card-glass">
                <div className="batman-emblem">
                  <img
                    src="public/favicon.svg"
                    alt="Batman Emblem"
                    className="batman-card-logo"
                  />
                </div>
                <div className="card-name">Izuchukwu</div>
                <div className="card-role">Data Scientist & AI/ML Engineer</div>
                <div className="card-divider"></div>
                <div className="card-details">
                  <div className="card-detail">
                    <Mail size={14} />
                    izuasomba.work@gmail.com
                  </div>
                  <div className="card-detail">
                    <MapPin size={14} />
                    Lagos, Nigeria
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== SKILLS SECTION ========== */}
      <section id="skills" className="section skills">
        <div className="container">
          <div className="section-label">Skills</div>
          <h2 className="section-title">Technologies & tools I use</h2>

          <div className="skills-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="skill-category"
            >
              <h3 className="skill-category-title">
                <Code className="skill-icon" size={18} style={{ color: 'var(--primary-light)' }} />
                Languages
              </h3>
              <div className="skill-tags">
                {['Python', 'R'].map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="skill-category"
            >
              <h3 className="skill-category-title">
                <Cpu className="skill-icon" size={18} style={{ color: 'var(--primary-light)' }} />
                ML / AI Frameworks
              </h3>
              <div className="skill-tags">
                {['TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'Computer Vision', 'Transformers'].map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="skill-category"
            >
              <h3 className="skill-category-title">
                <Database className="skill-icon" size={18} style={{ color: 'var(--primary-light)' }} />
                Data & Cloud
              </h3>
              <div className="skill-tags">
                {['AWS', 'Pandas', 'NumPy'].map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== PROJECTS SECTION ========== */}
      <section id="projects" className="section projects">
        <div className="container">
          <div className="section-label">Projects</div>
          <h2 className="section-title">Featured work</h2>
          <p className="section-subtitle">
            A showcasing of ML architectures, data pipelines, and predictive analytics applications.
          </p>

          {/* Filter tabs */}
          <div className="projects-filters">
            {(['All', 'AI / ML & Data Science'] as const).map((cat) => (
              <button
                key={cat}
                className={`filter-tab ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid of project cards */}
          <motion.div layout className="projects-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={project.id}
                  className="project-card"
                >
                  <div
                    className="project-image"
                    style={{
                      backgroundImage: project.imageUrl ? `url(${project.imageUrl})` : project.gradient,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="project-overlay">
                      <span className="project-tag">{project.category}</span>
                    </div>
                  </div>

                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.desc}</p>
                    <div className="project-stack">
                      {project.stack.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>

                    <div className="project-links">
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <GithubIcon size={15} />
                        Source Code
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ========== CONTACT SECTION ========== */}
      <section id="contact" className="section contact">
        <div className="container">
          <div className="section-label">Contact</div>
          <h2 className="section-title">Let's connect</h2>
          <p className="section-subtitle">
            Open to data science roles, ML roles and tech conversations.
          </p>

          <div className="contact-email">
            <button className="email-btn" onClick={copyEmail}>
              <span className="email-text">izuasomba.work@gmail.com</span>
              {copied ? (
                <Check className="check-icon" size={20} />
              ) : (
                <Copy className="copy-icon" size={20} />
              )}
            </button>
            <span className="copy-hint">Click to copy email address</span>
          </div>

          <div className="contact-grid">
            <a href="https://github.com/izusol" target="_blank" rel="noopener noreferrer" className="contact-card">
              <GithubIcon className="contact-card-icon" />
              <div>
                <div className="contact-card-label">GitHub</div>
                <div className="contact-card-value">@izusol</div>
              </div>
            </a>
            <a href="https://x.com/izusol" target="_blank" rel="noopener noreferrer" className="contact-card">
              <TrendingUp className="contact-card-icon" />
              <div>
                <div className="contact-card-label">X / Twitter</div>
                <div className="contact-card-value">@izusol</div>
              </div>
            </a>
            <a href="mailto:izuasomba.work@gmail.com" className="contact-card">
              <Mail className="contact-card-icon" />
              <div>
                <div className="contact-card-label">Email</div>
                <div className="contact-card-value">izuasomba.work@gmail</div>
              </div>
            </a>
            <a href="#home" className="contact-card">
              <MapPin className="contact-card-icon" />
              <div>
                <div className="contact-card-label">Available In</div>
                <div className="contact-card-value">Lagos & Remote</div>
              </div>
            </a>
          </div>


        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-left">
            © {new Date().getFullYear()} Izuchukwu. All rights reserved. Built by Davidpraise.
          </div>
          <div className="footer-links">
            <a href="https://github.com/izusol" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://x.com/izusol" target="_blank" rel="noopener noreferrer">X / Twitter</a>
            <a href="mailto:izuasomba.work@gmail.com">Email</a>
          </div>
        </div>
      </footer>

      {/* ========== INTERACTIVE TOAST ========== */}
      <div className={`toast ${showToast ? 'show' : ''}`} id="toast">
        <Check size={16} />
        <span>Email successfully copied!</span>
      </div>
    </div>
  );
}
