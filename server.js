const express = require('express');
const cors = require('cors');
const app = express();
const Router = require('./routes/index');
const path = require('path');

app.use(cors());
app.use(express.json());

app.use('/v1', Router);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
    });
}

module.exports = app;
