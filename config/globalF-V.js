const moment = require('moment')
module.exports={
    getDate: (date)=>{
        return moment(date).format("DD/MM/YYYY");
    }
}