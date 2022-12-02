const router = require('express').Router();
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const data = require('../db/db.json');



//Ruta get para mandar notas que tenga
router.get('/api/notes', (req,res)=>{
    res.send(data);
})
//Ruta post para agregar nota
router.post('/api/notes', (req, res) => {
    const newN={
         title: req.body.title,
          text: req.body.text,
          id:uuidv4(),
      }
    // crear array si no hay notas o usar la que ya esta
    const array=data || [];
    array.push(newN);
    fs.writeFile('./db/db.json', JSON.stringify(array), (err) => {
        if (err) throw err;
    });
    console.info('La nota se agrego a JASON db');
    res.json();
});
//Borrar nota con parametro id
router.delete('/api/notes/:id', (req, res) => {
    for(let i = 0; i < data.length; i++){
        if (data[i].id=== req.params.id){
            data.splice(i, 1);
            }
        }
        console.info('La nota se elimino');
        res.json();
  });
  module.exports = router;


  
