const csvFilePath = 'intercom.csv'
const csv = require('csvtojson')

let cityCountryObj = []

csv()
.fromFile(csvFilePath)
.on('json',(jsonObj)=>{
  // combine csv header row and csv line to a json object
  // jsonObj.a ==> 1 or 4
  let simplifiedObj = {}
  simplifiedObj.country = jsonObj.Country
  simplifiedObj.region = jsonObj.Region
  simplifiedObj.city = jsonObj.City
  simplifiedObj.status = jsonObj.subscription_status
  cityCountryObj.push(simplifiedObj)
})
.on('done',(error)=>{
  console.log(cityCountryObj)
})