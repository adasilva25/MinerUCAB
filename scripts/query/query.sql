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