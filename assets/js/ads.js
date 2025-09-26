document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ ads.js is running");

  fetch("/content/data/ads.json")
    .then(res => res.json())
    .then(adList => {
      adList.forEach(ad => {
        const slot = document.getElementById(ad.id);
        if (slot) {
          slot.innerHTML = ad.code;

          // Optional: AdSense support
          try {
            if (window.adsbygoogle) {
              (adsbygoogle = window.adsbygoogle || []).push({});
            }
          } catch (e) {
            console.warn("⚠️ AdSense push failed:", e);
          }

          // Optional: Support external JS ads like invoke.js
          if (ad.code.includes("invoke.js")) {
            const scriptMatch = ad.code.match(/src="([^"]+)"/);
            if (scriptMatch) {
              const script = document.createElement("script");
              script.src = scriptMatch[1];
              script.async = true;
              script.setAttribute("data-cfasync", "false");
              slot.appendChild(script);
              console.log(`🟢 External ad script injected for #${ad.id}`);
            }
          }
        } else {
          console.warn(`⚠️ No element found with ID: ${ad.id}`);
        }
      });
    })
    .catch(err => {
      console.error("❌ Failed to load ads.json", err);
    });
});
