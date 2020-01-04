const db = require('../utils/db');

module.exports = {
    all: () => db.load('select * from product'),
    add: (entity) => {
        return db.add('product', entity);
    },
    allbyTime: ()=>db.load('select * from product order by dateUp'),
    productByTime: ()=>db.load('select * from product order by dateUp limit 5'),
    productByPrice: ()=>db.load('select * from product order by priceExpect desc limit 5'),
}