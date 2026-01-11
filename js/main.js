
document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Theme Toggle Logic ---
    // Inject Toggle Button
    const themeBtn = document.createElement('div');
    themeBtn.className = 'theme-toggle';
    themeBtn.title = "Switch Theme";
    themeBtn.innerHTML = `
        <svg class="theme-icon" viewBox="0 0 24 24">
            <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
        </svg>
    `;
    document.body.appendChild(themeBtn);

    // Check Local Storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeBtn.innerHTML = `<svg class="theme-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
    }

    // Toggle Event
    themeBtn.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeBtn.innerHTML = `
                <svg class="theme-icon" viewBox="0 0 24 24">
                    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
                </svg>
            `;
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeBtn.innerHTML = `<svg class="theme-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
        }
    });


    // --- 1. Reveal Animations (Scroll Observer) ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-text, .fade-up');
    revealElements.forEach(el => revealObserver.observe(el));

    // --- 2. Parallax Effect (Enhanced) ---
    const parallaxBgs = document.querySelectorAll('.hero-bg');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxBgs.forEach(bg => {
            const speed = 0.4;
            // Simple translation
            bg.style.transform = `translateY(${scrolled * speed}px) scale(1.1)`;
        });
    });

    // --- 3. Navbar Scroll Effect ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- 4. Mobile Menu ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            toggleMenu();
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
    }

    function toggleMenu() {
        mobileNav.classList.toggle('active');
        body.classList.toggle('menu-open');
        if (body.classList.contains('menu-open')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }

    function closeMenu() {
        mobileNav.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
    }

    // --- 5. Lightbox Logic ---
    // Create Lightbox DOM
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-close">&times;</div>
        <div class="lightbox-nav lightbox-prev">&#10094;</div>
        <div class="lightbox-nav lightbox-next">&#10095;</div>
        <div class="lightbox-content">
            <img src="" class="lightbox-img">
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentImages = [];
    let currentIndex = 0;

    // Attach Click Events to Property Cards
    document.querySelectorAll('.property-card[data-images]').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const images = card.getAttribute('data-images').split(',');
            if (images.length > 0) {
                currentImages = images;
                currentIndex = 0;
                showImage(currentIndex);
                lightbox.classList.add('active');
                body.style.overflow = 'hidden';
            }
        });
    });

    function showImage(index) {
        if (index < 0) index = currentImages.length - 1;
        if (index >= currentImages.length) index = 0;
        currentIndex = index;
        lightboxImg.src = currentImages[currentIndex].trim();
    }

    // Lightbox Controls
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            body.style.overflow = '';
        }
    });

    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex - 1); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex + 1); });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') { lightbox.classList.remove('active'); body.style.overflow = ''; }
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });

    // --- 6. Form Animation (Mock) ---
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'SENDING...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                btn.innerText = 'MESSAGE SENT';
                btn.style.background = 'var(--color-text-primary)';
                btn.style.color = 'var(--color-bg)';
                btn.style.borderColor = 'var(--color-text-primary)';
                form.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.style.borderColor = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    });

});
