// backend/config/index.js

//referencing stuff you have in your environment?
//exporting everything from the .env to JS

// basically specifying that we are doing the thing in JS

module.exports = {
    //if .env doesnt exist, then create it here... & same for all the other lines
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8000,
    dbFile: process.env.DB_FILE,
    jwtConfig: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN
    }
};
