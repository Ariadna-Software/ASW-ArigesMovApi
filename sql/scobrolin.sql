/*
SQLyog Community v12.18 (64 bit)
MySQL - 5.6.16 : Database - conta1
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
USE `conta1`;

/*Table structure for table `scobrolin` */

DROP TABLE IF EXISTS `scobrolin`;

CREATE TABLE `scobrolin` (
  `numserie` char(3) NOT NULL,
  `codfaccl` int(11) NOT NULL DEFAULT '0',
  `fecfaccl` date NOT NULL DEFAULT '0000-00-00',
  `numorden` smallint(1) unsigned NOT NULL DEFAULT '0',
  `id` smallint(1) unsigned NOT NULL DEFAULT '0',
  `codagent` smallint(5) unsigned DEFAULT NULL,
  `fecha` date NOT NULL DEFAULT '0000-00-00',
  `importe` decimal(12,2) NOT NULL DEFAULT '0.00',
  `codforpa` smallint(6) NOT NULL DEFAULT '0',
  `observa` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`numserie`,`codfaccl`,`fecfaccl`,`numorden`,`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `scobrolin` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
