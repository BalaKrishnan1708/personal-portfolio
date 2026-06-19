/**
 * =========================================
 * CORE WEBSITE INTERACTIVE LOGIC
 * Balakrishnan R - Personal Brand Platform
 * =========================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Starfield Particle Background ---
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');

  let stars = [];
  const starCount = 100;
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.5 + 0.3,
        fadeDirection: Math.random() > 0.5 ? 1 : -1
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#040811';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let star of stars) {
      // Glow effect for larger stars
      if (star.size > 1.2) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#D4AF37';
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.fillStyle = `rgba(232, 217, 181, ${star.alpha})`; // Sandal-colored stars
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();

      // Slow drift
      star.x += star.speedX;
      star.y += star.speedY;

      // Twinkle twinkle
      star.alpha += star.fadeDirection * 0.005;
      if (star.alpha <= 0.2) {
        star.fadeDirection = 1;
      } else if (star.alpha >= 0.8) {
        star.fadeDirection = -1;
      }

      // Keep inside bounds
      if (star.x < 0 || star.x > canvas.width) star.speedX *= -1;
      if (star.y < 0 || star.y > canvas.height) star.speedY *= -1;
    }

    ctx.shadowBlur = 0; // Reset shadow blur
    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  drawStars();


  // --- 2. Floating Header & Responsive Nav ---
  const header = document.getElementById('main-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (mainNav.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars-staggered';
    }
  });

  // Close mobile nav when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
      menuToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
    });
  });

  // Highlight active section on scroll
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    root: null,
    threshold: 0.3,
    rootMargin: '-50px 0px -50px 0px'
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => navObserver.observe(section));


  // --- 3. Animated Stats Counters ---
  const statNums = document.querySelectorAll('.stat-num');
  
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const val = parseInt(target.getAttribute('data-val'));
        let count = 0;
        const speed = val > 50 ? 2 : 50; // Quicker counting for larger numbers
        
        const updateCount = () => {
          count += 1;
          target.innerText = count;
          if (count < val) {
            setTimeout(updateCount, speed);
          } else {
            target.innerText = val + (val === 8 || val === 5 || val === 4 ? '+' : '');
          }
        };
        
        updateCount();
        observer.unobserve(target); // Only animate once
      }
    });
  }, { threshold: 0.8 });

  statNums.forEach(num => statsObserver.observe(num));


  // --- 4. Experience Universe Timeline Filter & Expansion ---
  const expFilterBtns = document.querySelectorAll('#experience .filter-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineContents = document.querySelectorAll('.timeline-content');

  // Filter functionality
  expFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      expFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      timelineItems.forEach(item => {
        const categories = item.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.classList.add('show');
          }, 50);
        } else {
          item.classList.remove('show');
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // --- 4b. Projects Grid Filter ---
  const projFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('#projects-grid .project-card');

  projFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.classList.add('show');
          }, 50);
        } else {
          card.classList.remove('show');
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Expand / Collapse details on click
  timelineContents.forEach(content => {
    content.addEventListener('click', (e) => {
      // Prevent expand if clicking links or button tags directly
      if (e.target.tagName === 'A' || e.target.closest('a')) return;
      
      const isExpanded = content.classList.contains('expanded');
      
      // Close other timeline details
      timelineContents.forEach(c => {
        c.classList.remove('expanded');
        c.querySelector('.timeline-expand-btn').innerHTML = 'Read Details <i class="fa-solid fa-chevron-down"></i>';
      });

      if (!isExpanded) {
        content.classList.add('expanded');
        content.querySelector('.timeline-expand-btn').innerHTML = 'Close <i class="fa-solid fa-chevron-down"></i>';
      }
    });
  });


  // --- 5. Interactive Skills Matrix & SVG Radar Chart ---
  const radarLabels = document.querySelectorAll('.radar-axis-label');
  const radarPoints = document.querySelectorAll('.radar-point');
  const panelTitle = document.getElementById('panel-title');
  const panelDesc = document.getElementById('panel-desc');
  const panelList = document.getElementById('panel-list');

  // Skill categories data
  const skillsData = {
    dev: {
      title: "Software Engineering",
      desc: "Architecting responsive, high-performance web systems and digital products across internships, startups, and client agreements.",
      skills: [
        "MERN Stack (MongoDB, React, Node)",
        "Angular / Vue.js",
        "HTML5 / Vanilla CSS3",
        "Software Refactoring",
        "TypeScript / Modern ES6+",
        "Java, C, C++ Programming",
        "RESTful APIs / JSON Modules",
        "MySQL Database Systems"
      ]
    },
    ai: {
      title: "AI & Data Science",
      desc: "Analyzing data streams, training machine learning classifiers, and processing remote sensing satellite indices.",
      skills: [
        "Machine Learning / Scikit-Learn",
        "Pandas & NumPy Arrays",
        "Matplotlib & Seaborn Visuals",
        "Time Series Analysis",
        "NLP & LLM Integrations",
        "Computer Vision / OpenCV",
        "Remote Sensing (Sentinel Data)",
        "GIS Spatial Analysis Tools"
      ]
    },
    biz: {
      title: "Entrepreneurship & Strategy",
      desc: "Driving startup methodologies, creating pitch decks, and outlining business operations verified by global programs.",
      skills: [
        "Starting a Business (SCU)",
        "Growing a Business (SCU)",
        "Managing a Business (SCU)",
        "Startup Fundamentals & KPIs",
        "Business Growth Engines (HP)",
        "Operations & Financial Planning",
        "Strategic Market Analysis",
        "Venture Pitching Models"
      ]
    },
    comm: {
      title: "Communication & Media",
      desc: "Connecting tech and communities. Hosting podcasts, anchoring cultural festivals, and speaking at national conventions.",
      skills: [
        "Event Hosting / Emcee (Highways)",
        "Podcasting (SVCE Science Hour)",
        "Public Speaking (RJ/Events)",
        "Scientific Scriptwriting",
        "Research Publishing Outreach",
        "Community Coordinating",
        "Pitch Deck Presenting",
        "Interpersonal Team Leadership"
      ]
    }
  };

  function updateSkillsPanel(category) {
    const data = skillsData[category];
    if (!data) return;

    // Active label status styling
    radarLabels.forEach(lbl => {
      if (lbl.getAttribute('data-axis') === category) {
        lbl.classList.add('active');
      } else {
        lbl.classList.remove('active');
      }
    });

    // Fade animation transition
    const panel = document.getElementById('skills-panel');
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(10px)';
    panel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    setTimeout(() => {
      panelTitle.innerText = data.title;
      panelDesc.innerText = data.desc;
      panelList.innerHTML = '';
      
      data.skills.forEach(skill => {
        const li = document.createElement('li');
        li.innerText = skill;
        panelList.appendChild(li);
      });

      panel.style.opacity = '1';
      panel.style.transform = 'translateY(0)';
    }, 300);
  }

  // Bind clicks to radar labels
  radarLabels.forEach(label => {
    label.addEventListener('click', () => {
      const axis = label.getAttribute('data-axis');
      updateSkillsPanel(axis);
    });
  });

  // Bind clicks to radar points
  radarPoints.forEach(point => {
    point.addEventListener('click', () => {
      const axis = point.getAttribute('data-axis');
      updateSkillsPanel(axis);
    });
  });


  // --- 6. Certificate Gallery Modal Viewer ---
    // Certificate modal logic removed since cards now link directly to PDF files.


  // --- 7. Language Card Progress Bars ---
  const langFills = document.querySelectorAll('.lang-bar-fill');
  
  const langObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        fill.style.width = width;
        langObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  langFills.forEach(fill => langObserver.observe(fill));


  // Contact form submission logic removed as form has been replaced by direct contact list.
});
