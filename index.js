/**
 * Definizione delle costanti:
 * @express è la costante a cui è associato il framework express
 * @app è il server (l'applicazione express())
 * @dotenv è un modulo per gestire le variabili d'ambiente
 * @cors è un middleware per consentire l'utilizzo di risorse da più domini
 * 
 * Routing:
 * @homeRouter è la route per il collegamento all'homepage dell'applicazione
 * 
 * Database:
 * @connect richiama un file che si trova nella cartella 'connectDb' 
 * richiamando la funzione 'connectDb()' al suo interno
 * 
 */

//Definizione costanti
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const cors = require('cors');
const connettiDb = require('./connectDb/connection');

//Importazione dei router
const homeRouter = require('./routes/homePageRouter');
const giocatoreRouter = require('./routes/giocatoreRouter');
const utenteRouter = require('./routes/utenteRouter');
const authRouter = require('./routes/authRouter');

//Connessione al DB
connettiDb();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Routing
app.use('/', homeRouter);
app.use('/giocatori', giocatoreRouter);
app.use('/utenti', utenteRouter);
app.use('/auth', authRouter);

//Server
app.listen(port, () => {
    console.log(`Connettiti al server: http://localhost:${port}`);
});