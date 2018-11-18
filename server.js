const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
let app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
    let now = new Date().toString()
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    })
    next()
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        header: 'Best games ever...',
        slogan: 'Never stop moving forward...',
        pageTitle: 'Home',
        welcomeMessage: 'Welcome to the world of games!'
    })
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        header: 'Portfolio',
        pageTitle: 'Projects'
    })
})

app.get('/contacts', (req, res) => {
    res.render('contacts.hbs', {
        header: 'Best games ever...',
        slogan: 'Never stop moving forward...',
        pageTitle: 'Contacts'
    })
})

app.get('/bad', (req, res) => {
    res.send({
        reason: 'Well done',
        tactic: 'Keep up the great job.'
    })
})

app.listen((port), () => {
    console.log(`Server is up on port ${port}`)
})
