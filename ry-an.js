 // Generate floating particles
        function createParticles() {
            const particles = document.querySelector('.particles');
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                particles.appendChild(particle);
            }
        }

        // Smooth scrolling for navigation links
        function initSmoothScrolling() {
            document.querySelectorAll('.nav-link, .cta-button').forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                });
            });
        }

        // Animate elements on scroll
        function animateOnScroll() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = entry.target.dataset.animation || 'fadeInUp 0.8s ease-out forwards';
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.project-card, .skill-item').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.dataset.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.observe(el);
            });
        }

        // Add fadeInUp animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);

        // Parallax effect for hero section
        function initParallax() {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            });
        }

        // Dynamic typing effect for hero title
        function typeWriter() {
            const title = document.querySelector('.hero-title');
            const originalText = title.textContent;
            title.textContent = '';
            
            let i = 0;
            const timer = setInterval(() => {
                if (i < originalText.length) {
                    title.textContent += originalText.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 100);
        }

        // Contact form submission
        function initContactForm() {
            const form = document.querySelector('.contact-form');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const button = form.querySelector('.submit-button');
                const originalText = button.textContent;
                
                button.textContent = 'Sending... ⏳';
                button.disabled = true;
                
                setTimeout(() => {
                    button.textContent = 'Message Sent! ✅';
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                        form.reset();
                    }, 2000);
                }, 1500);
            });
        }

        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            initSmoothScrolling();
            animateOnScroll();
            initParallax();
            initContactForm();
            
            // Delay the typing effect slightly
            setTimeout(typeWriter, 1000);
        });

        // Add some interactive hover effects to project cards
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-10px) scale(1.02) rotateX(5deg)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
                });
            });
        });

        // Easter egg: Konami code
        let konamiCode = [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
                document.body.style.animation = 'rainbow 2s infinite';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 10000);
            }
        });

        // Add rainbow animation for easter egg
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);