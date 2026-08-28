# Qiskit Fall Fest 2026 — Website

Build a **modern, responsive, lightweight single-page website** for **Qiskit Fall Fest 2026**.

## Technology

Use only:

* HTML5
* CSS3
* Vanilla JavaScript

No React, Next.js, Node.js, FastAPI, database, backend, or Docker.

The entire website must be contained in a **single `index.html`** with separate CSS and JavaScript files.

## Single-Page Sections

Create the following sections in `index.html`:

* **Home** — Hero, event introduction, objectives, goals, highlights, and registration CTA
* **Resources** — Quantum computing, Qiskit, QML, tutorials, courses, and useful links
* **Speakers** — Speaker profiles and session information
* **Organizers** — Organizing team with photos and profiles
* **Supporters** — Supporting organizations and logos
* **About Us** — Organization, vision, and mission
* **Register** — Registration information and Google Form

Navigation menu items should smoothly scroll to their corresponding sections.

Use section IDs such as:

```text
#home
#resources
#speakers
#organizers
#supporters
#about
#register
```

## Registration

Use **Google Forms** for registration.

The Register section should:

* Explain the registration process
* Include a prominent **Register Now** button
* Open the Google Form in a new tab or embed it directly
* Not require any custom backend or database

Use a placeholder for the Google Form URL:

```text
GOOGLE_FORM_URL_HERE
```

Make it easy to replace with the actual form URL later.

## Design

Create a **modern quantum-tech event aesthetic**:

* Professional and visually engaging
* Dark/quantum-inspired theme
* Clean modern typography
* Subtle quantum, particle, and circuit-inspired visuals
* Elegant gradients and glow effects
* Tasteful animations
* Responsive/mobile-first design
* Mobile hamburger navigation
* Strong registration CTA
* Smooth scrolling
* Fast loading

Avoid heavy libraries and unnecessary dependencies.

## Content

Use placeholders where actual event information is unavailable.

**Never invent real event information**, including:

* Speaker names/details
* Organizer names
* Supporters/sponsors
* Event date
* Venue
* Registration details

Make all placeholders easy to replace.

## JavaScript

Use vanilla JavaScript only for lightweight interactions:

* Mobile menu
* Smooth scrolling
* Active navigation state
* Scroll/reveal animations
* Simple UI interactions

Do not use external JavaScript frameworks.

## SEO & Accessibility

Include:

* Page title and meta description
* Open Graph metadata
* Favicon
* Semantic HTML5
* Accessible navigation
* Image alt text
* Keyboard accessibility
* Good color contrast
* Responsive design

## Project Structure

Keep the project minimal:

```text
qiskit-fall-fest-2026/

├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── speakers/
│   ├── organizers/
│   └── supporters/
├── assets/
├── README.md
└── .gitignore
```

## Implementation

Do **not** generate the entire website at once.

First provide:

1. Single-page layout/architecture
2. Section structure
3. Navigation design
4. Visual/design direction
5. Google Form integration approach
6. Project structure
7. Implementation plan

Then implement incrementally.

Keep the website **simple, lightweight, visually impressive, maintainable, and production-ready**.

The final website must work by simply opening or hosting `index.html` and must require **no backend or server-side application**.
