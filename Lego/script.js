/* Lego – het Deense speelgoedmerk */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        /* ---------- Cookiekennisgeving (eenmalig via localStorage) ---------- */
        var cookieModalEl = document.getElementById('cookieModal');

        function getConsent() {
            try { return localStorage.getItem('cookieConsent'); } catch (e) { return null; }
        }

        function setConsent(value) {
            try { localStorage.setItem('cookieConsent', value); } catch (e) {}
        }

        if (cookieModalEl && window.bootstrap) {
            if (!getConsent()) {
                new bootstrap.Modal(cookieModalEl).show();
            }
            cookieModalEl.addEventListener('hidden.bs.modal', function () {
                if (!getConsent()) setConsent('dismissed');
            });
        }

        var acceptBtn = document.getElementById('cookieAccept');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', function () { setConsent('accepted'); });
        }

        var rejectBtn = document.getElementById('cookieReject');
        if (rejectBtn) {
            rejectBtn.addEventListener('click', function () { setConsent('rejected'); });
        }

        /* ---------- Schaduw op navigatiebalk bij scrollen ---------- */
        var nav = document.getElementById('mainNav');

        function updateNav() {
            if (!nav) return;
            if (window.scrollY > 12) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', updateNav, { passive: true });
        updateNav();

        /* ---------- Galerij-lightbox ---------- */
        var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
        var lightbox = document.getElementById('lightbox');
        var lbImg = document.getElementById('lightboxImage');
        var lbCaption = document.getElementById('lightboxCaption');
        var lbCounter = document.getElementById('lightboxCounter');
        var current = 0;

        function showItem(index) {
            if (!items.length || !lightbox) return;
            current = (index + items.length) % items.length;
            var item = items[current];
            var thumb = item.querySelector('img');
            lbImg.src = item.getAttribute('data-full') || (thumb ? thumb.src : '');
            lbImg.alt = thumb ? thumb.alt : '';
            lbCaption.textContent = item.getAttribute('data-caption') || '';
            lbCounter.textContent = (current + 1) + ' / ' + items.length;
        }

        function openLightbox(index) {
            showItem(index);
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            if (!lightbox) return;
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        items.forEach(function (item, i) {
            item.addEventListener('click', function () { openLightbox(i); });
        });

        var closeBtn = document.getElementById('lightboxClose');
        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

        var prevBtn = document.getElementById('lightboxPrev');
        if (prevBtn) prevBtn.addEventListener('click', function () { showItem(current - 1); });

        var nextBtn = document.getElementById('lightboxNext');
        if (nextBtn) nextBtn.addEventListener('click', function () { showItem(current + 1); });

        if (lightbox) {
            lightbox.addEventListener('click', function (e) {
                if (e.target === lightbox) closeLightbox();
            });
        }

        document.addEventListener('keydown', function (e) {
            if (!lightbox || !lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showItem(current - 1);
            } else if (e.key === 'ArrowRight') {
                showItem(current + 1);
            }
        });

        /* ---------- Jaartal in de voettekst ---------- */
        var yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    });
})();