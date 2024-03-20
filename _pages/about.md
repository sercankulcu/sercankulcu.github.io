---
layout: archive
permalink: /
title: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

<img align="right" width="150" alt="owl coffee beans" src="/images/owl-coffee-beans.png">

Greetings,

I'm Sercan Külcü, an assistant professor in the computer science department at Giresun University. As a hands-on software engineer with over 15 years of experience, I am a versatile and driven professional with a PhD in wireless communication. I am highly skilled in low-power wireless communication, embedded and real-time operating systems, C/C++ programming, and machine learning applications. In addition, I have been sharing my expertise by teaching OOP and Java courses since 2015.

Warm regards,

<!-- HTML !-->
/* CSS */
.button-32 {
  background-color: #fff000;
  border-radius: 12px;
  color: #000;
  cursor: pointer;
  font-weight: bold;
  padding: 10px 15px;
  text-align: center;
  transition: 200ms;
  width: 100%;
  box-sizing: border-box;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-32:not(:disabled):hover,
.button-32:not(:disabled):focus {
  outline: 0;
  background: #f4e603;
  box-shadow: 0 0 0 2px rgba(0,0,0,.2), 0 3px 8px 0 rgba(0,0,0,.15);
}

.button-32:disabled {
  filter: saturate(0.2) opacity(0.5);
  -webkit-filter: saturate(0.2) opacity(0.5);
  cursor: not-allowed;
}

<button class="button-32" role="button" onclick="window.location.href = 'mantra/index.html';">Mantra App</button>

**Note:** If any licensed content is found on the website, please don't hesitate to contact me via the links on the left-hand side. You can be sure that any related content will be quickly removed within 24 hours.

<script>
        if ('serviceWorker' in navigator) {
         window.addEventListener('load', function () {
          navigator.serviceWorker.register('/assets/js/service-worker.js').then(function (registration) {
           console.log('Registered!');
          }, function (err) {
           console.log('ServiceWorker registration failed: ', err);
          }).catch(function (err) {
           console.log(err);
          });
         });
        } else {
         console.log('service worker is not supported');
        }
       </script>

<!--
<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="sercankulc" data-description="Support me on Buy me a coffee!" data-message="Thank you for visiting!" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
-->
