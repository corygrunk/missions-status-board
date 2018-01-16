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
const Trello = require('node-trello')

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
var trelloCardObj = []

let boardData = {
	'refreshed' : refreshDate,
	'subCount' : subscriberCount,
	'subCountTrend' : subscriberCountTrend,
	'trialCount' : trialingCount,
	'trelloCards' : trelloCardObj
}

// MIDDLEWARE
// ==============================================

// Route middleware that will happen on every request
router.use(function(req, res, next) {
	// Log each request to the console
	console.log(req.method, req.url)

	next()
})


// TRELLO
let trello = new Trello(process.env.TRELLO_DEVELOPER_KEY, process.env.TRELLO_USER_TOKEN)
let trelloBoardId = process.env.TRELLO_BOARD_ID
let trelloIndexForList = 2

let getTrelloCards = function (callback) {
	trello.get('/1/boards/' + trelloBoardId + '/lists?cards=open&card_fields=name&fields=name', function(err, data) {
		if (err) throw err
		getCardDetails(data[trelloIndexForList].cards, callback)
	})
}

// TODO: Currently only getting one owner per card
// trello.get('1/cards/5a4d164fa1f743f00191a0e8/members', function(err, data) {
// 	console.log(data)
// })

let getCardDetails = function (data, callback) {
	let count = 0
	trelloCardObj = []
	for (let i = 0; i < data.length; i++) {
		trelloCardObj[i] = data[i]
		// Get card owners
		trello.get('/1/cards/' + data[i].id + '/members', function(err, cards) {
			if (err) throw err
			count++
			trelloCardObj[i].avatar = 'https://trello-avatars.s3.amazonaws.com/' + cards[0].avatarHash + '/50.png'
			trelloCardObj[i].fullName = cards[0].fullName
			if (count === data.length) {
				callback(trelloCardObj)
			}
		})
	}	
}

let refreshData = function (callback) {
	// Trello cards in Doing column
	// getTrelloCards(function (data) {
	// 	boardData.trelloCards = trelloCardObj
	// })

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
		// trialCount: trialingCount,
		// trelloCards: trelloCardObj
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
		//console.log(boardData.trelloCards)
		let testFunc = function () {
			refreshBoard()
			client.emit('message', boardData)
		}
		let refreshTimer = setInterval(testFunc, 300000)
	})
})