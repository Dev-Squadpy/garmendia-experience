/* ═══════════════════════════════════════════════════════════
   main.js — The Garmendia Experience 2026
   GSAP + ScrollTrigger (no Draggable needed for grid disco)
   ═══════════════════════════════════════════════════════════ */
gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────────────────────────
   1. HERO — Mouse Parallax on Floating Icons
   ─────────────────────────────────────────── */
const floatingIcons = document.querySelectorAll('.fi');
document.addEventListener('mousemove', (e) => {
    const cx = (e.clientX / window.innerWidth  - 0.5);
    const cy = (e.clientY / window.innerHeight - 0.5);
    floatingIcons.forEach((icon, i) => {
        const depth = (i + 1) * 14;
        gsap.to(icon, { x: cx * depth, y: cy * depth, duration: 1.2, ease: 'power2.out' });
    });
});

/* ───────────────────────────────────────────
   2. HERO — PINNED. Page doesn't scroll until
   the full signature animation completes.
   ─────────────────────────────────────────── */
const heroTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        // End after a shorter reveal now that the drawn signature is gone.
        end: '+=1400',
        scrub: 1,
        pin: true,
        anticipatePin: 1
    }
});

heroTl
    // Phase 1: Zoom the photo out (0 → 0.4)
    .to('#heroImg', { scale: 0.35, duration: 1 })
    // Phase 2: Reveal the name only.
    .to('#sigOverlay', { opacity: 1, duration: 0.25 }, '-=0.25')
    // Phase 3: Hold for a beat before releasing.
    .to('#sigName', { opacity: 1, duration: 0.45 }, '-=0.1')
    .to({}, { duration: 0.25 });

/* ───────────────────────────────────────────
   3. ABOUT — Text slide + Photo mask reveal
   ─────────────────────────────────────────── */
gsap.from('.about-text', {
    scrollTrigger: { trigger: '.about', start: 'top 75%' },
    x: -70, opacity: 0,
    duration: 1.1, ease: 'power3.out'
});

gsap.to('.photo-mask img', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 70%',
        end: 'center center',
        scrub: true
    },
    clipPath: 'inset(0 0% 0 0)',
    ease: 'none'
});

gsap.to('.gato1', {
    scrollTrigger: { trigger: '.about', start: 'top 55%' },
    opacity: 1, y: -10,
    duration: .8, delay: .5, ease: 'back.out(2)'
});

/* ───────────────────────────────────────────
   4. TIMELINE — Horizontal Scroll Lock
   Vertical scroll → horizontal movement.
   Pin releases only at the last hito.
   ─────────────────────────────────────────── */
const tlSection = document.querySelector('.tl-section');
const tlTrack   = document.querySelector('.tl-track');

if (tlSection && tlTrack && window.innerWidth > 768) {
    const getDistance = () => tlTrack.scrollWidth - window.innerWidth;

    gsap.to(tlTrack, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
            trigger: tlSection,
            start: 'top top',
            end: () => '+=' + getDistance(),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });
}

/* ───────────────────────────────────────────
   5. DISCOGRAPHY — Staggered reveal
   ─────────────────────────────────────────── */
const timelineImages = document.querySelectorAll('.tl-media img');
if (timelineImages.length) {
    const preview = document.createElement('div');
    preview.className = 'tl-image-preview';
    preview.innerHTML = '<img alt="">';
    document.body.appendChild(preview);

    const previewImg = preview.querySelector('img');
    timelineImages.forEach((img) => {
        img.addEventListener('mouseenter', () => {
            previewImg.src = img.currentSrc || img.src;
            previewImg.alt = img.alt || '';
            preview.classList.add('is-visible');
        });

        img.addEventListener('mouseleave', () => {
            preview.classList.remove('is-visible');
        });
    });
}

gsap.from('.disco-card', {
    scrollTrigger: { trigger: '.discography', start: 'top 75%' },
    y: 50, opacity: 0,
    stagger: .12,
    duration: .9,
    ease: 'power3.out'
});

gsap.from('.disco-vinyl', {
    scrollTrigger: { trigger: '.discography', start: 'top 70%' },
    scale: .7, opacity: 0,
    duration: 1.2,
    ease: 'back.out(1.5)',
    delay: .3
});

/* ───────────────────────────────────────────
   6. GALLERY — Fan card expansion
   ─────────────────────────────────────────── */
const fanCards = document.querySelectorAll('.fan-card');
fanCards.forEach((card, i) => {
    const offset = i - 3;
    gsap.set(card, { rotation: offset * 7, zIndex: 10 - Math.abs(offset) });
});

gsap.from(fanCards, {
    scrollTrigger: { trigger: '.gallery', start: 'top 72%' },
    x: (i) => (i - 3) * 100,
    opacity: 0,
    rotation: (i) => (i - 3) * 18,
    stagger: .08,
    duration: 1,
    ease: 'back.out(1.2)'
});

/* ───────────────────────────────────────────
   7. CONTACT — Gato2 follows cursor
   ─────────────────────────────────────────── */
const gato2 = document.querySelector('#gato2');
document.addEventListener('mousemove', (e) => {
    if (!gato2) return;
    const rect = gato2.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    gsap.to(gato2, {
        rotation: Math.atan2(dy, dx) * (180 / Math.PI) * 0.06,
        x: dx * 0.03, y: dy * 0.03,
        duration: .5, ease: 'power2.out'
    });
});

/* ───────────────────────────────────────────
   8. FOOTER — Headline + Helmet reveal
   ─────────────────────────────────────────── */
gsap.from('.footer-headline', {
    scrollTrigger: { trigger: '.footer', start: 'top 80%' },
    y: 50, opacity: 0,
    duration: 1.1, ease: 'power3.out'
});

gsap.from('.footer-helmet', {
    scrollTrigger: { trigger: '.footer', start: 'top 70%' },
    scale: .8, opacity: 0,
    duration: 1.3, ease: 'power3.out', delay: .2
});

/* ───────────────────────────────────────────
   9. NAVBAR — Auto-hide on scroll down
   ─────────────────────────────────────────── */
ScrollTrigger.create({
    start: 'top -120',
    onUpdate(self) {
        gsap.to('.navbar', {
            y: self.direction === 1 ? -100 : 0,
            duration: .35, ease: 'power2.out'
        });
    }
});
