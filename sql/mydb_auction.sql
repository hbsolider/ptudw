/*
 Navicat Premium Data Transfer

 Source Server         : mydb_auction
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : localhost:3306
 Source Schema         : mydb_auction

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 07/01/2020 03:44:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for adnotify
-- ----------------------------
DROP TABLE IF EXISTS `adnotify`;
CREATE TABLE `adnotify`  (
  `iduser` int(11) NOT NULL,
  `isread` int(11) NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `categoryname`(`categoryname`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (2, 'Laptop');
INSERT INTO `category` VALUES (3, 'Other');
INSERT INTO `category` VALUES (1, 'Phone');
INSERT INTO `category` VALUES (4, 'Shoes');
INSERT INTO `category` VALUES (5, 'Tablet');

-- ----------------------------
-- Table structure for feedback
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback`  (
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `id` int(11) NOT NULL,
  `iduser` int(11) NOT NULL,
  `point` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for historybid
-- ----------------------------
DROP TABLE IF EXISTS `historybid`;
CREATE TABLE `historybid`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idbidder` int(11) NOT NULL,
  `idproduct` int(11) NOT NULL,
  `time` datetime(0) NOT NULL,
  `price` bigint(20) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of historybid
-- ----------------------------
INSERT INTO `historybid` VALUES (3, 3, 1, '2020-01-06 04:23:15', 9690000);
INSERT INTO `historybid` VALUES (4, 6, 1, '2020-01-06 05:10:21', 9390000);
INSERT INTO `historybid` VALUES (5, 6, 1, '2020-01-06 05:12:37', 9290000);
INSERT INTO `historybid` VALUES (6, 6, 1, '2020-01-06 05:15:01', 9490000);
INSERT INTO `historybid` VALUES (7, 6, 1, '2020-01-06 05:19:45', 10290000);
INSERT INTO `historybid` VALUES (8, 3, 1, '2020-01-06 08:50:33', 10990000);
INSERT INTO `historybid` VALUES (9, 3, 1, '2020-01-06 08:53:20', 11790000);
INSERT INTO `historybid` VALUES (10, 3, 2, '2020-01-06 08:56:47', 18590000);
INSERT INTO `historybid` VALUES (11, 3, 1, '2020-01-06 09:00:45', 12190000);
INSERT INTO `historybid` VALUES (12, 6, 3, '2020-01-06 09:23:29', 32690000);
INSERT INTO `historybid` VALUES (13, 6, 4, '2020-01-06 09:26:15', 9990000);
INSERT INTO `historybid` VALUES (14, 3, 1, '2020-01-06 10:37:54', 13090000);
INSERT INTO `historybid` VALUES (15, 6, 6, '2020-01-07 12:07:06', 5090000);

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image`  (
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `idproduct` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of image
-- ----------------------------
INSERT INTO `image` VALUES ('4.jpg', 3, 1);
INSERT INTO `image` VALUES ('1.jpg', 1, 2);
INSERT INTO `image` VALUES ('2.jpg', 1, 3);
INSERT INTO `image` VALUES ('3.jpg', 1, 4);
INSERT INTO `image` VALUES ('4.jpg', 1, 5);
INSERT INTO `image` VALUES ('1.jpg', 2, 6);
INSERT INTO `image` VALUES ('2.jpg', 2, 7);
INSERT INTO `image` VALUES ('3.jpg', 2, 8);
INSERT INTO `image` VALUES ('4.jpg', 2, 9);
INSERT INTO `image` VALUES ('1.jpg', 3, 10);
INSERT INTO `image` VALUES ('2.jpg', 3, 11);
INSERT INTO `image` VALUES ('3.jpg', 3, 12);
INSERT INTO `image` VALUES ('5.jpg', 3, 21);
INSERT INTO `image` VALUES ('1.jpg', 4, 22);
INSERT INTO `image` VALUES ('2.jpg', 4, 23);
INSERT INTO `image` VALUES ('3.jpg', 4, 24);
INSERT INTO `image` VALUES ('4.jpg', 4, 25);
INSERT INTO `image` VALUES ('1.jpg', 5, 26);
INSERT INTO `image` VALUES ('2.jpg', 5, 27);
INSERT INTO `image` VALUES ('3.jpg', 5, 28);
INSERT INTO `image` VALUES ('4.jpg', 5, 29);
INSERT INTO `image` VALUES ('5.jpg', 5, 30);
INSERT INTO `image` VALUES ('1.jpg', 6, 31);
INSERT INTO `image` VALUES ('2.jpg', 6, 32);
INSERT INTO `image` VALUES ('3.jpg', 6, 33);
INSERT INTO `image` VALUES ('4.jpg', 6, 34);
INSERT INTO `image` VALUES ('5.jpg', 6, 35);
INSERT INTO `image` VALUES ('1.jpg', 7, 36);
INSERT INTO `image` VALUES ('2.jpg', 7, 37);
INSERT INTO `image` VALUES ('3.jpg', 7, 38);
INSERT INTO `image` VALUES ('4.jpg', 7, 39);
INSERT INTO `image` VALUES ('5.jpg', 7, 40);
INSERT INTO `image` VALUES ('1.jpg', 8, 41);
INSERT INTO `image` VALUES ('2.jpg', 8, 42);
INSERT INTO `image` VALUES ('3.jpg', 8, 43);
INSERT INTO `image` VALUES ('4.jpg', 8, 44);
INSERT INTO `image` VALUES ('5.jpg', 8, 45);
INSERT INTO `image` VALUES ('1.jpg', 9, 46);
INSERT INTO `image` VALUES ('2.jpg', 9, 47);
INSERT INTO `image` VALUES ('3.jpg', 9, 48);
INSERT INTO `image` VALUES ('4.jpg', 9, 49);
INSERT INTO `image` VALUES ('5.jpg', 9, 50);
INSERT INTO `image` VALUES ('1.jpg', 10, 51);
INSERT INTO `image` VALUES ('2.jpg', 10, 52);
INSERT INTO `image` VALUES ('3.jpg', 10, 53);
INSERT INTO `image` VALUES ('4.jpg', 10, 54);
INSERT INTO `image` VALUES ('5.jpg', 10, 55);

-- ----------------------------
-- Table structure for mylist
-- ----------------------------
DROP TABLE IF EXISTS `mylist`;
CREATE TABLE `mylist`  (
  `idproduct` int(11) NOT NULL,
  `iduser` int(11) NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mylist
-- ----------------------------
INSERT INTO `mylist` VALUES (1, 1);
INSERT INTO `mylist` VALUES (10, 3);
INSERT INTO `mylist` VALUES (7, 3);
INSERT INTO `mylist` VALUES (3, 3);
INSERT INTO `mylist` VALUES (4, 6);

-- ----------------------------
-- Table structure for notify
-- ----------------------------
DROP TABLE IF EXISTS `notify`;
CREATE TABLE `notify`  (
  `idbidder` int(11) NOT NULL,
  `idseller` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `idproduct` int(11) NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notify
-- ----------------------------
INSERT INTO `notify` VALUES (1, 2, 0, 1);
INSERT INTO `notify` VALUES (3, 2, 0, 1);
INSERT INTO `notify` VALUES (2, 1, 1, 2);
INSERT INTO `notify` VALUES (3, 1, 0, 4);
INSERT INTO `notify` VALUES (6, 1, 1, 6);

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nameProduct` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `category` int(11) NOT NULL,
  `priceStart` bigint(25) NOT NULL,
  `priceExpect` bigint(25) NULL DEFAULT NULL,
  `dateUp` datetime(0) NOT NULL,
  `timeExist` int(11) NOT NULL,
  `idSeller` int(11) NOT NULL,
  `idBidderCurrent` int(11) NULL DEFAULT NULL,
  `transpotMethod` int(11) NULL DEFAULT NULL,
  `idWinner` int(11) NULL DEFAULT NULL,
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `imageDot` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `nowprice` bigint(20) NULL DEFAULT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id_category_fk_idx`(`category`) USING BTREE,
  CONSTRAINT `id_category_fk` FOREIGN KEY (`category`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (1, 'Huawei nova 5T', 1, 8690000, 9000000, '2020-01-03 05:00:46', 7, 1, 3, 2, NULL, '<p>&nbsp;</p>\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">\r\n<p>Detail:Huawei nova 5T sở hữu 5 camera đẳng cấp, cấu h&igrave;nh mạnh mẽ nhất trong ph&acirc;n kh&uacute;c gi&aacute; v&agrave; một thiết kế nổi bật, sẽ l&agrave; chiếc điện thoại đ&aacute;p ứng xuất sắc mọi y&ecirc;u cầu của bạn.</p>\r\n<p>Price: 8690000</p>\r\n</div>', '4', 13090000, 0);
INSERT INTO `product` VALUES (2, 'Huawei P30 Pro', 1, 17990000, 25000000, '2020-01-03 05:02:24', 7, 1, 3, 0, NULL, '<p>Detail: Với Huawei P30 Pro, h&atilde;ng cho thấy tầm nh&igrave;n rộng lớn của h&atilde;ng khi mang loạt t&iacute;nh năng của tương lai c&ugrave;ng với những c&ocirc;ng nghệ chụp ảnh hiện đại nhất g&oacute;i gọn v&agrave;o chiếc điện thoại sang trọng n&agrave;y.</p>\r\n<p>Price: 17990000</p>\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>', '4', 18590000, 0);
INSERT INTO `product` VALUES (3, 'IPhone 11 Pro Max', 1, 31990000, 60000000, '2020-01-03 05:03:46', 7, 1, 6, 1, NULL, '<p>Detail: Chiếc iPhone mạnh mẽ nhất, lớn nhất, thời lượng pin tốt nhất đ&atilde; xuất hiện. iPhone 11 Pro Max chắc chắn l&agrave; chiếc điện thoại m&agrave; ai cũng ao ước khi sở hữu những t&iacute;nh năng xuất sắc nhất, đặc biệt l&agrave; camera v&agrave; pin.</p>\r\n<p>Price: 31990000</p>\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>', '5', 32690000, 0);
INSERT INTO `product` VALUES (4, 'OPPO Reno2 F', 1, 8990000, 9500000, '2020-01-03 05:04:35', 7, 1, 6, 1, NULL, '<p>Detail: Chụp ảnh đỉnh cao với 4 camera sau; thiết kế kh&ocirc;ng viền tuyệt mỹ; cảm biến v&acirc;n tay trong m&agrave;n h&igrave;nh v&agrave; camera trước &ldquo;t&agrave;ng h&igrave;nh&rdquo; độc đ&aacute;o, OPPO Reno2 F tập hợp tất cả những tinh hoa c&ocirc;ng nghệ trong một sản phẩm tuyệt đẹp.</p>\r\n<p>Price: 8990000</p>\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>', '4', 9990000, 0);
INSERT INTO `product` VALUES (5, 'Sam Sung Galaxy Ford', 1, 50000000, 60000000, '2020-01-03 05:06:13', 7, 1, NULL, 2, NULL, '<p>Detail: Một chiếc điện thoại m&agrave; bạn chưa từng thấy trước đ&acirc;y, một chiếc điện thoại c&oacute; m&agrave;n h&igrave;nh gập độc đ&aacute;o ngỡ như chỉ c&oacute; ở tương lai, xin giới thiệu kỳ quan c&ocirc;ng nghệ mới mang t&ecirc;n Samsung Galaxy Fold.</p>\r\n<p>Price: 50000000</p>\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>', '5', 50000000, 0);
INSERT INTO `product` VALUES (6, 'Samsung Galaxy A20s', 1, 4390000, 5000000, '2020-01-03 05:07:29', 7, 1, 6, 1, NULL, '<p>Detail: C&ugrave;ng Samsung Galaxy A20s kh&aacute;m ph&aacute; thế giới với m&agrave;n h&igrave;nh cực lớn 6,5 inch, 3 camera sau đẳng cấp thời thượng trong một mức gi&aacute; v&ocirc; c&ugrave;ng hấp dẫn.</p>\r\n<p>Price: 4390000</p>\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>', '5', 5090000, 0);
INSERT INTO `product` VALUES (7, 'Sam Sung Galaxy A51', 1, 8990000, 10000000, '2020-01-03 05:09:57', 7, 1, NULL, 0, NULL, '<p>Detail: Tự h&agrave;o l&agrave; smartphone đầu ti&ecirc;n tr&ecirc;n thế giới được t&iacute;ch hợp camera Macro hỗ trợ chụp ảnh cận cảnh, Galaxy A51 đem tới trải nghiệm chụp h&igrave;nh vượt ngo&agrave;i mong đợi với khả năng t&aacute;i tạo đến từng chi tiết nhỏ nhất</p>\r\n<p>Price: 7990000</p>\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>', '5', 8990000, 0);
INSERT INTO `product` VALUES (8, 'Samsung Galaxy Note 10', 1, 17990000, 33000000, '2020-01-03 05:12:09', 7, 1, NULL, 1, NULL, '<p>Detail: Chiếc điện thoại cao cấp nhất, m&agrave;n h&igrave;nh lớn nhất, mang tr&ecirc;n m&igrave;nh sức mạnh đ&aacute;ng kinh ngạc của một chiếc m&aacute;y t&iacute;nh v&agrave; hệ thống 4 camera sau chuy&ecirc;n nghiệp, đ&oacute; ch&iacute;nh l&agrave; Samsung Galaxy Note 10+, nơi quyền năng mới được thể hiện.</p>\r\n<p>Price: 26990000</p>\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>', '5', 17990000, 0);
INSERT INTO `product` VALUES (9, 'Vivo V17 Pro', 2, 9490000, 10000000, '2020-01-03 05:13:54', 7, 1, NULL, 1, NULL, '<p>Detail: Với 6 camera đẳng cấp, Vivo V17 Pro xứng đ&aacute;ng vượt xa chuẩn ảnh khi đạt đỉnh cao nhiếp ảnh tr&ecirc;n smartphone. Ngo&agrave;i ra đ&acirc;y c&ograve;n l&agrave; một tuyệt t&aacute;c về thiết kế với m&agrave;n h&igrave;nh tr&agrave;n viền ho&agrave;n hảo, thu h&uacute;t mọi &aacute;nh nh&igrave;n.</p>\r\n<p>Price: 9490000</p>\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>', '5', 9490000, 0);
INSERT INTO `product` VALUES (10, 'Xiaomi mi 9T', 2, 8500000, 9000000, '2020-01-03 05:21:38', 7, 1, NULL, 2, NULL, '<p>Detail: Xiaomi Mi 9T 128GB mang tr&ecirc;n m&igrave;nh thiết kế của tương lai với camera selfie &ldquo;giấu k&iacute;n&rdquo; độc đ&aacute;o, sức mạnh đ&aacute;ng kinh ngạc b&ecirc;n trong v&agrave; bộ ba camera 48MP chuy&ecirc;n nghiệp.</p>\r\n<p>Price: 8490000</p>\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>', '5', 8500000, 0);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `userphone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `permission` int(11) NULL DEFAULT NULL,
  `ranking` float NULL DEFAULT NULL,
  `avatar` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE,
  FULLTEXT INDEX `email_2`(`email`, `username`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'baoluan039@gmail.com', '$2a$10$UNV0BsgUkvYW6VNAy7geL.rii9wZc6Zu10AcxF46Gmm4mhEKDA7ua', 'Hoài Bảo', '0982801754', 2, 10, NULL);
INSERT INTO `users` VALUES (2, 'baodeptrai@gmail.com', '$2a$10$em9ZBltlQVb4lRK3FiP4de.SDmHXbYMP7sqDWF2LRMC.LfKJ3blve', 'Hoai nam', '030303030303', 1, 10, NULL);
INSERT INTO `users` VALUES (3, 'namem@gmail.com', '$2a$10$G/R88LXbJ/L6jkgbXrWHiudLCapagMHmFRZ5uNq4xbVqWW5HfUIAu', 'Bao dep trai', '94949494949', 1, 10, NULL);
INSERT INTO `users` VALUES (4, 'thaianh@gmail.com', '$2a$10$AD44JQgWPWvYTBkzXh1tF.3/usod2/.nxf0lC80klz0Admq1N3ntm', 'Thai Anh', '1212121221', 0, 7, NULL);
INSERT INTO `users` VALUES (5, 'cn82295@gmail.com', '$2a$10$Fpb7XXHJMBrlF0Qqbv4S5.1QKDjNvpOnqwD/8oaF7KX90FIG9jYI6', 'cuong nguyen', '0888750826', 0, 10, NULL);
INSERT INTO `users` VALUES (6, 'manchesterunited1629@gmail.com', '$2a$10$nc9i5oV3WAN4mdq7HsAxQ.kmHu9Y.ljIAn75GXmTPwfEngt87Nv.K', 'QuocKhanh', '0982801755', 0, 10, NULL);

-- ----------------------------
-- Procedure structure for checkTime
-- ----------------------------
DROP PROCEDURE IF EXISTS `checkTime`;
delimiter ;;
CREATE PROCEDURE `checkTime`(in _id int)
begin
		declare flag timestamp default "0000-00-00 00:00:00";
        select ts1 into flag from t1 where id = _id;
        if(flag="1999-02-12 12:02:20")
        then
			begin 
				drop event if exists checkTime2;
                drop event if exists dropTime;
            end;
		end if;
        end
;;
delimiter ;

-- ----------------------------
-- Event structure for checkTime2
-- ----------------------------
DROP EVENT IF EXISTS `checkTime2`;
delimiter ;;
CREATE EVENT `checkTime2`
ON SCHEDULE
EVERY '1' SECOND STARTS '2020-01-01 18:28:09'
COMMENT 'updated'
DO BEGIN
        update t1 set ts1 = ADDTIME(ts1, '00:00:02') where id=1;
      END
;;
delimiter ;

-- ----------------------------
-- Event structure for dropTime2
-- ----------------------------
DROP EVENT IF EXISTS `dropTime2`;
delimiter ;;
CREATE EVENT `dropTime2`
ON SCHEDULE
EVERY '1' SECOND STARTS '2020-01-01 18:26:04'
COMMENT 'drop time is called'
DO call checkTime('ts1')
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
