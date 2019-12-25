const db = require('../utils/db');

module.exports={
    all: ()=> db.load('select * from users'),
    findbyID: id => db.findbyId('users', id),
    findbyemail: email => db.load(`select * from users where email = '${email}'`),
    add: entity => db.add('users',entity),
}