const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to HomePage');
})

module.exports = router;