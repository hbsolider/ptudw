const db = require('../utils/db');

module.exports = {
    all: () => db.load('select * from product'),
    add: (entity) => {
        return db.add('product', entity);
    },
    myproduct: userId => db.load(`select a.* from product as a,users as b where a.idSeller = b.id and b.id=${userId}`) ,
    watchlist: userId => db.load(`select a.* from product as a,watchlist as b where a.id = b.id_product and b.id_user=${userId}`) ,
    search: textSearch => db.load(`select * from product where match(nameProduct) against('${textSearch}')`),  
    allbyTime: ()=>db.load('select * from product order by dateUp'),
    allByCat:  catId => db.load(`select * from product where category = ${catId}`),
    productByTime: ()=>db.load('select * from product order by dateUp limit 5'),
    productByPrice: ()=>db.load('select * from product order by priceExpect desc limit 5'),
}