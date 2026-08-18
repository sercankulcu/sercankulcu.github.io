---
layout: archive
permalink: /
title: "About Me"
author_profile: true
redirect_from: 
  - /about/
---

<img align="right" width="150" alt="owl coffee beans" src="/images/owl-coffee-beans.webp">

I am <u>Sercan Külcü</u>, an Assistant Professor in the <u>Department of Computer Engineering</u> at <u>Giresun University</u>. I have over <u>20 years of professional experience</u> in <u>software engineering</u> and hold a <u>PhD</u> focused on <u>low-power wireless communication technologies</u>.

My interests include <u>embedded and real-time operating systems</u>, programming in <u>C</u>, <u>C++</u>, and <u>Java</u>, <u>machine learning</u>, and developing small <u>JavaScript applications</u>.

<p id="install" style="display: none;">For a better mobile experience, you can also <button id="installPWA">🚀 click to install the app</button> and access everything directly from your home screen.</p>

<script>
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    document.getElementById("install").style.display = "block";
});

document.getElementById("installPWA").addEventListener("click", async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;
    }
});

window.addEventListener("appinstalled", () => {
    document.getElementById("installPWA").style.display = "none";
});
</script>

Learn about my <a class="btn btn--inverse" href="/teaching/">📚 Teaching</a> experience, materials, and educational contributions. Check out the small <a class="btn btn--inverse" href="/apps/">📱 Apps</a> and <a class="btn btn--inverse" href="https://dorukdayim.netlify.app">🧠 Games</a> I've developed in my free time. Explore my <a class="btn btn--inverse" href="/cv/">📄 CV</a>, <a class="btn btn--inverse" href="/bookmarks/">🔖 Bookmarks</a>, and <a class="btn btn--inverse" href="/posts/">📝 Blog</a>. Read my <a class="btn btn--inverse" href="/pencils/">✏️ Pencils</a> and <a class="btn btn--inverse" href="/humanity/">🌍 Humanity</a> collections.

**Note:** If you believe any content on this website infringes a license or copyright, please contact me. I will review and remove the material promptly if necessary.

<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="sercankulc" data-description="Support me on Buy me a coffee!" data-message="Thank you for visiting!" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>