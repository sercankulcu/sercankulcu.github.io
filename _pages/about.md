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

My academic and technical interests include <u>embedded and real-time operating systems</u>, programming in <u>C</u>, <u>C++</u>, and <u>Java</u>, <u>machine learning</u>, and building small <u>JavaScript applications</u> and interactive teaching tools.

This website is both a professional archive and a personal notebook. I use it to collect teaching materials, technical notes, small software experiments, longer essays, memories, and subjects I enjoy exploring over time.

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

## Explore

<a class="btn btn--inverse" href="/teaching/">📚 Teaching</a>
<a class="btn btn--inverse" href="/apps/">📱 Apps</a>
<a class="btn btn--inverse" href="https://dorukdayim.netlify.app">🧠 Games</a>
<a class="btn btn--inverse" href="/cv/">📄 CV</a>
<a class="btn btn--inverse" href="/bookmarks/">🔖 Bookmarks</a>
<a class="btn btn--inverse" href="/posts/">💻 Technical Blog</a>

## Collections

<a class="btn btn--inverse" href="/memory/">🕰️ Memory</a>
<a class="btn btn--inverse" href="/thoughts/">💭 Thoughts</a>
<a class="btn btn--inverse" href="/fun/">🎬 Fun</a>
<a class="btn btn--inverse" href="/pencils/">✏️ Pencils</a>
<a class="btn btn--inverse" href="/humanity/">🌍 Humanity</a>
<a class="btn btn--inverse" href="/nature/">🌿 Nature</a>

The <strong>Technical Blog</strong> focuses mainly on computers, software, programming, engineering, and the history of technology. <strong>Memory</strong> contains personal stories and recollections. <strong>Thoughts</strong> is for essays, observations, and reflections. <strong>Fun</strong> collects writing about films, games, music, and other things I enjoy.

**Note:** If you believe any content on this website infringes a license or copyright, please contact me. I will review and remove the material promptly if necessary.

<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="sercankulc" data-description="Support me on Buy me a coffee!" data-message="Thank you for visiting!" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>