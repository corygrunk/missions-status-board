const fs = require('fs')
const dotenv = require('dotenv').config()
const limit = require("simple-rate-limiter")
const request = limit(require('request')).to(10).per(1000)
let googleApiKey = process.env.GOOGLE_API_KEY
let cityCountryObj = [
  {
      "country": "United States",
      "region": "California",
      "city": "Los Angeles",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Castle Rock",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "New York",
      "city": "New York",
      "status": "active"
  }
]

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
    let returnedObj = JSON.parse(body)
    if (!error && 'results' in returnedObj && returnedObj.results.length && 'geometry' in returnedObj.results[0]) {
      cityCount++
      let obj = {}
      obj = returnedObj.results[0].geometry.location
      obj.city = city

      console.log(cityCount + ' city added: ' + city)
      callback(obj)
    }
  })
}

let getColor = function (status) {
    if (status === 'active') {
        return '#2A9D8F'
    } else {
        return '#F4A261'
    }
}

let stream = fs.createWriteStream('cities.json', {flags:'a'})

//{ "city" : "Austin", "lat" : "30.267153", "lng" : "-97.7430608", "type" : "bubble", "color" : "#F4A261" }

cityCountryObj.forEach(cities => {
  getLatLong(cities.city, cities.region, cities.country, function(data) {
    stream.write('{ "city" : "' + data.city + '", "lat" : "' + data.lat + '", "lng" : "' + data.lng + '", "color": "' + getColor(cities.status) + '" },' + "\n")
  })
})