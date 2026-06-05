// js/main.js
/* ============================================
   RIHANA MEER'S BAKERY - MASTER JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE SIDEBAR TOGGLE ==========
    const mobileSidebar = document.getElementById('mobileSidebar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    function openSidebar() {
        if (mobileSidebar) mobileSidebar.classList.add('open');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSidebar() {
        if (mobileSidebar) mobileSidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
    
    // Close sidebar when clicking nav links
    document.querySelectorAll('.sidebar-nav a, .sidebar-order-btn').forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
    
    // ========== TOAST NOTIFICATION ==========
    window.showToast = function(message) {
        let toast = document.getElementById('toastMsg');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toastMsg';
            toast.className = 'toast-msg';
            document.body.appendChild(toast);
        }
        toast.textContent = message || '✓ Action completed';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    };
    
    // ========== ADD TO CART ==========
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.getAttribute('data-item') || 'Item';
            showToast(`🥐 ${item} added to cart!`);
        });
    });
    
    // ========== CATERING INQUIRY ==========
    document.querySelectorAll('.catering-inquiry').forEach(btn => {
        btn.addEventListener('click', function() {
            const packageName = this.getAttribute('data-package') || 'Catering';
            const formSection = document.getElementById('cateringFormSection');
            if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                showToast(`📋 Please fill the form for ${packageName}`);
            } else {
                showToast(`📋 Request a quote for ${packageName}`);
            }
        });
    });
    
    // ========== CATERING FORM SUBMIT ==========
    const submitBtn = document.getElementById('submitCateringBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const name = document.getElementById('catName')?.value;
            const email = document.getElementById('catEmail')?.value;
            const eventType = document.getElementById('catEvent')?.value;
            
            if (!name || !email) {
                showToast('⚠️ Please enter your name and email');
                return;
            }
            
            showToast(`🎉 Thanks ${name}! We'll contact you within 24 hours.`);
            
            // Optional: Clear form
            document.getElementById('catName').value = '';
            document.getElementById('catEmail').value = '';
            document.getElementById('catPhone').value = '';
            document.getElementById('catDate').value = '';
            document.getElementById('catEvent').value = '';
            document.getElementById('catGuests').value = '';
            document.getElementById('catMsg').value = '';
        });
    }
    
    // ========== ACTIVE NAVIGATION LINK ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.desktop-nav a, .sidebar-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// ========== MAP INITIALIZATION (Contact Page) ==========
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
            .bindPopup('🥐 Rihana Meer\'s Bakery<br>Bole Subcity, Addis Ababa')
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
