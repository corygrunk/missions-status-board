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
const Trello = require('node-trello')

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


// TRELLO
let trello = new Trello(process.env.TRELLO_DEVELOPER_KEY, process.env.TRELLO_USER_TOKEN)
let trelloBoardId = process.env.TRELLO_BOARD_ID
let trelloIndexForList = 2
let trelloCardObj = []

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

let refreshBoard = function () {
	// Trello cards in Doing column
	getTrelloCards(function (data) {
		// console.log(trelloCardObj)
	})

	// INTERCOM.IO
	// Subscribed Companies
	client.counts.companySegmentCounts(function (res) {
		let countJson = res.body.company.segment[3]
		subscriberCount = countJson['Subscribed Companies']
		// console.log(subscriberCount)
	})

	// Trialing Conpanies
	client.counts.companySegmentCounts(function (res) {
		let countJson = res.body.company.segment[4]
		trialingCount = countJson['Trialing Company']
		// console.log(trialingCount)
	})
}

refreshBoard() // initial data
let refreshTimer = setInterval(refreshBoard, 50000)


// ROUTES
// ============================================== 
router.get('/', function(req, res) {
  res.render('index', {
		title : 'Missions Status Board',
		subCount: subscriberCount, 
		trialCount: trialingCount,
		trelloCards: trelloCardObj
	})
})

app.use('/', router)


// START THE SERVER
// ==============================================

app.listen(port, function() {
  console.log("Listening on " + port)
})