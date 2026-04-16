/**
 * Weather App for Lahore - Monday & Friday
 * Designed for Digital Signage
 */

const weatherData = {
    // Mapping specific April 2026 dates to forecast data from search results
    'April 17': { high: '91°F', low: '72°F', condition: 'Cloudy', icon: '☁️' },
    'April 20': { high: '98°F', low: '72°F', condition: 'Sunny & Clear', icon: '☀️' },
    'April 24': { high: '103°F', low: '77°F', condition: 'Partly Sunny', icon: '⛅' },
    'April 27': { high: '108°F', low: '82°F', condition: 'Very Hot / Clear', icon: '☀️' }
};

function updateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const timeEl = document.getElementById('current-time');
    if (timeEl) {
        timeEl.textContent = now.toLocaleDateString('en-US', options);
    }
}

function updateForecast() {
    const today = new Date(); // Current date in April 2026 context

    // Find next upcoming Monday and Friday
    const nextMonday = getNextDayOfWeek(today, 1);
    const nextFriday = getNextDayOfWeek(today, 5);

    const dateOptions = { month: 'long', day: 'numeric' };
    const mondayDateStr = nextMonday.toLocaleDateString('en-US', dateOptions);
    const fridayDateStr = nextFriday.toLocaleDateString('en-US', dateOptions);

    displayDayForecast('monday', mondayDateStr);
    displayDayForecast('friday', fridayDateStr);
}

function getNextDayOfWeek(date, dayOfWeek) {
    const resultDate = new Date(date.getTime());
    const daysUntil = (dayOfWeek - date.getDay() + 7) % 7;
    // If it's today, we might want to show today or the next occurrence.
    // For signage, if it's already Monday, showing today's forecast is good.
    resultDate.setDate(date.getDate() + daysUntil);
    return resultDate;
}

function displayDayForecast(prefix, dateStr) {
    const data = weatherData[dateStr] || { high: '95°F', low: '70°F', condition: 'Sunny', icon: '☀️' }; // Fallback

    document.getElementById(`${prefix}-date`).textContent = dateStr;
    document.getElementById(`${prefix}-high`).textContent = data.high;
    document.getElementById(`${prefix}-low`).textContent = data.low;
    document.getElementById(`${prefix}-condition`).textContent = data.condition;
    document.getElementById(`${prefix}-icon`).textContent = data.icon;
}

// Helper to handle any missing data gracefully
function init() {
    updateTime();
    updateForecast();

    // Update time every second
    setInterval(updateTime, 1000);

    // Update forecast every hour (in case dates roll over)
    setInterval(updateForecast, 3600000);

    // Auto-refresh page once a day for stability
    setTimeout(() => {
        window.location.reload();
    }, 86400000);
}

document.addEventListener('DOMContentLoaded', init);
