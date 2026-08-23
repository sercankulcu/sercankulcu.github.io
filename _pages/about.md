---
layout: archive
permalink: /
title: "About Me"
author_profile: true
redirect_from:
  - /about/
---

<img align="right" width="150" alt="owl coffee beans" src="/images/owl-coffee-beans.webp">

I am Sercan Külcü, an Assistant Professor in the Department of Computer Engineering at Giresun University. I have over 20 years of professional experience in software engineering and hold a PhD focused on low-power wireless communication technologies. My academic and technical interests include embedded and real-time operating systems, programming in C, C++, and Java, machine learning, and building small JavaScript applications and interactive teaching tools. This website is both a professional archive and a personal notebook. I use it to collect teaching materials, technical notes, small software experiments, longer essays, memories, and subjects I enjoy exploring over time.

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

Learn about my <a class="btn btn--inverse" href="/teaching/">📚 Teaching</a> materials and courses, try the <a class="btn btn--inverse" href="/apps/">📱 Apps</a> and <a class="btn btn--inverse" href="https://dorukdayim.netlify.app">🧠 Games</a> I have created, or visit my <a class="btn btn--inverse" href="/cv/">📄 CV</a> and <a class="btn btn--inverse" href="/bookmarks/">🔖 Bookmarks</a>. My <a class="btn btn--inverse" href="/posts/">💻 Technical Blog</a> mainly contains writing about computers, software, programming, engineering, and the history of technology. I keep personal stories in <a class="btn btn--inverse" href="/memory/">🕰️ Memory</a>, essays and observations in <a class="btn btn--inverse" href="/thoughts/">💭 Thoughts</a>, and writing about films, games, music, and other things I enjoy in <a class="btn btn--inverse" href="/fun/">🎬 Fun</a>. I also maintain collections about <a class="btn btn--inverse" href="/pencils/">✏️ Pencils</a>, <a class="btn btn--inverse" href="/humanity/">🌍 Humanity</a>, and <a class="btn btn--inverse" href="/nature/">🌿 Nature</a>.


**Note:** If you believe any content on this website infringes a license or copyright, please contact me. I will review and remove the material promptly if necessary.

<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="sercankulc" data-description="Support me on Buy me a coffee!" data-message="Thank you for visiting!" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>