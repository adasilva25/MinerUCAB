------------------------------ REPORTE 1 ------------------------------ 
SELECT E.Nombre "Nombre", E.RIF "RIF", E.Descripcion "Descripcion", COUNT(SP.fk_empresa) "Total Ventas"
FROM MU_EMPRESA E, MU_SOLICITUD_COMPRA SP
WHERE E.Clave = SP.fk_empresa
	AND SP.Fecha BETWEEN '2017-01-01' AND '2019-01-01'
GROUP BY E.Nombre, E.RIF, E.Descripcion
ORDER BY COUNT(SP.fk_empresa) DESC LIMIT 1;
-------------------------- JASPER -------------------------- 
SELECT E.Nombre "Nombre", E.RIF "RIF", E.Descripcion "Descripcion", COUNT(SP.fk_empresa) "Total Ventas"
FROM MU_EMPRESA E, MU_SOLICITUD_COMPRA SP
WHERE E.Clave = SP.fk_empresa
GROUP BY E.Nombre, E.RIF, E.Descripcion
ORDER BY COUNT(SP.fk_empresa) DESC LIMIT 1;

SELECT E.Clave "Clave", E.Nombre "Nombre", E.RIF "RIF", E.Descripcion "Descripcion", COUNT(SP.fk_empresa) "Total Ventas"
FROM MU_EMPRESA E, MU_SOLICITUD_COMPRA SP
WHERE E.Clave = SP.fk_empresa
	AND SP.Fecha BETWEEN '$P!{fecha_inicio}' AND '$P!{fecha_fin}'
GROUP BY E.Clave, E.Nombre, E.RIF, E.Descripcion
ORDER BY COUNT(SP.fk_empresa) DESC LIMIT 1;




------------------------------ REPORTE 2 ------------------------------ 
SELECT F.clave "Clave", F.nombre "Fase", F.costo "Costo", F.duracion "Duración", F.fecha_inicio "Fecha Inicio", F.fecha_fin "Fecha Fin", F.fecha_fin_real "Fecha Fin Real", 
	(SELECT nombre FROM mu_estatus WHERE F.fk_estatus=clave) as "Estatus", (SELECT nombre FROM mu_etapa WHERE F.fk_etapa=clave) as "Etapa a la que pertenece"
FROM mu_fase F
WHERE F.fecha_fin_real>F.fecha_fin AND F.fecha_inicio BETWEEN '' AND '';
-------------------------- JASPER -------------------------- 
SELECT F.clave "Clave", F.nombre "Fase", F.costo "Costo", F.duracion "Duración", F.fecha_inicio "Fecha Inicio", F.fecha_fin "Fecha Fin", F.fecha_fin_real "Fecha Fin Real", 
	(SELECT nombre FROM mu_estatus WHERE F.fk_estatus=clave) as "Estatus", (SELECT nombre FROM mu_etapa WHERE F.fk_etapa=clave) as "Etapa"
FROM mu_fase F
WHERE F.fecha_fin_real>F.fecha_fin AND F.fecha_inicio BETWEEN '$P!{fecha_inicio}' AND '$P!{fecha_fin}';





------------------------------ REPORTE 3	JASPER	 ------------------------------ 
SELECT E.clave AS "Clave",to_char(E.fecha_fin_real,'yyyy') AS "Año", to_char(E.fecha_fin_real,'mm') AS "Mes", Y.nombre AS "Yacimiento",E.costo_total AS "Costo Total", E.duracion AS "Duración", E.fecha_inicio AS "Fecha Inicio", E.fecha_fin AS "Fecha Fin", E.fecha_fin_real AS "Fecha Fin Real"
	FROM mu_yacimiento Y, mu_explotacion E
		WHERE Y.clave = E.clave
			AND E.fecha_fin_real BETWEEN '$P!{fecha_inicio}' AND '$P!{fecha_fin}'
			AND E.costo_total IN (SELECT MAX(E2.costo_total)
								  FROM mu_explotacion E2
								  WHERE to_char(E2.fecha_fin_real,'yyyy') = to_char(E.fecha_fin_real,'yyyy')
								  AND to_char(E2.fecha_fin_real,'mm') = to_char(E.fecha_fin_real,'mm')
								  
								  )
			GROUP BY to_char(E.fecha_fin_real,'yyyy'), to_char(E.fecha_fin_real,'mm'), E.fecha_fin_real, E.clave, Y.nombre, E.costo_total, E.duracion, E.fecha_inicio, E.fecha_fin
				Order by E.fecha_fin_real DESC;



------------------------------ REPORTE 4 ------------------------------ 
------------------------------ DEFINITIVO ------------------------------ 
SELECT EM.Clave "Clave", EM.P_nombre "Nombre", EM.P_Apellido "Apellido", EM.CI "Cédula", 
			EM.Fecha_nacimiento "Fecha de Nacimiento", EM.Nivel_de_instruccion "Nivel de Instrucción", 
			(SELECT E.Nombre FROM MU_LUGAR E, MU_LUGAR M, MU_LUGAR P WHERE P.fk_lugar = M.clave 
			 	AND M.fk_lugar = E.Clave AND EM.fk_lugar = P.Clave) "Residencia", COUNT(EM.Clave)
FROM	MU_EMPLEADO EM, MU_FASE F, MU_CARGO_FASE CF, MU_EMPLEADO_CARGO_FASE ECF
WHERE	F.fecha_fin < F.fecha_fin_real
	AND F.fecha_fin_real BETWEEN '1982-07-01' AND '1982-12-01'
	AND	CF.fk_fase = F.Clave
	AND	ECF.fk_cargo_fase = CF.Clave
	AND	EM.Clave = ECF.fk_empleado
GROUP BY EM.Clave, EM.P_nombre, EM.P_Apellido, EM.CI, 
			EM.Fecha_nacimiento, EM.Nivel_de_instruccion
ORDER BY COUNT(EM.Clave) DESC, EM.Clave ASC LIMIT 10;
------------------------------ PARA PROBAR EL QUERY ------------------------------ 
SELECT * 
FROM MU_FASE
WHERE fecha_fin_real > fecha_fin;
------------------------------	JASPER	------------------------------ 
SELECT EM.Clave "Clave", EM.P_nombre "Nombre", EM.P_Apellido "Apellido", EM.CI "Cédula", 
			EM.Fecha_nacimiento "Fecha de Nacimiento", 
			(SELECT E.Nombre FROM MU_LUGAR E, MU_LUGAR M, MU_LUGAR P WHERE P.fk_lugar = M.clave 
			 	AND M.fk_lugar = E.Clave AND EM.fk_lugar = P.Clave) "Residencia", COUNT(EM.Clave) "Total"
FROM	MU_EMPLEADO EM, MU_FASE F, MU_CARGO_FASE CF, MU_EMPLEADO_CARGO_FASE ECF
WHERE	F.fecha_fin < F.fecha_fin_real
	AND F.fecha_fin_real BETWEEN '$P!{fecha_inicio}' AND '$P!{fecha_fin}'
	AND	CF.fk_fase = F.Clave
	AND	ECF.fk_cargo_fase = CF.Clave
	AND	EM.Clave = ECF.fk_empleado
GROUP BY EM.Clave, EM.P_nombre, EM.P_Apellido, EM.CI, 
			EM.Fecha_nacimiento
ORDER BY COUNT(EM.Clave) DESC, EM.Clave ASC LIMIT 10;




------------------------------ REPORTE 5 ------------------------------ 
-- 5.- Listado de etapas y fases de los proyectos que estan pendientes por iniciar en un período de tiempo.
SELECT EF.clave "Clave", EF.tipo "Tipo", EF.nombre "Nombre", Ef.costo "Costo", EF.duracion "Duración", EF.fecha_inicio as "Fecha Inicio", EF.fecha_fin as "Fecha Fin", EF.Yacimiento "Yacimiento", EF.Etapa "Etapa"
FROM (SELECT  E.clave as clave, 'Etapa' as Tipo, E.nombre, E.costo_total as costo, E.duracion, E.fecha_inicio, E.fecha_fin, (SELECT Y.nombre FROM mu_yacimiento Y WHERE E.fk_explotacion=Y.fk_explotacion) as "Yacimiento", 'N/A' as "Etapa", E.fk_explotacion as Explotacion
		FROM mu_etapa E
	  UNION
	  SELECT F.clave as clave, 'Fase' as Tipo, F.nombre, F.costo, F.duracion, F.fecha_inicio, F.fecha_fin, (SELECT Y.nombre FROM mu_yacimiento Y, mu_etapa E WHERE E.fk_explotacion=Y.fk_explotacion AND E.clave=F.fk_etapa) as "Yacimiento", (SELECT nombre FROM mu_etapa WHERE clave=F.fk_etapa) as "Etapa", (SELECT fk_explotacion FROM mu_etapa WHERE clave=F.fk_etapa) as Explotacion
		FROM mu_fase F
	  ) as EF, mu_explotacion as E
WHERE EF.explotacion=E.clave AND (SELECT nombre FROM mu_estatus where E.fk_estatus=clave)='Inactivo' AND E.fecha_inicio BETWEEN '1982-01-01' AND '2019-01-01';
--Explotacion 94, 92, 88
--Etapas 94(187,188), 92(184,183), 88(175,176)
-------------------------- JASPER -------------------------- 
SELECT EF.clave "Clave", EF.tipo "Tipo", EF.nombre "Nombre", Ef.costo "Costo", EF.duracion "Duración", EF.fecha_inicio as "Fecha Inicio", EF.fecha_fin as "Fecha Fin", EF.yacimiento "Yacimiento", EF.Etapa "Etapa"
FROM (SELECT  E.clave as clave, 'Etapa' as Tipo, E.nombre, E.costo_total as costo, E.duracion, E.fecha_inicio, E.fecha_fin, (SELECT Y.nombre FROM mu_yacimiento Y WHERE E.fk_explotacion=Y.fk_explotacion) as Yacimiento, 'N/A' as Etapa, E.fk_explotacion as Explotacion
		FROM mu_etapa E
	  UNION
	  SELECT F.clave as clave, 'Fase' as Tipo, F.nombre, F.costo, F.duracion, F.fecha_inicio, F.fecha_fin, (SELECT Y.nombre FROM mu_yacimiento Y, mu_etapa E WHERE E.fk_explotacion=Y.fk_explotacion AND E.clave=F.fk_etapa) as "Yacimiento", (SELECT nombre FROM mu_etapa WHERE clave=F.fk_etapa) as "Etapa", (SELECT fk_explotacion FROM mu_etapa WHERE clave=F.fk_etapa) as Explotacion
		FROM mu_fase F
	  ) as EF, mu_explotacion as E
WHERE EF.explotacion=E.clave AND (SELECT nombre FROM mu_estatus where E.fk_estatus=clave)='Inactivo' AND E.fecha_inicio BETWEEN '$P!{fecha_inicio}' AND '$P!{fecha_fin}';


------------------------------ REPORTE 6	JASPER	 ------------------------------ 
SELECT distinct EX.clave "Explotacion",EM.clave "Empleado",to_char(EX.fecha_fin_real,'yyyy') "Año", to_char(EX.fecha_fin_real,'mm') "Mes",
				(SELECT COUNT(EMCF.*)
					FROM mu_cargo_fase CF, mu_empleado_cargo_fase EMCF, mu_fase F, mu_etapa E, mu_explotacion EX1
						WHERE EM.clave = EMCF.fk_empleado
							AND CF.clave = EMCF.fk_cargo_fase
								AND F.clave = CF.fk_fase
									AND E.clave = F.fk_etapa
										AND EX.clave = E.fk_explotacion
											AND to_char(EX1.fecha_fin_real,'yyyy') = to_char(EX.fecha_fin_real,'yyyy')
												AND to_char(EX1.fecha_fin_real,'mm') = to_char(EX.fecha_fin_real,'mm')
													GROUP by to_char(EX.fecha_fin_real,'yyyy'),to_char(EX.fecha_fin_real,'mm')
														order by EM.clave
				) AS "Número de Participación",
		EM.ci AS "Cédula", EM.p_nombre AS "Nombre",
		EM.p_apellido AS "Apellido", EM.fecha_nacimiento AS "Fecha de Nacimiento",
		EM.nivel_de_instruccion AS "Nivel de Instrucción"
FROM mu_cargo_fase CF, mu_empleado_cargo_fase EMCF, mu_empleado EM, mu_fase F, mu_etapa E, mu_explotacion EX
	WHERE EM.clave = EMCF.fk_empleado
			AND CF.clave = EMCF.fk_cargo_fase
				AND F.clave = CF.fk_fase
					AND E.clave = F.fk_etapa
						AND EX.clave = E.fk_explotacion
						AND EX.fecha_fin_real BETWEEN '$P!{fecha_inicio}' AND '$P!{fecha_fin}'
						 AND (SELECT COUNT(EMCF.*)
									FROM mu_cargo_fase CF, mu_empleado_cargo_fase EMCF, mu_fase F, mu_etapa E, mu_explotacion EX1
										WHERE EM.clave = EMCF.fk_empleado
											AND CF.clave = EMCF.fk_cargo_fase
												AND F.clave = CF.fk_fase
													AND E.clave = F.fk_etapa
														AND EX.clave = E.fk_explotacion
								 							AND to_char(EX1.fecha_fin_real,'yyyy') = to_char(EX.fecha_fin_real,'yyyy')
								  								AND to_char(EX1.fecha_fin_real,'mm') = to_char(EX.fecha_fin_real,'mm')
																	GROUP by to_char(EX.fecha_fin_real,'yyyy'),to_char(EX.fecha_fin_real,'mm')
																		order by EM.clave) >2
																		order by to_char(EX.fecha_fin_real,'yyyy') DESC, to_char(EX.fecha_fin_real,'mm') DESC, EM.clave;


------------------------------ REPORTE 7 ------------------------------ 
------------------------- DEFINITIVO ------------------------- 
SELECT EM.Clave "Clave", EM.P_nombre "Nombre", EM.P_Apellido "Apellido", EM.CI "Cédula", 
			EM.Fecha_nacimiento "Fecha de Nacimiento", (SELECT E.Nombre FROM MU_LUGAR E, MU_LUGAR M, MU_LUGAR P WHERE P.fk_lugar = M.clave 
			 	AND M.fk_lugar = E.Clave AND EM.fk_lugar = P.Clave) "Residencia", COUNT(*) 
FROM MU_EXPLOTACION EX, MU_EMPLEADO EM, MU_ETAPA E, MU_FASE F, MU_CARGO_FASE CF, MU_EMPLEADO_CARGO_FASE ECF
WHERE E.fk_explotacion = EX.Clave
	AND F.fk_etapa = E.Clave
	AND CF.fk_fase = F.Clave
	AND ECF.fk_cargo_fase = CF.Clave
	AND ECF.fk_empleado = EM.Clave
	AND EM.CI = 'V98225647'
	AND EX.fecha_inicio >= '1982-01-01'
	AND EX.fecha_fin_real <= '2009-10-01'
GROUP BY EM.Clave, EM.P_nombre, EM.P_Apellido, EM.CI, EM.Fecha_nacimiento;
------------------------- PARA PROBAR ------------------------- 
SELECT EM.Clave "Clave", EM.P_nombre "Nombre", EM.P_Apellido "Apellido", EM.CI "Cédula", 
			EM.Fecha_nacimiento "Fecha de Nacimiento", EM.Sexo "Sexo", EX.Clave, EX.fecha_inicio, EX.fecha_fin_real
FROM MU_EXPLOTACION EX, MU_EMPLEADO EM, MU_ETAPA E, MU_FASE F, MU_CARGO_FASE CF, MU_EMPLEADO_CARGO_FASE ECF
WHERE E.fk_explotacion = EX.Clave
	AND F.fk_etapa = E.Clave
	AND CF.fk_fase = F.Clave
	AND ECF.fk_cargo_fase = CF.Clave
	AND ECF.fk_empleado = EM.Clave
	AND EM.CI = 'V98225647'
	AND EX.fecha_inicio >= '1982-01-01'
	AND EX.fecha_fin_real <= '2009-10-01';
------------------------- JASPER ------------------------- 
SELECT EM.Clave "Clave", EM.P_nombre "Nombre", EM.P_Apellido "Apellido", EM.CI "Cédula", 
			EM.Fecha_nacimiento "Fecha de Nacimiento", (SELECT E.Nombre FROM MU_LUGAR E, MU_LUGAR M, MU_LUGAR P WHERE P.fk_lugar = M.clave 
			 	AND M.fk_lugar = E.Clave AND EM.fk_lugar = P.Clave) "Residencia", COUNT(*) "Total"
FROM MU_EXPLOTACION EX, MU_EMPLEADO EM, MU_ETAPA E, MU_FASE F, MU_CARGO_FASE CF, MU_EMPLEADO_CARGO_FASE ECF
WHERE E.fk_explotacion = EX.Clave
	AND F.fk_etapa = E.Clave
	AND CF.fk_fase = F.Clave
	AND ECF.fk_cargo_fase = CF.Clave
	AND ECF.fk_empleado = EM.Clave
	AND EM.CI = $P{ci}
	AND EX.fecha_inicio >= '$P!{fecha_inicio}'
	AND EX.fecha_fin_real <= '$P!{fecha_fin}'
GROUP BY EM.Clave, EM.P_nombre, EM.P_Apellido, EM.CI, EM.Fecha_nacimiento;




------------------------------ REPORTE 8 ------------------------------ 
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
WHERE PM.clave=DV.fk_presentacion_mineral AND V.clave=DV.fk_venta AND V.fecha BETWEEN '' AND ''
GROUP BY to_char(V.fecha, 'yyyy'), PM.presentacion, PM.mineral
HAVING COUNT(fk_presentacion_mineral)=MIN((SELECT COUNT(DVenta.fk_presentacion_mineral)
											FROM MU_DETALLE_VENTA DVenta, MU_VENTA Venta
											WHERE Venta.clave=DVenta.fk_venta AND to_char(Venta.fecha, 'yyyy')=to_char(V.fecha, 'yyyy')
											GROUP BY DVenta.fk_presentacion_mineral
											ORDER BY COUNT(DVenta.fk_presentacion_mineral) ASC LIMIT 1))
ORDER BY to_char(V.fecha, 'yyyy');
-- Presentacion_mineral: (1-30)
-- (2019)menor29, (2018)menor1, (1980)menor4, (1988)menor3, (1999)menor14, (2012)menor25o26
------------------------------ JASPER ------------------------------ 
SELECT to_char(V.fecha, 'yyyy') "Año", PM.mineral "Mineral", PM.presentacion "Presentación", COUNT(fk_presentacion_mineral) as "Veces Solicitado"
FROM (SELECT P.nombre as Presentacion, M.nombre as Mineral, PMin.clave
		FROM mu_presentacion P, mu_presentacion_mineral PMin, mu_mineral_metalico M
		WHERE P.clave=PMin.fk_presentacion AND M.clave=PMin.fk_mineral_metalico
	  UNION
	  SELECT P.nombre as Presentacion, M.nombre as Mineral, PMin.clave
		FROM mu_presentacion P, mu_presentacion_mineral PMin, mu_mineral_no_metalico M
		WHERE P.clave=PMin.fk_presentacion AND M.clave=PMin.fk_mineral_no_metalico
	  ) as PM,
	  mu_venta as V, mu_detalle_venta as DV
WHERE PM.clave=DV.fk_presentacion_mineral AND V.clave=DV.fk_venta AND V.fecha BETWEEN '$P!{fecha_inicio}' AND '$P!{fecha_fin}'
GROUP BY to_char(V.fecha, 'yyyy'), PM.presentacion, PM.mineral
HAVING COUNT(fk_presentacion_mineral)=MIN((SELECT COUNT(DVenta.fk_presentacion_mineral)
											FROM MU_DETALLE_VENTA DVenta, MU_VENTA Venta
											WHERE Venta.clave=DVenta.fk_venta AND to_char(Venta.fecha, 'yyyy')=to_char(V.fecha, 'yyyy')
											GROUP BY DVenta.fk_presentacion_mineral
											ORDER BY COUNT(DVenta.fk_presentacion_mineral) ASC LIMIT 1))
ORDER BY to_char(V.fecha, 'yyyy');


------------------------------ REPORTE 9	JASPER	 ------------------------------ 
SELECT distinct M.Clave AS "Clave", M.identificador AS "Serial", M.fecha_adquisicion AS "Fecha de Adquisición", TM.nombre AS "Tipo de Maquinaria"
	FROM mu_maquinaria M, mu_tipo_maquinaria TM, mu_maquinaria_tipo_maquinaria_fase MTMF, mu_tipo_maquinaria_fase TMF,
	mu_fase F, mu_etapa E, mu_explotacion EX, (SELECT COUNT(MTMF.*) N_V, M.clave M_clave
											  FROM mu_maquinaria M, mu_tipo_maquinaria TM, mu_maquinaria_tipo_maquinaria_fase MTMF, mu_tipo_maquinaria_fase TMF,
											  mu_fase F, mu_etapa E, mu_explotacion EX
												  WHERE M.clave = MTMF.fk_maquinaria
													AND TM.clave = M.fk_tipo_maquinaria
														AND TMF.clave = MTMF.fk_tipo_maquinaria_fase
															AND F.clave = TMF.fk_fase
																AND E.clave = F.fk_etapa
																	AND EX.clave = E.fk_explotacion
																		AND EX.fecha_fin_real BETWEEN '$P!{fecha_inicio}' AND '$P!{fecha_fin}'
																			GROUP BY M.clave
																				Order by M.clave
											  ) veces
		WHERE M.clave = MTMF.fk_maquinaria
			AND TM.clave = M.fk_tipo_maquinaria
				AND TMF.clave = MTMF.fk_tipo_maquinaria_fase
					AND F.clave = TMF.fk_fase
						AND E.clave = F.fk_etapa
							AND EX.clave = E.fk_explotacion
								AND EX.fecha_fin_real BETWEEN '$P!{fecha_inicio}' AND '$P!{fecha_fin}'
									GROUP BY  M.Clave, M.identificador, M.fecha_adquisicion, TM.nombre,EX.fecha_fin_real,TM.clave, M.fk_tipo_maquinaria, 
									TMF.clave, MTMF.fk_tipo_maquinaria_fase, F.clave,TMF.fk_fase,E.clave,F.fk_etapa,EX.clave,E.fk_explotacion
											HAVING  (SELECT COUNT(MTMF.*) 
														FROM mu_tipo_maquinaria TM, mu_maquinaria_tipo_maquinaria_fase MTMF, mu_tipo_maquinaria_fase TMF,
														mu_fase F, mu_etapa E, mu_explotacion EX
															WHERE M.clave = MTMF.fk_maquinaria
													 			AND TM.clave = M.fk_tipo_maquinaria
																	AND TMF.clave = MTMF.fk_tipo_maquinaria_fase
																		AND F.clave = TMF.fk_fase
																			AND E.clave = F.fk_etapa
																				AND EX.clave = E.fk_explotacion
																					AND EX.fecha_fin_real BETWEEN '$P!{fecha_inicio}' AND '$P!{fecha_fin}'
															  							GROUP BY M.clave
													) = (MIN(veces.N_V ));


------------------------------ REPORTE 10 ------------------------------ 
SELECT MM.Nombre "Mineral", P.Nombre "Presentación", I.Cantidad_transaccion "Cantidad Transaccion", I.Cantidad_actual "Cantidad Actual",
	I.Fecha "Fecha de Transacción"
FROM MU_INVENTARIO I, MU_MINERAL_METALICO MM, MU_PRESENTACION_MINERAL PM, MU_PRESENTACION P
WHERE I.fk_presentacion_mineral = PM.Clave
	AND PM.fk_mineral_metalico = MM.Clave
	AND P.Clave = PM.fk_presentacion
	AND I.fecha >= '2019-06-01'
	AND I.fecha <= '2020-06-01'
UNION
SELECT NM.Nombre "Mineral", P.Nombre "Presentación", I.Cantidad_transaccion "Cantidad Transaccion", I.Cantidad_actual "Cantidad Actual",
	I.Fecha "Fecha de Transacción"
FROM MU_INVENTARIO I, MU_MINERAL_NO_METALICO NM, MU_PRESENTACION_MINERAL PM, MU_PRESENTACION P
WHERE I.fk_presentacion_mineral = PM.Clave
	AND PM.fk_mineral_no_metalico = NM.Clave
	AND P.Clave = PM.fk_presentacion
	AND I.fecha >= '2019-06-01'
	AND I.fecha <= '2020-06-01';
-------------------------- JASPER -------------------------- 
SELECT MM.Nombre "Mineral", P.Nombre "Presentación", I.Cantidad_transaccion "Cantidad Transaccion", I.Cantidad_actual "Cantidad Actual",
	I.Fecha "Fecha de Transacción"
FROM MU_INVENTARIO I, MU_MINERAL_METALICO MM, MU_PRESENTACION_MINERAL PM, MU_PRESENTACION P
WHERE I.fk_presentacion_mineral = PM.Clave
	AND PM.fk_mineral_metalico = MM.Clave
	AND P.Clave = PM.fk_presentacion
	AND I.fecha >= '$P!{fecha_inicio}'
	AND I.fecha <= '$P!{fecha_fin}'
UNION
SELECT NM.Nombre "Mineral", P.Nombre "Presentación", I.Cantidad_transaccion "Cantidad Transaccion", I.Cantidad_actual "Cantidad Actual",
	I.Fecha "Fecha de Transacción"
FROM MU_INVENTARIO I, MU_MINERAL_NO_METALICO NM, MU_PRESENTACION_MINERAL PM, MU_PRESENTACION P
WHERE I.fk_presentacion_mineral = PM.Clave
	AND PM.fk_mineral_no_metalico = NM.Clave
	AND P.Clave = PM.fk_presentacion
	AND I.fecha >= '$P!{fecha_inicio}'
	AND I.fecha <= '$P!{fecha_fin}';

