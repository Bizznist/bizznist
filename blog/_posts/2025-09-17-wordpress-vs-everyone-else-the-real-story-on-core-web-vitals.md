---
title: "WordPress vs Everyone Else: The Real Story on Core Web Vitals"
date: 2025-09-17T15:26:00.000+05:30
author: Reema Roy
thumbnail: /assets/uploads/blog/wordpress-vs-other-cms-core-web-vitals-performance-compared-2025-.png
slug: wordpress-vs-other-cms-core-web-vitals
meta_title: "WordPress vs Other CMS: Core Web Vitals Performance Compared (2025)"
meta_description: See how WordPress stacks up against Wix, Duda, Squarespace &
  others in Google’s Core Web Vitals. Why WordPress lags, and how to optimize
  for speed.
meta_keywords:
  - wordpress core web vitals
  - wordpress vs wix speed
  - cms performance comparison 2025
  - best cms for google core web vitals
  - duda vs wordpress performance
  - wordpress site speed optimization
  - wordpress seo and page experience
  - improve wordpress core web vitals
  - cms with best user experience
  - wordpress vs squarespace speed test
---
If you care about website performance — real speed, smoothness, responsiveness — then you’ve probably heard a lot lately about **Core Web Vitals (CWV)**. These are a set of metrics from Google intended to measure how users experience your site: not just whether it loads, but how stable it is, how quickly it becomes interactive, how visually smooth the loading feels.

There are several content management systems (CMSs) out there — WordPress, Wix, Duda, Drupal, Squarespace, Joomla, etc. — and recently there has been fresh data from HTTP Archive + CrUX (the Chrome UX Report) about how well each CMS performs on these Core Web Vitals. Let me walk you through what I found, including the small stuff, the caveats, and what it likely means, especially if you’re using or thinking of using WordPress.

## What’s the data, exactly?

* Sources: 

  * The Core Web Vitals Technology Report 2023 (July update) by HTTP Archive and related data sets.
  * Chrome UX Report (CrUX) + lab-tests (HTTPArchive) to measure “real user” and “lab / architecture” metrics. 
* What metrics are used / how collected:

  * CrUX: data from actual users using Chrome who have opted in, so it reflects real world performance. 
  * HTTP Archive: lab tests, looking at how sites are built, code, best practices, etc. This helps understand structural / design / theme / plugin issues, etc.

They compare percentage of sites built with each CMS that meet CWV criteria (i.e. “good” CWV score). Also tracking month-over-month change (from June to July) to see improvement rates. 

## What are the results? Who’s doing well, who’s lagging

Here are the big numbers (July):

| **CMS**         | **% of sites meeting good CWV score (July)**                   | **Month-over-month gain (June→July)**               |
| --------------- | -------------------------------------------------------------- | --------------------------------------------------- |
| **Duda**        | 84.96% — best among the group *(RS Web Solutions)*             | +1.33% *(Search Engine Journal)*                    |
| **Wix**         | 73.37% *(Search Engine Journal)*                               | +2.61% *(RS Web Solutions)*                         |
| **Squarespace** | 68.93% *(Search Engine Journal)*                               | +1.27% *(RS Web Solutions)*                         |
| **Drupal**      | 60.54% *(Search Engine Journal)*                               | +1.47% *(RS Web Solutions)*                         |
| **Joomla**      | 54.78% *(RS Web Solutions)*                                    | +3.23% — largest gain *(Search Engine Journal)*     |
| **WordPress**   | 44.34% — lowest among evaluated CMSs *(Search Engine Journal)* | +0.90% — also lowest gain *(Search Engine Journal)* |



So key takeaways:

* WordPress has the lowest proportion of sites meeting good CWV among these CMSs in July. Only ~44.3% of WordPress-sites meet the criteria. 
* The improvement for WordPress from June to July is also minimal (0.90%) compared to others — e.g. Joomla had a +3.23%.
* On the positive side, everyone is improving. No platform is static (even WordPress improved, albeit slowly). 

## Why is WordPress behind? The small, technical, human factors

It’s not just that WordPress is slow out of the box. There are multiple interlocking reasons why its metrics lag:

1. Technical Debt

   WordPress has been around for a long time. It started as a blogging platform, back in the days when requirements were simpler. Over time, it's grown, accumulated many features, and of course, backward compatibility has always been a major concern. This means there is a lot of legacy code, architecture constraints, and decisions made long ago that are hard to undo without breaking existing sites or themes/plugins. 
2. Plugins / Themes Ecosystem Complexity

   Because WordPress is so flexible, lots of sites use themes and plug-ins, many of which are developed by different people, with different priorities. Some are optimized; many are not. Plugins can introduce bloat (scripts, CSS, images) that hurt CWV (e.g. layout shifts, slow loading, long interactions). Though the report does not quantify plugin usage per se, it’s implicit in the ecosystem.
3. Variability of Setup

   A WordPress site can be very high performance if the theme is optimized, if you pick good hosting, if you limit heavy plug-ins, do image optimization, lazy loading, etc. But many WordPress users do not do all that, and this drags the average down. In contrast, with proprietary / “all-in-one” CMSs (Wix, Duda, Squarespace), there is more control over many parts of the stack and less divergence among sites.
4. Release Cycle / Innovation Pace

   The report highlights that WordPress has lately moved to a slower release cycle (annual) to allow time to address its technical debt. 

   Also, the contributor ecosystem (volunteers) shows signs of strain: burnout, lack of systemic supports, and legacy burdens. This slows down how quickly improvements can be rolled out and how aggressively optimizations can be baked into core. 
5. Perception vs Reality

   There is a commonly held belief among many that “WordPress is fast” or “WordPress is better for SEO” etc. But the numbers show that at least in terms of Core Web Vitals, that perception is not supported. The article mentions that many people think WordPress outperforms Wix/Duda/Squarespace etc., but in this metric, WordPress is the slowest in terms of % of sites passing. 

## But: does it matter for SEO / rankings / business?

Here’s where things get nuanced: performance (CWV) is one set of ranking / experience factors. It’s important, but it is not the only thing. The article and report point out several subtleties:

* Even though WordPress is behind in CWV performance, WordPress sites still rank well. So far, poor CWV does not seem to be destroying WordPress sites in search results. 
* SEO is multi-factorial: content quality, backlinks, domain strength, relevance, proper on-page optimization, mobile friendliness, technical SEO beyond CWV (e.g. structure, sitemaps, crawlability) etc. CWV helps, especially for user experience, bounce rates, etc., but likely only gives incremental advantages in many cases.
* For user experience, conversion, retention, bounce rate, etc., CWV matters more. If your site is too slow, too janky, has layout shifts etc., real users will leave or get frustrated. That has real business cost even if search ranking is okay.

So, while WordPress being behind hurts (especially in the experience domain, for conversions, UX, etc.), it's not a death sentence for SEO. But the gap does mean that to stay competitive (especially against simpler turnkey platforms that are more optimized), WordPress users need to work harder.

## What can WordPress users / developers do to catch up?

If you're using WordPress (or considering it), here are detailed-level practices and strategies to boost CWV, close the gap, and avoid the pitfalls:

1. Choose a lightweight theme / framework

   Avoid overly bloated themes. Choose ones that load minimal CSS/JS, have deferred loading, critical CSS, etc. Themes optimized for performance (e.g. block themes, lightweight builder-themes) tend to fare much better.
2. Minimize and optimize plugins

   Use only necessary plugins. Review plugin performance: which ones are adding scripts, CSS, fonts, images, etc. Deactivate or replace plugins that drag performance. For example, avoid plugins that load many third-party scripts or render heavy UI components if not needed.
3. Host well

   Hosting infrastructure matters: fast servers, good CDN, compression, caching, HTTP/2 or HTTP/3, etc. A weak hosting environment can kill CWV no matter what you optimize in code.
4. Optimize images, fonts, assets

   Lazy-load images, use modern formats (webp, AVIF where possible), optimize delivery of fonts (preload, subset, or remove unused font faces), minimize render-blocking CSS/JS, etc.
5. Reduce layout shifts

   One of the CWV metrics is Cumulative Layout Shift (CLS). To reduce this, set width/height for images and other media, ensure ads or embeds don’t suddenly inject content, avoid unexpected DOM changes, etc.
6. Optimize interactivity (First Input Delay, Interaction to Next Paint, etc.)

   Reduce main thread work. Limit heavy Javascript. Defer JS. Use code splitting. Avoid too many long tasks. Use tools to audit (Lighthouse, WebPageTest, etc.).
7. Monitor real user metrics

   Use CrUX / Google’s PageSpeed Insights / Real-User Monitoring (RUM) to see how actual visitors are experiencing your site, not just lab tests.
8. Keep WordPress core, themes, plugins updated

   Updates often include performance improvements (gutenberg, block editor improvements, etc.). Also, security. But beware: sometimes updates introduce regressions — test before pushing to production.
9. Consider static or hybrid rendering where possible

   For certain content that doesn’t change often, static generation or caching nearly static content can help massively reduce delays and unpredictability.
10. Contribute / support ecosystem improvements

    If you are in a position to help (e.g. theme/plugin developer, contributor), pushing for performance-aware coding, raising awareness about technical debt, etc., helps everyone.

## Implications: what this means for people deciding or maintaining sites

Putting this all together, here are what I believe are the implications, especially for people making decisions:

* If you are starting a new site, especially one where user experience, speed, and conversions matter (ecommerce, content heavy, mobile users, etc.), then you might want to consider whether a more performance-focused CMS (or a managed platform) could make your life easier.
* If you're already on WordPress, know that you can do well, but you’ll need to invest more (in theme, hosting, optimization) than on some other CMSs which are more “out-of-the-box” consistent in these metrics.
* For business owners: performance is increasingly visible and important—not only for SEO but for user retention and satisfaction. A slow, jerky site might not kill rankings immediately, but it kills user trust, bounce rates, conversion, repeat visits. That cost adds up.
* For developers / agencies: this is a differentiator. If you can build WordPress sites that perform well in CWV, that becomes a competitive advantage. But you also need to keep up on new tools, new practices, and push back against legacy code, over-pluginization, etc.
* For the WordPress project as a whole: technical debt, contributor burnout, and backward compatibility will continue to be challenges. The shift to slower release cycles may help; but it also needs active efforts (maybe in core, in themes, in standards for plugin/theme dev) to emphasize performance best practices as baseline.

## Limitations & Caveats: What the data doesn't tell you

To be fair, no data is perfect, and there are several caveats worth knowing:

* The metric “percentage of sites meeting CWV” is an average across many sites, many themes, many plugins. Outliers (very badly configured sites) pull the average down. If you pick top-tier setups, you’ll likely be above average.
* “Good CWV” is a composite of several metrics; depending on what metric is most problematic for a particular CMS, you may suffer or excel in different areas.
* Some performance issues are aesthetic or architectural choices which aren’t always under CMS control, e.g. heavy media, large images, external embeds, ads, third-party scripts. So even a fast CMS can be slowed by bad implementation.
* Geographic variability, device variability (mobile vs desktop), network speed, user device capabilities, etc., matter a lot. Users on slow connections will always see different real experiences.
* The improvements in percentage gains (month to month) show momentum, but even a high improvement doesn’t guarantee that many slow / poor sites have been fixed — it might be that many smaller, easier fixes are being addressed, leaving harder ones to lag.
* Also, SEO ranking factors change; Google may weigh CWV more or less over time; but as of now, CWV is important but not the only thing.

## My take: Is WordPress still “good enough”?

Yes — in many cases, WordPress is still “good enough,” especially if you are willing to put in the effort. But if speed, performance, user experience are central to what you’re building, then WordPress is more of a challenge compared to some more optimized platforms.

If I were you deciding today:

* If you need flexibility, many plugins, custom themes, lots of content, etc., WordPress is probably still the best bet — but budget time and resources for optimization.
* If your site is relatively simpler or more “set-and-forget,” or you want minimal maintenance, a CMS like Duda or one of the others might give you better baseline performance without as much effort.
* Also think ahead: as performance becomes more important (users expect instant, smooth, no layout shifts), the gap may widen; being ahead now means gaining advantage later.

## Conclusion

In short:

> WordPress is powerful, flexible, mature. But when it comes to Core Web Vitals, it lags behind many competitors in what % of sites achieve “good” scores, and its improvement rate is modest. There are structural, ecosystem, human challenges behind that (technical debt, plugin/theme variability, hosting, etc.). But it can be fixed or mitigated with the right tech choices and effort.

If you care about UX, conversion, speed — you can’t ignore CWV. And right now, WordPress users have a steeper hill to climb than some others. But that doesn’t mean you can’t reach the summit.
