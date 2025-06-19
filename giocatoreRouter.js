const express = require('express');
const router = express.Router();
const giocatore = require('../controllers/giocatoreController');

//Richiede tutti i giocatori
router.get('/', giocatore.getTuttiGiocatori);

//Richiede un solo giocatore tramite ID
router.get('/:id', giocatore.getGiocatore);

//Richiede giocatori per ruolo
router.get('/ruolo/:ruolo', giocatore.getGiocatoreRuolo);

//Crea un nuovo giocatore
router.post('/', giocatore.createGiocatore);

//Modifica un giocatore tramite ID
router.put('/:id', giocatore.updateGiocatore);

//Elimina un giocatore tramite ID
router.delete('/:id', giocatore.deleteGiocatore);

module.exports = router;