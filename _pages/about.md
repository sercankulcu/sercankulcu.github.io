---
layout: archive
permalink: /
title: "About Me"
author_profile: true
redirect_from:
  - /about/
---

<!--  <img align="right" width="150" alt="owl coffee beans" src="/images/owl-coffee-beans.webp"> -->

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

I am Sercan Külcü, an Assistant Professor of Computer Engineering at Giresun University.

I studied Computer Engineering at Hacettepe University and spent much of my professional career developing software for real-world engineering systems, including ten years at SDT Space & Defence Technologies. After that, I moved into academia and have spent more than ten years in research and teaching.

My interests span software engineering, embedded systems, machine learning, computer vision, algorithms, and intelligent systems.

This website brings together my academic work, software projects, teaching materials, technical notes, personal writing, and other things I find worth exploring.

<p id="install" style="display: none;">For easier mobile access, <button id="installPWA">🚀 Install App</button> directly on your device.</p>

**Explore the site**

[📚 Teaching](/teaching/) · [📄 CV](/cv/) · [🛠️ Apps](/apps/) · [🎮 Games](/games/) · [💻 Posts](/posts/) · [💭 Thoughts](/thoughts/) · [🎬 Fun](/fun/) · [🕰️ Memory](/memory/) · [🌍 Humanity](/humanity/) · [🌿 Nature](/nature/) · [✏️ Pencils](/pencils/) · [🔖 Bookmarks](/bookmarks/)

**Note:** If you believe any content on this website infringes a license or copyright, please contact me. I will review and remove the material promptly if necessary.

<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="sercankulc" data-description="Support me on Buy me a coffee!" data-message="Thank you for visiting!" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>