let express = require('express');
let app = express();
let fs = require('fs');
let country = fs.readFileSync('country.json');
const countryParse = JSON.parse(country);
let tab = [];


app.get('/', function (req,res) {
    res.status(200);
    res.send('Simple text');
});

app.route('/teachersName')
.get (function (req,res) {
    res.status(200);
res.send('thomas: "Thomas Jamais", alban: "Alban Meurice"');
})

.post(function(req,res){
    res.send('thomas: "Thomas Jamais" , alban : "Alban Meurice"');
});

app.get('/all', function(req,res){
    res.status(200);
    res.json(countryParse)
});


app.get('/names/all/loop', function(req,res){
    res.status(200);
    
    countryParse.forEach(function (pays){
        tab.push(
            pays.name
            );
    });
    res.json(tab);
});

app.get('/names/all/map', function(req,res){
    res.status(200);

    const map1 = countryParse.map(pays => {
        return pays.name
    });
    res.json(map1);
});

app.get('/capital/all/loop', function(req,res){
    res.status(200);
    
    countryParse.forEach(function (pays){
        tab.push(
            pays.capital
            );
    });
    res.json(tab);
});

app.get('/capital/all/map', function(req,res){
    res.status(200);

    const map1 = countryParse.map(pays => {
        return pays.capital
    });
    res.json(map1);
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })






