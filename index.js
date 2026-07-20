document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Header Scroll Effect
       ========================================================================== */
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       2. Mobile Menu Toggle
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navItems = document.querySelectorAll('.nav-item');
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
        header.classList.toggle('mobile-menu-active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('mobile-open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navMenu.classList.contains('mobile-open')) {
                navMenu.classList.remove('mobile-open');
                header.classList.remove('mobile-menu-active');
                mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    });

    /* ==========================================================================
       3. Active Scroll Navigation Link Highlight
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // offset for sticky header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       4. Testimonials Carousel
       ========================================================================== */
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let currentIndex = 0;
    let autoplayInterval;

    function showTestimonial(index) {
        testimonials.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Wrap around bounds
        if (index >= testimonials.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = testimonials.length - 1;
        } else {
            currentIndex = index;
        }
        
        testimonials[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    // Controls
    prevBtn.addEventListener('click', () => {
        showTestimonial(currentIndex - 1);
        resetAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        showTestimonial(currentIndex + 1);
        resetAutoplay();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            showTestimonial(index);
            resetAutoplay();
        });
    });

    // Autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            showTestimonial(currentIndex + 1);
        }, 6000); // changes every 6s
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    startAutoplay();

    // Pause on hover
    const carouselContainer = document.querySelector('.testimonials-carousel-wrapper');
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    carouselContainer.addEventListener('mouseleave', startAutoplay);

    /* ==========================================================================
       5. Gallery Lightbox
       ========================================================================== */
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-image');
            const imgAlt = item.querySelector('img').getAttribute('alt');
            
            lightboxImg.src = imgSrc;
            lightboxCaption.textContent = imgAlt;
            lightboxModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // prevent page scroll
        });
    });

    function closeLightbox() {
        lightboxModal.classList.remove('show');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.classList.contains('show')) {
            closeLightbox();
        }
    });

    /* ==========================================================================
       6. Contact Info Modal (Popup)
       ========================================================================== */
    const contactModal = document.getElementById('contactModal');
    const openContactBtns = document.querySelectorAll('.open-contact-btn');
    const contactModalClose = document.getElementById('contactModalClose');
    const contactModalOkBtn = document.getElementById('contactModalOkBtn');

    function openContactModal() {
        contactModal.style.display = 'flex';
        // Allow rendering before transition
        setTimeout(() => {
            contactModal.classList.add('show');
        }, 10);
        document.body.style.overflow = 'hidden';
    }

    function closeContactModal() {
        contactModal.classList.remove('show');
        setTimeout(() => {
            contactModal.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    }

    openContactBtns.forEach(btn => {
        btn.addEventListener('click', openContactModal);
    });

    contactModalClose.addEventListener('click', closeContactModal);
    contactModalOkBtn.addEventListener('click', closeContactModal);
    
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });

    /* ==========================================================================
       7. FAQ Accordion (AEO/GEO/SEO)
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');
            
            // Close other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    /* ==========================================================================
       8. Cinematic Animations (GSAP & ScrollTrigger)
       ========================================================================== */
    if (typeof gsap !== 'undefined') {
        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        
        // Initial state for GSAP targets (prevent FOUC)
        gsap.set('.animate-hero-text', { opacity: 0, y: 30 });
        gsap.set('.hero-badge', { opacity: 0, y: 15 });
        
        // Hero Entrance
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });
        
        heroTl.to('.hero-badge', 
            { opacity: 1, y: 0, delay: 0.3 }
        )
        .to('.hero-title',
            { opacity: 1, y: 0 },
            '-=0.9'
        )
        .to('.hero-subtitle',
            { opacity: 1, y: 0 },
            '-=0.9'
        )
        .to('.hero-ctas',
            { opacity: 1, y: 0 },
            '-=0.9'
        );

        // Fade in elements on scroll
        const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
        animateOnScrollElements.forEach(element => {
            gsap.fromTo(element,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Specific section animations
        gsap.fromTo('.about-content',
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 1.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 80%'
                }
            }
        );
        
        gsap.fromTo('.about-gallery',
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 1.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 80%'
                }
            }
        );

        // Whale section image parallax
        gsap.fromTo('.whales-img',
            { scale: 1.15, y: -30 },
            {
                scale: 1,
                y: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.whales-section',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            }
        );
        
        // Rooms section card slide-up
        gsap.fromTo('.room-card',
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.rooms-section',
                    start: 'top 80%'
                }
            }
        );
    }
});
