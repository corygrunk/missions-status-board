const fs = require('fs')
const dotenv = require('dotenv').config()
const limit = require("simple-rate-limiter")
const request = limit(require('request')).to(1).per(100)
let googleApiKey = process.env.GOOGLE_API_KEY
let cityCountryObj = [
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Castle Rock",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Littleton",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Cleveland",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Manitoba",
      "city": "Winnipeg",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "District of Columbia",
      "city": "Washington",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Pennsylvania",
      "city": "Gibsonia",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Littleton",
      "status": "active"
  },
  {
      "country": "United Kingdom",
      "region": "Islington",
      "city": "Islington",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Denver",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Diego",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Oregon",
      "city": "Mcminnville",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "British Columbia",
      "city": "Victoria",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Manitoba",
      "city": "Brandon",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Castle Rock",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Columbus",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Carlsbad",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Castle Rock",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Denver",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Castle Rock",
      "status": "active"
  },
  {
      "country": "United Kingdom",
      "region": "London, City of",
      "city": "London",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Massachusetts",
      "city": "Charlestown",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Menlo Park",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "British Columbia",
      "city": "Duncan",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Michigan",
      "city": "Ann Arbor",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Cleveland",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Cleveland",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Cleveland",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Oakland",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Cleveland",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Pennsylvania",
      "city": "Beaver Falls",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Colorado Springs",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Columbus",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Castle Rock",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Pflugerville",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Minnesota",
      "city": "Minneapolis",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Castle Rock",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Cleveland",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Cleveland",
      "status": "active"
  },
  {
      "country": "United Kingdom",
      "region": "Islington",
      "city": "Islington",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Los Angeles",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Pennsylvania",
      "city": "Coraopolis",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "Sweden",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Beachwood",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "North Royalton",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Pennsylvania",
      "city": "Pittsburgh",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Cleveland",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Castle Rock",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Illinois",
      "city": "Oak Brook",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "New York",
      "city": "Brooklyn",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "New Jersey",
      "city": "Somerset",
      "status": "active"
  },
  {
      "country": "Netherlands",
      "status": "active"
  },
  {
      "country": "Netherlands",
      "region": "Noord-Brabant",
      "city": "Eindhoven",
      "status": "active"
  },
  {
      "country": "France",
      "region": "Ile-de-France",
      "city": "Paris",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Utah",
      "city": "Logan",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Cleveland",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Littleton",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Englewood",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Cleveland",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Santa Barbara",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Cleveland",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Cleveland",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Idaho",
      "city": "Boise",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "New York",
      "city": "New York",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Oceanside",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Pennsylvania",
      "city": "Pittsburgh",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Escondido",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Pennsylvania",
      "city": "Mars",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "District of Columbia",
      "city": "Washington",
      "status": "active"
  },
  {
      "country": "Sweden",
      "region": "Kalmar Lan",
      "city": "Mönsterås",
      "status": "active"
  },
  {
      "country": "Hong Kong",
      "city": "Central District",
      "status": "active"
  },
  {
      "country": "Hong Kong",
      "city": "Central District",
      "status": "active"
  },
  {
      "country": "Hong Kong",
      "city": "Central District",
      "status": "active"
  },
  {
      "country": "Hong Kong",
      "city": "Central District",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Oceanside",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Encinitas",
      "status": "active"
  },
  {
      "country": "Sweden",
      "region": "Kalmar Lan",
      "city": "Kalmar",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "New York",
      "city": "New York",
      "status": "active"
  },
  {
      "country": "Sweden",
      "region": "Skane Lan",
      "city": "Staffanstorp",
      "status": "active"
  },
  {
      "country": "Sweden",
      "region": "Kalmar Lan",
      "city": "Kalmar",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Cochrane",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Cincinnati",
      "status": "active"
  },
  {
      "country": "Sweden",
      "region": "Kalmar Lan",
      "city": "Kalmar",
      "status": "active"
  },
  {
      "country": "Sweden",
      "region": "Kalmar Lan",
      "city": "Kalmar",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Colorado Springs",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Denver",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Cleveland",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Brecksville",
      "status": "active"
  },
  {
      "country": "United Kingdom",
      "region": "London, City of",
      "city": "London",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Utah",
      "city": "Sandy",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Pennsylvania",
      "city": "Pittsburgh",
      "status": "active"
  },
  {
      "country": "United States",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Ontario",
      "city": "Toronto",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Cleveland",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Solon",
      "status": "active"
  },
  {
      "country": "Sweden",
      "region": "Kalmar Lan",
      "city": "Färjestaden",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Stanford",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Cleveland",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Pennsylvania",
      "city": "Pittsburgh",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Pennsylvania",
      "city": "Pittsburgh",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Pennsylvania",
      "city": "Pittsburgh",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "New Jersey",
      "city": "Neptune",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Delaware",
      "city": "Wilmington",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Illinois",
      "city": "Fox Lake",
      "status": "active"
  },
  {
      "country": "Philippines",
      "region": "Cebu",
      "city": "Talisay",
      "status": "active"
  },
  {
      "country": "Spain",
      "region": "Murcia",
      "city": "Murcia",
      "status": "active"
  },
  {
      "country": "Spain",
      "region": "Murcia",
      "city": "Murcia",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Massachusetts",
      "city": "Maynard",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Bakersfield",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Mountain View",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Wisconsin",
      "city": "Madison",
      "status": "active"
  },
  {
      "country": "Hong Kong",
      "city": "Central District",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Oceanside",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Illinois",
      "city": "Crystal Lake",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Wisconsin",
      "city": "Clinton",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "New Jersey",
      "city": "Asbury Park",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "New Jersey",
      "city": "Haddonfield",
      "status": "active"
  },
  {
      "country": "Hong Kong",
      "city": "Central District",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Castle Rock",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Missouri",
      "city": "Saint Peters",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "British Columbia",
      "city": "Victoria",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Pennsylvania",
      "city": "Pittsburgh",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Pennsylvania",
      "city": "Pittsburgh",
      "status": "active"
  },
  {
      "country": "Indonesia",
      "region": "Jakarta Raya",
      "city": "Jakarta",
      "status": "active"
  },
  {
      "country": "Argentina",
      "region": "Buenos Aires",
      "city": "Villa Bosch",
      "status": "active"
  },
  {
      "country": "Costa Rica",
      "region": "San Jose",
      "city": "San José",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Oregon",
      "city": "Portland",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Manitoba",
      "city": "Winnipeg",
      "status": "active"
  },
  {
      "country": "Sweden",
      "region": "Stockholms Lan",
      "city": "Stockholm",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Youngstown",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Pennsylvania",
      "city": "Pittsburgh",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Massachusetts",
      "city": "Ipswich",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Illinois",
      "city": "Chicago",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Delaware",
      "city": "Wilmington",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Louisiana",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Delaware",
      "city": "Bear",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Louisiana",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Los Angeles",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Menlo Park",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Stanford",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Stanford",
      "status": "active"
  },
  {
      "country": "United Kingdom",
      "region": "Essex",
      "city": "Dunmow",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Louisiana",
      "city": "Monroe",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Mateo",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Washington",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Missouri",
      "city": "Ballwin",
      "status": "active"
  },
  {
      "country": "Argentina",
      "region": "Distrito Federal",
      "city": "Floresta",
      "status": "active"
  },
  {
      "country": "United Kingdom",
      "region": "Essex",
      "city": "Dunmow",
      "status": "active"
  },
  {
      "country": "India",
      "region": "Tamil Nadu",
      "city": "Coimbatore",
      "status": "active"
  },
  {
      "country": "United Kingdom",
      "region": "Hampshire",
      "city": "Crondall",
      "status": "active"
  },
  {
      "country": "India",
      "region": "Tamil Nadu",
      "city": "Salem",
      "status": "active"
  },
  {
      "country": "India",
      "region": "Tamil Nadu",
      "city": "Coimbatore",
      "status": "active"
  },
  {
      "country": "India",
      "region": "Tamil Nadu",
      "city": "Coimbatore",
      "status": "active"
  },
  {
      "country": "India",
      "region": "Tamil Nadu",
      "city": "Coimbatore",
      "status": "active"
  },
  {
      "country": "India",
      "region": "Tamil Nadu",
      "city": "Coimbatore",
      "status": "active"
  },
  {
      "country": "India",
      "region": "Tamil Nadu",
      "city": "Coimbatore",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Stanford",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Stanford",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Stanford",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Stanford",
      "status": "active"
  },
  {
      "country": "India",
      "region": "Tamil Nadu",
      "city": "Coimbatore",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Massachusetts",
      "city": "Waltham",
      "status": "active"
  },
  {
      "country": "Zimbabwe",
      "status": "active"
  },
  {
      "country": "India",
      "region": "Tamil Nadu",
      "city": "Coimbatore",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Wisconsin",
      "city": "Powers Lake",
      "status": "active"
  },
  {
      "country": "India",
      "region": "Tamil Nadu",
      "city": "Coimbatore",
      "status": "active"
  },
  {
      "country": "India",
      "region": "Tamil Nadu",
      "city": "Coimbatore",
      "status": "active"
  },
  {
      "country": "Hong Kong",
      "city": "Central District",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "New Mexico",
      "city": "Albuquerque",
      "status": "active"
  },
  {
      "country": "United Kingdom",
      "region": "Wokingham",
      "city": "Wokingham",
      "status": "active"
  },
  {
      "country": "Hong Kong",
      "city": "Central District",
      "status": "active"
  },
  {
      "country": "Dominican Republic",
      "region": "La Romana",
      "city": "La Romana",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "New Mexico",
      "city": "Rio Rancho",
      "status": "active"
  },
  {
      "country": "Honduras",
      "region": "Francisco Morazan",
      "city": "Tegucigalpa",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Florida",
      "city": "Miami",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Florida",
      "city": "Orlando",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "British Columbia",
      "city": "Maple Ridge",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Missouri",
      "city": "Springfield",
      "status": "active"
  },
  {
      "country": "South Africa",
      "region": "Gauteng",
      "city": "Centurion",
      "status": "active"
  },
  {
      "country": "Argentina",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Pennsylvania",
      "city": "Gibsonia",
      "status": "active"
  },
  {
      "country": "Thailand",
      "region": "Krung Thep",
      "city": "Bangkok",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "Australia",
      "region": "Victoria",
      "city": "Morwell",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Stanford",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Jose",
      "status": "active"
  },
  {
      "country": "Timor-Leste",
      "city": "Lospalos",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Rafael",
      "status": "active"
  },
  {
      "country": "India",
      "region": "Punjab",
      "city": "Mohali",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Castle Rock",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Pennsylvania",
      "city": "Pittsburgh",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "Timor-Leste",
      "city": "Lospalos",
      "status": "active"
  },
  {
      "country": "Japan",
      "region": "Tokyo",
      "city": "Tokyo",
      "status": "active"
  },
  {
      "country": "Japan",
      "region": "Tokyo",
      "city": "Tokyo",
      "status": "active"
  },
  {
      "country": "Japan",
      "region": "Tokyo",
      "city": "Tokyo",
      "status": "active"
  },
  {
      "country": "Japan",
      "region": "Tokyo",
      "city": "Tokyo",
      "status": "active"
  },
  {
      "country": "Japan",
      "region": "Tokyo",
      "city": "Tokyo",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "British Columbia",
      "city": "Vancouver",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Pennsylvania",
      "city": "Pittsburgh",
      "status": "active"
  },
  {
      "country": "Singapore",
      "city": "Singapore",
      "status": "active"
  },
  {
      "country": "Greece",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Oceanside",
      "status": "active"
  },
  {
      "country": "Thailand",
      "region": "Krung Thep",
      "city": "Bangkok",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Solon",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Illinois",
      "city": "Schaumburg",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Oceanside",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Stanford",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Louisiana",
      "status": "active"
  },
  {
      "country": "United Kingdom",
      "region": "Warwickshire",
      "city": "Stratford-upon-avon",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "British Columbia",
      "city": "Whistler",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "British Columbia",
      "city": "Vancouver",
      "status": "active"
  },
  {
      "country": "Thailand",
      "region": "Khon Kaen",
      "city": "Bangkok",
      "status": "active"
  },
  {
      "country": "Japan",
      "region": "Tokyo",
      "city": "Tokyo",
      "status": "active"
  },
  {
      "country": "Thailand",
      "region": "Krung Thep",
      "city": "Bangkok",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Stanford",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Stanford",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Palo Alto",
      "status": "active"
  },
  {
      "country": "Japan",
      "region": "Tokyo",
      "city": "Tokyo",
      "status": "active"
  },
  {
      "country": "Sweden",
      "region": "Kalmar Lan",
      "city": "Kalmar",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Stanford",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "Singapore",
      "city": "Singapore",
      "status": "active"
  },
  {
      "country": "Japan",
      "region": "Tokyo",
      "city": "Tokyo",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Maryland",
      "city": "Baltimore",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Stanford",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Maryland",
      "city": "Baltimore",
      "status": "active"
  },
  {
      "country": "Thailand",
      "region": "Krung Thep",
      "city": "Bangkok",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Beachwood",
      "status": "active"
  },
  {
      "country": "Thailand",
      "region": "Khon Kaen",
      "city": "Bangkok",
      "status": "active"
  },
  {
      "country": "Sweden",
      "region": "Kalmar Lan",
      "city": "Kalmar",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Maryland",
      "city": "Baltimore",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Maryland",
      "city": "Baltimore",
      "status": "active"
  },
  {
      "country": "Sweden",
      "region": "Stockholms Lan",
      "city": "Stockholm",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "Japan",
      "region": "Tokyo",
      "city": "Tokyo",
      "status": "active"
  },
  {
      "country": "Japan",
      "region": "Tokyo",
      "city": "Tokyo",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Louisiana",
      "city": "Monroe",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Stanford",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Louisiana",
      "status": "active"
  },
  {
      "country": "Sweden",
      "region": "Stockholms Lan",
      "city": "Stockholm",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Wisconsin",
      "city": "Appleton",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Stanford",
      "status": "active"
  },
  {
      "country": "Thailand",
      "region": "Krung Thep",
      "city": "Bangkok",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Nevada",
      "city": "Henderson",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Louisiana",
      "city": "New Orleans",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Nevada",
      "city": "Las Vegas",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "San Antonio",
      "status": "active"
  },
  {
      "country": "Sweden",
      "region": "Stockholms Lan",
      "city": "Stockholm",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Illinois",
      "city": "Round Lake",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Louisiana",
      "city": "New Orleans",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Michigan",
      "city": "Rochester",
      "status": "active"
  },
  {
      "country": "Netherlands",
      "region": "Noord-Brabant",
      "city": "Eindhoven",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Buda",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "Singapore",
      "city": "Singapore",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "Singapore",
      "city": "Singapore",
      "status": "active"
  },
  {
      "country": "Singapore",
      "city": "Singapore",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "New Jersey",
      "city": "Hoboken",
      "status": "active"
  },
  {
      "country": "India",
      "region": "Karnataka",
      "city": "Bangalore",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Ontario",
      "city": "Oakville",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Ontario",
      "city": "Hamilton",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Denver",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "Italy",
      "region": "Lazio",
      "city": "Rome",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Michigan",
      "city": "Romulus",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Michigan",
      "city": "Romulus",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "New York",
      "city": "Smithtown",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Michigan",
      "city": "Rochester",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Ontario",
      "city": "Toronto",
      "status": "trialing"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "New York",
      "city": "New York",
      "status": "trialing"
  },
  {
      "country": "Belarus",
      "region": "Minsk",
      "city": "Minsk",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Los Altos",
      "status": "trialing"
  },
  {
      "country": "Russian Federation",
      "region": "Saint Petersburg City",
      "status": "active"
  },
  {
      "country": "Sweden",
      "region": "Kalmar Lan",
      "city": "Kalmar",
      "status": "active"
  },
  {
      "country": "Germany",
      "status": "trialing"
  },
  {
      "country": "Sweden",
      "region": "Kalmar Lan",
      "city": "Kalmar",
      "status": "active"
  },
  {
      "country": "South Africa",
      "region": "Gauteng",
      "city": "Johannesburg",
      "status": "trialing"
  },
  {
      "country": "France",
      "region": "Nord-Pas-de-Calais",
      "city": "Croix",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Mountain View",
      "status": "trialing"
  },
  {
      "country": "Argentina",
      "region": "Buenos Aires",
      "city": "Ezeiza",
      "status": "active"
  },
  {
      "country": "Sweden",
      "region": "Kalmar Lan",
      "city": "Kalmar",
      "status": "active"
  },
  {
      "country": "Netherlands",
      "region": "Noord-Brabant",
      "city": "Eindhoven",
      "status": "active"
  },
  {
      "country": "Netherlands",
      "region": "Noord-Brabant",
      "city": "Eindhoven",
      "status": "active"
  },
  {
      "country": "France",
      "region": "Nord-Pas-de-Calais",
      "city": "Croix",
      "status": "trialing"
  },
  {
      "country": "France",
      "region": "Nord-Pas-de-Calais",
      "city": "Croix",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "New York",
      "city": "New York",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Louisiana",
      "city": "New Orleans",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Mountain View",
      "status": "trialing"
  },
  {
      "country": "Argentina",
      "region": "Buenos Aires",
      "city": "San Justo",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Los Altos",
      "status": "trialing"
  },
  {
      "country": "Mexico",
      "region": "Distrito Federal",
      "city": "Mexico",
      "status": "trialing"
  },
  {
      "country": "Mexico",
      "region": "Distrito Federal",
      "city": "Mexico",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "New York",
      "city": "Roslyn",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Washington",
      "city": "Seattle",
      "status": "trialing"
  },
  {
      "country": "Germany",
      "region": "Brandenburg",
      "city": "Kleinmachnow",
      "status": "trialing"
  },
  {
      "country": "Russian Federation",
      "region": "Moscow City",
      "city": "Moscow",
      "status": "active"
  },
  {
      "country": "Australia",
      "region": "Victoria",
      "city": "Carlton",
      "status": "trialing"
  },
  {
      "country": "Australia",
      "region": "Victoria",
      "city": "Carlton",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Washington",
      "city": "Richland",
      "status": "trialing"
  },
  {
      "country": "Sweden",
      "region": "Stockholms Lan",
      "city": "Stockholm",
      "status": "active"
  },
  {
      "country": "Netherlands",
      "status": "active"
  },
  {
      "country": "France",
      "status": "trialing"
  },
  {
      "country": "Canada",
      "region": "British Columbia",
      "city": "Vancouver",
      "status": "trialing"
  },
  {
      "country": "Thailand",
      "region": "Krung Thep",
      "city": "Bangkok",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Abilene",
      "status": "trialing"
  },
  {
      "country": "Japan",
      "region": "Tokyo",
      "city": "Tokyo",
      "status": "active"
  },
  {
      "country": "Australia",
      "region": "New South Wales",
      "city": "Sydney",
      "status": "trialing"
  },
  {
      "country": "Netherlands",
      "region": "Noord-Brabant",
      "city": "Eindhoven",
      "status": "active"
  },
  {
      "country": "Nepal",
      "status": "trialing"
  },
  {
      "country": "Netherlands",
      "region": "Noord-Brabant",
      "city": "Eindhoven",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "Germany",
      "region": "Berlin",
      "city": "Berlin",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Springfield",
      "status": "trialing"
  },
  {
      "country": "Singapore",
      "city": "Singapore",
      "status": "active"
  },
  {
      "country": "Russian Federation",
      "region": "Tatarstan",
      "city": "Kazan",
      "status": "trialing"
  },
  {
      "country": "Netherlands",
      "region": "Noord-Brabant",
      "city": "Eindhoven",
      "status": "active"
  },
  {
      "country": "Netherlands",
      "region": "Noord-Brabant",
      "city": "Eindhoven",
      "status": "active"
  },
  {
      "country": "Singapore",
      "city": "Singapore",
      "status": "active"
  },
  {
      "country": "Argentina",
      "region": "Distrito Federal",
      "city": "Buenos Aires",
      "status": "trialing"
  },
  {
      "country": "Netherlands",
      "region": "Noord-Brabant",
      "city": "Eindhoven",
      "status": "trialing"
  },
  {
      "country": "Netherlands",
      "region": "Noord-Brabant",
      "city": "Eindhoven",
      "status": "active"
  },
  {
      "country": "United Kingdom",
      "region": "Edinburgh, City of",
      "city": "Edinburgh",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Maryland",
      "city": "Baltimore",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Tennessee",
      "city": "Chattanooga",
      "status": "trialing"
  },
  {
      "country": "Australia",
      "region": "Victoria",
      "city": "Carlton",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Fort Worth",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "active"
  },
  {
      "country": "India",
      "region": "Karnataka",
      "city": "Bangalore",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Virginia",
      "city": "Ashburn",
      "status": "trialing"
  },
  {
      "country": "Namibia",
      "region": "Ohangwena",
      "city": "Oshikango",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Oakland",
      "status": "trialing"
  },
  {
      "country": "Netherlands",
      "region": "Noord-Brabant",
      "city": "Eindhoven",
      "status": "active"
  },
  {
      "country": "France",
      "region": "Ile-de-France",
      "city": "Paris",
      "status": "trialing"
  },
  {
      "country": "Netherlands",
      "region": "Noord-Brabant",
      "city": "Eindhoven",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Louisiana",
      "city": "Monroe",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "active"
  },
  {
      "country": "Sri Lanka",
      "status": "active"
  },
  {
      "country": "Netherlands",
      "region": "Noord-Brabant",
      "city": "Eindhoven",
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