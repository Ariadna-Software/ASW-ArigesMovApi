ALTER TABLE `scrmacciones`   
	ADD COLUMN `nomclien` VARCHAR(255) NULL AFTER `observaciones`;

INSERT INTO `scrmtipo` (`codigo`, `denominacion`) VALUES ('6', 'CURSOS Y PRESENTACIONES'); 

INSERT INTO `scrmtipo` (`codigo`, `denominacion`) VALUES ('7', 'CLIENTE POTENCIAL'); 
