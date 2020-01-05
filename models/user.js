const db = require('../utils/db');

module.exports={
    all: ()=> db.load('select * from users'),
    bidder: ()=> db.load('select * from users where permission = 0'),
    seller: ()=> db.load('select * from users where permission = 1'),
    findbyID: id => db.findbyId('users', id),
    findbyemail: email => db.load(`select * from users where email = '${email}'`),
    add: entity => db.add('users',entity),
    updatePer: entity => db.add('notify',entity),
    getnoti: ()=> db.load('select * from notify where isread = 0'),
}