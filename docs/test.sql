SELECT tot.nomtipar, SUM(tot.total) AS total
FROM
(SELECT 
tip.nomtipar, SUM(lin.importel) AS total
FROM scafac AS cab
LEFT JOIN slifac AS lin ON lin.codtipom = cab.codtipom AND lin.numfactu = cab.numfactu AND lin.fecfactu = cab.fecfactu
LEFT JOIN sartic AS art ON art.codartic = lin.codartic
LEFT JOIN stipar AS tip ON tip.codtipar = art.codtipar
WHERE cab.codagent = 6
AND cab.fecfactu >= '2020-01-01' AND cab.fecfactu <= '2020-12-31'
GROUP BY 1
UNION
SELECT 
tip.nomtipar, SUM(lin.importel) AS total
FROM scaalb AS cab
LEFT JOIN slialb AS lin ON lin.codtipom = cab.codtipom AND lin.numalbar = cab.numalbar
LEFT JOIN sartic AS art ON art.codartic = lin.codartic
LEFT JOIN stipar AS tip ON tip.codtipar = art.codtipar
WHERE cab.codagent = 6
AND cab.fechaalb >= '2020-01-01' AND cab.fechaalb <= '2020-12-31'
GROUP BY 1) AS tot
GROUP BY 1