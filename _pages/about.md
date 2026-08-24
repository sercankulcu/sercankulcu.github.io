---
layout: archive
permalink: /
title: "About Me"
author_profile: true
redirect_from:
  - /about/
---

<img align="right" width="150" alt="owl coffee beans" src="/images/owl-coffee-beans.webp">

I am Sercan Külcü, an Assistant Professor in the Department of Computer Engineering at Giresun University. I have over 20 years of professional experience in software engineering and hold a PhD focused on low-power wireless communication technologies. My work focuses on software engineering, embedded systems, programming, algorithms, and interactive tools for computer science education. I use this website to share teaching materials, technical work, software experiments, and selected writings.

<p id="install" style="display: none;">For easier mobile access, <button id="installPWA">🚀 Install App</button> directly on your device.</p>

<style>
button {
  margin: 0.25rem 0.12rem;
}
</style>

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

Explore my courses through <button type="button" onclick="window.location.href='/teaching/'">📚 Teaching</button>, use practical tools in <button type="button" onclick="window.location.href='/apps/'">📱 Apps</button>, try interactive projects in <button type="button" onclick="window.location.href='https://dorukdayim.netlify.app'">🧠 Games</button>, review my background in <button type="button" onclick="window.location.href='/cv/'">📄 CV</button>, or browse useful links in <button type="button" onclick="window.location.href='/bookmarks/'">🔖 Bookmarks</button>.

Read technical notes in <button type="button" onclick="window.location.href='/posts/'">💻 Technical Blog</button>, explore writing tools in <button type="button" onclick="window.location.href='/pencils/'">✏️ Pencils</button>, discover broader topics in <button type="button" onclick="window.location.href='/humanity/'">🌍 Humanity</button>, or read observations about the world in <button type="button" onclick="window.location.href='/nature/'">🌿 Nature</button>.

I keep personal stories in <button type="button" onclick="window.location.href='/memory/'">🕰️ Memory</button>, essays and observations in <button type="button" onclick="window.location.href='/thoughts/'">💭 Thoughts</button>, and writing about films, games, music, and other things I enjoy in <button type="button" onclick="window.location.href='/fun/'">🎬 Fun</button>.

**Note:** If you believe any content on this website infringes a license or copyright, please contact me. I will review and remove the material promptly if necessary.

<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="sercankulc" data-description="Support me on Buy me a coffee!" data-message="Thank you for visiting!" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>