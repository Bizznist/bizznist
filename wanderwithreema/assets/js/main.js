/**
* Template Name: Appland
* Template URL: https://bootstrapmade.com/free-bootstrap-app-landing-page-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);


  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  
<!-- YouTube Gallery Script -->
  const API_KEY = "AIzaSyAgSIF-DPHEAqjqPAf2CSa02BiTJAhECzs";
  const CHANNEL_ID = "UCzrsI894Qk73JO0qQNiaP_g";
  const videoWrapper = document.getElementById("youtube-video-wrapper");

  // Small guard: if wrapper is missing, abort silently (avoids console errors)
  if (!videoWrapper) return;

  // Helper: format views (show exact number for <1000)
  function formatViewsCount(num) {
    if (typeof num !== "number" || isNaN(num)) return "— views";
    if (num < 1000) return `${num} views`;
    if (num < 1_000_000) return `${(num / 1000).toFixed(1)}K views`;
    return `${(num / 1_000_000).toFixed(1)}M views`;
  }

  // Remove previous children (safe re-run)
  function clearWrapper() {
    while (videoWrapper.firstChild) videoWrapper.removeChild(videoWrapper.firstChild);
    videoWrapper.style.visibility = "hidden";
  }

  // Main fetch + build function
  async function buildYouTubeGallery() {
    clearWrapper();
    let videos = [];
    let nextPageToken = "";
    const maxResults = 50;

    try {
      do {
        const searchRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&pageToken=${nextPageToken}`
        );
        const searchData = await searchRes.json();
        const videoIds = (searchData.items || [])
          .filter(item => item.id && item.id.kind === "youtube#video")
          .map(item => item.id.videoId);

        if (!videoIds.length) break;

        const statsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds.join(",")}&part=statistics,snippet`
        );
        const statsData = await statsRes.json();

        (statsData.items || []).forEach(video => {
          videos.push({
            id: video.id,
            title: video.snippet && video.snippet.title ? video.snippet.title : "Untitled",
            views: video.statistics && video.statistics.viewCount ? parseInt(video.statistics.viewCount, 10) : 0,
            publishedAt: video.snippet && video.snippet.publishedAt ? video.snippet.publishedAt : null
          });
        });

        nextPageToken = searchData.nextPageToken;
      } while (nextPageToken);
    } catch (err) {
      console.error("YouTube fetch error:", err);
      return;
    }

    if (!videos.length) return;

    // Unique by id
    const seen = new Set();
    videos = videos.filter(v => {
      if (!v.id || seen.has(v.id)) return false;
      seen.add(v.id);
      return true;
    });

    // High view videos (>= 10k)
    const highViewVideos = videos.filter(v => v.views >= 10000).sort((a, b) => b.views - a.views);

    const topViewed = highViewVideos.length ? highViewVideos[0] : null;
    const restHigh = highViewVideos.length > 1 ? highViewVideos.slice(1) : [];

    // Latest overall
    const latest = [...videos].sort((a, b) => {
      const da = a.publishedAt ? new Date(a.publishedAt) : 0;
      const db = b.publishedAt ? new Date(b.publishedAt) : 0;
      return db - da;
    })[0];

    // Combine: topViewed -> restHigh -> latest (if unique)
    let final = [];
    if (topViewed) final.push(topViewed);
    final = final.concat(restHigh);
    if (latest && !final.find(x => x.id === latest.id)) final.push(latest);

    // Fill up to 10 with next best by views if needed
    if (final.length < 10) {
      const others = videos
        .filter(v => !final.find(f => f.id === v.id))
        .sort((a, b) => b.views - a.views);
      final = final.concat(others.slice(0, 10 - final.length));
    }

    final = final.slice(0, 10);

    // Build slides (thumbnails + lazy play button to avoid heavy iframe load)
    final.forEach(video => {
      const formatted = formatViewsCount(video.views);
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.innerHTML = `
        <div class="youtube-slide">
          <div class="youtube-thumb-wrapper" data-video-id="${video.id}">
            <img class="youtube-thumb" alt="${escapeHtml(video.title)}" src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" loading="lazy" />
            <button class="youtube-play-btn" aria-label="Play ${escapeHtml(video.title)}">&#9658;</button>
          </div>
          <div class="youtube-info">
            <p class="title"><span class="shorts-icon"></span>${escapeHtml(video.title)}</p>
            <p class="views">${formatted}</p>
          </div>
        </div>
      `;
      videoWrapper.appendChild(slide);
    });

    // Click handler (lazy swap to iframe)
    videoWrapper.addEventListener("click", onWrapperClick);

    // small delay then init swiper
    setTimeout(initYouTubeSwiper, 150);
  }

  // Escape text for safety when injecting into HTML
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function onWrapperClick(e) {
    const btn = e.target.closest(".youtube-play-btn");
    if (!btn) return;
    const wrapper = btn.closest(".youtube-thumb-wrapper");
    if (!wrapper) return;
    const vid = wrapper.getAttribute("data-video-id");
    if (!vid) return;
    // replace with iframe (autoplay)
    wrapper.innerHTML = `<iframe src="https://www.youtube.com/embed/${vid}?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }

  // Initialize or re-init Swiper for this gallery
  function initYouTubeSwiper() {
    // If Swiper not present on page, skip (avoids errors)
    if (typeof Swiper === "undefined") {
      // reveal wrapper even without slider so user sees items
      videoWrapper.style.visibility = "visible";
      return;
    }

    // destroy previous instance if present
    if (window.__wanderYouTubeSwiper && window.__wanderYouTubeSwiper.destroy) {
      try { window.__wanderYouTubeSwiper.destroy(true, true); } catch (e) { /* ignore */ }
      window.__wanderYouTubeSwiper = null;
    }

    // create swiper
    const swiper = new Swiper(".init-swiper", {
      loop: true,
      speed: 600,
      autoplay: { delay: 4000, disableOnInteraction: false },
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 20,
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      },
      initialSlide: 0
    });

    // ensure shows the real first slide (top viewed) even when looped
    try { swiper.slideToLoop(0, 0, false); } catch (e) { /* ignore */ }

    window.__wanderYouTubeSwiper = swiper;
    videoWrapper.style.visibility = "visible";
  }

  // Start the gallery
  buildYouTubeGallery();

})();
