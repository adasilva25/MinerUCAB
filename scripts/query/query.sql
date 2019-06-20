---------------- Obtiene las parroquias de un determinado estado ----------------
SELECT L3.Clave, L3.Nombre, L3.Tipo, L3.fk_lugar  
FROM MU_LUGAR L1, MU_LUGAR L2, MU_LUGAR L3
WHERE L3.fk_lugar = L2.Clave
	AND L2.fk_lugar = L1.Clave
	AND L1.Clave = 1;