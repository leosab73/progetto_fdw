const mongoose = require('mongoose');
require('dotenv').config();
const dbUri = process.env.MONGO_URI;

const connectDb = () => {
    mongoose.connect(dbUri).then(() => {
        console.log('Database connesso correttamente.');
    }).catch((e) => {
        console.log('Errore nella connessione al database: ' + e);
    })
};

module.exports = connectDb;