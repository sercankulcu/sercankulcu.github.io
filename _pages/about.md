---
layout: archive
permalink: /
title: "About me"
author_profile: true
redirect_from: 
  - /about/
---

<img align="right" width="150" alt="owl coffee beans" src="/images/owl-coffee-beans.webp">

I am <u>Sercan Külcü</u>, an Assistant Professor in the <u>Computer Science Department</u> at <u>Giresun University</u>. With over <u>20 years</u> of professional experience in <u>software engineering</u>, I hold a <u>PhD</u> specializing in <u>low-power wireless communication technologies</u>. My expertise spans <u>embedded</u> and <u>real-time operating systems</u>, programming in <u>C</u>, <u>C++</u>, and <u>Java</u>, as well as the application of <u>machine learning techniques</u>. Recently, I have also enjoyed developing small applications with <u>JavaScript</u>.

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

Learn about my <button onclick="location.href='teaching'"> 📚 teaching </button> experience, materials, and educational contributions. 

Check out the small <button onclick="location.href='apps'">📱 apps</button> and <button onclick="location.href='https://dorukdayim.netlify.app'">🧠 games</button> I've developed with Javascript in my free time. 

Explore my <button onclick="location.href='cv'">📄 resume</button> to learn about my education, professional experience, and skills. 

Discover my curated collection of <button onclick="location.href='bookmarks'">🔖 bookmarks</button>, featuring useful resources and interesting content. 

Read my <button onclick="location.href='posts'">📝 blog posts</button> where I share insights, experiences, and ideas on various topics. 

**Note:** If any licensed content is found on the website, please don't hesitate to contact me via the links on the left-hand side. You can be sure that any related content will be quickly removed within 24 hours.

<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="sercankulc" data-description="Support me on Buy me a coffee!" data-message="Thank you for visiting!" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>