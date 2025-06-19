const Giocatore = require('../models/Giocatore');

//Richiede e restituisce tutti i giocatori presenti nel database
exports.getTuttiGiocatori = async (req, res) => {
    try {
        const giocatori = await Giocatore.find();
        res.json(giocatori);
    } catch (e) {
        res.status(500).json({message: 'Errore nel recupero dei giocatori.'});
    }
};

//Richiede e restituisce un giocatore 
exports.getGiocatore = async (req, res) => {
    try {
        const giocatore = await Giocatore.findById(req.params.id);
        if (!giocatore) return res.status(404).json({message: 'Giocatore non trovato.'});
        res.json(giocatore);
    } catch (e) {
        res.status(500).json({messaggio: 'Errore nel recupero del giocatore.'})
    }
};

//Richiede e restituisce giocatori filtrati per ruolo
exports.getGiocatoreRuolo = async (req, res) => {
    try {
        const ruoloRichiesto = req.params.ruolo.toUpperCase();
        if (!['P', 'D', 'C', 'A'].includes(ruoloRichiesto)) {
            return res.status(400).json({message: "Ruolo non valido"});
        }
        const giocatori = await Giocatore.find({ruolo: ruoloRichiesto});
        res.json(giocatori);
    } catch (e) {
        res.status(500).json({message: 'Errore nel server.'});
    }
};

//Crea un giocatore
exports.createGiocatore = async (req, res) => {
    try {
        const {nome, ruolo, valore} = req.body;
        const nuovoGiocatore = new Giocatore({nome, ruolo, valore});
        await nuovoGiocatore.save();
        res.status(201).json(nuovoGiocatore);
    } catch (e) {
        res.status(400).json({message: `Errore nella creazione del giocatore.`});
    }
};

//Modifica un giocatore
exports.updateGiocatore = async (req, res) => {
    try {
        const {nome, ruolo, valore} = req.body;
        const giocatoreModificato = await Giocatore.findByIdAndUpdate(
            req.params.id, 
            {nome, ruolo, valore}, 
            {new: true, runValidators: true}
        );
        if (!giocatoreModificato) {
            return res.status(404).json({message: 'Giocatore non trovato.'});
        } else {
            return res.status(200).json({message: 'Giocatore modificato.'});
        }
    } catch (e) {
        res.status(400).json({message: 'Errore nella modifica del giocatore:' + e});
    }
};

//Elimina giocatore
exports.deleteGiocatore = async (req, res) => {
    try {
        await Giocatore.findByIdAndDelete(req.params.id);
        res.json({message: 'Giocatore eliminato'});
    } catch (e) {
        res.status(500).json({message: 'Errore nella cancellazione del giocatore:' + e});
    }
};



