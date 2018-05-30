/*tabla nueva en ariconta*/

create TABLE `cobros_parciales` (

id int(11) NOT NULL AUTO_INCREMENT,

`numserie` char(3) NOT NULL,

`numfactu` int(11) NOT NULL DEFAULT '0',

`fecfactu` date NOT NULL DEFAULT '0000-00-00',

`numorden` smallint(1) unsigned NOT NULL DEFAULT '0',

`tipoformapago` tinyint(3) NOT NULL DEFAULT '0',

`fecha` datetime NOT NULL,

`impcobrado` decimal(12,2) NOT NULL DEFAULT '0.00',

`codusu` varchar(255) DEFAULT NULL,

`observa` varchar(255) DEFAULT NULL ,

PRIMARY KEY (id),

KEY `A_scobro` (`numserie`,`numfactu`,`fecfactu`,`numorden`),

CONSTRAINT `Acobros_ibfk_1` FOREIGN KEY (`numserie`,`numfactu`,`fecfactu`,`numorden`) REFERENCES `cobros` (`numserie`,`numfactu`,`fecfactu`,`numorden`)

) ENGINE=InnoDB COMMENT="Cobros parciales agentes";