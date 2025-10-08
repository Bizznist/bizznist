document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ DOM fully loaded");

  function waitForElement(selector, callback, interval = 100, timeout = 5000) {
    const start = Date.now();
    const timer = setInterval(() => {
      const el = document.querySelector(selector);
      if (el) {
        clearInterval(timer);
        callback(el);
      } else if (Date.now() - start > timeout) {
        clearInterval(timer);
        console.warn(`⏱️ Timeout: ${selector} not found after ${timeout}ms`);
      }
    }, interval);
  }

  waitForElement('.mobile-nav-toggle', function (mobileNavToggleBtn) {
    console.log("✅ Found toggle after wait:", mobileNavToggleBtn);

    mobileNavToggleBtn.addEventListener('click', function () {
      console.log("✅ Toggle clicked");
      document.body.classList.toggle('mobile-nav-active');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });

    document.querySelectorAll('#navmenu a').forEach(link => {
      link.addEventListener('click', () => {
        if (document.body.classList.contains('mobile-nav-active')) {
          document.body.classList.remove('mobile-nav-active');
          mobileNavToggleBtn.classList.add('bi-list');
          mobileNavToggleBtn.classList.remove('bi-x');
        }
      });
    });

    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(toggle => {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        const parentLi = this.closest('li');
        const submenu = parentLi.querySelector('ul');
        parentLi.classList.toggle('active');
        if (submenu) submenu.classList.toggle('dropdown-active');
      });
    });
  });

  // ============ Other FlexStart Script Logic Below ============

  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' });
  }

  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({ filter: this.getAttribute('data-filter') });
        if (typeof aosInit === 'function') aosInit();
      }, false);
    });
  });

  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());
      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }
  window.addEventListener("load", initSwiper);

  window.addEventListener('load', function() {
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

  let navmenulinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
});


// ======= include.js =======
function includeHTML(selector, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      const element = document.querySelector(selector);
      if (element) element.innerHTML = data;
    })
    .catch(err => console.error(`Error loading ${file}:`, err));
}

// New function to inject scripts into head
function includeTracking(file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      const fragment = document.createRange().createContextualFragment(data);
      document.head.appendChild(fragment);
    })
    .catch(err => console.error(`Error loading ${file}:`, err));
}

document.addEventListener("DOMContentLoaded", function () {
  includeHTML("header", "/header.html");
  includeHTML("footer", "/footer.html");
  includeTracking("/tracking.html"); // <-- injects tracking code into <head>
});


// ======= inject-global-scripts.js =======
document.addEventListener("DOMContentLoaded", function () {
  // Inject HEAD includes
  fetch('/assets/includes/head-includes.html')
    .then(res => res.text())
    .then(html => {
      document.head.insertAdjacentHTML('beforeend', html);
    });

  // Inject BODY includes
  fetch('/assets/includes/body-includes.html')
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);
    });
});


// ======= ads.js =======
document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ ads.js is running");

  fetch("/content/data/ads.json")
    .then(res => res.text()) // fetch as text first
    .then(text => {
      // Remove frontmatter if exists
      const jsonText = text.replace(/---[\s\S]*?---/, '').trim();
      return JSON.parse(jsonText);
    })
    .then(data => {
      const adList = data.ad_blocks || [];
      adList.forEach(ad => {
        const el = document.getElementById(ad.slot_id);
        if (el) {
          el.innerHTML = ad.code;

          // AdSense support (optional)
          try {
            if (window.adsbygoogle) {
              (adsbygoogle = window.adsbygoogle || []).push({});
            }
          } catch (e) {}

          // External script support
          if (ad.code.includes("<script") && ad.code.includes("src=")) {
            const match = ad.code.match(/src=["']([^"']+)["']/);
            if (match) {
              const script = document.createElement("script");
              script.src = match[1];
              script.async = true;
              script.setAttribute("data-cfasync", "false");
              el.appendChild(script);
              console.log(`🟢 Loaded external ad script into #${ad.slot_id}`);
            }
          }

        } else {
          console.warn(`⚠️ No div found for ID: ${ad.slot_id}`);
        }
      });
    })
    .catch(err => {
      console.error("❌ Failed to load ads.json", err);
    });
});
