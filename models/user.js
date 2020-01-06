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
    ranking: id=>db.load(`select ranking from users where id = ${id}`),
    getmylist: id => db.load(`select * from mylist where iduser = ${id}`),
    cleariteminmylist: (idproduct,iduser) => db.load(`delete from mylist where idproduct = ${idproduct} and iduser = ${iduser}`),
    loadmylist: id => db.load(`select  a.* from mylist m , product a where m.idproduct = a.id and m.iduser = ${id}`),
}