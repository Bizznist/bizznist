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
