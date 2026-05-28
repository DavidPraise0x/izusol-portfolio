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
  category: 'AI / ML' | 'Data Science' | 'Web3 / Blockchain';
  stack: string[];
  codeUrl: string;
  demoUrl?: string;
  gradient: string;
  imageUrl?: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: 'Sentiment Analysis Engine',
    desc: 'NLP-powered sentiment classification system using transformer models for real-time social media analysis and brand monitoring.',
    category: 'AI / ML',
    stack: ['Python', 'PyTorch', 'HuggingFace', 'FastAPI'],
    codeUrl: 'https://github.com/izusol/sentimental_analysis',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    imageUrl: '/sentiment_analysis.png'
  },
  {
    id: 2,
    title: 'Hfund Crowdfunding Platform',
    desc: 'A cutting-edge Web3 crowdfunding platform built with decentralized smart contracts, hardhat testing suites, and a Next.js user interface.',
    category: 'Web3 / Blockchain',
    stack: ['Solidity', 'Next.js', 'Hardhat', 'Ethereum'],
    codeUrl: 'https://github.com/izusol/Hfund',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    imageUrl: '/web3_crowdfunding.png'
  },
  {
    id: 3,
    title: 'Mental Health Chatbot',
    desc: 'An AI chatbot trained to provide emotional support resources and mental health guidance using Natural Language Processing (NLP).',
    category: 'AI / ML',
    stack: ['Python', 'NLP', 'PyTorch', 'Jupyter'],
    codeUrl: 'https://github.com/izusol/Mental_Health_Chatbot',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    imageUrl: '/mental_health_chatbot.png'
  },
  {
    id: 4,
    title: 'Customer Churn Prediction',
    desc: 'Supervised machine learning model built to forecast customer churn in a telecommunications enterprise using analytical pipelines and models.',
    category: 'Data Science',
    stack: ['Python', 'Scikit-learn', 'Pandas', 'Jupyter'],
    codeUrl: 'https://github.com/izusol/Customer_Churn_Prediction',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    imageUrl: '/data_analytics.png'
  },
  {
    id: 5,
    title: 'House Price Prediction App',
    desc: 'An interactive analytical dashboard engineered with Streamlit and Scikit-learn for mapping and predicting real estate valuations.',
    category: 'Data Science',
    stack: ['Python', 'Streamlit', 'Scikit-learn', 'Plotly'],
    codeUrl: 'https://github.com/izusol/House_Price_Prediction_App',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    imageUrl: '/house_prediction.png'
  },
  {
    id: 6,
    title: 'Sapa-Fund Decentralized Charity',
    desc: 'A decentralized charity and transparent fundraising portal backed by solidity smart contracts to secure funds peer-to-peer.',
    category: 'Web3 / Blockchain',
    stack: ['Solidity', 'Smart Contracts', 'Web3.js', 'React'],
    codeUrl: 'https://github.com/izusol/Sapa-Fund',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    imageUrl: '/sapa_fund.png'
  },
  {
    id: 7,
    title: 'SMS Spam Detection Model',
    desc: 'A robust text categorization machine learning model built using Natural Language Processing (NLP) to detect and isolate spam.',
    category: 'AI / ML',
    stack: ['Python', 'NLP', 'Scikit-learn', 'NLTK'],
    codeUrl: 'https://github.com/izusol/SMS_Spam_Detection_Model',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    imageUrl: '/sms_spam.png'
  },
  {
    id: 8,
    title: 'Image Classification API',
    desc: 'Deep learning classification API driven by custom CNN models, packaged in Docker container containers and hosted on AWS infrastructure.',
    category: 'AI / ML',
    stack: ['TensorFlow', 'Flask', 'Docker', 'AWS'],
    codeUrl: 'https://github.com/izusol',
    gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
    imageUrl: '/image_api.png'
  }
];

export default function App() {
  // Navigation active state
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Typewriter effect state
  const roles = ['Data Scientist', 'AI/ML Engineer', 'Python Developer'];
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Project filtering state
  const [filter, setFilter] = useState<'All' | 'AI / ML' | 'Data Science' | 'Web3 / Blockchain'>('All');

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
          <a href="#home" className="nav-logo" onClick={() => setMenuOpen(false)}>
            <img 
              src="https://media.base44.com/images/public/6a159434dd68851c45f57660/80088bdff_logo.png" 
              alt="Batman Logo" 
              className="batman-logo" 
            />
            <span>IZUSOL<span className="accent">.</span></span>
          </a>

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
            transition={{ duration: 0.6 }}
            className="hero-badge"
          >
            <span className="status-dot"></span>
            Open to Work
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-avatar"
          >
            <img 
              src="https://avatars.githubusercontent.com/u/68485163?v=4" 
              alt="Izu Asomba" 
              className="avatar-img" 
            />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-title"
          >
            Hi, I'm <span className="gradient-text">Izu Asomba</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-typewriter"
          >
            <span className="typewriter-prefix">I'm a </span>
            <span className="typewriter-text">{roleText}</span>
            <span className="typewriter-cursor">|</span>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hero-description"
          >
            Turning complex data into actionable insights and engineering intelligent, decentralized systems that solve real-world problems.
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
              <span className="stat-number">3+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">10+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">8+</span>
              <span className="stat-label">Core Technologies</span>
            </div>
          </motion.div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span>Scroll Down</span>
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
                I'm a passionate <strong>Data Scientist</strong> and <strong>AI/ML Engineer</strong> based in Lagos, Nigeria. I specialize in transforming raw data into intelligent systems — from predictive models and NLP pipelines to decentralized dApps and intelligent full-stack engines.
              </p>
              <p>
                With a strong foundation in Python, machine learning frameworks, data engineering, and decentralized protocols, I thrive on engineering solutions at the modern intersection of AI and Web3 technologies.
              </p>
              <p>
                When I'm not coding, you'll find me exploring the latest in artificial intelligence publications, designing decentralized smart contracts, and mentoring aspiring developers in the African tech ecosystem.
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
                    <span className="highlight-value">AI/ML, Data Science & Web3</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">💼</div>
                  <div>
                    <span className="highlight-label">Status</span>
                    <span className="highlight-value">Available for contracts & full-time roles</span>
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
                    src="https://media.base44.com/images/public/6a159434dd68851c45f57660/80088bdff_logo.png" 
                    alt="Batman Emblem" 
                    className="batman-card-logo" 
                  />
                </div>
                <div className="card-name">Izu Asomba</div>
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
                {['Python', 'Solidity', 'SQL', 'JavaScript', 'TypeScript', 'R'].map(s => (
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
                {['Pandas', 'NumPy', 'FastAPI', 'Flask', 'PostgreSQL', 'Docker', 'AWS', 'Hardhat'].map(s => (
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
            A showcasing of ML architectures, data analytics applications, and Web3 smart contract deployments.
          </p>

          {/* Filter tabs */}
          <div className="projects-filters">
            {(['All', 'AI / ML', 'Data Science', 'Web3 / Blockchain'] as const).map((cat) => (
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
            Open to data science roles, ML engineering contracts, Web3 collaborations, and tech conversations.
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

          <div className="availability-badge">
            <span className="status-dot"></span>
            <span>Open to Work — Seeking Data Science or ML/AI Roles</span>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-left">
            © {new Date().getFullYear()} Izu Asomba. All rights reserved. Built with Vite, React & Framer Motion.
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
