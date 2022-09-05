# LimeHome Bookings

## 1. LimeHome Bookings API
  - Get the list of hotels around a specific location
  - Create a booking for a given hotel on specific dates for a specific guest
  - List the bookings in a given hotel


## Built With
- Nest Js
- TypeScript
- Postgres + Postgis
- Compodoc
- Jest

## 2. Architecture Diagram
![](./screenshots/architecture.png)

## 2.1 API Components Diagram
![image](https://user-images.githubusercontent.com/1292985/188495497-0134a4aa-b986-40e9-92e1-d29b16a076c7.png)



## 3. Build & Test

1. Clone this repo
2. Setup Postgres and along with Extensions

  ```
  POSTGRES: 14
  Extensions: 

  cube          | 1.5   | data type for multidimensional cubes
  earthdistance | 1.1   | calculate great-circle distances on the surface of the Earth
  postgis       | 3.2.2 | PostGIS geometry and geography spatial types and functions
  
  ```

3. Creaate Database `limehomebookings` , or make sure .env DB_URL should be properly updated

4. Build and install depdendencies
  ```
  npm install

  ```
5. To Build & Run in LOCAL

  ```
  npm run build

  npm run start:dev
  ```

5. To run tests
   once run the tests there will be coverage & coverage-e2e foldet will be published
  ```
  npm run test
  npm run test:e2e

  ```

  
## 4. Live Demo / Documentation

CompoDoc Documentation: https://akshayjoyinfo.github.io/limehome-bookings/

API: https://limehome-bookings.herokuapp.com/docs 




## 5. Coverage Report

API Unit &  E2E Coverage Reports

###  5.1 Unit Tests
![image](https://user-images.githubusercontent.com/1292985/188380179-4a8281f2-2547-49f4-9e41-efabb26219ad.png)


### 5.2 E2E Tests
![image](https://user-images.githubusercontent.com/1292985/188380814-362e98a1-ac69-46e9-a277-53af2a7a89d4.png)


