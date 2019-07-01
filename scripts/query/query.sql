---------------- Obtiene las parroquias de un determinado estado ----------------
SELECT L3.Clave, L3.Nombre, L3.Tipo, L3.fk_lugar  
FROM MU_LUGAR L1, MU_LUGAR L2, MU_LUGAR L3
WHERE L3.fk_lugar = L2.Clave
	AND L2.fk_lugar = L1.Clave
	AND L1.Clave = 1;

---------------- Obtiene los roles y privilegios de un usuario ----------------
	SELECT R.Nombre, E.P_nombre, E.P_apellido, PR.Nombre, PR.Tipo
	FROM MU_USUARIO U, MU_ROL R, MU_ROL_PRIVILEGIO RP, MU_PRIVILEGIO PR, MU_EMPLEADO E
	WHERE U.Usuario = 'kjado0'
		AND U.contraseña = 'QOWvQ5a6r7'
		AND U.fk_rol = R.Clave
		AND R.Clave = RP.fk_rol
		AND RP.fk_privilegio = PR.Clave
		AND U.fk_empleado = E.Clave;

--FLUJO SOLICITUD DE COMPRA--
	--1. Click en explotar yacimiento (explotacion)
		SELECT E.nombre FROM MU_SOLICITUD_COMPRA SC, MU_ESTATUS E
			WHERE SC.fk_estatus=E.clave AND SC.fk_explotacion=1
		--1.1. Si devuelve "Entregado", ir a la pantalla de explotacion
		--1.2. Si devuelve "En proceso" modal -> Espere a que la solicitud de compra sea entregada
				--(En este caso hay que ir a solicitud de compra y cambiar el estatus)
				UPDATE MU_SOLICITUD_COMPRA SET fk_estatus=11
					WHERE clave=96;
		--1.3. Si no devuelve nada:
		--minerales
		SELECT YM.fk_mineral_metalico as claveMinMet, YM.fk_mineral_no_metalico as claveMinNoMet, YM.cantidad --(1)
			FROM MU_YACIMIENTO Y, MU_YACIMIENTO_MINERAL YM
			WHERE YM.fk_yacimiento=Y.clave AND Y.fk_explotacion=96;
		--por cada mineral (minerales que lo componen):
		SELECT M.clave, M.nombre, MM.porcentaje --(2)
			FROM MU_MINERAL_MINERAL MM, MU_MINERAL_METALICO M
			WHERE MM.fk_mineral_metalico_compone=M.clave AND MM.fk_mineral_metalico_compuesto=4;
		SELECT M.clave, M.nombre, MM.porcentaje
			FROM MU_MINERAL_MINERAL MM, MU_MINERAL_NO_METALICO M
			WHERE MM.fk_mineral_no_metalico_compone=M.clave AND MM.fk_mineral_no_metalico_compuesto=8;
			--empresas que lo venden
			SELECT E.clave, E.nombre, ME.precio_venta --(3)
				FROM MU_EMPRESA E, MU_MINERAL_EMPRESA ME
				WHERE ME.fk_empresa=E.clave AND ME.fk_mineral_no_metalico=10;
			SELECT E.clave, E.nombre, ME.precio_venta --(3)
				FROM MU_EMPRESA E, MU_MINERAL_EMPRESA ME
				WHERE ME.fk_empresa=E.clave AND ME.fk_mineral_metalico=10;
				--1.3.1. Caso bonito, no hay conflictos (resultado del query anterior con una sola entrada)
						--> Se genero la solicitud de compra exitosamente, espere a que sea entregada para iniciar la explotacion
				--1.3.2. Caso feo, hay varias empresas que poseen el mineral (query.data.length>1)
						--> Las empresas que venden el mineral tal son tales, indique a cual se le enviara la solicitud de compra
				INSERT INTO MU_SOLICITUD_COMPRA (total, fk_empresa, fk_estatus, fk_explotacion)
					VALUES ((/*INSERTAR SUMA DE PRECIOS*/), /*EMPRESA*/, 8, /*EXPLOTACION*/)
				INSERT INTO MU_DETALLE_SOLICITUD_COMPRA (cantidad, precio, fk_mineral_empresa, fk_solicitud_compra)
					VALUES (/*(1)cantidad x (2)porcentaje*/,/*(1)cantidad x (3)precio*/,/**/,/**/)