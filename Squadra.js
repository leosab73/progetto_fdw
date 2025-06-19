const mongoose = require('mongoose');

const squadraSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    allenatore: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utente',
        required: true
    },
    portieri: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Giocatore'
    }]
})
