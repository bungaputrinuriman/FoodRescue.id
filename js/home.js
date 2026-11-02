// ============================================
// HOME.JS - COUNTER ANIMATION
// ============================================

function animateCounter(element, target) {
    if (!element) return;
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.floor(target).toLocaleString() + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString() + '+';
        }
    }, 20);
}

document.addEventListener('DOMContentLoaded', () => {
    const mealsRescuedEl = document.getElementById('mealsRescued');
    const activePartnersEl = document.getElementById('activePartners');
    const activeVolunteersEl = document.getElementById('activeVolunteers');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const id = element.id;
                
                if (id === 'mealsRescued') {
                    animateCounter(element, 24450);
                } else if (id === 'activePartners') {
                    animateCounter(element, 320);
                } else if (id === 'activeVolunteers') {
                    animateCounter(element, 1200);
                }
                
                observer.unobserve(element);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (mealsRescuedEl) observer.observe(mealsRescuedEl);
    if (activePartnersEl) observer.observe(activePartnersEl);
    if (activeVolunteersEl) observer.observe(activeVolunteersEl);
});


// ============================================
// LIVE UPDATES SIMULATION
// ============================================

function simulateLiveUpdates() {
    setInterval(() => {
        const activities = [
            'Warung Makan Jogja - 30 porsi diselamatkan',
            'Catering Kantor Jakarta - 75 porsi didistribusi',
            'Hotel Bintang Surabaya - 50 porsi dalam perjalanan',
            'Restoran Padang - 40 porsi diselamatkan',
            'Rumah Makan Solo - 25 porsi didistribusi'
        ];
        const volunteers = ['Rina', 'Andi', 'Citra', 'Dian', 'Budi', 'Siti'];
        const randomAct = activities[Math.floor(Math.random() * activities.length)];
        const randomVol = volunteers[Math.floor(Math.random() * volunteers.length)];
        const list = document.getElementById('activityList');
        
        if (list) {
            const newItem = document.createElement('div');
            newItem.className = 'activity-item';
            newItem.innerHTML = `
                <div class="activity-dot"></div>
                <div class="activity-content">
                    <div class="activity-title">${randomAct}</div>
                    <div class="activity-time">Baru saja • Volunteer: ${randomVol}</div>
                </div>
                <div class="activity-status">Live</div>
            `;
            list.insertBefore(newItem, list.firstChild);
            if (list.children.length > 5) list.removeChild(list.lastChild);
            newItem.style.opacity = '0';
            setTimeout(() => newItem.style.opacity = '1', 10);
        }
    }, 8000);
}

window.addEventListener('load', () => {
    simulateLiveUpdates();
});


// ============================================
// FAQ ACCORDION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });
});


// ============================================
// PROBLEM CARDS ANIMATION
// ============================================

const problemCards = document.querySelectorAll('.problem-card');
problemCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
        const image = card.querySelector('.problem-image');
        if (image) {
            image.style.transform = 'scale(1.02)';
            image.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const image = card.querySelector('.problem-image');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});


// ============================================
// STAT CARDS SCROLL ANIMATION
// ============================================

const statCards = document.querySelectorAll('.stat-big-card');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

statCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    statObserver.observe(card);
});


// ============================================
// BENEFIT CARDS HOVER EFFECT
// ============================================

const benefitCards = document.querySelectorAll('.benefit-card');
benefitCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.benefit-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.benefit-icon');
        if (icon) {
            icon.style.transform = 'scale(1)';
        }
    });
});


// ============================================
// REDIRECT BUTTONS WITH HASH
// ============================================

const rescueBtn = document.getElementById('rescueFoodBtn');
if (rescueBtn) {
    rescueBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'mitra.html#donationFormSection';
    });
}

const joinBtn = document.getElementById('joinVolunteerBtn');
if (joinBtn) {
    joinBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'get-involved.html#roleFormSection';
    });
}

// ============================================
// VIDEO CONTROL MUTE/UNMUTE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.hero-video');
    const videoControl = document.getElementById('videoControl');
    
    if (videoControl && video) {
        videoControl.addEventListener('click', function() {
            if (video.muted) {
                video.muted = false;
                videoControl.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                video.muted = true;
                videoControl.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
    }
});