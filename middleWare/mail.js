nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "peterpans2025@gmail.com",
        pass: "anhchien01"
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = {
    sendOTP: (email, otp) => {
        let mailOptions = {
            from: `"Welcome to Website Auction" <peterpans2025@gmail.com>`, // sender address
            to: `${email}`, // list of receivers
            subject: "Xác thực Email", // Subject line
            text: `Dùng mã OTP này để xác thực Email của bạn: ${otp}`, // plain text body
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        })
    },

    bidderAnnouce: (email, productName, price) => {
        let mailOptions = {
            from: `"Notify from Website Auction"`, // sender address
            to: `${email}`, // list of receivers
            subject: "ĐẶT GIÁ THÀNH CÔNG", // Subject line
            html: `<p>Giá đã đặt: ${price}</p> <br> <p>Sản phẩm: ${productName}</p> <br> <p> Vui lòng đợi thông báo chấp nhận từ seller </p>`
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        })
    },

    sellerAnnouce: (email, productName, price, bidder) => {
        let mailOptions = {
            from: `"The Best Auction Website" <peterpans2025@gmail.com>`, // sender address
            to: `${email}`, // list of receivers
            subject: "ĐẶT GIÁ THÀNH CÔNG", // Subject line
            html: `<p>Người đặt giá: ${bidder}</p> <br> <p>Giá đã đặt: ${price}</p> <br> <p>Sản phẩm: ${productName}</p>`
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        })
    },

    denySeller: (email, productName, bidder) => {
        let mailOptions = {
            from: `"The Best Auction Website" <peterpans2025@gmail.com>`, // sender address
            to: `${email}`, // list of receivers
            subject: "TỪ CHỐI LƯỢT ĐẤU GIÁ", // Subject line
            html: `<p>Bạn đã từ chối lượt đấu giá của <b>${bidder}</b> cho sản phẩm <b>${productName}</b></p>`
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        })
    },

    denyBidder: (email, productName) => {
        let mailOptions = {
            from: `"The Best Auction Website" <peterpans2025@gmail.com>`, // sender address
            to: `${email}`, // list of receivers
            subject: "ĐẤU GIÁ THẤT BẠI", // Subject line
            html: `<p>Bạn đã bị người bán từ chối lượt đấu giá cho sản phẩm <b>${productName}</b><br>Bạn sẽ không thể tham gia đấu giá sản phẩm này nữa.</p>`
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        })
    },

    acceptBidder: (email, productName) => {
        let mailOptions = {
            from: `"The Best Auction Website"`, // sender address
            to: `${email}`, // list of receivers
            subject: "YÊU CẦU THÀNH CÔNG", // Subject line
            html: `<p>Bạn đã được người bán cho phép đấu giá sản phẩm <b>${productName}</b></p>`
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        })
    },

    acceptSeller: (email, productName, bidder) => {
        let mailOptions = {
            from: `"The Best Auction Website" <peterpans2025@gmail.com>`, // sender address
            to: `${email}`, // list of receivers
            subject: "CHẤP NHẬN LƯỢT ĐẤU GIÁ", // Subject line
            html: `<p>Bạn đã chấp nhận cho <b>${bidder}</b> tham gia đấu giá sản phẩm <b>${productName}</b></p>`
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        })
    },

    denyBidderInQueue: (email, productName) => {
        let mailOptions = {
            from: `"The Best Auction Website" <peterpans2025@gmail.com>`, // sender address
            to: `${email}`, // list of receivers
            subject: "ĐẤU GIÁ THẤT BẠI", // Subject line
            html: `<p>Bạn đã bị người bán từ chối lượt đấu giá cho sản phẩm <b>${productName}</b><br>Bạn sẽ không thể tham gia đấu giá sản phẩm này nữa.</p>`
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        })
    },

    denySellerInQueue: (email, productName, bidder) => {
        let mailOptions = {
            from: `"The Best Auction Website" <peterpans2025@gmail.com>`, // sender address
            to: `${email}`, // list of receivers
            subject: "ĐẤU GIÁ THẤT BẠI", // Subject line
            html: `<p>Bạn đã từ chối <b>${bidder}</b> đấu giá cho sản phẩm <b>${productName}</b></p>`
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        })
    }
}