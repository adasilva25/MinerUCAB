------------------------- REPORTE 1 ------------------------- 
SELECT E.Nombre "Nombre", E.RIF "RIF", E.Descripcion "Descripcion", COUNT(SP.fk_empresa) "Total Ventas"
FROM MU_EMPRESA E, MU_SOLICITUD_COMPRA SP
WHERE E.Clave = SP.fk_empresa
GROUP BY E.Nombre, E.RIF, E.Descripcion
ORDER BY COUNT(SP.fk_empresa) DESC LIMIT 1;