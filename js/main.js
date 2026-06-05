/* ============================================
   RIHANA MEER'S BAKERY - MASTER JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('overlay');
    
    function openMobileMenu() {
        mobileNav.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        mobileNav.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);
    if (overlay) overlay.addEventListener('click', closeMobileMenu);
    
    // Toast Notification
    window.showToast = function(message) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message || '✓ Action completed';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    };
    
    // Add to Cart
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const item = this.getAttribute('data-item') || 'Item';
            showToast(`🍞 ${item} added to cart!`);
        });
    });
    
    // Active Navigation Link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.desktop-nav a, .mobile-nav-links a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
});

// Google Maps
function initMap() {
    const mapElement = document.getElementById('map');
    if (mapElement && typeof L !== 'undefined') {
        const addisCoords = [9.02497, 38.74689];
        const map = L.map('map').setView(addisCoords, 14);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);
        L.marker(addisCoords).addTo(map)
            .bindPopup('🥐 Rihana Meer\'s Bakery<br>Addis Ababa, Ethiopia')
            .openPopup();
    }
}

if (document.getElementById('map')) {
    if (typeof L !== 'undefined') {
        initMap();
    } else {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = initMap;
        document.head.appendChild(script);
    }
}
