// ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
require('dotenv').config()

const express = require('express')
const PORT = process.env.PORT || 8080
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

// ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

const todoRoute = require('./routes/todos')

// ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Database was connected'))
.catch(e => console.log(e))



// ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "public")))

app.use(todoRoute)



// ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

app.listen(PORT, () => console.log(`PORT: ${PORT}`))