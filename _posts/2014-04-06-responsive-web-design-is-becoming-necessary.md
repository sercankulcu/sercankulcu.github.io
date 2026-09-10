---
title: 'Responsive Web Design Is Becoming Necessary'
date: 2014-04-06
permalink: /posts/2014/04/responsive-web-design-is-becoming-necessary/
tags:
  - web
  - responsive-design
  - mobile
---

A few years ago, designing a website meant designing for a computer screen. The assumption was safe enough when the percentage of web traffic from phones was in single digits. In 2014, that assumption is becoming dangerous.

According to StatCounter data from early 2014, mobile devices now account for roughly a quarter of global web traffic. In some markets — parts of Asia and Africa, where mobile is the primary internet access point — the number is far higher. The question is no longer whether to address mobile users, but how.

## Where the idea came from

The term "responsive web design" was coined by Ethan Marcotte in an article published in A List Apart in May 2010. Marcotte's article described three techniques used together: fluid grids (layouts built in proportional units rather than fixed pixels), flexible images (images that scale within their containers), and CSS media queries (rules that apply different styles based on the characteristics of the display).

The Boston Globe's redesign in 2011 — led by Marcotte's agency — was the most prominent early example. Instead of maintaining a separate mobile version of the site (the common approach at the time, often at a subdomain like m.example.com), the Boston Globe served a single page that rearranged itself based on the available width. A three-column layout on a wide screen became a single column on a narrow phone screen, with navigation adapted for touch.

Marcotte expanded the concept into a short book, also titled "Responsive Web Design," published by A Book Apart in 2011.

## The technical pieces

**CSS media queries** are the mechanism at the center of responsive design. A media query is a conditional rule in CSS:

```css
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
  .main-content {
    width: 100%;
  }
}
```

This rule says: when the viewport is 768 pixels or narrower, hide the sidebar and make the main content fill the full width. Media queries can target width, height, resolution, and orientation. The breakpoints — the widths where the layout changes — are chosen by the designer based on where the layout starts to break down, rather than targeting specific devices.

**The viewport meta tag** is a second necessary piece that many developers initially missed. Without it, a mobile browser renders the page at a simulated desktop width and then scales the result down, producing tiny illegible text. Adding this tag tells the browser to use the actual device width:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

**Fluid grids** use percentages instead of fixed pixel widths. A sidebar that is `width: 300px` on every screen will overflow on a 320-pixel phone. A sidebar that is `width: 30%` shrinks proportionally. Combined with a maximum width on the container, this produces layouts that work across a wide range of screen sizes.

## The alternative and why it falls short

The alternative approach — a separate mobile site at a different URL — has real costs. Every content update must be made twice. Links to the desktop site from a mobile device deliver the wrong experience. Search engines may see the content as duplicate. The mobile version is often a simplified subset of the full site, which means mobile users see less.

Responsive design treats these as the same site because they are the same site. The content does not change based on screen size — only the presentation does.

## The constraint as improvement

What strikes me about responsive design is that the constraints it imposes tend to improve the design for everyone, not just mobile users.

A navigation menu with thirty items does not work on a small touch screen. Redesigning it to be more focused also makes it easier to use on a desktop. A large decorative image that makes a page slow to load on a mobile connection makes the page unnecessarily heavy everywhere. Asking "what is the most important thing on this page?" is a question worth answering regardless of screen size.

The web was created to work across different computers and operating systems. Responsive design is a continuation of that original intention: a page should belong to the web, not to one class of device.
