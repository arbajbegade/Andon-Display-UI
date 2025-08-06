const socket = new WebSocket('ws://localhost:3001');

socket.addEventListener('open', () => {
    console.log('%c[WebSocket Connected]', 'color: green; font-weight: bold;');
});

socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    console.log('%c[WebSocket Message]', 'color: blue;', data);

    // Update values in the DOM
    document.getElementById('model').textContent = data.model_name;
    document.getElementById('target').textContent = data.target;
    document.getElementById('actual').textContent = data.actual;
    document.getElementById('stoppage').textContent = data.stoppage;
    document.getElementById('cycle').textContent = data.cycle_time;
    document.getElementById('difference').textContent = data.difference;

    // Date and time
    document.getElementById('date').textContent = data.date;
    document.getElementById('time').textContent = data.time;

    // Station updates
    for (let i = 1; i <= 24; i++) {
        const el = document.getElementById(`station_${i}`);
        if (el && data[`station_${i}`]) {
            el.textContent = data[`station_${i}`];
        }
    }
});

socket.addEventListener('close', () => {
    console.log('%c[WebSocket Disconnected]', 'color: red; font-weight: bold;');
});

socket.addEventListener('error', (err) => {
    console.error('[WebSocket Error]', err);
});
