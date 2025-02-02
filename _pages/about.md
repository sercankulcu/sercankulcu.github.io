---
layout: archive
permalink: /
title: "About me"
author_profile: true
redirect_from: 
  - /about/
---

<img align="right" width="150" alt="owl coffee beans" src="/images/owl-coffee-beans.webp">

<button id="installPWA" style="display: none;">Install App</button>

<script>
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    document.getElementById("installPWA").style.display = "block";
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


I am <u>Sercan Külcü</u>, an Assistant Professor in the <u>Computer Science Department</u> at <u>Giresun University</u>. With over <u>20 years</u> of professional experience in <u>software engineering</u>, I hold a <u>PhD</u> specializing in <u>low-power wireless communication technologies</u>. My expertise spans <u>embedded</u> and <u>real-time operating systems</u>, programming in <u>C</u>, <u>C++</u>, and <u>Java</u>, as well as the application of <u>machine learning techniques</u>. Recently, I have also enjoyed developing small applications with <u>JavaScript</u>.

Learn about my teaching experience, materials, and educational contributions. [Teaching](teaching)

Check out the small apps and games I've developed with Javascript in my free time. [Apps](apps)

Explore my CV to learn about my education, professional experience, and skills. [CV](cv)

Discover my curated collection of bookmarks, featuring useful resources and interesting content. [Bookmark](bookmarks)

Read my blog posts where I share insights, experiences, and ideas on various topics. [Blog Posts](posts)

**Note:** If any licensed content is found on the website, please don't hesitate to contact me via the links on the left-hand side. You can be sure that any related content will be quickly removed within 24 hours.

<!--
<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="sercankulc" data-description="Support me on Buy me a coffee!" data-message="Thank you for visiting!" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
-->