const db = require('../utils/db');
const config = require('../config/default.json');

module.exports = {
    all: () => db.load('select * from product'),
    add: (entity) => {
        return db.add('product', entity);
    },
    myproduct: userId => db.load(`select a.* from product as a,users as b where a.idSeller = b.id and b.id=${userId}`) ,
    watchlist: userId => db.load(`select a.* from product as a,watchlist as b where a.id = b.id_product and b.id_user=${userId}`) ,
    pageBySearch: (textSearch,offset) => db.load(`select * from product where nameProduct like ('%${textSearch}%') limit ${config.paginate.limit} offset ${offset}`),  
    pageBySort: sql => db.load(`${sql}`),
    allbyTime: ()=>db.load('select * from product order by dateUp'),
    allByCat:  catId => db.load(`select * from product where category = ${catId}`),
    productByTime: ()=>db.load('select * from product order by dateUp limit 5'),
    productByPrice: ()=>db.load('select * from product order by priceExpect desc limit 5'),
    page: offset => db.load(`select * from product limit ${config.paginate.limit} offset ${offset}`), 
    count: async () => {
        const rows = await db.load(`select count(*) as total from product`)
        return rows[0].total;
      },
    pageByCat: (catId,offset) => db.load(`select * from product where category = ${catId} limit ${config.paginate.limit} offset ${offset}`),
}