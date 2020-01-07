const db = require('../utils/db');

module.exports={
    all: ()=> db.load('select * from users'),
    bidder: ()=> db.load('select * from users where permission = 0'),
    seller: ()=> db.load('select * from users where permission = 1'),
    findbyID: id => db.findbyId('users', id),
    findbyemail: email => db.load(`select * from users where email = '${email}'`),
    add: entity => db.add('users',entity),
    updatePer: entity => db.add('adnotify',entity),
    //admin notification
    getnoti: ()=> db.load('select * from adnotify where isread = 0'),
    //normal notification
    addnotify: entity =>db.add('notify',entity),
    //get from bidder to seller
    getBtoS: id => db.load(`select users.*,a.nameProduct,a.id as productid,notify.* from users, notify,product a where users.id = notify.idbidder and notify.idseller = ${id} and notify.status = 0 and a.id = notify.idproduct`),
    //get from seller to bidder
    getStoB: id => db.load(`select users.*,a.nameProduct,a.id as productid,notify.* from users, notify,product a where users.id = notify.idseller and notify.idbidder = ${id} and notify.status != 0 and a.id = notify.idproduct`),
    updateNoti: (idbidder,idseller,status) => db.load(`update notify set status = ${status} where idseller = ${idseller} and idbidder = ${idbidder}`),
    ranking: id=>db.load(`select ranking from users where id = ${id}`),
    getmylist: id => db.load(`select * from mylist where iduser = ${id}`),
    cleariteminmylist: (idproduct,iduser) => db.load(`delete from mylist where idproduct = ${idproduct} and iduser = ${iduser}`),
    loadmylist: id => db.load(`select  a.* from mylist m , product a where m.idproduct = a.id and m.iduser = ${id}`),
    updateProfile: (entity,id)=> db.updatebyId(id,'users',entity),
    adddeny: (entity)=> db.add(`deny`,entity),
    checkdeny: entity=> db.load(`select * from deny where idbidder = ${entity.idbidder} and idseller = ${entity.idseller} and idproduct = ${entity.idproduct}`)
}   