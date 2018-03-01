const fs = require('fs')
const dotenv = require('dotenv').config()
const limit = require("simple-rate-limiter")
const request = limit(require('request')).to(1).per(100)
let googleApiKey = process.env.GOOGLE_API_KEY

let cityCountryObj = [] // Array of locations goes here

let latLongObj = []

let spaceRemoval = function (string) {
  if (string === undefined) {
    string = ''
  }
  let str = string
  let replaced = str.split(' ').join('+')
  return replaced
}

let cityCount = 0

let getLatLong = function (city, region, country, callback) {
  let googleApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + spaceRemoval(city) + ',' + spaceRemoval(region) + ',' + spaceRemoval(country) + '&key=' + googleApiKey
  request({ method: 'GET',
    uri: googleApiUrl
  },
  function (error, response, body) {
    cityCount++
    let returnedObj = JSON.parse(body)
    if (!error && 'results' in returnedObj && returnedObj.results.length && 'geometry' in returnedObj.results[0]) {
      let obj = {}
      obj = returnedObj.results[0].geometry.location
      obj.city = city

      console.log(cityCount + ' city added: ' + city)
      callback(obj)
    } else {
      console.log(returnedObj.error_message + ' Status: ' + returnedObj.status)
    }
  })
}

let getColor = function (status) {
  if (status === 'active') {
      return '#22DCC5'
  } else {
      return '#D37226'
  }
}

fs.truncate('map.js', 0, function(){ console.log('Cleared file contents.') })

let stream = fs.createWriteStream('map.js', {flags:'a'})

stream.write('module.exports = {' + '\n')
stream.write('\tmapCoords: [' + '\n')

cityCountryObj.forEach(cities => {
  let comma = function () { if (cityCount !== cityCountryObj.length) { return ',' } else {return ''} }
  getLatLong(cities.city, cities.region, cities.country, function(data) {
    stream.write('\t\t{ "city" : "' + data.city + '", "lat" : "' + data.lat + '", "lng" : "' + data.lng + '", "color": "' + getColor(cities.status) + '" }' + comma() + "\n")
    if (cityCount === cityCountryObj.length) {
      stream.write('\t]' + '\n')
      stream.write('}' + '\n')
    }
  })
})