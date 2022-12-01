const router = require('express').Router();
const fs = require('fs');
// Helper method for generating unique ids
const { v4: uuidv4 } = require('uuid');
const util = require("util");

//Ruta get para notas
router.get('/api/notes', (req,res)=>{
    const read = util.promisify(fs.readFile);
    read("./db/db.json").then((data) => res.json(JSON.parse(data)))
    
});
//Ruta post para agregar nota
router.post('/api/notes', (req,res)=>{
    if(req.body){
        const newN={
            title: req.body.title,
            text: req.body.text,
            id:uuidv4(),
        }
         fs.readFile("./db/db.json",'utf-8',(error,data)=>{
            if(error){
                console.error(error);
            }else{
                const array = JSON.parse(data);
                array.push(newN);
                fs.writeFile("./db/db.json",JSON.stringify(array), (error) => {
                    error ? console.error(err) : console.info(`\nSe agrego la nota`)
                });
            };
    
        });
    }else{
        res.error('No hay nota nueva')
    }
   
});
//Borrar nota con parametro id
router.delete('/api/notes/:id', (req, res) => {
     fs.readFile("./db/db.json",'utf-8',(error,data)=>{
        if(error){
            console.error(error);
        }else{
            const array = JSON.parse(data);
            for(let i = 0; i < array.length; i++){
                if (array[i].id=== req.params.id){
                    array.splice(i, 1);
                  }
            };
            fs.writeFile('db/db.json',JSON.stringify(array), (error) => {
                error ? console.error(err) : console.info(`\nSe borro la nota`)
            });
        };

    });
  
  });
  module.exports = router;


  
