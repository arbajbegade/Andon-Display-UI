const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const PORT = 3000;
const WSPORT = 3001;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start HTTP server
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`HTTP server running at http://localhost:${PORT}`);
});

// WebSocket server
const wss = new WebSocket.Server({ port: WSPORT }, () => {
    console.log(`WebSocket server running at ws://localhost:${WSPORT}`);
});

setInterval(() => {
    const now = new Date();

    const data = {
        model_name: "AGGHBHGFCJZLOISWFAOW",
        target: "5000 nos",
        actual: "3000 nos",
        stoppage: "100000",
        cycle_time: "200000",
        difference: "2000 nos",
        station_1: "10000",
        station_2: "20000",
        station_3: "30000",
        station_4: "40000",
        station_5: "50000",
        station_6: "60000",
        station_7: "70000",
        station_8: "80000",
        station_9: "90000",
        station_10: "100000",
        station_11: "110000",
        station_12: "120000",
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString()        
    };

    const json = JSON.stringify(data);

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(json);
        }
    });
}, 5000);


