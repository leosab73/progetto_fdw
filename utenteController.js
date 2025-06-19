const Utente = require('../models/Utente');

//Richiede e restituisce tutti gli utenti presenti nel database
exports.getTuttiUtenti = async (req, res) => {
    try {
        const utenti = await Utente.find();
        res.json(utenti);
    } catch (e) {
        res.status(500).json({message: 'Errore nel recupero degli utenti.'});
    }
};

//Richiede e restituisce un utente
exports.getUtente = async (req, res) => {
    try {
        const utente = await Utente.findById(req.params.id);
        if (!utente) return res.status(404).json({message: 'Utente non trovato.'});
        res.json(utente);
    } catch (e) {
        res.status(500).json({messaggio: "Errore nel recupero dell'utente."});
    }
};

//Crea un utente
exports.createUtente = async (req, res) => {
    try {
        const {nome, cognome, email, password} = req.body;
        const nuovoUtente = new Giocatore({nome, cognome, email, password});
        await nuovoUtente.save();
        res.status(201).json(nuovoUtente);
    } catch (e) {
        res.status(400).json({message: "Errore nella creazione dell'utente."});
    }
};

//Modifica un utente
exports.updateUtente = async (req, res) => {
    try {
        const {nome, cognome, email, password} = req.body;
        const utenteModificato = Utente.findByIdAndUpdate(req.params.id, {nome, cognome, email, password}, {new: true}, {runValidators: true});
        if (!utenteModificato) return res.status(404).json({message: 'Utente non trovato.'});
    } catch (e) {
        res.status(400).json({message: "Errore nella modifica dell'utente."});
    }
};

//Elimina utente
exports.deleteUtente = async (req, res) => {
    try {
        await Utente.findByIdAndDelete(req.params.id);
        res.json({message: 'Utente eliminato'});
    } catch (e) {
        res.status(500).json({message: "Errore nella cancellazione dell'utente."});
    }
};