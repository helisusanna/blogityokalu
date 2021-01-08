const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const blogi = require("./models/blogi");

const portti = process.env.PORT || 3105;

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { "extended" : true } ));

app.use(express.static("./public"));

/*admin.ejs*/
app.get("/admin/", (req, res) => {

    let otsikko = "Ylläpito";

        res.render("admin", { "otsikko" : otsikko }); 

});

//kirjoituksen tallennus
app.post("/tallenna/", (req, res) => {

    let aikaleima = new Date().getTime();
    let kirjoittaja = "Ylläpito";

    let uusiKirjoitus = {
        "otsikko" : req.body.otsikko,
        "aikaleima" : aikaleima,
        "kirjoittaja" : kirjoittaja,
        "viesti" : req.body.viesti,
        "tykkaykset" : 0,
        "eitykkaykset" : 0
    };

    blogi.lisaaUusiKirjoitus(uusiKirjoitus, () => {
        res.redirect("/tallenna/");
    });

});

/*tallennusilmoitus
tallenna.ejs*/
app.get("/tallenna/", (req, res) => {

    let otsikko = "Teksti julkaistu";

        res.render("tallenna", { "otsikko" : otsikko }); 

});

/*kirjoituksen poisto
admin.ejs*/
app.post("/poista/", (req, res) => {

    let poistaKirjoitus = {
        "poistettava_otsikko" : req.body.poistettava_otsikko,
    };

    blogi.poistaKirjoitus(poistaKirjoitus, () => {
        res.redirect("/");
    });

});

/*tykkäyslaskuri 
index.ejs*/
app.post("/tykkays/", (req, res) => {

    let tykkayslaskuri = {
        "tykattyotsikko" : req.body.tykattyotsikko
    };

    blogi.tykkayslaskuri(tykkayslaskuri, () => {
        res.redirect("/");
    });

});

/*eitykkäyslaskuri 
index.ejs*/
app.post("/eitykkays/", (req, res) => {

    let tykkayslaskuri = {
        "eitykattyotsikko" : req.body.eitykattyotsikko
    };

    blogi.tykkayslaskuri(tykkayslaskuri, () => {
        res.redirect("/");
    });

});

/*kirjoitusten haku
index.ejs*/
app.get("/", (req, res) => {
        
    let kirjoitukset = blogi.haeKirjoitukset((kirjoitukset) => { 
        let otsikko = "Blogi";

            res.render("index", { "kirjoitukset" : kirjoitukset, "otsikko" : otsikko }); 

    });  

});

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi porttiin: ${portti}`);

});
