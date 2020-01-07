const db = require('../utils/db');
const config = require('../config/default.json');

module.exports = {
    all: () => db.load('select * from product'),
    add: (entity) => {
        return db.add('product', entity);
    },
    updateStatus: id => db.load(`update from product set status = 1 where id = ${id}`),
    myproduct: userId => db.load(`select a.* from product as a,users as b where a.idSeller = b.id and b.id=${userId}`) ,
    watchlist: userId => db.load(`select a.* from product as a,watchlist as b where a.id = b.id_product and b.id_user=${userId}`) ,
    search: textSearch => db.load(`select * from product where nameProduct like '%${textSearch}%'`),  
    pageBySearch: (textSearch,offset) => db.load(`select * from product where nameProduct like ('%${textSearch}%') limit ${config.paginate.limit} offset ${offset}`),  
    pageBySort: sql => db.load(`${sql}`),
    allbyTime: ()=>db.load('select * from product order by dateUp'),
    allByCat:  catId => db.load(`select * from product where category = ${catId}`),
    productbyId: id => db.load(`select * from product where id = ${id}`),
    productByTime: ()=>db.load('select * from product order by dateUp limit 5 '),
    productByPrice: ()=>db.load('select * from product order by priceExpect desc limit 5'),
    updateBid: (entity)=>{
        db.add('historybid',entity);
        db.load(`update product SET idBidderCurrent = ${entity.idbidder} where id=${entity.idproduct}`);
        db.load(`update product SET nowprice = ${entity.price} where id=${entity.idproduct}`);
    },
    //lấy dữ liệu từ history theo id sản phẩm
    gethistorybyID: id => db.load(`select * from users, historybid WHERE historybid.idbidder = users.id and historybid.idproduct = ${id} ORDER BY historybid.time desc `),
    addimage: (entity)=>db.add('image',entity),
    loadimagebyId: id => db.load(`select * from image where idproduct = ${id}`),
    namebidCurrent: (id)=>db.load(`select username from product,users where product.idBidderCurrent = users.id and product.id =${id}`),
    addtolist: entity => db.add('mylist',entity),
    
    page: offset => db.load(`select * from product limit ${config.paginate.limit} offset ${offset}`), 
    count: async () => {
        const rows = await db.load(`select count(*) as total from product`)
        return rows[0].total;
      },
    pageByCat: (catId,offset) => db.load(`select * from product where category = ${catId} limit ${config.paginate.limit} offset ${offset}`),
    myorder: (id) => db.load(`select product.*,MAX(price) from historybid,product where idbidder = ${id} and product.id = historybid.idproduct and product.status = 0 GROUP BY idproduct`),
    updateWinner: (id,entity)=> db.updatebyId(id,'product',entity)
}