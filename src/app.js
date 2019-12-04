const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils.js/forecast');
const geocode = require('./utils.js/geocode')

const app = express()
const port = process.env.PORT || 3001

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))
app.get('', (req, res) => {
    res.render('index', {
        title: 'weatherApp',
        name: "najjaci"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "saban",
        name: "saulic"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: "wow,najs",
        title: "Help",
        name: 'Luka Nikolic'

    })
})

app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: 'please provide adress'
        })
    }

    geocode(req.query.adress, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: foreCastData,
                location,
                adress: req.query.adress
            })
        })
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: "help page not found"
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'luka car',
        errorMessage: "page not found"
    })
})
app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})