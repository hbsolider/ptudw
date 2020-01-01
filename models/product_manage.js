const db = require('../utils/db');

module.exports={
    all:()=>db.load('select * from product'),
    add:(entity)=>db.add('product',entity),
    
}