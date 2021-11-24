const express = require('express');
const cors = require('cors');
const app = express();
const Router = require('./routes/index');
const path = require('path');

app.use(cors());
app.use(express.json());

app.use('/v1', Router);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.get('*', function (req, res) {
    res.status(404).send('not found');
});

module.exports = app;
