document.addEventListener("DOMContentLoaded", function () {
  fetch("/content/data/ads.json")
    .then(res => res.json())
    .then(adMap => {
      Object.keys(adMap).forEach(id => {
        const slot = document.getElementById(id);
        if (slot) {
          slot.innerHTML = adMap[id];

          // Run AdSense if present
          try {
            if (window.adsbygoogle) {
              (adsbygoogle = window.adsbygoogle || []).push({});
            }
          } catch (e) {
            console.warn("Ad push error:", e);
          }
        }
      });
    })
    .catch(err => {
      console.error("Ad loading failed", err);
    });
});
