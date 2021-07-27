const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mattan Yeroushalmi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mattan Yerousahlmi'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: "Help",
        paragraph: "Why?",
        name: "Me"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send( {
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { longitude,latitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     location: 'London',
    //     forecast: 'Cold',
    //     address: req.query.address
    // })
})



app.get('/products', (req, res)=> {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{title: '404', name:"Mattan", error: "Help article not found"})
})

app.get('*', (req,res) => {
    res.render('404',{title: '404', name:"Mattan", error: "Page not found"})
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

// nodemon --watch web-server -e js,hbs,json,css web-server\src\app.js