const db = require('../utils/db');

module.exports={
    all:()=>db.load('select * from product'),
    add:(entity)=>db.add('product',entity),
    uploadImage:(image,id)=>{
        if(image.length===1){
            var entity= {id:id,url:image};
            db.add('image_product',entity);
        }else{
            for(i =0;i<image.length;i++){
                var entity= {id:id,url:image[i]};
                db.add('image_product',entity);
            }
        }
    }
}