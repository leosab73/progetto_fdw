const express = require('express');
const router = express.Router();
const utente = require('../controllers/utenteController');

//Richiede e restituisce tutti gli utenti
router.get('/', utente.getTuttiUtenti);

//Richiede e restituisce un utente tramite ID
router.get('/:id', utente.getUtente);

//Crea un nuovo utente
router.post('/', utente.createUtente);

//Modifica un utente tramite ID
router.put('/:id', utente.updateUtente);

//Elimina un utente tramite ID
router.delete('/:id', utente.deleteUtente);

module.exports = router;
