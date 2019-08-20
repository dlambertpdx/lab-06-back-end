require ('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;
app.use(cors());

app.get('/location', (request, response) => {
    try {
        const location = request.query.location;
        const result = getLatLng(location);
        response.status(200).json(result);
    }
    catch(err) {
        response.status(500).send('Sorry, something went wrong :(');
    }
});

app.get('/weather', (request, response) => {
    try {
        const weather = request.query.weather;
        const result = getWeather(weather);
        response.status(200).json(result);
    }
    catch(err) {
        response.status(500).send('Sorry, something went wrong :(');
    }
});

const forecastData = require('./data/darksky.json');
function getWeather() {
    return toDay(forecastData);
}

function toDay() {
    const time = forecastData.daily.data[0].time;
    const forecast = forecastData.daily.data[0].summary;

    return {
        forecast: forecast,
        time: time
    }
}

const geoData = require('./data/geo.json');

function getLatLng() {

    return toLocation(geoData);
}

function toLocation() {
    const firstResult = geoData.results[0];
    const geometry = firstResult.geometry;

    return {
        formatted_query: firstResult.formatted_address,
        latitude: geometry.location.lat,
        longitude: geometry.location.lng
    };
}



app.listen(PORT, () => {
    console.log('server is running on PORT', PORT);
});