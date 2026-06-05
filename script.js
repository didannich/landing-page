// ============================================================
//  1. PARTICLES (Canvas)
// ============================================================
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w;
    let h;
    const particles = [];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    const count = prefersReducedMotion ? 30 : 100;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            r: Math.random() * 2 + 0.5,
            alpha: Math.random() * 0.5 + 0.1,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);

        for (const p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(148,163,184,${p.alpha})`;
            ctx.fill();
        }

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 140) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(148,163,184,${(1 - dist / 140) * 0.15})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
    }

    function update() {
        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;
        }
    }

    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }

    loop();
})();

// ============================================================
//  2. NAVBAR SCROLL
// ============================================================
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
}

// ============================================================
//  3. HAMBURGER MENU
// ============================================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Buka menu navigasi');
        });
    });
}

// ============================================================
//  4. SCROLL REVEAL (Intersection Observer)
// ============================================================
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el) => observer.observe(el));

// ============================================================
//  5. COUNTER ANIMATION
// ============================================================
const statNumbers = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = 'true';
            const target = parseInt(entry.target.dataset.target, 10);
            let current = 0;
            const step = Math.ceil(target / 60);
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                entry.target.textContent = current + (target === 98 ? '%' : '');
            }, 25);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach((el) => counterObserver.observe(el));

// ============================================================
//  6. CTA FORM
// ============================================================
const ctaForm = document.getElementById('ctaForm');
if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = ctaForm.querySelector('input');
        const btn = ctaForm.querySelector('button');
        if (!input || !btn) return;

        const email = input.value.trim();
        if (!email || !input.checkValidity()) return;

        btn.textContent = '✅ Terkirim!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        input.value = '';

        setTimeout(() => {
            btn.textContent = 'Kirim';
            btn.style.background = '';
        }, 3000);
    });
}

// ============================================================
//  7. CURSOR GLOW (Hero Interaction)
// ============================================================
const orb = document.querySelector('.hero-orb');
const heroVisual = document.querySelector('.hero-visual');

if (orb && heroVisual) {
    heroVisual.addEventListener('mousemove', (e) => {
        const rect = orb.getBoundingClientRect();
        const x = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 20;
        const y = ((e.clientY - rect.top - rect.height / 2) / rect.height) * 20;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });

    heroVisual.addEventListener('mouseleave', () => {
        orb.style.transform = '';
    });
}

console.log('🚀 Horizon Landing Page — siap meluncur!');
