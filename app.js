const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const dataApi = require('./server/routes/api');
const videoApi = require('./server/routes/video');
const poster = path.join(process.cwd(), 'assets/poster');

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/video', videoApi);
app.use('/poster', express.static(poster));

app.route('/sitemap.xml')
    .get((req, res) => {
        res.sendFile(path.join(process.cwd(), 'sitemap.xml'))
    });

app.get('*', (req, res ) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen( PORT, () => console.log(`Running on ${PORT}`))