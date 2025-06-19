const Utente = require('../models/Utente');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/RefreshToken');

const generaToken = (idUtente) => {
    const accessToken = jwt.sign(
            {id: idUtente}, 
            process.env.JWT_SECRET, 
            {expiresIn: '15m'}
    );

    const refreshToken = jwt.sign(
            {id: idUtente}, 
            process.env.JWT_REFRESH_SECRET, 
            {expiresIn: '7d'}
    );

    return {accessToken, refreshToken};
}

//Login utente
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const utente = await Utente.findOne({email});
        const combacia = await bcrypt.compare(password, utente.password);

        if (!utente || !combacia) return res.status(401).json({message: 'Email o password errati.'});

        const {accessToken, refreshToken} = generaToken(utente._id);

        await RefreshToken.create({
            token: refreshToken, 
            userId: utente._id
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        res.json({
            message: "Accesso effettuato",
            accessToken,
            utente: {
                id: utente._id,
                email: utente.email
            }
        });
    } catch (e) {
        res.status(500).json({message: "C'è stato un errore durante il login: " + e});
    }
};

//Registrazione utente
exports.registraUtente = async (req, res) => {
    try {
        const {nome, cognome, email, password} = req.body;
        const utenteEsistente = await Utente.findOne({email});
        if (utenteEsistente) {
            return res.status(404).json({message: 'Email già registrata'});
        }
        const nuovoUtente = new Utente({nome, cognome, email, password});
        await nuovoUtente.save();
        res.status(201).json({message: "Utente registrato con successo."}); 
    } catch (e) {
        console.error('Errore durante la registrazione: ', e);
        if (e.name === 'ValidationError') {
            const messaggio = Object.values(e.errors).map(val => val.message);
            return res.status(400).json({message: messaggio.join('.')});
        }
        res.status(500).json({message: "Errore del server durante la registrazione: " + e});
    }
};

//RefreshToken
exports.refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({message: "Non autorizzato"});
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const {accessToken} = generaToken(decoded.id);
        res.json({accessToken}); 
    } catch (e) {
        res.status(403).json({message: "Token non valido o scaduto"})
    }
};

//Logout utente
exports.logout = (req, res) => {
    res.clearCookie('refreshToken');
    res.json({message: "Logout avvenuto con successo"});
};