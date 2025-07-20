// script.js
// Efek animasi sistem tata surya (matahari dan planet-planet) yang bergerak

document.addEventListener('DOMContentLoaded', function() {
    // Solar system animation
    const solar = document.createElement('canvas');
    solar.className = 'solar-canvas';
    solar.style.position = 'fixed';
    solar.style.top = 0;
    solar.style.left = 0;
    solar.style.width = '100vw';
    solar.style.height = '100vh';
    solar.style.zIndex = 0;
    solar.style.pointerEvents = 'none';
    document.body.appendChild(solar);
    let w = window.innerWidth;
    let h = window.innerHeight;
    solar.width = w;
    solar.height = h;
    const ctx = solar.getContext('2d');
    // Matahari dan planet
    const planets = [
        { r: 0, size: 38, color: '#ffe066', name: 'Sun', speed: 0 },
        { r: 60, size: 7, color: '#b1b1b1', name: 'Mercury', speed: 0.035 },
        { r: 90, size: 10, color: '#e6c07b', name: 'Venus', speed: 0.027 },
        { r: 120, size: 11, color: '#6ec6ff', name: 'Earth', speed: 0.022 },
        { r: 150, size: 8, color: '#ff6e6e', name: 'Mars', speed: 0.018 },
        { r: 200, size: 22, color: '#ffe066', name: 'Jupiter', speed: 0.013 },
        { r: 250, size: 18, color: '#b6e3ff', name: 'Saturn', speed: 0.009 },
        { r: 300, size: 14, color: '#7ee7ff', name: 'Uranus', speed: 0.006 },
        { r: 340, size: 13, color: '#7b9fff', name: 'Neptune', speed: 0.004 }
    ];
    let t = 0;
    function drawSolar() {
        ctx.clearRect(0, 0, w, h);
        // Center
        const cx = w/2, cy = h/2;
        // Orbits
        ctx.save();
        ctx.globalAlpha = 0.18;
        for (let i=1; i<planets.length; i++) {
            ctx.beginPath();
            ctx.arc(cx, cy, planets[i].r, 0, 2*Math.PI);
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1.2;
            ctx.setLineDash([4, 8]);
            ctx.stroke();
        }
        ctx.setLineDash([]);
        ctx.restore();
        // Matahari
        ctx.save();
        ctx.shadowColor = '#ffe066';
        ctx.shadowBlur = 60;
        ctx.beginPath();
        ctx.arc(cx, cy, planets[0].size, 0, 2*Math.PI);
        ctx.fillStyle = planets[0].color;
        ctx.fill();
        ctx.restore();
        // Planet
        for (let i=1; i<planets.length; i++) {
            const angle = t * planets[i].speed + i;
            const px = cx + Math.cos(angle) * planets[i].r;
            const py = cy + Math.sin(angle) * planets[i].r;
            ctx.save();
            ctx.shadowColor = planets[i].color;
            ctx.shadowBlur = 18;
            ctx.beginPath();
            ctx.arc(px, py, planets[i].size, 0, 2*Math.PI);
            ctx.fillStyle = planets[i].color;
            ctx.globalAlpha = 0.95;
            ctx.fill();
            ctx.restore();
        }
    }
    function animateSolar() {
        t += 0.8;
        drawSolar();
        requestAnimationFrame(animateSolar);
    }
    animateSolar();
    window.addEventListener('resize', () => {
        w = window.innerWidth;
        h = window.innerHeight;
        solar.width = w;
        solar.height = h;
    });
    // Welcome overlay logic
    const btnLanjut = document.getElementById('btnLanjut');
    const btnBack = document.getElementById('btnBack');
    function showMainAnimated() {
        const mainEls = [
            document.getElementById('main-content'),
            document.getElementById('main-content-main'),
            document.getElementById('main-content-footer')
        ];
        for (const el of mainEls) {
            if (el) {
                el.style.display = '';
                el.classList.remove('in-frame');
                setTimeout(() => el.classList.add('in-frame'), 50);
            }
        }
        if(btnBack) btnBack.style.display = '';
    }
    if (btnLanjut) {
        btnLanjut.addEventListener('click', function() {
            document.getElementById('welcome-overlay').style.opacity = 0;
            setTimeout(() => {
                document.getElementById('welcome-overlay').setAttribute('hidden', '');
                showMainAnimated();
            }, 500);
        });
    }
    if (btnBack) {
        btnBack.addEventListener('click', function() {
            document.getElementById('welcome-overlay').removeAttribute('hidden');
            document.getElementById('welcome-overlay').style.opacity = 1;
            const mainEls = [
                document.getElementById('main-content'),
                document.getElementById('main-content-main'),
                document.getElementById('main-content-footer')
            ];
            for (const el of mainEls) {
                if (el) {
                    el.classList.remove('in-frame');
                    setTimeout(() => el.style.display = 'none', 400);
                }
            }
            btnBack.style.display = 'none';
        });
    }
});

// Efek bintang bergerak di background (tema alam semesta)
// ...existing code...

// Efek animasi klik pada kartu/tombol project
window.animateClick = function(el) {
    el.classList.add('clicked-effect');
    setTimeout(() => el.classList.remove('clicked-effect'), 300);
};

// Particle effect saat klik kiri mouse
window.addEventListener('click', function(e) {
    for (let i = 0; i < 18; i++) {
        createParticle(e.clientX, e.clientY);
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'click-particle';
    const size = Math.random() * 8 + 6;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = (x - size/2) + 'px';
    particle.style.top = (y - size/2) + 'px';
    const colors = ['#fff700', '#fff', '#ffe066', '#ffd700'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.position = 'fixed';
    particle.style.pointerEvents = 'none';
    particle.style.borderRadius = '50%';
    particle.style.zIndex = 9999;
    particle.style.opacity = 0.85;
    document.body.appendChild(particle);
    // Animasi arah acak
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 60 + 30;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    particle.animate([
        { transform: 'translate(0,0) scale(1)', opacity: 0.85 },
        { transform: `translate(${dx}px,${dy}px) scale(0.2)`, opacity: 0 }
    ], {
        duration: 700 + Math.random()*300,
        easing: 'cubic-bezier(.61,-0.01,.7,.99)'
    });
    setTimeout(() => particle.remove(), 900);
}

// Hapus fitur kirim email (EmailJS) pada form kontak

// Animasi fade-in saat elemen portofolio masuk ke viewport
function animateOnScroll() {
    const revealEls = document.querySelectorAll('.reveal-on-scroll');
    const windowHeight = window.innerHeight;
    for (const el of revealEls) {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight - 60 && rect.bottom > 40) {
            el.classList.add('in-frame');
        } else {
            el.classList.remove('in-frame');
        }
    }
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('resize', animateOnScroll);
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateOnScroll, 400);
});
