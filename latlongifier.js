const fs = require('fs')
const dotenv = require('dotenv').config()
const limit = require("simple-rate-limiter")
const request = limit(require('request')).to(1).per(2000)
let googleApiKey = process.env.GOOGLE_API_KEY
let cityCountryObj = [
  {
    "country": "Argentina",
    "city": "Rosario"
  },
  {
      "country": "Argentina",
      "city": "Villa Ballester"
  }
]
let latLongObj = []

let spaceRemoval = function (string) {
  let str = string
  let replaced = str.split(' ').join('+')
  return replaced
}

let cityCount = 0

let getLatLong = function (city, country, callback) {
  let googleApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + spaceRemoval(city) + ',' + spaceRemoval(country) + '&key=' + googleApiKey
  request({ method: 'GET',
    uri: googleApiUrl
  },
  function (error, response, body) {
    if (!error) {
      cityCount++
      let obj = {}
      obj = JSON.parse(body).results[0].geometry.location
      obj.city = city
      console.log(cityCount + ' city added: ' + city)
      callback(obj)
    }
  })
}

let count = 0

cityCountryObj.forEach(cities => {
  getLatLong(cities.city, cities.country, function(data) {
    latLongObj.push(data)
    count++
    if (count === cityCountryObj.length) {
      let jsonStr = JSON.stringify(latLongObj)
      fs.writeFile('cities.json', jsonStr, 'utf8', function () {
        console.log('Updated File.')
      })
    }
  })
})
