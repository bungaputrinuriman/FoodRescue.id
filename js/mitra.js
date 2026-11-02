// ============================================
// AOS INITIALIZATION
// ============================================

AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});


// ============================================
// COUNTER ANIMATION 
// ============================================

const animateNumber = (element, targetNumber, suffix = '', isDecimal = false) => {
    let current = 0;
    const increment = targetNumber / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
            if (isDecimal) {
                element.innerText = targetNumber.toLocaleString('id-ID') + suffix;
            } else {
                element.innerText = Math.floor(targetNumber).toLocaleString('id-ID') + suffix;
            }
            clearInterval(timer);
        } else {
            if (isDecimal) {
                element.innerText = current.toFixed(1).toLocaleString('id-ID') + suffix;
            } else {
                element.innerText = Math.floor(current).toLocaleString('id-ID') + suffix;
            }
        }
    }, 25);
};

// ============================================
// COUNTER ANIMATION 
// ============================================

const animateStatItems = () => {
    const mitraElement = document.querySelector('.stat-item:first-child h4');
    if (mitraElement && mitraElement.innerText.includes('320+')) {
        animateNumber(mitraElement, 320, '+');
    }
    
    const porsiElement = document.querySelector('.stat-item:nth-child(2) h4');
    if (porsiElement) {
        const porsiValue = 12450;
        animateNumber(porsiElement, porsiValue, '+');
    }
    
    const titikElement = document.querySelector('.stat-item:nth-child(3) h4');
    if (titikElement && titikElement.innerText.includes('45+')) {
        animateNumber(titikElement, 45, '+');
    }
    
    const wasteElement = document.querySelector('.stat-item:nth-child(4) h4');
    if (wasteElement) {
        animateNumber(wasteElement, 12, ' Ton+');
    }
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStatItems();
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ============================================
// IMAGE UPLOAD FUNCTION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const foodImage = document.getElementById('foodImage');
    const previewContainer = document.getElementById('previewImage');
    const preview = document.getElementById('preview');
    const removeBtn = document.getElementById('removeImage');
    
    if (uploadArea) {
        uploadArea.onclick = () => foodImage?.click();
    }
    
    if (foodImage) {
        foodImage.onchange = function(e) {
            const file = e.target.files?.[0];
            if (!file) return;
            
            if (file.size > 5 * 1024 * 1024) {
                alert('Ukuran file terlalu besar! Maksimal 5MB.');
                return;
            }
            
            if (!file.type.match('image.*')) {
                alert('Hanya file gambar yang diperbolehkan!');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(ev) {
                if (preview) preview.src = ev.target.result;
                if (previewContainer) previewContainer.style.display = 'inline-block';
                if (uploadArea) uploadArea.style.display = 'none';
            };
            reader.readAsDataURL(file);
        };
    }
    
    if (removeBtn) {
        removeBtn.onclick = function() {
            if (previewContainer) previewContainer.style.display = 'none';
            if (uploadArea) uploadArea.style.display = 'block';
            if (foodImage) foodImage.value = '';
            if (preview) preview.src = '#';
        };
    }
});


// ============================================
// MODAL FEEDBACK
// ============================================

function showSuccessModal(whatsappNumber) {
    const modal = document.getElementById('successModal');
    const whatsappSpan = document.getElementById('modalWhatsappNumber');
    
    if (whatsappSpan) {
        whatsappSpan.innerText = whatsappNumber;
    }
    
    if (modal) {
        modal.classList.add('active');
        modal.style.display = 'flex';
        
        modal.onclick = function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                modal.style.display = 'none';
            }
        };
        
        const closeBtn = document.getElementById('closeModalBtn');
        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.classList.remove('active');
                modal.style.display = 'none';
            };
        }
    }
}

// ============================================
// DONATION FORM SUBMIT
// ============================================

function resetUploadForm() {
    const previewContainer = document.getElementById('previewImage');
    const uploadArea = document.getElementById('uploadArea');
    const preview = document.getElementById('preview');
    const foodImage = document.getElementById('foodImage');
    
    if (previewContainer) previewContainer.style.display = 'none';
    if (uploadArea) uploadArea.style.display = 'block';
    if (preview) preview.src = '#';
    if (foodImage) foodImage.value = '';
}

const donationForm = document.getElementById('donationForm');

if (donationForm) {
    donationForm.onsubmit = function(e) {
        e.preventDefault();
        
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        const whatsappInput = document.getElementById('whatsapp');
        const businessName = document.getElementById('businessName');
        
        if (!businessName?.value) {
            alert('Mohon isi nama bisnis / restoran!');
            return;
        }
        
        const whatsappValue = whatsappInput?.value;
        if (!whatsappValue || whatsappValue.length < 10) {
            alert('Mohon masukkan nomor WhatsApp yang valid untuk konfirmasi.');
            return;
        }
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Memproses...';
        submitBtn.disabled = true;
        
        setTimeout(function() {
            showSuccessModal(whatsappValue);
            donationForm.reset();
            resetUploadForm();
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    };
}