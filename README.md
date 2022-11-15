# ShareThoughts
## Application
The url for this application is **http://sharethoughts.online/**. However, the website is temporary not running due to EC2 servers are temporary stopped. Please let me know, if you want to access to the website. 

## Run Back-End Application
1. Open Terminal
2. Change directory to 'back' folder. 
````
ShareThoughts> cd back
````
3. Create .env file in the back folder to add two environment variables as below
````
COOKIE_SECRET=randomText
DB_PASSWORD=randomText
````
4. Run npm install to install all dependencies of back folder
````
npm i
````
5. Run this command to create sharethought database on your local pc.
````
npx sequelize db:create
````
6. Run backend application
````
npm run dev
````


## Run Front-End Application
1. Open Terminal
2. Change directory to 'front' folder.
````
ShareThoughts> cd front
````
3. Run npm install to install all dependencies of back folder
````
npm i
````
4. Run frontend application
````
npm run dev
````

## Enjoy :)
