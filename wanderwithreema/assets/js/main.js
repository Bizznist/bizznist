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

  async function getAllVideos() {
    let videos = [];
    let nextPageToken = '';
    const maxResults = 50;

    try {
      do {
        const searchRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&pageToken=${nextPageToken}`
        );
        const searchData = await searchRes.json();

        const videoIds = searchData.items
          .filter(item => item.id && item.id.kind === "youtube#video")
          .map(item => item.id.videoId);

        if (!videoIds.length) break;

        const statsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds.join(',')}&part=statistics,snippet`
        );
        const statsData = await statsRes.json();

        // Merge results into videos array
        statsData.items.forEach(video => {
          videos.push({
            id: video.id,
            title: video.snippet.title,
            views: (video.statistics && video.statistics.viewCount) ? parseInt(video.statistics.viewCount, 10) : 0,
            publishedAt: video.snippet.publishedAt,
            channel: video.snippet.channelTitle
          });
        });

        nextPageToken = searchData.nextPageToken;
      } while (nextPageToken);
    } catch (err) {
      console.error('YouTube API error', err);
    }

    if (!videos.length) return;

    // --- Build final list according to your rules ---
    // 1) Top viewed short (highest views) first
    // 2) Then other shorts having >=10K views (ordered by views desc)
    // 3) Finally, the most recently uploaded short (regardless of view count) — appended if not already present
    // 4) Limit total to 10

    // ensure unique by id
    const uniqueById = {};
    videos = videos.filter(v => {
      if (uniqueById[v.id]) return false;
      uniqueById[v.id] = true;
      return true;
    });

    // high view videos (>= 10k)
    const highViewVideos = videos.filter(v => v.views >= 10000);

    // sort high view videos by views desc
    highViewVideos.sort((a, b) => b.views - a.views);

    // top viewed (highest)
    const topViewed = highViewVideos.length ? highViewVideos[0] : null;

    // rest of high view videos excluding top
    const restHighViews = highViewVideos.length > 1 ? highViewVideos.slice(1) : [];

    // latest overall (by publishedAt)
    const latestVideo = [...videos].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];

    // combine
    let finalVideos = [];
    if (topViewed) finalVideos.push(topViewed);
    finalVideos = finalVideos.concat(restHighViews);

    if (latestVideo && !finalVideos.find(v => v.id === latestVideo.id)) {
      finalVideos.push(latestVideo);
    }

    // ensure we still have meaningful items — if not enough high views, fill with next best by views
    if (finalVideos.length < 10) {
      // get all videos sorted by views desc
      const othersByViews = videos
        .filter(v => !finalVideos.find(f => f.id === v.id))
        .sort((a, b) => b.views - a.views);
      const need = 10 - finalVideos.length;
      finalVideos = finalVideos.concat(othersByViews.slice(0, need));
    }

    // cap at 10
    finalVideos = finalVideos.slice(0, 10);

    // Append slides (use thumbnails first to avoid heavy iframe load if desired)
    finalVideos.forEach(video => {
      const formattedViews = formatViewsCount(video.views);

      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');
      slide.innerHTML = `
        <div class="youtube-slide">
          <div class="youtube-thumb-wrapper" data-video-id="${video.id}">
            <img class="youtube-thumb" alt="${video.title}" src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" loading="lazy" />
            <button class="youtube-play-btn" aria-label="Play ${video.title}">&#9658;</button>
          </div>
          <div class="youtube-info">
            <p class="title"><span class="shorts-icon"></span>${video.title}</p>
            <p class="views">${formattedViews}</p>
          </div>
        </div>
      `;
      videoWrapper.appendChild(slide);
    });

    // Lazy replace thumbnail with iframe on click to improve performance
    videoWrapper.addEventListener('click', function(e) {
      const btn = e.target.closest('.youtube-play-btn');
      if (!btn) return;
      const wrapper = btn.closest('.youtube-thumb-wrapper');
      const vid = wrapper.getAttribute('data-video-id');
      // replace wrapper content with iframe
      wrapper.innerHTML = `<iframe src="https://www.youtube.com/embed/${vid}?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    });

    // Initialize swiper after a tiny timeout to ensure DOM painted
    setTimeout(initYouTubeSwiper, 100);
  }

  function initYouTubeSwiper() {
    // Destroy existing swiper instance if any (safe-guard)
    if (window.__wanderYouTubeSwiper && window.__wanderYouTubeSwiper.destroy) {
      try { window.__wanderYouTubeSwiper.destroy(true, true); } catch(e) {}
    }

    const swiper = new Swiper('.init-swiper', {
      loop: true,
      speed: 600,
      autoplay: { delay: 4000, disableOnInteraction: false },
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 20,
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      },
      initialSlide: 0
    });

    // Ensure slider shows the first real slide (top viewed) when using loop
    // slideToLoop(0, 0) moves to the "first" slide taking looping duplicates into account
    swiper.slideToLoop(0, 0, false);

    // expose for potential debugging
    window.__wanderYouTubeSwiper = swiper;

    // reveal wrapper
    if (videoWrapper) videoWrapper.style.visibility = 'visible';
  }

  // Start fetching shorts
  getAllVideos();

})();
