
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('top-flights-container');
    const apiUrl = 'https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit=3';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        data.results.forEach(flight => {
            const flightCard = document.createElement('div');
            flightCard.className = 'flight-card';
            flightCard.innerHTML = `
                <img src="${flight.image ? flight.image.thumbnail_url : 'img/placeholder.png'}" alt="${flight.name}">
                <h3>${flight.name}</h3>
                <p>${new Date(flight.net).toLocaleString()}</p>
            `;
            container.appendChild(flightCard);
        });
    } catch (error) {
        console.error('Error fetching flight data:', error);
        container.innerHTML = '<p>Unable to load upcoming flights.</p>';
    }
});
