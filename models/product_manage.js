const db = require('../utils/db');

module.exports = {
    all: () => db.load('select * from product'),
    add: (entity) => db.add('product', entity),
    allbyTime: ()=>db.load('select * from product order by dateUp'),
    allByCat:  catId => db.load(`select * from product where category = ${catId}`),
    productbyId: id => db.load(`select * from product where id = ${id}`),
    productByTime: ()=>db.load('select * from product order by dateUp limit 5'),
    productByPrice: ()=>db.load('select * from product order by priceExpect desc limit 5'),
    updateBid: (entity)=>{
        db.add('historybid',entity);
        db.load(`update product SET idBidderCurrent = ${entity.idbidder} where id=${entity.idproduct}`)
    },
    addimage: (entity)=>db.add('image',entity),
    namebidCurrent: (id)=>db.load(`select username from product,users where product.idBidderCurrent = users.id and product.idBidderCurrent =${id}`),
    addtolist: entity => db.add('mylist',entity),
    
}