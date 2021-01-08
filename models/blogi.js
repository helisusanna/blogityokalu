const fs = require("fs");
const tiedostonimi_kirjoitukset = "./models/kirjoitukset.json";

module.exports = {

    "haeKirjoitukset" : (callback) => {

        fs.readFile(tiedostonimi_kirjoitukset, "utf-8", (err, data) => {

            if (err) throw err;
        
            data = JSON.parse(data);
            data = data.filter(function(x) { return x !== null }); //null eli poistetut

            return callback(data);

        });
    },

    "lisaaUusiKirjoitus" : (uusi, callback) => {

        fs.readFile(tiedostonimi_kirjoitukset, "utf-8", (err, data) => {

            if (err) throw err;

            let kirjoitukset = JSON.parse(data);

            kirjoitukset.unshift(uusi);

            fs.writeFile(tiedostonimi_kirjoitukset, JSON.stringify(kirjoitukset, null, 2), (err) => {

                if (err) throw err;

                callback();

            });

        });


    },

    "poistaKirjoitus" : (poista, callback) => {

        fs.readFile(tiedostonimi_kirjoitukset, "utf-8", (err, data) => {

            if (err) throw err;

            let kirjoitukset = JSON.parse(data);
            kirjoitukset = kirjoitukset.filter(function(x) { return x !== null });
            
            let i = 0;
            kirjoitukset.forEach((kirjoitus) => {
                i++;
                if (kirjoitus.otsikko === poista.poistettava_otsikko){
                    i=i-1
                    delete kirjoitukset[i];
                }

            });

            fs.writeFile(tiedostonimi_kirjoitukset, JSON.stringify(kirjoitukset, null, 2), (err) => {

                if (err) throw err;

                callback();

            });

        });


    },

    "tykkayslaskuri" : (tykkays, callback) => {

        fs.readFile(tiedostonimi_kirjoitukset, "utf-8", (err, data) => {
            let kirjoitukset = JSON.parse(data);
            kirjoitukset = kirjoitukset.filter(function(x) { return x !== null });

            let i = 0;
            kirjoitukset.forEach((kirjoitus) => {
                i++;
                if (kirjoitus.otsikko === tykkays.tykattyotsikko){
                    i=i-1
                    kirjoitukset[i].tykkaykset = kirjoitukset[i].tykkaykset + 1;
                }

                if (kirjoitus.otsikko === tykkays.eitykattyotsikko){
                    i=i-1
                    kirjoitukset[i].eitykkaykset = kirjoitukset[i].eitykkaykset + 1;
                }

            });

            fs.writeFile(tiedostonimi_kirjoitukset, JSON.stringify(kirjoitukset, null, 2), (err) => {

                if (err) throw err;

                callback();

            });
        });

    }

};