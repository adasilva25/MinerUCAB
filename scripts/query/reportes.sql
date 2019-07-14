------------------------- REPORTE 1 ------------------------- 
SELECT E.Nombre "Nombre", E.RIF "RIF", E.Descripcion "Descripcion", COUNT(SP.fk_empresa) "Total Ventas"
FROM MU_EMPRESA E, MU_SOLICITUD_COMPRA SP
WHERE E.Clave = SP.fk_empresa
GROUP BY E.Nombre, E.RIF, E.Descripcion
ORDER BY COUNT(SP.fk_empresa) DESC LIMIT 1;



-- 2.- Fases que presentan retrasos (fecha final mayor a la estimada) en un período de tiempo. 
SELECT F.clave, F.nombre, F.costo, F.duracion, F.fecha_inicio, F.fecha_fin, F.fecha_fin_real, (SELECT nombre FROM mu_estatus WHERE F.fk_estatus=clave) as Estatus, (SELECT nombre FROM mu_etapa WHERE F.fk_etapa=clave) as "Etapa a la que pertenece"
FROM mu_fase F
WHERE F.fecha_fin_real>F.fecha_fin AND F.fecha_inicio BETWEEN ($1) AND ($2);
--Debe retornar la: (1980)1,3,7,11 (1981)23, (1982)43,44, (1983-1989), (1990)181, (1991-1997), (1998)343fechafin31enero99
--					(1999-2006), (2007)489fechafin01052007, (2008-2011), (2012)594fechafin01012013, (2013-2017),
--					(2019)862fechafin16072019

-- 5.- Listado de etapas y fases de los proyectos que estan pendientes por iniciar en un período de tiempo.
SELECT EF.clave, EF.tipo, EF.nombre, Ef.costo, EF.duracion, EF.fecha_inicio as "Fecha inicio", EF.fecha_fin as "Fecha fin", EF."Yacimiento al que pertenece", EF."Etapa a la que pertenece"
FROM (SELECT  E.clave as clave, 'Etapa' as Tipo, E.nombre, E.costo_total as costo, E.duracion, E.fecha_inicio, E.fecha_fin, (SELECT Y.nombre FROM mu_yacimiento Y WHERE E.fk_explotacion=Y.fk_explotacion) as "Yacimiento al que pertenece", 'N/A' as "Etapa a la que pertenece", E.fk_explotacion as Explotacion
		FROM mu_etapa E
	  UNION
	  SELECT F.clave as clave, 'Fase' as Tipo, F.nombre, F.costo, F.duracion, F.fecha_inicio, F.fecha_fin, (SELECT Y.nombre FROM mu_yacimiento Y, mu_etapa E WHERE E.fk_explotacion=Y.fk_explotacion AND E.clave=F.fk_etapa) as "Yacimiento al que pertenece", (SELECT nombre FROM mu_etapa WHERE clave=F.fk_etapa) as "Etapa a la que pertenece", (SELECT fk_explotacion FROM mu_etapa WHERE clave=F.fk_etapa) as Explotacion
		FROM mu_fase F
	  ) as EF, mu_explotacion as E
WHERE EF.explotacion=E.clave AND (SELECT nombre FROM mu_estatus where E.fk_estatus=clave)='Inactivo' AND E.fecha_inicio BETWEEN ($1) AND ($2);
--Explotacion 94, 92, 88
--Etapas 94(187,188), 92(184,183), 88(175,176)

-- 8.- Presentación del mineral menos solicitada por los clientes por año.
SELECT to_char(V.fecha, 'yyyy'), PM.presentacion, PM.mineral, COUNT(fk_presentacion_mineral) as "Veces solicitado"
FROM (SELECT P.nombre as Presentacion, M.nombre as Mineral, PMin.clave
		FROM mu_presentacion P, mu_presentacion_mineral PMin, mu_mineral_metalico M
		WHERE P.clave=PMin.fk_presentacion AND M.clave=PMin.fk_mineral_metalico
	  UNION
	  SELECT P.nombre as Presentacion, M.nombre as Mineral, PMin.clave
		FROM mu_presentacion P, mu_presentacion_mineral PMin, mu_mineral_no_metalico M
		WHERE P.clave=PMin.fk_presentacion AND M.clave=PMin.fk_mineral_no_metalico
	  ) as PM,
	  mu_venta as V, mu_detalle_venta as DV
WHERE PM.clave=DV.fk_presentacion_mineral AND V.clave=DV.fk_venta
GROUP BY to_char(V.fecha, 'yyyy'), PM.presentacion, PM.mineral
HAVING COUNT(fk_presentacion_mineral)=MIN((SELECT COUNT(DVenta.fk_presentacion_mineral)
											FROM MU_DETALLE_VENTA DVenta, MU_VENTA Venta
											WHERE Venta.clave=DVenta.fk_venta AND to_char(Venta.fecha, 'yyyy')=to_char(V.fecha, 'yyyy')
											GROUP BY DVenta.fk_presentacion_mineral
											ORDER BY COUNT(DVenta.fk_presentacion_mineral) ASC LIMIT 1))
ORDER BY to_char(V.fecha, 'yyyy');
-- Presentacion_mineral: (1-30)
-- (2019)menor29, (2018)menor1, (1980)menor4, (1988)menor3, (1999)menor14, (2012)menor25o26