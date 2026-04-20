# 🌍 Wanderly — Travel Itinerary Portal

A dynamic single-page web application that helps travellers discover and explore curated trip itineraries from around the world.

---

## Project Pitch

**User Persona:** Independent travellers who want inspiration and a starting point for planning their next trip — people who enjoy exploring new destinations but feel overwhelmed by the research process.

**Problem:** Planning a trip from scratch is time-consuming and scattered. Wanderly gives users a curated collection of ready-made itineraries they can browse, filter, and get inspired by — all in one place.

---

## Views / Pages

The app uses a single HTML file with JavaScript toggling visibility between views:

1. **Home** — Hero section, featured destinations, and a live weather widget
2. **Itineraries** — Searchable, filterable grid of trip itinerary cards
3. **About** — Background on the project and its purpose
4. **Contact** — A validated contact form for user enquiries

---

## Low-Fidelity Sketch

> Sketch created in Figma and approved. See `/assets/sketch.png` in the repository.

---

## Technical Features

- **Multi-View SPA** — Navigation toggles page sections without reloading
- **Data Gallery** — 6+ itinerary cards rendered from a local JS array with live search filtering
- **Live Widget** — Weather data fetched from a public API using `fetch()`
- **Form Validation** — Custom client-side validation with descriptive error messages (no reliance on HTML5 `required` alone)
- **Responsive Design** — Card grid collapses from multi-column to single column; navigation transforms into a mobile menu
- **CSS Variables** — Consistent color palette and spacing throughout

---

## Research Notes

See `NOTES.md` for API references, design decisions, and links consulted during development.

---

## Challenges & Solutions

**Challenge:** Getting the live weather widget to display correctly without a page reload when switching between views caused the widget to re-fetch on every visit.

**Solution:** I added a simple cache flag in JavaScript — once the weather data was fetched and stored in a variable, subsequent view switches checked for existing data before calling `fetch()` again. This reduced unnecessary API calls and made the transition feel instant.

---

## Deployment

- **Live URL:** *(add Netlify URL here)*
- **Repository:** *(add GitHub URL here)*
- **Deployed via:** Netlify (connected to GitHub main branch for continuous deployment)

---

## Setup

No build tools required. Clone the repo and open `index.html` in a browser, or visit the live deployment link above.

```bash
git clone <your-repo-url>
cd wanderly
open index.html
```

---

## Folder Structure

```
wanderly/
├── index.html
├── style.css
├── app.js
├── README.md
├── NOTES.md
└── assets/
    └── sketch.png
```
