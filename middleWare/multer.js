const fs = require('fs');
const multer = require('multer');
const fse = require('fs-extra');
module.exports = {
    storage: (destination,count,isAva) => multer.diskStorage({
        destination: function (req, file, cb) {
            var dir = destination;
            fse.mkdirs(dir);
            cb(null, destination)
        },

        filename: function (req, file, cb) {
            if (isAva) {
                let extArray = file.mimetype.split("/");
                let extension = extArray[extArray.length - 1];
                cb(null, 'avatar.' + extension)
            } else {
                let extArray = file.mimetype.split("/");
                let extension = extArray[extArray.length - 1];
                cb(null, `${count++}` + '.jpg')
            }

        }
    }),
    upload: (storage) => multer({
        storage: storage,
        fileFilter: function (req, file, cb) {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true);
            } else {
                req.flash('error', "Chỉ cho phép định dạng hình ảnh");
                return cb(new Error("false"));
            }
        }
    })
};