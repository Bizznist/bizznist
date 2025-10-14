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

    do {
      const searchRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&pageToken=${nextPageToken}`
      );
      const searchData = await searchRes.json();

      const videoIds = searchData.items
        .filter(item => item.id.kind === "youtube#video")
        .map(item => item.id.videoId);

      if (!videoIds.length) break;

      const statsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds.join(',')}&part=statistics,snippet`
      );
      const statsData = await statsRes.json();

      statsData.items.forEach(video => {
        videos.push({
          id: video.id,
          title: video.snippet.title,
          views: parseInt(video.statistics.viewCount),
          publishedAt: video.snippet.publishedAt,
          channel: video.snippet.channelTitle
        });
      });

      nextPageToken = searchData.nextPageToken;
    } while (nextPageToken);

    // Filter 10K+ view videos
    const highViewVideos = videos.filter(v => v.views >= 10000);

    // Sort high view videos by views descending
    highViewVideos.sort((a, b) => b.views - a.views);

    // Get the top-viewed one
    const topViewed = highViewVideos[0];

    // Get the most recent uploaded video overall
    const latestVideo = [...videos].sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    )[0];

    // Combine: top viewed → rest high views → latest
    let finalVideos = [];
    if (topViewed) finalVideos.push(topViewed);

    const restHighViews = highViewVideos.slice(1);
    finalVideos = finalVideos.concat(restHighViews);

    if (latestVideo && !finalVideos.find(v => v.id === latestVideo.id)) {
      finalVideos.push(latestVideo);
    }

    // Limit to 10 total
    finalVideos = finalVideos.slice(0, 10);

    // Append video slides
    finalVideos.forEach(video => {
      const formattedViews = video.views >= 1_000_000
        ? (video.views / 1_000_000).toFixed(1) + 'M'
        : (video.views / 1000).toFixed(1) + 'K';

      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');
      slide.innerHTML = `
        <div class="youtube-slide">
          <iframe src="https://www.youtube.com/embed/${video.id}" allowfullscreen></iframe>
          <div class="youtube-info">
            <p class="title"><span class="shorts-icon"></span>${video.title}</p>
            <p class="views">${formattedViews} views</p>
          </div>
        </div>
      `;
      videoWrapper.appendChild(slide);
    });

    // Wait for iframes to load before initializing swiper
    const iframes = videoWrapper.querySelectorAll('iframe');
    let loadedCount = 0;
    iframes.forEach(iframe => {
      iframe.addEventListener('load', () => {
        loadedCount++;
        if (loadedCount === iframes.length) {
          initYouTubeSwiper();
        }
      });
    });
  }

  function initYouTubeSwiper() {
    const swiper = new Swiper('.init-swiper', {
      loop: true,
      speed: 600,
      autoplay: { delay: 4000 },
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 20,
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      },
      initialSlide: 0 // ensures starts from first (top viewed)
    });

    videoWrapper.style.visibility = 'visible';
  }

  // Start fetching shorts
  getAllVideos();

})();
