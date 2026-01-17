
document.addEventListener('DOMContentLoaded', () => {

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

    // --- 2. Hero Animations & Parallax ---
    const heroBgs = document.querySelectorAll('.hero-bg');

    // Trigger initial zoom-out effect
    setTimeout(() => {
        heroBgs.forEach(bg => bg.classList.add('visible'));
    }, 100);

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroBgs.forEach(bg => {
            const rect = bg.parentElement.getBoundingClientRect();
            // Only animate if the hero is in/near the viewport
            if (rect.bottom > 0) {
                const speed = 0.4;
                // We add a subtle scale during parallax to prevent edges from showing
                bg.style.transform = `translateY(${scrolled * speed}px) scale(1.1)`;
            }
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

    // --- 7. Tab Switching Logic ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked
                btn.classList.add('active');
                const tabId = btn.getAttribute('data-tab');
                const targetContent = document.getElementById(tabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    // --- 8. Property Popup Modal ---
    const propertyModal = document.getElementById('propertyModal');
    if (propertyModal) {
        const modalOverlay = document.getElementById('modalOverlay');
        const modalClose = document.getElementById('modalClose');
        const modalImg = document.getElementById('modalImg');
        const modalTitle = document.getElementById('modalTitle');
        const modalPrice = document.getElementById('modalPrice');
        const modalDescription = document.getElementById('modalDescription');

        // Open Modal
        document.querySelectorAll('.property-card[data-title]').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();

                const title = card.getAttribute('data-title');
                const price = card.getAttribute('data-price');
                const image = card.getAttribute('data-image');
                const description = card.getAttribute('data-description');

                modalTitle.textContent = title;
                modalPrice.textContent = price;
                modalImg.src = image;
                modalDescription.textContent = description;

                propertyModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        // Close functions
        const closeModal = () => {
            propertyModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && propertyModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

});
