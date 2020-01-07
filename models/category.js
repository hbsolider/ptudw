const db = require('../utils/db');

module.exports={
    all: ()=>db.load(`select * from category order by id`),
    add: (entity)=> db.load(`insert into category (categoryname) values ('${entity}')`),
    delete: (id) => {return db.deletebyId('category',id)},
    refesh:()=>db.load('ALTER TABLE category AUTO_INCREMENT=1'),
    update: (id,name)=>db.load(`update category set categoryname ='${name}' where id = ${id}`)
}