npm install --force

heroku pg:psql DATABASE_URL -a limehome-bookings

extensions installed
postgis
cube
eathdistance

 SELECT geo_location <-> ST_MakePoint(-71.05495, 42.36309) as distance,* FROM hotels 
    ORDER BY geo_location <-> ST_MakePoint(-71.05495, 42.36309) LIMIT 5;