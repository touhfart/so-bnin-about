/**
 * app.js
 * ----------------
 * هذا الملف يحتوي على كل الأكواد التفاعلية لموقع so bnin.
 * 1. تأثير الشريط العلوي عند التمرير (Header scroll effect).
 * 2. إظهار العناصر عند ظهورها في الشاشة (Reveal on scroll).
 */

document.addEventListener('DOMContentLoaded', () => {

    /**
     * وظيفة للتعامل مع تأثير الشريط العلوي عند التمرير
     */
    const handleHeaderScroll = () => {
        const header = document.getElementById('site-header');
        if (!header) return; // حماية في حال عدم وجود الهيدر

        const scrollThreshold = 50; // المسافة التي يجب تمريرها لتفعيل التأثير (بالبيكسل)

        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    };

    /**
     * وظيفة لإظهار العناصر عند التمرير إليها باستخدام IntersectionObserver
     * هذا الأسلوب أكثر كفاءة من استخدام onscroll
     */
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        if (revealElements.length === 0) return; // حماية في حال عدم وجود عناصر للتحريك

        const observerOptions = {
            root: null, // يراقب التقاطع مع viewport
            rootMargin: '0px',
            threshold: 0.1 // يفعّل عندما يكون 10% من العنصر ظاهرًا
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // إضافة delay إذا كان محددًا في الـ HTML
                    const delay = entry.target.getAttribute('data-delay');
                    if (delay) {
                        entry.target.style.transitionDelay = `${delay}ms`;
                    }

                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // إيقاف المراقبة بعد الإظهار لمرة واحدة
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    };

    // --- تشغيل الوظائف ---
    handleHeaderScroll();
    initScrollReveal();

});