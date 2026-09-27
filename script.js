/* ==========================================
   NGUYEN THIEN THANH - PORTFOLIO SCRIPTS
   Smooth Animations & Interactions
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavbar();
    initTypingEffect();
    initRevealAnimations();
    initSkillBars();
    initCounterAnimation();
    initSmoothScroll();
    initContactForm();
    initParallax();
});

/* ==========================================
   NAVBAR
   ========================================== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active link based on scroll position
        updateActiveLink();
    });

    // Mobile menu toggle
    const toggleMenu = () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    };

    navToggle.addEventListener('click', toggleMenu);
    navToggle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMenu();
        }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
}

/* ==========================================
   TYPING EFFECT
   ========================================== */
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    const phrases = [
        'Generative AI Builder',
        'RAG Systems Engineer',
        'Computer Vision Researcher',
        'Reinforcement Learning Practitioner'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing new phrase
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ==========================================
   REVEAL ANIMATIONS
   ========================================== */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-image, .reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Trigger hero animations immediately
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal-text, .hero .reveal-image').forEach(el => {
            el.classList.add('revealed');
        });
    }, 300);
}

/* ==========================================
   SKILL BARS ANIMATION
   ========================================== */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.dataset.progress;
                entry.target.style.width = `${progress}%`;
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

/* ==========================================
   COUNTER ANIMATION
   ========================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = Number(entry.target.dataset.target);
                const decimals = Number(entry.target.dataset.decimals || 0);
                animateCounter(entry.target, target, decimals);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    function animateCounter(element, target, decimals) {
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toFixed(decimals);
                clearInterval(timer);
            } else {
                element.textContent = current.toFixed(decimals);
            }
        }, stepTime);
    }
}

/* ==========================================
   SMOOTH SCROLL
   ========================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==========================================
   CONTACT FORM
   ========================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Show success message (you can replace this with actual form submission)
            const button = form.querySelector('.btn-submit');
            const originalText = button.innerHTML;

            button.innerHTML = `
                <span>Đã gửi thành công!</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            `;
            button.style.background = 'linear-gradient(135deg, #059669, #10b981)';

            // Reset after 3 seconds
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                form.reset();
            }, 3000);

            // Log form data (replace with actual API call)
            console.log('Form submitted:', data);
        });

        // Add focus animations to form inputs
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

/* ==========================================
   PARALLAX EFFECT
   ========================================== */
function initParallax() {
    const auras = document.querySelectorAll('.aura');

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        auras.forEach((aura, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            aura.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Parallax scroll effect for sections
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax for hero image
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }

        // Parallax for floating badges
        const badges = document.querySelectorAll('.badge');
        badges.forEach((badge, index) => {
            const speed = 0.05 * (index + 1);
            badge.style.transform = `translateY(${Math.sin(scrolled * 0.01 + index) * 10}px)`;
        });
    });
}

/* ==========================================
   ADDITIONAL EFFECTS
   ========================================== */

// Add magnetic effect to buttons
document.querySelectorAll('.btn, .project-link, .social-link').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add tilt effect to project cards
document.querySelectorAll('.project-card, .about-card, .skill-item').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Console welcome message
console.log('%c👋 Xin chào!', 'font-size: 24px; font-weight: bold; color: #10b981;');
console.log('%cBạn đang tìm hiểu về code của tôi? Hãy liên hệ nếu muốn hợp tác!', 'font-size: 14px; color: #a1a1aa;');
