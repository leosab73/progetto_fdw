const Squadra = require('../models/Squadra');
const Giocatore = require('../models/Giocatore');
const Utente = require('../models/Utente');

exports.createSquadra = async (req, res) => {
    try {
        //dalla richiesta prendiamo n (nome), p (lista di ID portieri), c (lista di ID centrocampisti), a (lista di ID attaccanti)
        const {n, p, d, c, a} = req.body;
        //prendiamo anche l'ID dell'utente
        const utenteId = req.user._id;
        const tuttiGiocatori = [...p, ...d, ...c, ...a];
        const giocatori = await Giocatore.find({_id: { $in: tuttiGiocatori}});
        if (giocatori.length !== tuttiGiocatori.length) {
            return res.status(400).json({message: 'Alcuni giocatori non sono validi'});
        }
        const totale = giocatori.reduce((tot, g) => tot + g.valore, 0);
        const utente = await Utente.findById(utenteId);
        if (!utente) {
            return res.status(404).json({message: 'Utente non trovato'});
        } 
        if (totale > utente.crediti) {
            return res.status(400).json({
                message: `Hai solo ${utente.crediti} crediti, ma la squadra costa ${totale}`
            });
        }
        const nuovaSquadra = new Squadra({
            nome: n, 
            allenatore: utenteId,
            portieri: p,
            difensori: d,
            centrocampisti: c,
            attaccanti: a
        });
        await nuovaSquadra.save();
        utente.crediti -= totale;
        await utente.save();
        res.status(201);
    } catch (e) {
        res.status(500).json({message: "C'è stato un problema nella creazione della squadra"});
    }
}