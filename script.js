// =====================================================
// MODERN PORTFOLIO - INTERACTIVE JAVASCRIPT
// =====================================================

// Menu toggle function
function toggleMenu() {
    const navUl = document.querySelector('nav ul');
    navUl.classList.toggle('show');
}

// Function to set active button state
function setActiveButton(lang) {
    const allButtons = document.querySelectorAll('.language-selector .lang-btn');
    allButtons.forEach(function(btn) {
        btn.classList.remove('active');
    });

    allButtons.forEach(function(btn) {
        const buttonText = btn.textContent.trim();
        if ((buttonText === 'English' && lang === 'en') ||
            (buttonText === 'Tiếng Việt' && lang === 'vi')) {
            btn.classList.add('active');
        }
    });
}

// Language switcher
function changeLanguage(lang) {
    localStorage.setItem('preferredLang', lang);

    document.querySelectorAll('[data-en], [data-vi]').forEach(function(el) {
        if (lang === 'vi' && el.getAttribute('data-vi')) {
            el.textContent = el.getAttribute('data-vi');
        } else if (lang === 'en' && el.getAttribute('data-en')) {
            el.textContent = el.getAttribute('data-en');
        }
    });

    setTimeout(function() {
        setActiveButton(lang);
    }, 100);
}

// Show language modal if no language is set
function showLangModalIfNeeded() {
    var modal = document.getElementById('langModal');
    if (!localStorage.getItem('preferredLang')) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function chooseLangFromModal(lang) {
    localStorage.setItem('preferredLang', lang);
    document.getElementById('langModal').style.display = 'none';
    document.body.style.overflow = '';
    changeLanguage(lang);
}

// Smooth scroll to the top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =====================================================
// PARTICLE SYSTEM
// =====================================================
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);

    const colors = [
        'rgba(102, 126, 234, 0.6)',
        'rgba(118, 75, 162, 0.6)',
        'rgba(79, 172, 254, 0.6)',
        'rgba(240, 147, 251, 0.4)'
    ];

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 20 + 15;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${left}%;
            top: 100%;
            animation: particleFloat ${duration}s ${delay}s infinite ease-in-out;
            filter: blur(1px);
        `;

        particleContainer.appendChild(particle);
    }

    // Add keyframes for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// =====================================================
// SCROLL ANIMATIONS
// =====================================================
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// =====================================================
// SMOOTH NAV LINK ANIMATIONS
// =====================================================
function initNavAnimations() {
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu after click
            const navUl = document.querySelector('nav ul');
            if (navUl.classList.contains('show')) {
                navUl.classList.remove('show');
            }
        });

        // Add ripple effect on click
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// =====================================================
// CURSOR GLOW EFFECT
// =====================================================
function initCursorGlow() {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

// =====================================================
// TYPING EFFECT FOR TITLE (Optional)
// =====================================================
function initTypingEffect() {
    const title = document.querySelector('header h1');
    if (!title) return;

    const text = title.textContent;
    title.textContent = '';
    title.style.borderRight = '3px solid var(--primary-color)';

    let i = 0;
    function type() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        } else {
            title.style.borderRight = 'none';
        }
    }

    setTimeout(type, 500);
}

// =====================================================
// MAGNETIC BUTTONS
// =====================================================
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.lang-btn, #backToMenu');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// =====================================================
// PARALLAX EFFECT FOR SECTIONS
// =====================================================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const sections = document.querySelectorAll('section');

        sections.forEach((section, index) => {
            const speed = 0.02;
            const yPos = -(scrolled * speed * (index % 3 + 1));
            section.style.backgroundPosition = `center ${yPos}px`;
        });
    });
}

// =====================================================
// MAIN INITIALIZATION
// =====================================================
document.addEventListener("DOMContentLoaded", function() {
    // Language setup
    var lang = localStorage.getItem('preferredLang');
    if (lang) {
        changeLanguage(lang);
        setTimeout(function() {
            setActiveButton(lang);
        }, 200);
    } else {
        showLangModalIfNeeded();
    }

    // Back to top button functionality
    const backToTopButton = document.getElementById("backToMenu");

    if (backToTopButton) {
        backToTopButton.addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Initialize all effects
    createParticles();
    initScrollAnimations();
    initNavAnimations();
    initCursorGlow();
    initMagneticButtons();

    // Add smooth reveal for header
    const header = document.querySelector('header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            header.style.transition = 'all 1s ease-out';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);
    }

    // Add stagger animation to contact info items
    const contactItems = document.querySelectorAll('.contact-info p');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 800 + (index * 100));
    });
});

// Scroll event listener for back to menu button
window.addEventListener("scroll", function() {
    const button = document.getElementById("backToMenu");
    if (!button) return;

    if (window.scrollY > 300) {
        button.style.display = "block";
        button.style.opacity = '1';
    } else {
        button.style.opacity = '0';
        setTimeout(() => {
            if (window.scrollY <= 300) {
                button.style.display = "none";
            }
        }, 300);
    }
});

// =====================================================
// SMOOTH SECTION TRANSITIONS ON SCROLL
// =====================================================
let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            // Add navbar background on scroll
            const nav = document.querySelector('nav');
            if (nav) {
                if (window.scrollY > 50) {
                    nav.style.background = 'rgba(10, 10, 30, 0.95)';
                    nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                } else {
                    nav.style.background = 'rgba(10, 10, 30, 0.9)';
                    nav.style.boxShadow = 'none';
                }
            }
            ticking = false;
        });
        ticking = true;
    }
});
