var mongoose = require('mongoose');

var servidor = 'localhost:27017';
var db = 'kodoDB';
const uri = `mongodb://${servidor}/${db}`

class Database {
    constructor() {
        //Promesas
        mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log('Se conecto a mongo');
            }).catch((error) => {
                console.log(error);
            });
    }
}

module.exports = new Database();