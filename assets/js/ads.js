document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ ads.js is running");

  fetch("/content/data/ads.json")
    .then(res => res.json())
    .then(adMap => {
      console.log("✅ Loaded ad map:", adMap);

      Object.keys(adMap).forEach(id => {
        const slot = document.getElementById(id);
        if (slot) {
          slot.innerHTML = adMap[id];
          console.log(`✅ Injected ad into: #${id}`);

          try {
            if (window.adsbygoogle) {
              (adsbygoogle = window.adsbygoogle || []).push({});
              console.log("🟢 AdSense triggered");
            }
          } catch (e) {
            console.warn("⚠️ AdSense push failed:", e);
          }
        } else {
          console.warn(`⚠️ No element found with ID: ${id}`);
        }
      });
    })
    .catch(err => {
      console.error("❌ Failed to load ads.json", err);
    });
});
