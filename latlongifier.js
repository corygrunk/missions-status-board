const fs = require('fs')
const dotenv = require('dotenv').config()
const limit = require("simple-rate-limiter")
const request = limit(require('request')).to(10).per(1000)
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
      "region": "Colorado",
      "city": "Castle Rock",
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
      "country": "Canada",
      "region": "Manitoba",
      "city": "Winnipeg",
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
      "country": "United States",
      "region": "Colorado",
      "city": "Littleton",
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
      "city": "Castle Rock",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Massachusetts",
      "city": "Charlestown",
      "status": "active"
  },
  {
      "country": "United Kingdom",
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
      "region": "Pennsylvania",
      "city": "Aliquippa",
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
      "region": "Michigan",
      "city": "Plymouth",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Washington",
      "city": "Clinton",
      "status": "active"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
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
      "region": "Ohio",
      "city": "Cleveland",
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
      "country": "United States",
      "region": "Ohio",
      "city": "Cleveland",
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
      "region": "District of Columbia",
      "city": "Washington",
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
      "country": "Canada",
      "region": "Alberta",
      "city": "Calgary",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Encinitas",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "New York",
      "city": "New York",
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
      "region": "Pennsylvania",
      "city": "Pittsburgh",
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
      "region": "Wisconsin",
      "city": "Powers Lake",
      "status": "active"
  },
  {
      "country": "Hong Kong",
      "city": "Central District",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "New York",
      "city": "New York",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "New Jersey",
      "city": "Haddonfield",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Missouri",
      "city": "Saint Peters",
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
      "city": "Santa Ana",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "New York",
      "city": "New York",
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
      "region": "Ohio",
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
      "city": "Santa Clara",
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
      "region": "Ohio",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "Missouri",
      "city": "Ballwin",
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
      "city": "Rio Rancho",
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
      "country": "United States",
      "region": "Florida",
      "city": "Miami",
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
      "region": "Pennsylvania",
      "city": "Pittsburgh",
      "status": "active"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Stanford",
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
      "region": "Texas",
      "city": "Midland",
      "status": "trialing"
  },
  {
      "country": "Germany",
      "region": "Nordrhein-Westfalen",
      "city": "Koln",
      "status": "trialing"
  },
  {
      "country": "Sweden",
      "region": "Stockholms Lan",
      "city": "Skarholmen",
      "status": "trialing"
  },
  {
      "country": "France",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Dayton",
      "status": "trialing"
  },
  {
      "country": "Indonesia",
      "region": "Jakarta Raya",
      "city": "Jakarta",
      "status": "trialing"
  },
  {
      "country": "Panama",
      "region": "Cocle",
      "city": "Penonome",
      "status": "trialing"
  },
  {
      "country": "Peru",
      "region": "Apurimac",
      "city": "Abancay",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Florida",
      "city": "Orlando",
      "status": "trialing"
  },
  {
      "country": "Canada",
      "region": "Alberta",
      "city": "Edmonton",
      "status": "trialing"
  },
  {
      "country": "Belgium",
      "region": "Oost-Vlaanderen",
      "city": "Gent",
      "status": "trialing"
  },
  {
      "country": "Tunisia",
      "status": "trialing"
  },
  {
      "country": "Egypt",
      "status": "trialing"
  },
  {
      "country": "Iraq",
      "region": "Baghdad",
      "city": "Baghdad",
      "status": "trialing"
  },
  {
      "country": "France",
      "region": "Rhone-Alpes",
      "city": "Lyon",
      "status": "trialing"
  },
  {
      "country": "Vietnam",
      "region": "Ha Noi",
      "city": "Hanoi",
      "status": "trialing"
  },
  {
      "country": "United Kingdom",
      "region": "London, City of",
      "city": "London",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "West Chester",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Florida",
      "city": "Apopka",
      "status": "trialing"
  },
  {
      "country": "Mexico",
      "region": "Distrito Federal",
      "city": "Mexico",
      "status": "trialing"
  },
  {
      "country": "Korea, Republic of",
      "region": "Seoul-t'ukpyolsi",
      "city": "Seoul",
      "status": "trialing"
  },
  {
      "country": "India",
      "region": "Andhra Pradesh",
      "city": "Hyderabad",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Ohio",
      "city": "Brook Park",
      "status": "trialing"
  },
  {
      "country": "Spain",
      "region": "Madrid",
      "city": "Madrid",
      "status": "trialing"
  },
  {
      "country": "Romania",
      "region": "Bucuresti",
      "city": "Bucharest",
      "status": "trialing"
  },
  {
      "country": "Estonia",
      "region": "Tartumaa",
      "city": "Tartu",
      "status": "trialing"
  },
  {
      "country": "Norway",
      "region": "Sor-Trondelag",
      "city": "Trondheim",
      "status": "trialing"
  },
  {
      "country": "United Kingdom",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Lufkin",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Illinois",
      "city": "Aurora",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Illinois",
      "city": "Chicago",
      "status": "trialing"
  },
  {
      "country": "United Kingdom",
      "region": "London, City of",
      "city": "London",
      "status": "trialing"
  },
  {
      "country": "South Africa",
      "region": "Gauteng",
      "city": "Johannesburg",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "New York",
      "city": "Brooklyn",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Los Angeles",
      "status": "trialing"
  },
  {
      "country": "Mexico",
      "region": "Nuevo Leon",
      "city": "Garcia",
      "status": "trialing"
  },
  {
      "country": "Indonesia",
      "region": "Jakarta Raya",
      "city": "Jakarta",
      "status": "trialing"
  },
  {
      "country": "Brazil",
      "region": "Ceara",
      "city": "Milagres",
      "status": "trialing"
  },
  {
      "country": "Spain",
      "region": "Catalonia",
      "city": "Barcelona",
      "status": "trialing"
  },
  {
      "country": "United Kingdom",
      "region": "Gloucestershire",
      "city": "Cheltenham",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "trialing"
  },
  {
      "country": "Mexico",
      "region": "Baja California",
      "city": "Tijuana",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Argyle",
      "status": "trialing"
  },
  {
      "country": "Czech Republic",
      "region": "Hlavni mesto Praha",
      "city": "Prague",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "trialing"
  },
  {
      "country": "Israel",
      "region": "Tel Aviv",
      "city": "Ramat Gan",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Arizona",
      "city": "Phoenix",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "District of Columbia",
      "city": "Washington",
      "status": "trialing"
  },
  {
      "country": "Mexico",
      "region": "Mexico",
      "city": "Metepec",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "New York",
      "city": "Brooklyn",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Oklahoma",
      "city": "Lawton",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "North Hollywood",
      "status": "trialing"
  },
  {
      "country": "United Kingdom",
      "region": "Hertford",
      "city": "Hemel Hempstead",
      "status": "trialing"
  },
  {
      "country": "South Africa",
      "region": "Western Cape",
      "city": "George",
      "status": "trialing"
  },
  {
      "country": "France",
      "region": "Ile-de-France",
      "city": "Montigny-le-bretonneux",
      "status": "trialing"
  },
  {
      "country": "United Kingdom",
      "region": "Kingston upon Hull, City of",
      "city": "Hull",
      "status": "trialing"
  },
  {
      "country": "Italy",
      "region": "Abruzzi",
      "city": "Vasto",
      "status": "trialing"
  },
  {
      "country": "Germany",
      "region": "Berlin",
      "city": "Berlin",
      "status": "trialing"
  },
  {
      "country": "Germany",
      "region": "Berlin",
      "city": "Berlin",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Houston",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Colorado",
      "city": "Englewood",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Indiana",
      "city": "Saint John",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Oregon",
      "city": "Portland",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Washington",
      "city": "Bainbridge Island",
      "status": "trialing"
  },
  {
      "country": "Jordan",
      "region": "Al Balqa'",
      "city": "Amman",
      "status": "trialing"
  },
  {
      "country": "Myanmar",
      "region": "Yangon",
      "city": "Yangon",
      "status": "trialing"
  },
  {
      "country": "Belgium",
      "region": "Hainaut",
      "city": "Charleroi",
      "status": "trialing"
  },
  {
      "country": "Spain",
      "region": "Andalucia",
      "city": "Sevilla",
      "status": "trialing"
  },
  {
      "country": "Italy",
      "region": "Lombardia",
      "city": "Milan",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Indiana",
      "city": "Saint John",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Los Angeles",
      "status": "trialing"
  },
  {
      "country": "Germany",
      "region": "Berlin",
      "city": "Berlin",
      "status": "trialing"
  },
  {
      "country": "Israel",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "New Jersey",
      "city": "Princeton",
      "status": "trialing"
  },
  {
      "country": "United States",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Tennessee",
      "city": "Nashville",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Virginia",
      "city": "Hayes",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Virginia",
      "city": "Hayes",
      "status": "trialing"
  },
  {
      "country": "India",
      "region": "Karnataka",
      "city": "Bangalore",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "New York",
      "city": "Carmel",
      "status": "trialing"
  },
  {
      "country": "Spain",
      "region": "Madrid",
      "city": "Pozuelo De Alarcón",
      "status": "trialing"
  },
  {
      "country": "Finland",
      "status": "trialing"
  },
  {
      "country": "Germany",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Wisconsin",
      "city": "Appleton",
      "status": "trialing"
  },
  {
      "country": "Belgium",
      "region": "Brussels Hoofdstedelijk Gewest",
      "city": "Berchem",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Oregon",
      "city": "Pendleton",
      "status": "trialing"
  },
  {
      "country": "Mexico",
      "region": "Nuevo Leon",
      "city": "Monterrey",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Pennsylvania",
      "city": "Harleysville",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "West Virginia",
      "city": "Morgantown",
      "status": "trialing"
  },
  {
      "country": "Canada",
      "region": "Manitoba",
      "city": "Winnipeg",
      "status": "trialing"
  },
  {
      "country": "Bulgaria",
      "region": "Grad Sofiya",
      "city": "Sofia",
      "status": "trialing"
  },
  {
      "country": "India",
      "region": "Madhya Pradesh",
      "city": "Indore",
      "status": "trialing"
  },
  {
      "country": "Spain",
      "region": "Madrid",
      "city": "Madrid",
      "status": "trialing"
  },
  {
      "country": "Italy",
      "region": "Emilia-Romagna",
      "city": "San Cassiano",
      "status": "trialing"
  },
  {
      "country": "Spain",
      "region": "Madrid",
      "city": "Madrid",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Alabama",
      "city": "Daleville",
      "status": "trialing"
  },
  {
      "country": "Thailand",
      "region": "Krung Thep",
      "city": "Bangkok",
      "status": "trialing"
  },
  {
      "country": "Ireland",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Wisconsin",
      "city": "Green Bay",
      "status": "trialing"
  },
  {
      "country": "United Kingdom",
      "region": "London, City of",
      "city": "London",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "New York",
      "city": "Astoria",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Indiana",
      "city": "Fishers",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "trialing"
  },
  {
      "country": "United Kingdom",
      "region": "Brent",
      "city": "Cricklewood",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Georgia",
      "city": "Duluth",
      "status": "trialing"
  },
  {
      "country": "Poland",
      "status": "trialing"
  },
  {
      "country": "Poland",
      "status": "trialing"
  },
  {
      "country": "France",
      "region": "Pays de la Loire",
      "city": "Les Herbiers",
      "status": "trialing"
  },
  {
      "country": "United Kingdom",
      "region": "Cheshire",
      "city": "Frodsham",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Wisconsin",
      "city": "Green Bay",
      "status": "trialing"
  },
  {
      "country": "Mexico",
      "region": "Distrito Federal",
      "city": "Mexico",
      "status": "trialing"
  },
  {
      "country": "France",
      "region": "Ile-de-France",
      "city": "Paris",
      "status": "trialing"
  },
  {
      "country": "United Kingdom",
      "region": "Shetland Islands",
      "city": "Lerwick",
      "status": "trialing"
  },
  {
      "country": "Australia",
      "region": "South Australia",
      "city": "Klemzig",
      "status": "trialing"
  },
  {
      "country": "Poland",
      "region": "Malopolskie",
      "city": "Krakow",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Virginia",
      "city": "Alexandria",
      "status": "trialing"
  },
  {
      "country": "Canada",
      "region": "Ontario",
      "city": "Toronto",
      "status": "trialing"
  },
  {
      "country": "Canada",
      "region": "Ontario",
      "city": "Ottawa",
      "status": "trialing"
  },
  {
      "country": "Canada",
      "region": "Ontario",
      "city": "Toronto",
      "status": "trialing"
  },
  {
      "country": "Chile",
      "region": "Region Metropolitana",
      "city": "Santiago",
      "status": "trialing"
  },
  {
      "country": "Italy",
      "region": "Veneto",
      "city": "Treviso",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Tennessee",
      "city": "Nashville",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Santa Ana",
      "status": "trialing"
  },
  {
      "country": "Belgium",
      "region": "Antwerpen",
      "city": "Geel",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Virginia",
      "city": "Franklin",
      "status": "trialing"
  },
  {
      "country": "Guatemala",
      "region": "Guatemala",
      "city": "Guatemala City",
      "status": "trialing"
  },
  {
      "country": "Colombia",
      "region": "Distrito Especial",
      "city": "Bogota",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Maine",
      "city": "Morrill",
      "status": "trialing"
  },
  {
      "country": "Canada",
      "region": "British Columbia",
      "city": "Vancouver",
      "status": "trialing"
  },
  {
      "country": "India",
      "region": "Karnataka",
      "city": "Bangalore",
      "status": "trialing"
  },
  {
      "country": "Austria",
      "status": "trialing"
  },
  {
      "country": "Ecuador",
      "region": "Pichincha",
      "city": "Quito",
      "status": "trialing"
  },
  {
      "country": "France",
      "region": "Ile-de-France",
      "city": "Gagny",
      "status": "trialing"
  },
  {
      "country": "Spain",
      "region": "Madrid",
      "city": "Getafe",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Azusa",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Austin",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Los Angeles",
      "status": "trialing"
  },
  {
      "country": "France",
      "region": "Franche-Comte",
      "city": "Dole",
      "status": "trialing"
  },
  {
      "country": "Spain",
      "region": "Galicia",
      "city": "Santiago De Compostela",
      "status": "trialing"
  },
  {
      "country": "Australia",
      "region": "Victoria",
      "city": "Melbourne",
      "status": "trialing"
  },
  {
      "country": "United States",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Los Angeles",
      "status": "trialing"
  },
  {
      "country": "Australia",
      "region": "New South Wales",
      "city": "Warilla",
      "status": "trialing"
  },
  {
      "country": "Canada",
      "region": "Ontario",
      "city": "Scarborough",
      "status": "trialing"
  },
  {
      "country": "Cote D'Ivoire",
      "region": "Lagunes",
      "city": "Abidjan",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Texas",
      "city": "Lewisville",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "New York",
      "city": "West Point",
      "status": "trialing"
  },
  {
      "country": "Myanmar",
      "region": "Yangon",
      "city": "Yangon",
      "status": "trialing"
  },
  {
      "country": "Palestinian Territory",
      "city": "Tulkarm",
      "status": "trialing"
  },
  {
      "country": "United Kingdom",
      "region": "London, City of",
      "city": "London",
      "status": "trialing"
  },
  {
      "country": "Netherlands",
      "region": "Zuid-Holland",
      "city": "Rotterdam",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "New York",
      "city": "New York",
      "status": "trialing"
  },
  {
      "country": "Ethiopia",
      "region": "Adis Abeba",
      "city": "Addis Ababa",
      "status": "trialing"
  },
  {
      "country": "Denmark",
      "region": "Hovedstaden",
      "city": "Copenhagen",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Antioch",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Tennessee",
      "city": "Cleveland",
      "status": "trialing"
  },
  {
      "country": "Belgium",
      "region": "Antwerpen",
      "city": "Ranst",
      "status": "trialing"
  },
  {
      "country": "Spain",
      "region": "Comunidad Valenciana",
      "city": "Elche",
      "status": "trialing"
  },
  {
      "country": "Kuwait",
      "region": "Al Kuwayt",
      "city": "Kuwait",
      "status": "trialing"
  },
  {
      "country": "Indonesia",
      "region": "Jakarta Raya",
      "city": "Jakarta",
      "status": "trialing"
  },
  {
      "country": "Austria",
      "region": "Wien",
      "city": "Vienna",
      "status": "trialing"
  },
  {
      "country": "Philippines",
      "region": "Cavite",
      "city": "Imus",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Illinois",
      "city": "Oak Park",
      "status": "trialing"
  },
  {
      "country": "Argentina",
      "region": "Distrito Federal",
      "city": "Villa Urquiza",
      "status": "trialing"
  },
  {
      "country": "Afghanistan",
      "region": "Kabol",
      "city": "Kabul",
      "status": "trialing"
  },
  {
      "country": "Finland",
      "region": "Southern Finland",
      "city": "Helsinki",
      "status": "trialing"
  },
  {
      "country": "Belgium",
      "region": "Antwerpen",
      "city": "Antwerpen",
      "status": "trialing"
  },
  {
      "country": "United States",
      "status": "trialing"
  },
  {
      "country": "Germany",
      "region": "Bayern",
      "city": "Augsburg",
      "status": "trialing"
  },
  {
      "country": "United Kingdom",
      "region": "Oldham",
      "city": "Oldham",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "New York",
      "city": "New York",
      "status": "trialing"
  },
  {
      "country": "India",
      "region": "Tamil Nadu",
      "city": "Trichy",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "Nevada",
      "city": "Las Vegas",
      "status": "trialing"
  },
  {
      "country": "India",
      "region": "Tamil Nadu",
      "city": "Chennai",
      "status": "trialing"
  },
  {
      "country": "New Zealand",
      "region": "Wellington",
      "city": "Wellington",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "Menlo Park",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "status": "trialing"
  },
  {
      "country": "Hong Kong",
      "city": "Hong Kong",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "California",
      "city": "San Jose",
      "status": "trialing"
  },
  {
      "country": "Israel",
      "region": "Yerushalayim",
      "city": "Jerusalem",
      "status": "trialing"
  },
  {
      "country": "Japan",
      "region": "Gifu",
      "city": "Toki",
      "status": "trialing"
  },
  {
      "country": "United Kingdom",
      "region": "London, City of",
      "city": "London",
      "status": "trialing"
  },
  {
      "country": "Albania",
      "region": "Tirane",
      "city": "Tirana",
      "status": "trialing"
  },
  {
      "country": "United States",
      "region": "New York",
      "city": "Bronx",
      "status": "trialing"
  },
  {
      "country": "Bulgaria",
      "region": "Grad Sofiya",
      "city": "Sofia",
      "status": "trialing"
  },
  {
      "country": "Brazil",
      "region": "Bahia",
      "city": "Irecê",
      "status": "trialing"
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



let stream = fs.createWriteStream('cities.json', {flags:'a'})

cityCountryObj.forEach(cities => {
  getLatLong(cities.city, cities.region, cities.country, function(data) {
    stream.write('{ "city" : "' + data.city + '", "lat" : "' + data.lat + '", "lng" : "' + data.lng + '" },' + "\n")
  })
})