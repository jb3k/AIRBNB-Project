figure out what each part is doing:

Sequelize |  Express | JS 


Breaking down file by file...

Bin:
1. imports the dotenv, app, and models
2. checks the database connection? 
    a. db.sequelize - what does this do?
3. authenticate() - returns a promise... 
4. .then() - (returns a promise) after authenticates... then 



Routes:
-why do i want to have an API folder with my routes and an index.js that directs me to api folder???
-what is the main point of the index.js files? what do i want to accomplish in them? it seems like in other practices, we haven't necessarily needed them and put this kind of stuff in the app.js? 
1. outer Index.js - 
    a. requires express, and uses the router...
    b. line 11, basically makes it so that I dont have to use the /api in my url routes for postman and CRUD routes.
    c. uses the csrf package to protect from malicious users being able to steal data from logged in users. 
2. inner index.js- basically directs /session and /users to those routes.
    a. imports the data from /session & /users along with express and restoreUser








Big picture of BackEnd Databases
1. API design and API development:
    -schema
    -endpoints
    -responses
    -
2. Databases:
3. 


Applications we are using:
1. Express: we use express to get rid of a lot of boiler-plate code when it comes to creating APIs
    a. API - Application Programming Interface - the connection between two applications (client & server / req & res)
2. Sequelize: process of connecting an ORM to a Database, basically helping us access data easier from databases easier and more dynamic
    a. ORM (object relational mapping) - converts the data to an object which helps with data maniuplation and querying thru that data
