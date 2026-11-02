// ============================================
// DONATION SYSTEM
// ============================================

function showDonationMessage(message, isSuccess = true) {
    const messageDiv = document.getElementById('donationMessage');
    if (!messageDiv) return;
    messageDiv.textContent = message;
    messageDiv.className = isSuccess ? 'donation-message success' : 'donation-message error';
    messageDiv.style.display = 'block';
    setTimeout(() => { messageDiv.style.display = 'none'; }, 3000);
}

function processDonation() {
    const amountInput = document.getElementById('donationAmount');
    let amount = amountInput ? parseInt(amountInput.value) : 0;
    if (!amount || isNaN(amount)) {
        showDonationMessage('❌ Masukkan nominal donasi terlebih dahulu!', false);
        return;
    }
    if (amount < 10000) {
        showDonationMessage('❌ Minimal donasi Rp 10.000', false);
        return;
    }
    const formattedAmount = new Intl.NumberFormat('id-ID').format(amount);
    if (amountInput) amountInput.value = 25000;
    showDonationMessage(`✅ Terima kasih! Donasi Anda sebesar Rp ${formattedAmount} telah berhasil. 🙏`, true);
}

document.addEventListener('DOMContentLoaded', function() {
    const donateBtn = document.getElementById('donateBtn');
    if (donateBtn) donateBtn.addEventListener('click', processDonation);
    const amountInput = document.getElementById('donationAmount');
    if (amountInput) {
        amountInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') { e.preventDefault(); processDonation(); }
        });
    }
});


// ============================================
// DISTRIBUTION MAP
// ============================================

let map;


function initMap(centerLat, centerLng, zoom) {

    // Hapus peta sebelumnya jika ada
    if (map) {
        map.remove();
        map = null;
    }

    // Buat instance peta baru
    map = L.map('map', {
        center: [centerLat, centerLng],
        zoom: zoom,
        zoomControl: true,
        scrollWheelZoom: true
    });

    // Gunakan OpenStreetMap sebagai tile provider
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
        minZoom: 3
    }).addTo(map);

    // Pastikan ukuran peta terbaca dengan benar
    setTimeout(() => {
        if (map) {
            map.invalidateSize();
        }
    }, 300);
}


// Semua titik pakai warna hijau
const greenIcon = L.divIcon({
    html: '<div style="background-color:#10B981;width:12px;height:12px;border-radius:50%;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.2);"></div>',
    iconSize: [12, 12],
    popupAnchor: [0, -6]
});

const cityData = {
    jakarta: {
        center: [-6.2088, 106.8456], zoom: 12,
        locations: [
            { name: "The Bellagio Boutique Mall", lat: -6.2250, lng: 106.8200, address: "Jakarta Selatan" },
            { name: "Swissôtel Living", lat: -6.2200, lng: 106.8250, address: "Mega Kuningan" },
            { name: "Capital Place", lat: -6.2180, lng: 106.8180, address: "Jakarta Selatan" },
            { name: "One Satrio", lat: -6.2220, lng: 106.8280, address: "Kuningan" },
            { name: "Balai Kartini", lat: -6.2300, lng: 106.8150, address: "Jakarta Selatan" },
            { name: "Google Office Jakarta", lat: -6.2280, lng: 106.8210, address: "Jakarta" },
            { name: "Grand Indonesia", lat: -6.1950, lng: 106.8210, address: "Jakarta Pusat" },
            { name: "Plaza Indonesia", lat: -6.1930, lng: 106.8230, address: "Jakarta Pusat" },
            { name: "FX Sudirman", lat: -6.2050, lng: 106.8200, address: "Jakarta Pusat" },
            { name: "Mall Taman Anggrek", lat: -6.1780, lng: 106.7950, address: "Jakarta Barat" },
            { name: "Lippo Mall Kemang", lat: -6.2600, lng: 106.8150, address: "Jakarta Selatan" },
            { name: "Pondok Indah Mall", lat: -6.2660, lng: 106.7830, address: "Jakarta Selatan" },
            { name: "Cilandak Town Square", lat: -6.2900, lng: 106.7990, address: "Jakarta Selatan" },
            { name: "Margo City", lat: -6.3730, lng: 106.8310, address: "Depok" },
            { name: "Kelapa Gading Trade Center", lat: -6.1560, lng: 106.9040, address: "Jakarta Utara" },
            { name: "Artha Gading Mall", lat: -6.1600, lng: 106.9100, address: "Jakarta Utara" },
            { name: "Emporium Pluit Mall", lat: -6.1200, lng: 106.7900, address: "Jakarta Utara" },
            { name: "Mangga Dua Square", lat: -6.1380, lng: 106.8310, address: "Jakarta Pusat" },
            { name: "Blok M Plaza", lat: -6.2440, lng: 106.7990, address: "Jakarta Selatan" },
            { name: "Kota Kasablanka", lat: -6.2250, lng: 106.8480, address: "Jakarta Selatan" }
        ]
    },
    bandung: {
        center: [-6.9175, 107.6191], zoom: 12,
        locations: [
            { name: "Paris Van Java Mall", lat: -6.8950, lng: 107.6100, address: "Jl. Sukajadi" },
            { name: "Trans Studio Mall", lat: -6.9120, lng: 107.6200, address: "Jl. Gatot Subroto" },
            { name: "Gedung Sate", lat: -6.9025, lng: 107.6185, address: "Jl. Diponegoro" },
            { name: "Bandung Supermal", lat: -6.9200, lng: 107.6080, address: "Jl. Gatot Subroto" },
            { name: "Istana Plaza", lat: -6.9140, lng: 107.6050, address: "Jl. Pasirkaliki" },
            { name: "Cihampelas Walk", lat: -6.9000, lng: 107.6050, address: "Jl. Cihampelas" },
            { name: "BTC Fashion Mall", lat: -6.8970, lng: 107.6060, address: "Jl. Dr. Djunjunan" },
            { name: "Braga City Walk", lat: -6.9180, lng: 107.6100, address: "Jl. Braga" },
            { name: "Paskal 23 Shopping Center", lat: -6.9100, lng: 107.5980, address: "Jl. Pasir Kaliki" },
            { name: "Alun-alun Bandung", lat: -6.9214, lng: 107.6071, address: "Jl. Asia Afrika" },
            { name: "Pasar Baru Trade Center", lat: -6.9190, lng: 107.6120, address: "Jl. Otto Iskandar" },
            { name: "Kings Shopping Center", lat: -6.9210, lng: 107.6090, address: "Jl. Kepatihan" },
            { name: "Bandung Electronic Center", lat: -6.9240, lng: 107.6150, address: "Jl. Purnawarman" },
            { name: "Yogya Buahbatu", lat: -6.9500, lng: 107.6300, address: "Jl. Buahbatu" },
            { name: "Mall of Setiabudi", lat: -6.8870, lng: 107.6050, address: "Jl. Setiabudi" },
            { name: "Dago Plaza", lat: -6.8930, lng: 107.6130, address: "Jl. Ir. H. Juanda" },
            { name: "Griya Antapani", lat: -6.9180, lng: 107.6600, address: "Jl. Antapani" },
            { name: "Metro Indah Mall", lat: -6.9400, lng: 107.6480, address: "Jl. Soekarno-Hatta" },
            { name: "West Point Mall", lat: -6.9050, lng: 107.5950, address: "Jl. Surya Sumantri" },
            { name: "Cimahi Square", lat: -6.8900, lng: 107.5430, address: "Cimahi" }
        ]
    },
    surabaya: {
        center: [-7.2575, 112.7521], zoom: 12,
        locations: [
            { name: "Tunjungan Plaza", lat: -7.2500, lng: 112.7400, address: "Jl. Tunjungan" },
            { name: "Pakuwon Mall", lat: -7.2600, lng: 112.7600, address: "Jl. Raya Darmo" },
            { name: "Galaxy Mall", lat: -7.2550, lng: 112.7700, address: "Jl. Dharmahusada" },
            { name: "Grand City Mall", lat: -7.2460, lng: 112.7490, address: "Jl. Gubeng Pojok" },
            { name: "Pakuwon City Mall", lat: -7.2700, lng: 112.7200, address: "Jl. Puncak Indah" },
            { name: "Ciputra World", lat: -7.2900, lng: 112.7310, address: "Jl. Mayjend Yono S." },
            { name: "Royal Plaza", lat: -7.2950, lng: 112.7350, address: "Jl. Ahmad Yani" },
            { name: "Delta Plaza", lat: -7.2470, lng: 112.7460, address: "Jl. Pemuda" },
            { name: "Pasar Turi Mall", lat: -7.2380, lng: 112.7360, address: "Jl. Semarang" },
            { name: "WTC Surabaya", lat: -7.2490, lng: 112.7370, address: "Jl. Pemuda" },
            { name: "ITC Surabaya", lat: -7.2620, lng: 112.7500, address: "Jl. Gembong" },
            { name: "Hi-Tech Mall", lat: -7.2540, lng: 112.7510, address: "Jl. Kusuma Bangsa" },
            { name: "Lenmarc Mall", lat: -7.2820, lng: 112.6940, address: "Jl. Bukit Darmo" },
            { name: "Pakuwon Trade Center", lat: -7.2650, lng: 112.7250, address: "Jl. Raya Kupang Indah" },
            { name: "Rungkut Industri", lat: -7.3200, lng: 112.7700, address: "Rungkut" },
            { name: "Jembatan Merah Plaza", lat: -7.2330, lng: 112.7360, address: "Jl. Rajawali" },
            { name: "Marvell City", lat: -7.2800, lng: 112.7550, address: "Jl. Ngagel" },
            { name: "Supermal Pakuwon Indah", lat: -7.2700, lng: 112.7150, address: "Jl. Pakuwon Indah" },
            { name: "East Coast Center", lat: -7.2850, lng: 112.8100, address: "Jl. Kenjeran" },
            { name: "Lagoon Avenue", lat: -7.2750, lng: 112.8000, address: "Mulyorejo" }
        ]
    },
    semarang: {
        center: [-6.9667, 110.4167], zoom: 12,
        locations: [
            { name: "DP Mall Semarang", lat: -6.9700, lng: 110.4200, address: "Jl. Pemuda" },
            { name: "Paragon Mall", lat: -6.9900, lng: 110.4100, address: "Jl. Pemuda" },
            { name: "Ciputra Mall", lat: -6.9750, lng: 110.4000, address: "Jl. Simpang Lima" },
            { name: "Java Supermall", lat: -7.0000, lng: 110.4150, address: "Jl. MT. Haryono" },
            { name: "Tentrem Mall", lat: -6.9920, lng: 110.4080, address: "Jl. Gajahmada" },
            { name: "Simpang Lima Plaza", lat: -6.9930, lng: 110.4120, address: "Simpang Lima" },
            { name: "Sri Ratu Pemuda", lat: -6.9860, lng: 110.4160, address: "Jl. Pemuda" },
            { name: "Kawasan Kota Lama", lat: -6.9680, lng: 110.4270, address: "Kota Lama" },
            { name: "Banyumanik Trade Center", lat: -7.0600, lng: 110.4230, address: "Banyumanik" },
            { name: "Pasar Johar", lat: -6.9840, lng: 110.4230, address: "Jl. Agus Salim" },
            { name: "Srondol Plaza", lat: -7.0500, lng: 110.4100, address: "Srondol" },
            { name: "Puri Anjasmoro", lat: -6.9500, lng: 110.3900, address: "Puri Anjasmoro" },
            { name: "Majapahit Square", lat: -6.9750, lng: 110.4400, address: "Jl. Majapahit" },
            { name: "Karangayu Trade Center", lat: -6.9600, lng: 110.3980, address: "Karangayu" },
            { name: "PRPP Semarang", lat: -6.9400, lng: 110.3850, address: "Kawasan PRPP" },
            { name: "ITC Mangga Dua Semarang", lat: -6.9800, lng: 110.4050, address: "Jl. Pandanaran" },
            { name: "Pasar Bulu", lat: -6.9880, lng: 110.4050, address: "Jl. Sriwijaya" },
            { name: "Citra Land Semarang", lat: -7.0200, lng: 110.3900, address: "Gombel" },
            { name: "Louis Kienne Pemuda", lat: -6.9870, lng: 110.4180, address: "Jl. Pemuda" },
            { name: "Ngaliyan Square", lat: -6.9900, lng: 110.3700, address: "Ngaliyan" }
        ]
    },
    yogyakarta: {
        center: [-7.7956, 110.3695], zoom: 12,
        locations: [
            { name: "Malioboro Mall", lat: -7.7950, lng: 110.3650, address: "Jl. Malioboro" },
            { name: "Hartono Mall", lat: -7.7800, lng: 110.4100, address: "Jl. Ring Road Utara" },
            { name: "Ambarrukmo Plaza", lat: -7.7830, lng: 110.3980, address: "Jl. Laksda Adisucipto" },
            { name: "Jogja City Mall", lat: -7.7650, lng: 110.3780, address: "Jl. Magelang" },
            { name: "Galeria Mall", lat: -7.7920, lng: 110.3670, address: "Jl. Jend. Sudirman" },
            { name: "Kraton Yogyakarta", lat: -7.8053, lng: 110.3642, address: "Jl. Rotowijayan" },
            { name: "Beringharjo Market", lat: -7.7980, lng: 110.3660, address: "Jl. Margo Mulyo" },
            { name: "Prambanan Square", lat: -7.7540, lng: 110.4920, address: "Jl. Raya Solo-Jogja" },
            { name: "Lippo Plaza Yogya", lat: -7.7700, lng: 110.4050, address: "Jl. Babarsari" },
            { name: "Pakuwon Mall Yogya", lat: -7.7750, lng: 110.3900, address: "Jl. Magelang" },
            { name: "Sleman City Hall", lat: -7.7450, lng: 110.3520, address: "Sleman" },
            { name: "Giant Seturan", lat: -7.7700, lng: 110.4090, address: "Jl. Seturan" },
            { name: "Matahari Jogjatronik", lat: -7.7960, lng: 110.3700, address: "Jl. Brigjen Katamso" },
            { name: "Robinson Sleman", lat: -7.7550, lng: 110.3700, address: "Jl. Magelang" },
            { name: "Carrefour Maguwo", lat: -7.7900, lng: 110.4200, address: "Maguwoharjo" },
            { name: "Condongcatur Market", lat: -7.7600, lng: 110.3850, address: "Condongcatur" },
            { name: "UGM Area", lat: -7.7700, lng: 110.3780, address: "Bulaksumur" },
            { name: "Jalan Kaliurang", lat: -7.7500, lng: 110.3830, address: "Jl. Kaliurang" },
            { name: "Bantul Town Square", lat: -7.8900, lng: 110.3280, address: "Bantul" },
            { name: "Godean Market", lat: -7.7950, lng: 110.3200, address: "Godean" }
        ]
    },
    denpasar: {
        center: [-8.6529, 115.2191], zoom: 12,
        locations: [
            { name: "Beachwalk Mall", lat: -8.6600, lng: 115.2200, address: "Jl. Pantai Kuta" },
            { name: "Discovery Shopping Mall", lat: -8.6650, lng: 115.2150, address: "Jl. Kartika Plaza" },
            { name: "Bali Galeria", lat: -8.6700, lng: 115.2100, address: "Jl. By Pass Ngurah Rai" },
            { name: "Mall Bali Galeria", lat: -8.6720, lng: 115.2120, address: "Kuta" },
            { name: "Lippo Mall Kuta", lat: -8.6680, lng: 115.2060, address: "Jl. Kartika Plaza" },
            { name: "Carrefour Sunset Road", lat: -8.6800, lng: 115.1800, address: "Jl. Sunset Road" },
            { name: "Tiara Dewata", lat: -8.6530, lng: 115.2250, address: "Jl. Cokroaminoto" },
            { name: "Matahari Duta Plaza", lat: -8.6570, lng: 115.2160, address: "Jl. Dewi Sartika" },
            { name: "Ramayana Denpasar", lat: -8.6590, lng: 115.2130, address: "Jl. Diponegoro" },
            { name: "Denpasar Festival", lat: -8.6550, lng: 115.2300, address: "Sanur" },
            { name: "Bali Collection BTDC", lat: -8.7200, lng: 115.1700, address: "Nusa Dua" },
            { name: "Mall Bali Nusa Dua", lat: -8.7250, lng: 115.1750, address: "Nusa Dua" },
            { name: "Seminyak Village", lat: -8.6900, lng: 115.1600, address: "Seminyak" },
            { name: "Sunset Road Mall", lat: -8.6820, lng: 115.1820, address: "Jl. Sunset Road" },
            { name: "Hypermart Kuta", lat: -8.6750, lng: 115.2050, address: "Jl. By Pass Ngurah Rai" },
            { name: "Sanur Beach Market", lat: -8.6780, lng: 115.2630, address: "Sanur" },
            { name: "Ubud Market", lat: -8.5069, lng: 115.2625, address: "Ubud" },
            { name: "Gianyar Night Market", lat: -8.5350, lng: 115.3320, address: "Gianyar" },
            { name: "Tabanan Market", lat: -8.5390, lng: 115.1210, address: "Tabanan" },
            { name: "Negara Market", lat: -8.3530, lng: 114.6500, address: "Negara" }
        ]
    }
};


function loadCity(cityId) {

    const city = cityData[cityId];

    if (!city) return;

    initMap(
        city.center[0],
        city.center[1],
        city.zoom
    );

    // Simpan referensi peta yang sedang aktif
    const currentMap = map;

    // Tambahkan marker lokasi
    city.locations.forEach(loc => {

        const marker = L.marker(
            [loc.lat, loc.lng],
            { icon: greenIcon }
        ).addTo(currentMap);

        marker.bindPopup(`
            <div style="min-width:150px">
                <strong>📍 ${loc.name}</strong>
                <br>
                <span>${loc.address}</span>
            </div>
        `);

    });

    setTimeout(() => {
        currentMap.invalidateSize();
    }, 300);
}



// ============================================
// FORM SUBMISSIONS
// ============================================

document.getElementById('volunteerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✅ Pendaftaran relawan berhasil!');
    e.target.reset();
});

document.getElementById('communityForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✅ Pengajuan komunitas berhasil!');
    e.target.reset();
});


// ============================================
// IMAGE SLIDER
// ============================================

function initSlider() {
    const sliderTrack = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slider-slide');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const dotsContainer = document.getElementById('sliderDots');

    if (!sliderTrack || !slides.length || !prevBtn || !nextBtn || !dotsContainer) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    let autoSlide = setInterval(nextSlide, 5000);

    const sliderCard = document.querySelector('.slider-card');
    if (sliderCard) {
        sliderCard.addEventListener('mouseenter', () => clearInterval(autoSlide));
        sliderCard.addEventListener('mouseleave', () => {
            clearInterval(autoSlide);
            autoSlide = setInterval(nextSlide, 5000);
        });
    }

    createDots();
    goToSlide(0);
}


// ============================================
// CITY TABS & INITIALIZATION
// ============================================

document.querySelectorAll('.city-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.city-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        loadCity(tab.dataset.city);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    initSlider();
    loadCity('jakarta');
});