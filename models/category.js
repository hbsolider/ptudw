const db = require('../utils/db');

module.exports={
    all: ()=>db.load(`select * from category`),
    add: (entity)=> db.load(`insert into category (categoryname) values ('${entity}')`),
    delete: (id) => db.deletebyId('category',id),
    refesh:()=>db.load('ALTER TABLE category AUTO_INCREMENT=1'),
}