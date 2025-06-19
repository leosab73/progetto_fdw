const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cognome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    crediti: {
        type: Number,
        default: 1000
    }
});

userSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash;
        next();
    });
});

userSchema.methods.confrontaPassword = function(passwordInserita) {
    let user = this;
    return bcrypt.compare(passwordInserita, user.password);
};

module.exports = mongoose.model('Utente', userSchema);