// app.js

// BASE SETUP
// ==============================================

// NPM Modules
const http = require('http')
const express = require('express')
const dotenv = require('dotenv').config()
const request = require('request')
const bodyParser = require('body-parser')
const moment = require('moment')
const Intercom = require('intercom-client')
const client = new Intercom.Client({ token: process.env.INTERCOM_PERSONAL_ACCESS_TOKEN })

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 5000

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser())

const router = express.Router()

var mapCoords = require('./map.js')
var refreshDate = moment().format('MM-DD-YYYY HH:mm:ss')
var subscriberCount = 0
var subscriberCountTrend = ''
var trialingCount = 0

let boardData = {
	'refreshed' : refreshDate,
	'subCount' : subscriberCount,
	'subCountTrend' : subscriberCountTrend,
	'trialCount' : trialingCount
}

// MIDDLEWARE
// ==============================================

// Route middleware that will happen on every request
router.use(function(req, res, next) {
	// Log each request to the console
	console.log(req.method, req.url)
	next()
})

let refreshData = function (callback) {
	// INTERCOM.IO
	// Subscribed Companies
	client.counts.companySegmentCounts(function (res) {
		let countJson = res.body.company.segment[3]
		if (countJson['Subscribed Companies'] > subscriberCount && subscriberCount !== 0) {
			subscriberCountTrend = 'up'
		}
		if (countJson['Subscribed Companies'] < subscriberCount && subscriberCount !== 0) {
			subscriberCountTrend = 'down'
		}
		boardData.subCountTrend = subscriberCountTrend
		subscriberCount = countJson['Subscribed Companies']
		boardData.subCount = subscriberCount
		// console.log(subscriberCount)
	})

	// Trialing Conpanies
	client.counts.companySegmentCounts(function (res) {
		let countJson = res.body.company.segment[4]
		trialingCount = countJson['Trialing Company']
		boardData.trialCount = trialingCount
		// console.log(trialingCount)
	})
	refreshDate = moment().format('MM-DD-YYYY HH:mm:ss')
	boardData.refreshed = refreshDate
	if (boardData.subCount !== 0) {
		console.log(boardData.refreshed + ' Subs: ' + boardData.subCount + ' Trials: ' + boardData.trialCount + ' Trend: ' + boardData.subCountTrend)	
	}
	callback(boardData)
}

let refreshBoard = function () {
	refreshData(function (data) {
		// console.log(data.refreshed)
	})
}

refreshBoard() // initial data


// ROUTES
// ============================================== 
router.get('/', function(req, res) {
  res.render('index', {
		title : 'Missions Status Board',
		refreshed: refreshDate,
		subCount: subscriberCount,
		subCountTrend: subscriberCountTrend
	})
})

app.use('/', router)


// START THE SERVER
// ==============================================

server.listen(port, function() {
  console.log("Listening on " + port)
})

io.on('connection', function(client) {
	console.log('Client connected...')
	client.emit('message', boardData)
	client.emit('map', mapCoords)
	
	client.on('join', function(data) {
		let testFunc = function () {
			refreshBoard()
			client.emit('message', boardData)
		}
		let refreshTimer = setInterval(testFunc, 300000)
	})
})