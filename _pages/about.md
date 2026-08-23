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

Learn about my <button type="button" onclick="window.location.href='/teaching/'">📚 Teaching</button> materials and courses, try the <button type="button" onclick="window.location.href='/apps/'">📱 Apps</button> and <button type="button" onclick="window.location.href='https://dorukdayim.netlify.app'">🧠 Games</button> I have created, or visit my <button type="button" onclick="window.location.href='/cv/'">📄 CV</button> and <button type="button" onclick="window.location.href='/bookmarks/'">🔖 Bookmarks</button>.

My <button type="button" onclick="window.location.href='/posts/'">💻 Technical Blog</button> mainly contains writing about computers, software, programming, engineering, and the history of technology. I also maintain collections about <button type="button" onclick="window.location.href='/pencils/'">✏️ Pencils</button>, <button type="button" onclick="window.location.href='/humanity/'">🌍 Humanity</button>, and <button type="button" onclick="window.location.href='/nature/'">🌿 Nature</button>.

<!--
I keep personal stories in <button type="button" onclick="window.location.href='/memory/'">🕰️ Memory</button>, essays and observations in <button type="button" onclick="window.location.href='/thoughts/'">💭 Thoughts</button>, and writing about films, games, music, and other things I enjoy in <button type="button" onclick="window.location.href='/fun/'">🎬 Fun</button>.
-->


**Note:** If you believe any content on this website infringes a license or copyright, please contact me. I will review and remove the material promptly if necessary.

<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="sercankulc" data-description="Support me on Buy me a coffee!" data-message="Thank you for visiting!" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>