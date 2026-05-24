document.addEventListener('DOMContentLoaded', function () {

    // ── Product sliders ──────────────────────────────────
    const thumbEl = document.querySelector('.thumb-swiper');
    const mainEl  = document.querySelector('.main-swiper');

    if (thumbEl && mainEl) {
        const thumbSwiper = new Swiper('.thumb-swiper', {
            direction: 'vertical',
            slidesPerView: 'auto',
            spaceBetween: 4,
            watchSlidesProgress: true,
            freeMode: true,
        });

        const mainSwiper = new Swiper('.main-swiper', {
            slidesPerView: 1,
            spaceBetween: 0,
            thumbs: { swiper: thumbSwiper },
            pagination: {
                el: '.product-card__pagination',
                clickable: true,
            },
        });

        const thumbArrow = document.querySelector('.thumb_arrow');
        if (thumbArrow) {
            thumbArrow.addEventListener('click', function () {
                thumbSwiper.slideNext();
            });
        }
    }

    // ── Accordion ────────────────────────────────────────
    const accorItems = document.querySelectorAll('.accor_item');

    if(accorItems.length){
        accorItems.forEach(function (item) {
            item.querySelector('.accor_header').addEventListener('click', function () {
                const isOpen = item.classList.contains('open');
                accorItems.forEach(function (i) { i.classList.remove('open'); });
                if (!isOpen) item.classList.add('open');
            });
        });

        if (accorItems[0]) accorItems[0].classList.add('open');
    }

    // ── Color picker ────────────────────────────────────
    const colors = document.querySelectorAll('.param_color .inner');
    if (colors.length) {
        colors.forEach(function (inner) {
            // Клик — активный элемент
            inner.querySelectorAll('.item').forEach(function (item) {
                item.addEventListener('click', function () {
                    inner.querySelectorAll('.item').forEach(function (i) { i.classList.remove('active'); });
                    item.classList.add('active');
                });
            });

            // Swiper
            let swiper = null;

            function initSwiper() {
                const isMobile = window.innerWidth <= 768;

                if (isMobile && !swiper) {
                    inner.classList.add('swiper-wrapper');
                    inner.querySelectorAll('.item').forEach(function (item) {
                        item.classList.add('swiper-slide');
                    });

                    const swiperEl = document.createElement('div');
                    swiperEl.classList.add('swiper', 'color-swiper');

                    // Стрелки — каждый класс отдельным аргументом
                    const btnPrev = document.createElement('div');
                    btnPrev.classList.add('arrow-nav', 'color-section__arrow', 'color-section__arrow--prev');
                    btnPrev.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11.625 14.25L6.375 9L11.625 3.75" stroke="#1D222F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

                    const btnNext = document.createElement('div');
                    btnNext.classList.add('arrow-nav', 'color-section__arrow', 'color-section__arrow--next');
                    btnNext.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6.375 3.75L11.625 9L6.375 14.25" stroke="#1D222F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

                    inner.parentNode.insertBefore(swiperEl, inner);
                    swiperEl.appendChild(inner);
                    swiperEl.appendChild(btnPrev);
                    swiperEl.appendChild(btnNext);

                    swiper = new Swiper(swiperEl, {
                        slidesPerView: 'auto',
                        spaceBetween: 8,
                        freeMode: true,
                        navigation: {
                            prevEl: btnPrev,
                            nextEl: btnNext,
                        },
                    });

                } else if (!isMobile && swiper) {
                    const swiperEl = inner.closest('.color-swiper');
                    swiperEl.parentNode.insertBefore(inner, swiperEl);
                    swiperEl.remove();

                    inner.classList.remove('swiper-wrapper');
                    inner.querySelectorAll('.item').forEach(function (item) {
                        item.classList.remove('swiper-slide');
                    });

                    swiper.destroy(true, true);
                    swiper = null;
                }
            }

            initSwiper();
            window.addEventListener('resize', initSwiper);
        });
    }

    // ── Size picker ─────────────────────────────────────
    const sizes = document.querySelectorAll('.param_size .inner');

    if(sizes.length) {
        sizes.forEach(function (inner) {
            inner.querySelectorAll('.item:not(.disable)').forEach(function (item) {
                item.addEventListener('click', function () {
                    inner.querySelectorAll('.item').forEach(function (i) { i.classList.remove('active'); });
                    item.classList.add('active');
                });
            });
        });
    }

    // ── Quantity stepper ─────────────────────────────────
    const amounts = document.querySelectorAll('.amount_block');

    if(amounts.length) {
        amounts.forEach(function (block) {
            const input = block.querySelector('input');
            const minus = block.querySelector('.minus');
            const plus  = block.querySelector('.plus');
            if (!input) return;
            input.value = 1;

            minus && minus.addEventListener('click', function () {
                const v = parseInt(input.value) || 1;
                if (v > 1) input.value = v - 1;
            });

            plus && plus.addEventListener('click', function () {
                input.value = (parseInt(input.value) || 1) + 1;
            });
        });
    }

    // ── Dops swiper ──────────────────────────────────────
    if (document.querySelector('.mySwiper_dops')) {
        new Swiper('.mySwiper_dops', {
            slidesPerView: 3,
            spaceBetween: 12,
            navigation: {
                nextEl: ".dops-section__arrow--next",
                prevEl: ".dops-section__arrow--prev",
            },
            breakpoints: {
                0: {
                    slidesPerView: 'auto',
                    spaceBetween: 12,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 12,
                },
                1334: {
                    slidesPerView: 3,
                    spaceBetween: 12,
                },
            },
        });
    }

    if (document.querySelector('.likes-swiper')) {
        new Swiper('.likes-swiper', {
            slidesPerView: 4,
            spaceBetween: 22,
            navigation: {
                nextEl: ".likes-section__arrow--next",
                prevEl: ".likes-section__arrow--prev",
            },
            breakpoints: {
                0: {
                    slidesPerView: 'auto',
                    spaceBetween: 13,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 22,
                },
                1070: {
                    slidesPerView: 4,
                    spaceBetween: 22,
                },
            },
        });
    }
});
