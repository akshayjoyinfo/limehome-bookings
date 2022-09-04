npm install --force

heroku pg:psql DATABASE_URL -a limehome-bookings

extensions installed
postgis
cube
eathdistance

 SELECT geo_location <-> ST_MakePoint(-71.05495, 42.36309) as distance,* FROM hotels 
    ORDER BY geo_location <-> ST_MakePoint(-71.05495, 42.36309) LIMIT 5;



http://localhost:3000/api/here-hotels?longitude=-71.05495&latitude=42.36309



{
  "hotelId": 1,
  "checkInDate": "2022-09-02T15:30:02.833Z",
  "checkOutDate": "2022-09-04T15:30:02.833Z",
  "amount": 10000,
  "rooms": 1,
  "guest": {
    "name": "string",
    "email": "string@string.com",
    "phone": "+917204285639"
  }
}