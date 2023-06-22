const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}
const port = 8000;
//mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    Email: String,
    Address: String,
    desc: String
  });
//model
const Contact = mongoose.model('Contact', contactSchema);

//EXPERSS
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//ENDPOINTS
app.get('/', (req,res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req,res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item is stored in the database")
    }).catch(()=>{
        res.status(400).send("This item is not saved")
    });

})

//SERVER
app.listen(port, ()=>{
    console.log(`The application started succesfully on ${port}`);
})
