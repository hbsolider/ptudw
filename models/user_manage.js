const db=require('../utils/db');

module.exports={
    loadusername: (entity)=>db.loadusername(entity.username),
}