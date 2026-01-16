
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
    // Append to Nav (Desktop)
    const navLinks = document.querySelector('.nav-links');
    const navItemDeskop = document.createElement('li');
    navItemDeskop.appendChild(themeBtn);
    if (navLinks) navLinks.appendChild(navItemDeskop);

    // Append to Mobile Nav
    const mobileNavLinks = document.querySelector('.mobile-nav-links');
    const navItemMobile = document.createElement('li');
    // Clone the button for mobile
    const themeBtnMobile = themeBtn.cloneNode(true);

    // Add event listener to clone (since cloning doesn't copy listeners)
    themeBtnMobile.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeBtn.innerHTML = '<i class="fa-regular fa-moon"></i>';
            themeBtnMobile.innerHTML = '<i class="fa-regular fa-moon"></i>';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeBtn.innerHTML = '<i class="fa-regular fa-sun"></i>';
            themeBtnMobile.innerHTML = '<i class="fa-regular fa-sun"></i>';
        }
    });

    navItemMobile.appendChild(themeBtnMobile);
    if (mobileNavLinks) mobileNavLinks.appendChild(navItemMobile);

    // Initial Icon State
    const updateIcons = () => {
        const icon = document.body.getAttribute('data-theme') === 'dark'
            ? '<i class="fa-regular fa-sun"></i>'
            : '<i class="fa-regular fa-moon"></i>';

        themeBtn.innerHTML = icon;
        themeBtnMobile.innerHTML = icon;
    };
    updateIcons();

    // Check Local Storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }
    updateIcons(); // Update icons based on saved theme

    // Toggle Event for Desktop
    themeBtn.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
        updateIcons();
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

});
