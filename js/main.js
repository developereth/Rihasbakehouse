/* ============================================
   RIHANA MEER'S BAKERY - MASTER JAVASCRIPT
   WITH MOBILE SLIDE SIDEBAR
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE SLIDE SIDEBAR ==========
    const mobileSidebar = document.getElementById('mobileSidebar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    // Open Sidebar
    function openSidebar() {
        if (mobileSidebar) {
            mobileSidebar.classList.add('open');
        }
        if (sidebarOverlay) {
            sidebarOverlay.classList.add('active');
        }
        document.body.style.overflow = 'hidden';
    }
    
    // Close Sidebar
    function closeSidebar() {
        if (mobileSidebar) {
            mobileSidebar.classList.remove('open');
        }
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
    
    // Event Listeners for Sidebar
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openSidebar);
    }
    
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeSidebar);
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    // Close sidebar when clicking on a link
    document.querySelectorAll('.sidebar-nav a, .sidebar-order-btn').forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
    
    // ========== TOAST NOTIFICATION ==========
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
    
    // ========== ADD TO CART ==========
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const item = this.getAttribute('data-item') || 'Item';
            showToast(`🥐 ${item} added to cart!`);
        });
    });
    
    // ========== ACTIVE NAVIGATION LINK ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.desktop-nav a, .sidebar-nav a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ========== CATERING INQUIRY ==========
    document.querySelectorAll('.catering-inquiry').forEach(btn => {
        btn.addEventListener('click', function() {
            showToast('📋 Please fill the catering form below');
        });
    });
});

// ========== GOOGLE MAPS (Contact Page) ==========
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

// ========== FORM SUBMISSIONS ==========
function submitOrder() {
    const name = document.getElementById('orderName')?.value;
    if (!name) {
        showToast('⚠️ Please enter your name');
        return;
    }
    showToast(`✨ Thanks ${name}, order placed! We'll call you to confirm.`);
}

function sendMessage() {
    const name = document.getElementById('contactName')?.value;
    if (!name) {
        showToast('⚠️ Please enter your name');
        return;
    }
    showToast('📨 Message sent! We reply within 24 hours.');
}
