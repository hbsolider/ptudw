const db = require('../utils/db');
const config = require('../config/default.json');

module.exports = {
    all: () => db.load('select * from product'),
    add: (entity) => {
        return db.add('product', entity);
    },
    myproduct: userId => db.load(`select a.* from product as a,users as b where a.idSeller = b.id and b.id=${userId}`) ,
    watchlist: userId => db.load(`select a.* from product as a,watchlist as b where a.id = b.id_product and b.id_user=${userId}`) ,
    search: textSearch => db.load(`select * from product where nameProduct like '%${textSearch}%'`),  
    allbyTime: ()=>db.load('select * from product order by dateUp'),
    allByCat:  catId => db.load(`select * from product where category = ${catId}`),
    productbyId: id => db.load(`select * from product where id = ${id}`),
    productByTime: ()=>db.load('select * from product order by dateUp limit 5'),
    productByPrice: ()=>db.load('select * from product order by priceExpect desc limit 5'),
    updateBid: (entity)=>{
        db.add('historybid',entity);
        db.load(`update product SET idBidderCurrent = ${entity.idbidder} where id=${entity.idproduct}`);
        db.load(`update product SET nowprice = ${entity.price} where id=${entity.idproduct}`);
    },
    addimage: (entity)=>db.add('image',entity),
    namebidCurrent: (id)=>db.load(`select username from product,users where product.idBidderCurrent = users.id and product.id =${id}`),
    addtolist: entity => db.add('mylist',entity),
    
    page: offset => db.load(`select * from product limit ${config.paginate.limit} offset ${offset}`), 
    count: async () => {
        const rows = await db.load(`select count(*) as total from product`)
        return rows[0].total;
      },
    pageByCat: (catId,offset) => db.load(`select * from product where category = ${catId} limit ${config.paginate.limit} offset ${offset}`), 
}