let express = require('express');
let app = express();
let fs = require('fs');
let country = fs.readFileSync('country.json');
const countryParse = JSON.parse(country);
app.use(express.urlencoded({ extended: true }));
let tab = [];
let tabs = [];
let tabb =[];

app.get('/', function (req,res) {
    res.status(200);
    res.send('salut');
    res.json(countryParse);
});

app.get('/country/:name', function(req,res) {
     res.status(200);
     
    for (let i = 0; i < countryParse.length; i++) {
        if (req.params.name.toUpperCase() == countryParse[i].name.toUpperCase()) {
            res.json(countryParse[i]);
        }}
 res.status(404);
 res.send('error 404');

});

app.get('/regions/:regionName', function(req,res) {
    res.status(200);

    tab = [];

    for (let i = 0; i <countryParse.length; i++) {
        if (req.params.regionName.toUpperCase() == countryParse[i].region.toUpperCase()) {
           tab.push(countryParse[i].name);
        }};
            
              
if (tab != 0) {
    res.json(tab);
} else {
    
res.status(404);
res.send('error 404');
}

    });
    
app.get('/subregion/:subregionName', function(req,res) {

    tabs = [];

    for (let i = 0; i < countryParse.length; i++) {
        if (req.params.subregionName.toUpperCase() == countryParse[i].subregion.toUpperCase()) {
            tabs.push(countryParse[i].name)
        }};
        if (tabs != 0) {
            res.status(200).json(tabs);
        } else {
            
        res.status(404);
        res.send('error 404');
        }
      
    });

app.get('/currencies/:currency', function(req,res){

    tabb = [];

    for (let i = 0; i< countryParse.length; i++) {
        if (req.params.currency.toUpperCase() == countryParse[i].currencies[0].name.toUpperCase()) {
             tabb.push(countryParse[i]);
}}
if (tabb != 0) {
    res.status(200).json(tabb);
} else {
    
    res.status(404);
    res.send('error 404');
}

});

app.put('/countries/:countryName', function(req,res){

    for (let i = 0; i < countryParse.length; i++) {
        if (req.params.countryName.toUpperCase() == countryParse[i].name.toUpperCase()) {
            let keys = Object.keys(req.body);                                                                   // J'envoie les clefs de mon objet dans req.body(=tableau vide)
            let lol =  countryParse[i];

            for (let a = 0; a< keys.length; a++) {
                lol[keys[a]] = req.body[keys[a]];
            }
            fs.writeFileSync("country.json", (JSON.stringify(lol)));
            res.send(lol);

        }}
               
});

app.delete('/countriesDelete/:countryName', function(req,res){

    const map = req.params.countryName.toUpperCase();
    const result = countryParse.filter(x => x.name.toUpperCase() !== countryParse);
    
    console.log(result);
     
    if (map == countryParse.name) {
        res.status(200).json(tabb);
    } else {
        
        res.status(404);
        res.send('error 404');
    }

    });

    app.post('/countries/:countryName', function(req,res){
        

        let tabAjout = [

            name = req.params.countryName,
            alpha2Code = req.body.alpha2Code,
            alpha3Code = req.body.alpha3Code,
            capital = req.body.capital,
            region = req.body.region,
            subregion = req.body.subregion,
            population = req.body.population,
            denonym = req.body.denonym,
            nativeName = req.body.nativeName,
            flag = req.body.flag,
        ]

        tabAjout.push(countryParse);
        fs.writeFileSync("country.json", (JSON.stringify(tabAjout)));
        res.send(tabAjout);


    })

app.listen(1337, function () {
    console.log('Example app listening on port 1337!')
  });