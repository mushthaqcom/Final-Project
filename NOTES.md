# NOTES.md — Research & References

## APIs Used

### Weather — Open-Meteo
- URL: https://open-meteo.com/
- No API key required, free to use
- Endpoint used: `https://api.open-meteo.com/v1/forecast`
- Parameters: `latitude`, `longitude`, `current_weather=true`, `hourly=relativehumidity_2m`
- Returns: temperature (°C), wind speed, weather code, humidity

### Why Open-Meteo over API-Ninjas?
- Open-Meteo is completely free and doesn't need an account
- Provides real-time weather data suitable for a live widget
- Good documentation and reliable uptime

---

## Design Decisions

- **Color palette**: Deep navy (`#1a3c5e`) as primary, warm orange (`#e8824a`) as accent
  - Navy = trust, adventure, the sea
  - Orange = energy, warmth, excitement of travel
- **Fonts**: Playfair Display (headings) + DM Sans (body)
  - Playfair = editorial, premium travel magazine feel
  - DM Sans = clean, readable at small sizes
- **Single Page Architecture**: JavaScript toggles `display` on view sections rather than loading new HTML files — faster navigation, no page reload

---

## Resources Consulted

- MDN Web Docs — `fetch()` API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- MDN — CSS Grid: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout
- MDN — Form Validation: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
- Open-Meteo Docs: https://open-meteo.com/en/docs
- Google Fonts: https://fonts.google.com/

---

## Challenges Encountered

1. **Weather widget re-fetching on every navigation** — solved with a `weatherLoaded` boolean flag
2. **Mobile navigation** — hamburger menu toggling nav-links visibility with a CSS class
3. **Form validation** — custom error display instead of relying on browser default `required` popups
4. **Image aspect ratios** — used `object-fit: cover` on card images to keep consistent card heights
