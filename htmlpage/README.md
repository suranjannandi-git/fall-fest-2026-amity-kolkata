# Qiskit Fall Fest 2026 — Static Event Website

A modern, responsive, lightweight single-page website for **Qiskit Fall Fest 2026** at Amity University Kolkata.

## Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, grid, flexbox, animations
- **Vanilla JavaScript** — no frameworks or dependencies

## Project Structure

```
htmlpage/
├── index.html               ← Single-page app entry point
├── css/
│   └── style.css            ← All styles (dark quantum theme)
├── js/
│   └── script.js            ← Navigation, animations, canvas
├── images/
│   ├── speakers/            ← Place speaker photos here (JPG/WebP)
│   ├── organizers/          ← Place organizer photos here (JPG/WebP)
│   └── supporters/          ← Place supporter logos here (PNG/SVG)
├── assets/
│   └── og-image.png         ← Open Graph preview image (1200×630)
└── README.md
```

## Getting Started

No build step required. Simply open `index.html` in a browser:

```bash
open htmlpage/index.html
# or
python3 -m http.server 8080 --directory htmlpage
```

## Customisation Checklist

Before launch, replace all `TBD` and placeholder values:

### Event Details
- [ ] Event date — search for `DATE TBD`
- [ ] Venue — search for `VENUE TBD`
- [ ] Event time — search for `TIME TBD`
- [ ] Registration fee — search for `FEE TBD`

### Registration
- [ ] Replace `GOOGLE_FORM_URL_HERE` in `index.html` (Register section) with the actual Google Form URL
- [ ] Update `CONTACT_EMAIL_HERE` in the Supporters section

### Speakers (3 placeholders)
- Replace `Speaker Name TBD`, `Title / Affiliation TBD`, and `Talk: Title TBD`
- Add speaker photos to `images/speakers/` and update `<img>` tags inside `.speaker-avatar`

### Organizers (4 placeholders)
- Replace `Organizer Name TBD` and `Role TBD`
- Add photos to `images/organizers/`

### Supporters (5 placeholders)
- Replace `Supporter TBD` with actual supporter names/logos
- Add logo images to `images/supporters/`

### About Section
- Replace `[ORGANIZATION NAME / CLUB TBD]` with your club/society name
- Update the vision and mission paragraphs

### SEO & Social
- Update `og:image` path once `assets/og-image.png` is created (1200×630 px)
- Update the `og:url` meta tag with the live URL

## Sections

| ID | Section |
|---|---|
| `#home` | Hero, highlights, registration CTA |
| `#resources` | Quantum computing & Qiskit learning links |
| `#speakers` | Speaker cards |
| `#organizers` | Organizing team |
| `#supporters` | Partner logos |
| `#about` | Organization vision & mission |
| `#register` | Registration info + Google Form CTA |

## Features

- 🌑 Dark quantum-tech aesthetic with purple/cyan palette
- ✨ Animated particle canvas on hero (pure canvas API)
- 📱 Fully responsive — hamburger menu on mobile
- 🎬 Scroll-reveal animations (IntersectionObserver)
- 🔗 Active navigation state tracking
- ⚡ No external dependencies — ultra-fast loading
- ♿ Semantic HTML5 + ARIA labels + keyboard accessible
- 🔍 SEO metadata + Open Graph tags

## License

Event site — Amity University Kolkata Qiskit Community, 2026.
