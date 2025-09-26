document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ ads.js is running");

  fetch("/content/data/ads.json")
    .then(res => res.json())
    .then(adMap => {
      Object.keys(adMap).forEach(id => {
        const slot = document.getElementById(id);
        if (slot) {
          slot.innerHTML = adMap[id]; // insert HTML first

          // Special case for this external ad script
          if (id === "ad-slot") {
            const script = document.createElement("script");
            script.src = "//wormdistressedunit.com/0a87f1b8f78366019c87f1e94c2638ae/invoke.js";
            script.setAttribute("async", "");
            script.setAttribute("data-cfasync", "false");
            slot.appendChild(script);
            console.log("🟢 External ad script injected into #ad-slot");
          }

          // If AdSense (optional)
          try {
            if (window.adsbygoogle) {
              (adsbygoogle = window.adsbygoogle || []).push({});
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
