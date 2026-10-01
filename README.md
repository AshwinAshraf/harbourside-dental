# Harbourside Dental: dental practice website

A single-page website for a fictional private dental practice, built with plain HTML, CSS and JavaScript. The design is calm and reassuring, aimed at families and nervous patients.

**Live site:** https://ashwinashraf.github.io/harbourside-dental/

!\[Screenshot of the Harbourside Dental homepage](docs/screenshot.png)

## Features

* **Full-width hero video** with a text overlay and a pause/play button.
* **Treatments carousel** that loops smoothly and continuously, and pauses on hover or keyboard focus.
* **Nervous patients section** that sets out the comfort options clearly.
* **First visit timeline** with a sticky video that only loads when it scrolls into view.
* **Clear price list** in an accessible table.
* **Live opening hours**, showing an "Open now" badge and highlighting today's hours.
* **Appointment request form** with "best time" choice chips, a nervous-patient option, validation as you type, and a linked error summary.
* **Mobile navigation** with a hamburger menu that closes on link tap or Escape.
* **Minimal motion and no animation library**, so the page loads fast and every section shows immediately.

## Accessibility

* Atkinson Hyperlegible, a typeface designed for readability, is used throughout.
* Semantic HTML landmarks, a skip link and visible focus outlines.
* Text contrast meets WCAG AA.
* Autoplaying video and the carousel stop when the visitor has reduced motion turned on. The carousel then becomes a swipeable row.
* Form fields have proper labels, grouped radio options, inline errors and `aria-invalid` states.
* Touch targets are at least 44px.

## Project structure

```
harbourside-dental/
├── index.html      Page markup
├── css/
│   └── styles.css  All styles
├── js/
│   └── main.js     Menu, video, carousel, opening hours and form validation
└── docs/
    └── screenshot.png
```

## Running locally

There's no build step. Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Credits

* Videos: [Mixkit](https://mixkit.co) (Mixkit Free License)
* Font: [Google Fonts](https://fonts.google.com), Atkinson Hyperlegible

The practice, its prices and its contact details are fictional. Prices are illustrative only.

