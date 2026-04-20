/* =============================================
   WANDERLY — app.js
   Handles: SPA navigation, card rendering,
   search/filter, weather widget, form validation
============================================= */

// =============================================
// DATA — Itinerary cards array
// =============================================
const itineraries = [
  {
    id: 1,
    title: "Tokyo in 7 Days",
    category: "City",
    days: 7,
    rating: 4.9,
    description: "From Shibuya crossing to ancient temples — the ultimate Tokyo adventure.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80"
  },
  {
    id: 2,
    title: "Amalfi Coast Road Trip",
    category: "Beach",
    days: 5,
    rating: 4.8,
    description: "Clifftop villages, turquoise waters, and the best pasta of your life.",
    image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=600&q=80"
  },
  {
    id: 3,
    title: "Patagonia Trek",
    category: "Adventure",
    days: 10,
    rating: 4.7,
    description: "Hike through dramatic landscapes at the end of the world.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80"
  },
  {
    id: 4,
    title: "Kyoto Cultural Tour",
    category: "Cultural",
    days: 4,
    rating: 4.8,
    description: "Geisha districts, bamboo groves, and centuries of Japanese tradition.",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80"
  },
  {
    id: 5,
    title: "Bali Island Escape",
    category: "Beach",
    days: 8,
    rating: 4.6,
    description: "Rice terraces, surf breaks, and spiritual temples on the Island of the Gods.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80"
  },
  {
    id: 6,
    title: "Iceland Northern Lights",
    category: "Nature",
    days: 6,
    rating: 4.9,
    description: "Chase the aurora borealis through waterfalls, geysers, and volcanic landscapes.",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80"
  },
  {
    id: 7,
    title: "Machu Picchu & Cusco",
    category: "Cultural",
    days: 9,
    rating: 4.8,
    description: "Trek the Inca Trail to one of the world's most iconic archaeological sites.",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80"
  },
  {
    id: 8,
    title: "Serengeti Safari",
    category: "Nature",
    days: 7,
    rating: 4.9,
    description: "Witness the Great Migration and spot Africa's Big Five in their natural habitat.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80"
  },
  {
    id: 9,
    title: "Barcelona Weekend",
    category: "City",
    days: 3,
    rating: 4.5,
    description: "Gaudí architecture, tapas bars, and golden beaches in the Catalan capital.",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80"
  },
  {
    id: 10,
    title: "New Zealand Adventure",
    category: "Adventure",
    days: 14,
    rating: 4.9,
    description: "Bungee jumping, kayaking, and jaw-dropping fjords across both islands.",
    image: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=600&q=80"
  },
  {
    id: 11,
    title: "Marrakech Medina",
    category: "Cultural",
    days: 5,
    rating: 4.6,
    description: "Spice-filled souks, riads, and the vibrant colours of Moroccan street life.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&q=80"
  },
  {
    id: 12,
    title: "Maldives Retreat",
    category: "Beach",
    days: 6,
    rating: 5.0,
    description: "Overwater bungalows, crystal lagoons, and some of the world's best snorkelling.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80"
  }
];

// =============================================
// SPA NAVIGATION
// =============================================
function showView(viewName) {
  // Hide all views
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

  // Show target view
  const target = document.getElementById('view-' + viewName);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.view === viewName);
  });

  // Close mobile menu
  document.getElementById('nav-links').classList.remove('open');

  // Load itinerary cards on first visit
  if (viewName === 'itineraries') {
    renderItineraryCards(itineraries);
  }
}

// Delegate all [data-view] clicks
document.addEventListener('click', function (e) {
  const trigger = e.target.closest('[data-view]');
  if (trigger) {
    e.preventDefault();
    showView(trigger.dataset.view);
  }
});

// Mobile hamburger toggle
document.getElementById('hamburger').addEventListener('click', function () {
  document.getElementById('nav-links').classList.toggle('open');
});

// =============================================
// CARD RENDERING
// =============================================
function createCardHTML(item) {
  const stars = '★'.repeat(Math.floor(item.rating)) + (item.rating % 1 >= 0.5 ? '½' : '');
  return `
    <article class="card">
      <img class="card-image" src="${item.image}" alt="${item.title}" loading="lazy" />
      <div class="card-body">
        <span class="card-tag">${item.category}</span>
        <h3 class="card-title">${item.title}</h3>
        <p style="font-size:0.88rem; color: var(--clr-text-muted); margin-top:4px;">${item.description}</p>
        <div class="card-meta">
          <span class="card-days">&#128337; ${item.days} days</span>
          <span class="card-rating">&#9733; ${item.rating}</span>
        </div>
      </div>
    </article>
  `;
}

// Render to itineraries page
function renderItineraryCards(items) {
  const grid = document.getElementById('itinerary-cards');
  const noResults = document.getElementById('no-results');
  if (items.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
  } else {
    noResults.style.display = 'none';
    grid.innerHTML = items.map(createCardHTML).join('');
  }
}

// Render preview cards on homepage (first 4)
function renderHomeCards() {
  const grid = document.getElementById('home-cards');
  grid.innerHTML = itineraries.slice(0, 4).map(createCardHTML).join('');
}

// =============================================
// SEARCH & FILTER
// =============================================
function applyFilters() {
  const query = document.getElementById('search-input').value.toLowerCase().trim();
  const category = document.getElementById('filter-category').value;
  const ratingMin = parseFloat(document.getElementById('filter-rating').value) || 0;

  const filtered = itineraries.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    const matchesCategory = category === '' || item.category === category;
    const matchesRating = item.rating >= ratingMin;

    return matchesSearch && matchesCategory && matchesRating;
  });

  renderItineraryCards(filtered);
}

document.getElementById('search-input').addEventListener('input', applyFilters);
document.getElementById('filter-category').addEventListener('change', applyFilters);
document.getElementById('filter-rating').addEventListener('change', applyFilters);

// =============================================
// WEATHER WIDGET
// =============================================
let weatherLoaded = false; // cache flag — only fetch once

async function loadWeather() {
  if (weatherLoaded) return;

  const widget = document.getElementById('weather-widget');

  try {
    // Using Open-Meteo (free, no API key required)
    // Default: Toronto coordinates as a travel-hub city
    const lat = 43.7;
    const lon = -79.42;
    const city = "Toronto";

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,windspeed_10m&timezone=auto`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('Weather fetch failed');
    const data = await res.json();

    const temp = Math.round(data.current_weather.temperature);
    const wind = Math.round(data.current_weather.windspeed);
    const code = data.current_weather.weathercode;
    const humidity = data.hourly.relativehumidity_2m[0];

    const weatherDesc = getWeatherDescription(code);
    const weatherIcon = getWeatherIcon(code);

    widget.innerHTML = `
      <div>
        <div class="weather-label">Live Weather</div>
        <div class="weather-city">${city}</div>
      </div>
      <div class="weather-divider"></div>
      <div>
        <div class="weather-temp">${temp}°C</div>
        <div class="weather-desc">${weatherIcon} ${weatherDesc}</div>
      </div>
      <div class="weather-divider"></div>
      <div class="weather-meta">
        <div>
          <div class="weather-label">Wind</div>
          <div>${wind} km/h</div>
        </div>
        <div>
          <div class="weather-label">Humidity</div>
          <div>${humidity}%</div>
        </div>
      </div>
      <div style="margin-left: auto; font-size: 0.75rem; color: rgba(255,255,255,0.4);">via Open-Meteo</div>
    `;

    weatherLoaded = true;

  } catch (err) {
    widget.innerHTML = `<div class="weather-loading">Weather unavailable right now.</div>`;
    console.error('Weather error:', err);
  }
}

function getWeatherDescription(code) {
  const codes = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Foggy', 48: 'Icy fog', 51: 'Light drizzle', 53: 'Drizzle',
    55: 'Heavy drizzle', 61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
    71: 'Light snow', 73: 'Snow', 75: 'Heavy snow', 80: 'Rain showers',
    81: 'Showers', 82: 'Heavy showers', 85: 'Snow showers',
    95: 'Thunderstorm', 99: 'Thunderstorm with hail'
  };
  return codes[code] || 'Variable';
}

function getWeatherIcon(code) {
  if (code === 0 || code === 1) return '☀️';
  if (code === 2 || code === 3) return '⛅';
  if (code >= 45 && code <= 48) return '🌫️';
  if (code >= 51 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌦️';
  if (code >= 95) return '⛈️';
  return '🌤️';
}

// =============================================
// FORM VALIDATION
// =============================================
const form = document.getElementById('contact-form');

function showError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.add('error');
  error.textContent = message;
}

function clearError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.remove('error');
  error.textContent = '';
}

function validateForm() {
  let valid = true;

  // First name
  const firstName = document.getElementById('first-name').value.trim();
  if (!firstName) {
    showError('first-name', 'err-first-name', 'Please enter your first name.');
    valid = false;
  } else {
    clearError('first-name', 'err-first-name');
  }

  // Last name
  const lastName = document.getElementById('last-name').value.trim();
  if (!lastName) {
    showError('last-name', 'err-last-name', 'Please enter your last name.');
    valid = false;
  } else {
    clearError('last-name', 'err-last-name');
  }

  // Email
  const email = document.getElementById('email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showError('email', 'err-email', 'Email address is required.');
    valid = false;
  } else if (!emailRegex.test(email)) {
    showError('email', 'err-email', 'Please enter a valid email address (e.g. name@example.com).');
    valid = false;
  } else {
    clearError('email', 'err-email');
  }

  // Phone — optional but must be valid if provided
  const phone = document.getElementById('phone').value.trim();
  const phoneRegex = /^[0-9+\-\s()]{7,15}$/;
  if (phone && !phoneRegex.test(phone)) {
    showError('phone', 'err-phone', 'Please enter a valid phone number.');
    valid = false;
  } else {
    clearError('phone', 'err-phone');
  }

  // Arrival date
  const arrivalDate = document.getElementById('arrival-date').value;
  if (!arrivalDate) {
    showError('arrival-date', 'err-arrival-date', 'Please select an estimated arrival date.');
    valid = false;
  } else {
    const selected = new Date(arrivalDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      showError('arrival-date', 'err-arrival-date', 'Arrival date must be in the future.');
      valid = false;
    } else {
      clearError('arrival-date', 'err-arrival-date');
    }
  }

  // Guests
  const guests = parseInt(document.getElementById('guests').value);
  if (!guests || guests < 1) {
    showError('guests', 'err-guests', 'Please enter at least 1 guest.');
    valid = false;
  } else {
    clearError('guests', 'err-guests');
  }

  // Days
  const days = parseInt(document.getElementById('days').value);
  if (!days || days < 1) {
    showError('days', 'err-days', 'Please enter at least 1 day.');
    valid = false;
  } else {
    clearError('days', 'err-days');
  }

  // Trip type
  const tripType = document.getElementById('trip-type').value;
  if (!tripType) {
    showError('trip-type', 'err-trip-type', 'Please select a preferred trip type.');
    valid = false;
  } else {
    clearError('trip-type', 'err-trip-type');
  }

  return valid;
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const success = document.getElementById('form-success');

  if (validateForm()) {
    success.style.display = 'block';
    form.reset();
    // Clear all error states after reset
    document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  } else {
    success.style.display = 'none';
    // Scroll to first error
    const firstError = form.querySelector('.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});

// Clear errors on input
['first-name', 'last-name', 'email', 'phone', 'arrival-date', 'guests', 'days', 'trip-type'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', () => clearError(id, 'err-' + id));
    el.addEventListener('change', () => clearError(id, 'err-' + id));
  }
});

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', function () {
  renderHomeCards();
  loadWeather();
});
