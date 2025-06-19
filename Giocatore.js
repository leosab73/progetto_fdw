const mongoose = require('mongoose');

const giocatoreSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    ruolo: {
        type: String,
        enum: ['P', 'D', 'C', 'A'],
        required: true
    },
    valore: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Giocatore', giocatoreSchema);