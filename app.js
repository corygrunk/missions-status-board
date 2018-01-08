// app.js

// BASE SETUP
// ==============================================

// NPM Modules
const http = require('http')
const express = require('express')
const dotenv = require('dotenv').config()
const request = require('request')
const bodyParser = require('body-parser')
const Intercom = require('intercom-client')
const client = new Intercom.Client({ token: process.env.INTERCOM_PERSONAL_ACCESS_TOKEN })

const app = express()
const port = process.env.PORT || 5000

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser())

const router = express.Router()

var subscriberCount = 0
var trialingCount = 0

// MIDDLEWARE
// ==============================================

// Route middleware that will happen on every request
router.use(function(req, res, next) {
	// Log each request to the console
	console.log(req.method, req.url)

	next()
})

// INTERCOM.IO

// Subscribed Companies
client.counts.companySegmentCounts(function (res) {
	let countJson = res.body.company.segment[3]
	subscriberCount = countJson['Subscribed Companies']
	console.log(subscriberCount)
})

// Trialing Conpanies
client.counts.companySegmentCounts(function (res) {
	let countJson = res.body.company.segment[4]
	trialingCount = countJson['Trialing Company']
	console.log(trialingCount)
})

// ROUTES
// ==============================================

router.get('/', function(req, res) {
  res.render('index', {
		title : 'Missions Status Board',
		subCount: subscriberCount, 
		trialCount: trialingCount
	})
})

app.use('/', router)


// START THE SERVER
// ==============================================

app.listen(port, function() {
  console.log("Listening on " + port)
})