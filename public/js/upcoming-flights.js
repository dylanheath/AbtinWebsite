
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('flights-container');
    const apiUrl = 'https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit=10';
    let nextUrl = apiUrl;
    let loading = false;

    async function loadFlights() {
        if (!nextUrl || loading) return;
        loading = true;

        try {
            const response = await fetch(nextUrl);
            const data = await response.json();
            nextUrl = data.next;

            data.results.forEach(flight => {
                const flightItem = document.createElement('div');
                flightItem.className = 'flight-item';
                flightItem.innerHTML = `
                    <img src="${flight.image ? flight.image.thumbnail_url : 'img/placeholder.png'}" alt="${flight.name}">
                    <div>
                        <h3>${flight.name}</h3>
                        <p>Launch Time: ${new Date(flight.net).toLocaleString()}</p>
                        <p>${flight.launch_service_provider.name}</p>
                    </div>
                `;
                container.appendChild(flightItem);
            });
        } catch (error) {
            console.error('Error fetching flight data:', error);
        } finally {
            loading = false;
        }
    }

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            loadFlights();
        }
    });

    loadFlights();
});




