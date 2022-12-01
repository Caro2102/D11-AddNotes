const path = require('path');
const router = require('express').Router();

// Ruta get para pagina de inicio 
router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'../public/index.html'));
});

// Ruta get para dirigir a notas
router.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname,'../public/notes.html'));
});


module.exports = router;