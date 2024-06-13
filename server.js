const express = require('express');

const app = express();

const validator = require('validator');

const port = 3000;

app.get('/greetings/:name', (req,res) => {
    console.log(req.params.name);
    res.send(`<h1>Hello ${req.params.name}</h1>`)
    
})

app.get('/roll/:diceRoll', (req, res) => {
     const dice = req.params.diceRoll;

     if(validator.isNumeric(dice)){
        const roll = Math.floor(Math.random() * dice)
        res.send(`You rolled ${roll}`);
     }else if(!validator.isNumeric(dice)){
        res.send('You must specify a number');
     }
});

app.get('/collectibles/:memorabilia', (req, res) =>{
    const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
      ];
    
    if(req.params.memorabilia > collectibles.length){
        return res.send('This item is not yet in stock')
    }else{
        return res.send(`So, you want the ${collectibles[req.params.memorabilia].name}? For $${collectibles[req.params.memorabilia].price}, it can be yours!`)
    }
});

app.get('/shoes', (req, res) =>{
    const shoes = [
        { name: "Birkenstocks", price: 50, type: "sandal" },
        { name: "Air Jordans", price: 500, type: "sneaker" },
        { name: "Air Mahomeses", price: 501, type: "sneaker" },
        { name: "Utility Boots", price: 20, type: "boot" },
        { name: "Velcro Sandals", price: 15, type: "sandal" },
        { name: "Jet Boots", price: 1000, type: "boot" },
        { name: "Fifty-Inch Heels", price: 175, type: "heel" }
    ];
  

    let shoeInventory = shoes;

    if(req.query["max-price"]) {
        const maxPrice = parseInt(req.query["max-price"]);
        shoeInventory = shoeInventory.filter(shoe => shoe.price <= maxPrice);
    }
    if(req.query["min-price"]) {
        const minPrice = parseInt(req.query["min-price"]);
        shoeInventory = shoeInventory.filter(shoe => shoe.price >= minPrice);
    }
    if(req.query.type){
        const shoeModel = req.query.type.toLowerCase();
        shoeInventory = shoeInventory.filter(shoe => shoe.type.toLowerCase() === shoeModel);
    }
    res.json(shoeInventory);
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
});

