CREATE TABLE MU_LUGAR (
	Clave SERIAL,
	Nombre VARCHAR(40) NOT NULL,
	Tipo VARCHAR(10) NOT NULL,
	fk_lugar INTEGER,
	CONSTRAINT pk_clave_lugar PRIMARY KEY (Clave),
	CONSTRAINT fk_lugar FOREIGN KEY (fk_lugar) REFERENCES MU_LUGAR (Clave) ON DELETE CASCADE,
	CONSTRAINT check_tipo_lugar 
		CHECK (Tipo IN ('Estado', 'Municipio', 'Parroquia'))
);

CREATE TABLE MU_ESTATUS (
	Clave SERIAL,
	Nombre VARCHAR(15) NOT NULL,
	CONSTRAINT pk_clave_estatus PRIMARY KEY (Clave)
);

CREATE TABLE MU_HORARIO (
	Clave SERIAL,
	Dia VARCHAR(10) NOT NULL,
	Hora_entrada TIME NOT NULL,
	Hora_salida TIME NOT NULL,
	CONSTRAINT pk_clave_horario PRIMARY KEY (Clave),
	CONSTRAINT check_dia_horario
		CHECK (Dia IN ('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'))
);

CREATE TABLE MU_ROL (
	Clave SERIAL,
	Nombre VARCHAR(30) NOT NULL,
	CONSTRAINT pk_clave_rol PRIMARY KEY (Clave)
);

CREATE TABLE MU_PRIVILEGIO (
	Clave SERIAL,
	Nombre VARCHAR(40) NOT NULL,
	Tipo CHAR(1) NOT NULL,
	CONSTRAINT pk_clave_privilegio PRIMARY KEY (Clave),
	CONSTRAINT check_tipo_privilegio
		CHECK (Tipo IN ('C', 'R', 'U', 'D'))
);

CREATE TABLE MU_PRESENTACION (
	Clave SERIAL,
	Nombre VARCHAR(40) NOT NULL,
	CONSTRAINT pk_clave_presentacion PRIMARY KEY (Clave)
);

CREATE TABLE MU_CARGO (
	Clave SERIAL,
	Nombre VARCHAR(50) NOT NULL,
	Descripcion VARCHAR(100) NOT NULL,
	CONSTRAINT pk_clave_cargo PRIMARY KEY (Clave)
);

CREATE TABLE MU_TIPO_MAQUINARIA (
	Clave SERIAL,
	Nombre VARCHAR(50) NOT NULL,
	CONSTRAINT pk_clave_tipo_maquinaria PRIMARY KEY (Clave)
);

CREATE TABLE MU_TIPO_YACIMIENTO (
	Clave SERIAL,
	Nombre VARCHAR(50) NOT NULL,
	Descripcion VARCHAR(200) NOT NULL,
	CONSTRAINT pk_clave_tipo_yacimiento PRIMARY KEY (Clave)
);

CREATE TABLE MU_MINERAL_METALICO (
	Clave SERIAL,
	Nombre VARCHAR(50) NOT NULL,
	Descripcion VARCHAR(100),
	Dureza DECIMAL NOT NULL,
	CONSTRAINT pk_clave_mineral_metalico PRIMARY KEY (Clave)
);

CREATE TABLE MU_MINERAL_NO_METALICO (
	Clave SERIAL,
	Nombre VARCHAR(30) NOT NULL,
	Descripcion VARCHAR(100),
	Uso VARCHAR(150) NOT NULL,
	CONSTRAINT pk_clave_mineral_no_metalico PRIMARY KEY (Clave)
);

CREATE TABLE MU_TIPO_PAGO_CHEQUE (
	Clave SERIAL,
	Banco VARCHAR(100) NOT NULL,
	Numero_cheque VARCHAR(30) NOT NULL UNIQUE,
	Numero_cuenta VARCHAR(30) NOT NULL UNIQUE,
	CONSTRAINT pk_clave_tipo_pago_cheque PRIMARY KEY (Clave)
);

CREATE TABLE MU_TIPO_PAGO_TARJETA_DEBITO (
	Clave SERIAL,
	Banco VARCHAR(100) NOT NULL,
	Numero_tarjeta VARCHAR(30) NOT NULL UNIQUE,
	CONSTRAINT pk_clave_tipo_pago_tarjeta_debito PRIMARY KEY (Clave)
);

CREATE TABLE MU_TIPO_PAGO_TARJETA_CREDITO (
	Clave SERIAL,
	Banco VARCHAR(100) NOT NULL,
	Numero_tarjeta VARCHAR(50) NOT NULL UNIQUE,
	Tipo VARCHAR(50) NOT NULL,
	CONSTRAINT pk_clave_tipo_pago_tarjeta_credito PRIMARY KEY (Clave),
	CONSTRAINT check_tipo_tarjeta_credito 
		CHECK (Tipo IN ('Master Card', 'Visa', 'Otro'))
);

CREATE TABLE MU_TIPO_PAGO_TRANSFERENCIA (
	Clave SERIAL,
	Banco VARCHAR(100) NOT NULL,
	Numero_referencia VARCHAR(30) NOT NULL,
	Numero_cuenta VARCHAR(30) NOT NULL,
	CONSTRAINT pk_clave_tipo_pago_transferencia PRIMARY KEY (Clave)
);

CREATE TABLE MU_CLIENTE_NATURAL (
	Clave SERIAL,
	CI VARCHAR(15) NOT NULL UNIQUE,
	P_nombre VARCHAR(30) NOT NULL,
	S_nombre VARCHAR(30),
	P_apellido VARCHAR(30) NOT NULL,
	S_apellido VARCHAR(30),
	Fecha_nacimiento DATE NOT NULL,
	Email VARCHAR(50) NOT NULL UNIQUE,
	Telefono VARCHAR(20) NOT NULL,
	fk_lugar INTEGER NOT NULL,
	CONSTRAINT pk_clave_cliente_natural PRIMARY KEY (Clave),
	CONSTRAINT fk_lugar_cliente_natural FOREIGN KEY (fk_lugar) 
		REFERENCES MU_LUGAR (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_CLIENTE_JURIDICO (
	Clave SERIAL,
	Telefono VARCHAR(20) NOT NULL,
	Email VARCHAR(50) NOT NULL UNIQUE,
	RIF VARCHAR(15) NOT NULL UNIQUE,
	Nombre VARCHAR(100) NOT NULL,
	fk_lugar INTEGER NOT NULL,
	CONSTRAINT pk_clave_cliente_juridico PRIMARY KEY (Clave),
	CONSTRAINT fk_lugar_cliente_juridico FOREIGN KEY (fk_lugar) 
		REFERENCES MU_LUGAR (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_PRESENTACION_MINERAL (
	Clave SERIAL,
	Precio DECIMAL NOT NULL,
	fk_presentacion INTEGER NOT NULL,
	fk_mineral_metalico INTEGER,
	fk_mineral_no_metalico INTEGER,
	CONSTRAINT pk_presentacion_mineral PRIMARY KEY (Clave),
	CONSTRAINT fk_presentacion_presentacion_mineral FOREIGN KEY (fk_presentacion) 
		REFERENCES MU_PRESENTACION (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_mineral_metalico_presentacion_mineral FOREIGN KEY (fk_mineral_metalico) 
		REFERENCES MU_MINERAL_METALICO (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_mineral_no_metalico_presentacion_mineral FOREIGN KEY (fk_mineral_no_metalico) 
		REFERENCES MU_MINERAL_NO_METALICO (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_ROL_PRIVILEGIO (
	Clave SERIAL,
	fk_rol INTEGER NOT NULL,
	fk_privilegio INTEGER NOT NULL,
	CONSTRAINT pk_rol_privilegio PRIMARY KEY (Clave),
	CONSTRAINT fk_rol_rol_privilegio FOREIGN KEY (fk_rol) 
		REFERENCES MU_ROL (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_privilegio_rol_privilegio FOREIGN KEY (fk_privilegio) 
		REFERENCES MU_PRIVILEGIO (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_MINERAL_MINERAL (
	Clave SERIAL,
	Porcentaje DECIMAL NOT NULL,
	fk_mineral_metalico_compuesto INTEGER,	-- Es compuesto por el de abajo
	fk_mineral_metalico_compone INTEGER,	-- Compone al de arriba
	fk_mineral_no_metalico_compuesto INTEGER,
	fk_mineral_no_metalico_compone INTEGER,
	CONSTRAINT pk_mineral_mineral PRIMARY KEY (Clave),
	CONSTRAINT fk_mineral_metalico_compuesto FOREIGN KEY (fk_mineral_metalico_compuesto) 
		REFERENCES MU_MINERAL_METALICO (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_mineral_metalico_compone FOREIGN KEY (fk_mineral_metalico_compone) 
		REFERENCES MU_MINERAL_METALICO (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_mineral_no_metalico_compuesto FOREIGN KEY (fk_mineral_no_metalico_compuesto) 
		REFERENCES MU_MINERAL_NO_METALICO (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_mineral_no_metalico_compone FOREIGN KEY (fk_mineral_no_metalico_compone) 
		REFERENCES MU_MINERAL_NO_METALICO (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_MAQUINARIA (
	Clave SERIAL,
	Identificador VARCHAR(10) NOT NULL,
	Fecha_adquisicion DATE NOT NULL,
	fk_tipo_maquinaria INTEGER NOT NULL,
	fk_estatus INTEGER NOT NULL,
	CONSTRAINT pk_maquinaria PRIMARY KEY (Clave),
	CONSTRAINT fk_maquinaria_tipo_maquinaria FOREIGN KEY (fk_tipo_maquinaria) 
		REFERENCES MU_TIPO_MAQUINARIA (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_maquinaria_estatus FOREIGN KEY (fk_estatus) 
		REFERENCES MU_ESTATUS (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_EMPLEADO (
	Clave SERIAL,
	CI VARCHAR(15) NOT NULL,
	P_nombre VARCHAR(30) NOT NULL,
	S_nombre VARCHAR(30),
	P_apellido VARCHAR(30) NOT NULL,
	S_apellido VARCHAR(30),
	Fecha_nacimiento DATE NOT NULL,
	Sexo VARCHAR(10) NOT NULL,
	Nivel_de_instruccion VARCHAR(15) NOT NULL,
	Telefono VARCHAR(20) NOT NULL,
	fk_lugar INTEGER NOT NULL,
	fk_cargo INTEGER NOT NULL,
	fk_estatus INTEGER NOT NULL,
	CONSTRAINT pk_empleado PRIMARY KEY (Clave),
	CONSTRAINT fk_lugar_empleado FOREIGN KEY (fk_lugar) 
		REFERENCES MU_LUGAR (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_cargo_empleado FOREIGN KEY (fk_cargo) 
		REFERENCES MU_CARGO (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_estatus_empleado FOREIGN KEY (fk_estatus) 
		REFERENCES MU_ESTATUS (Clave) ON DELETE CASCADE,
	CONSTRAINT check_sexo_empleado
		CHECK (Sexo IN ('Femenino', 'Masculino', 'Otro')),
	CONSTRAINT check_nivel_instruccion_empleado
		CHECK (Nivel_de_instruccion IN ('Primaria', 'Secundaria', 'Universitaria', 'Superior', 'Otro'))
);

CREATE TABLE MU_USUARIO (
	Clave SERIAL,
	Usuario VARCHAR(15) NOT NULL,
	Contraseña VARCHAR(20) NOT NULL,
	fk_empleado INTEGER NOT NULL,
	fk_rol INTEGER NOT NULL,
	fk_estatus INTEGER NOT NULL,
	CONSTRAINT pk_usuario PRIMARY KEY (Clave),
	CONSTRAINT fk_rol_usuario FOREIGN KEY (fk_rol) 
		REFERENCES MU_ROL (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_estatus_usuario FOREIGN KEY (fk_estatus) 
		REFERENCES MU_ESTATUS (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_VENTA (
	Clave SERIAL,
	Total DECIMAL NOT NULL,
	Fecha TIMESTAMP NOT NULL DEFAULT now(),
	fk_cliente_natural INTEGER,
	fk_cliente_juridico INTEGER,
	fk_estatus INTEGER NOT NULL,
	CONSTRAINT pk_venta PRIMARY KEY (Clave),
	CONSTRAINT fk_cliente_natural_venta FOREIGN KEY (fk_cliente_natural) 
		REFERENCES MU_CLIENTE_NATURAL (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_cliente_juridico_venta FOREIGN KEY (fk_cliente_juridico) 
		REFERENCES MU_CLIENTE_JURIDICO (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_estatus_venta FOREIGN KEY (fk_estatus) 
		REFERENCES MU_ESTATUS (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_DETALLE_VENTA (
	Clave SERIAL,
	Cantidad DECIMAL NOT NULL,
	Precio DECIMAL NOT NULL,
	fk_venta INTEGER NOT NULL,
	fk_estatus INTEGER NOT NULL,
	fk_presentacion_mineral INTEGER NOT NULL,
	CONSTRAINT pk_detalle_venta PRIMARY KEY (Clave),
	CONSTRAINT fk_venta_detalle_venta FOREIGN KEY (fk_venta) 
		REFERENCES MU_VENTA (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_estatus_detalle_venta FOREIGN KEY (fk_estatus) 
		REFERENCES MU_ESTATUS (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_presentacion_mineral_detalle_venta FOREIGN KEY (fk_presentacion_mineral) 
		REFERENCES MU_PRESENTACION_MINERAL (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_PAGO (
	Clave SERIAL,
	Monto DECIMAL NOT NULL,
	Fecha_pago TIMESTAMP NOT NULL DEFAULT now(),
	fk_venta INTEGER NOT NULL,
	fk_tipo_pago_cheque INTEGER,
	fk_tipo_pago_tarjeta_debito INTEGER,
	fk_tipo_pago_tarjeta_credito INTEGER,
	fk_tipo_pago_transferencia INTEGER,
	CONSTRAINT pk_pago PRIMARY KEY (Clave),
	CONSTRAINT fk_venta_pago FOREIGN KEY (fk_venta) 
		REFERENCES MU_VENTA (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_tipo_pago_cheque_pago FOREIGN KEY (fk_tipo_pago_cheque) 
		REFERENCES MU_TIPO_PAGO_CHEQUE (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_tipo_pago_tarjeta_debito_pago FOREIGN KEY (fk_tipo_pago_tarjeta_debito) 
		REFERENCES MU_TIPO_PAGO_TARJETA_DEBITO (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_tipo_pago_tarjeta_credito_pago FOREIGN KEY (fk_tipo_pago_tarjeta_credito) 
		REFERENCES MU_TIPO_PAGO_TARJETA_CREDITO (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_tipo_pago_transferencia_pago 	FOREIGN KEY (fk_tipo_pago_transferencia) 
		REFERENCES MU_TIPO_PAGO_TRANSFERENCIA (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_EMPRESA (
	Clave SERIAL,
	RIF VARCHAR(15) NOT NULL,
	Descripcion VARCHAR(100),
	Nombre VARCHAR(40) NOT NULL,
	fk_lugar INTEGER NOT NULL,
	CONSTRAINT pk_empresa PRIMARY KEY (Clave),
	CONSTRAINT fk_lugar_empresa FOREIGN KEY (fk_lugar) 
		REFERENCES MU_LUGAR (Clave) ON DELETE CASCADE
);

--------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE MU_MINERAL_EMPRESA (
	Clave SERIAL,
	Precio_venta DECIMAL NOT NULL,
	fk_mineral_metalico INTEGER,
	fk_mineral_no_metalico INTEGER,
	fk_empresa INTEGER NOT NULL,
	CONSTRAINT pk_mineral_empresa PRIMARY KEY (Clave),
	CONSTRAINT fk_mineral_metalico_empresa FOREIGN KEY (fk_mineral_metalico)
		REFERENCES MU_MINERAL_METALICO (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_mineral_no_metalico_empresa FOREIGN KEY (fk_mineral_no_metalico)
		REFERENCES MU_MINERAL_NO_METALICO (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_empresa_mineral_empresa FOREIGN KEY (fk_empresa)
		REFERENCES MU_EMPRESA (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_EXPLOTACION (
	Clave SERIAL,
	Costo_total DECIMAL NOT NULL,
	Duracion INTEGER NOT NULL,
	Fecha_inicio DATE,
	Fecha_fin DATE,
	fk_venta INTEGER,
	fk_estatus INTEGER NOT NULL,
	CONSTRAINT pk_explotacion PRIMARY KEY (Clave),
	CONSTRAINT fk_venta_explotacion FOREIGN KEY (fk_venta) 
		REFERENCES MU_VENTA (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_estatus_explotacion FOREIGN KEY (fk_estatus) 
		REFERENCES MU_ESTATUS (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_ETAPA (
	Clave SERIAL,
	Nombre VARCHAR(100) NOT NULL,
	Costo_total DECIMAL NOT NULL,
	Duracion INTEGER NOT NULL,
	Fecha_inicio DATE,
	Fecha_fin DATE,
	Fecha_fin_real DATE,
	fk_estatus INTEGER NOT NULL,
	fk_explotacion INTEGER NOT NULL,
	CONSTRAINT pk_etapa PRIMARY KEY (Clave),
	CONSTRAINT fk_estatus_etapa FOREIGN KEY (fk_estatus) 
		REFERENCES MU_ESTATUS (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_explotacion_etapa FOREIGN KEY (fk_explotacion)
		REFERENCES MU_EXPLOTACION (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_FASE (
	Clave SERIAL,
	Nombre VARCHAR(30) NOT NULL,
	Costo DECIMAL NOT NULL,
	Duracion INTEGER NOT NULL,
	Fecha_inicio DATE,
	Fecha_fin DATE,
	Fecha_fin_real DATE,
	fk_estatus INTEGER NOT NULL,
	fk_etapa INTEGER NOT NULL,
	CONSTRAINT pk_etapa_fase PRIMARY KEY (Clave),
	CONSTRAINT fk_estatus_fase FOREIGN KEY (fk_estatus) 
		REFERENCES MU_ESTATUS (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_etapa_fase FOREIGN KEY (fk_etapa)
		REFERENCES MU_ETAPA (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_YACIMIENTO (
	Clave SERIAL,
	Nombre VARCHAR(20) NOT NULL,
	Descripcion VARCHAR(100) NOT NULL,
	Fecha_registro DATE NOT NULL,
	Tamaño DECIMAL NOT NULL,
	fk_lugar INTEGER NOT NULL,
	fk_estatus INTEGER NOT NULL,
	fk_explotacion INTEGER NOT NULL,
	CONSTRAINT pk_yacimiento PRIMARY KEY (Clave),
	CONSTRAINT fk_lugar_yacimiento FOREIGN KEY (fk_lugar) 
		REFERENCES MU_LUGAR (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_estatus_yacimiento FOREIGN KEY (fk_estatus) 
		REFERENCES MU_ESTATUS (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_explotacion_yacimiento FOREIGN KEY (fk_explotacion) 
		REFERENCES MU_EXPLOTACION (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_YACIMIENTO_TIPO_YACIMIENTO (
	Clave SERIAL,
	fk_yacimiento INTEGER NOT NULL,
	fk_tipo_yacimiento INTEGER NOT NULL,
	CONSTRAINT pk_yacimiento_tipo_yacimiento PRIMARY KEY (Clave),
	CONSTRAINT fk_yacimiento_yacimiento_tipo_yacimiento FOREIGN KEY (fk_yacimiento) 
		REFERENCES MU_YACIMIENTO (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_tipo_yacimiento_yacimiento_tipo_yacimiento FOREIGN KEY (fk_tipo_yacimiento) 
		REFERENCES MU_TIPO_YACIMIENTO (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_YACIMIENTO_MINERAL (
	Clave SERIAL,
	Cantidad DECIMAL NOT NULL,
	fk_mineral_metalico INTEGER,
	fk_mineral_no_metalico INTEGER,
	fk_yacimiento INTEGER NOT NULL,
	CONSTRAINT pk_yacimiento_mineral PRIMARY KEY (Clave),
	CONSTRAINT fk_mineral_metalico_yacimiento_mineral FOREIGN KEY (fk_mineral_metalico) 
		REFERENCES MU_MINERAL_METALICO (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_mineral_no_metalico_yacimiento_mineral FOREIGN KEY (fk_mineral_no_metalico) 
		REFERENCES MU_MINERAL_NO_METALICO (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_yacimiento_yacimiento_mineral FOREIGN KEY (fk_yacimiento) 
		REFERENCES MU_YACIMIENTO (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_CARGO_FASE (
	Clave SERIAL,
	Cantidad INTEGER NOT NULL,
	Sueldo DECIMAL NOT NULL,
	fk_cargo INTEGER NOT NULL,
	fk_etapa INTEGER NOT NULL,
	fk_explotacion INTEGER NOT NULL,
	fk_fase INTEGER NOT NULL,
	CONSTRAINT pk_cargo_fase PRIMARY KEY (Clave),
	CONSTRAINT fk_cargo_cargo_fase FOREIGN KEY (fk_cargo) 
		REFERENCES MU_CARGO (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_explotacion_cargo_fase FOREIGN KEY (fk_explotacion) 
		REFERENCES MU_EXPLOTACION (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_fase_cargo_fase FOREIGN KEY (fk_fase) REFERENCES MU_FASE (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_EMPLEADO_CARGO_FASE (
	Clave SERIAL,
	Desempeño VARCHAR(100),
	fk_cargo INTEGER NOT NULL,
	fk_cargo_fase INTEGER NOT NULL,
	fk_empleado INTEGER NOT NULL,
	fk_estatus INTEGER NOT NULL,
	fk_etapa INTEGER NOT NULL,
	fk_fase INTEGER NOT NULL,
	fk_explotacion INTEGER NOT NULL,
	CONSTRAINT pk_empleado_cargo_fase PRIMARY KEY (Clave),
	CONSTRAINT fk_cargo_fase_empleado_cargo_fase FOREIGN KEY (fk_cargo_fase) 
		REFERENCES MU_CARGO_FASE (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_empleado_empleado_cargo_fase FOREIGN KEY (fk_empleado) 
		REFERENCES MU_EMPLEADO (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_estatus_empleado_cargo_fase FOREIGN KEY (fk_estatus) 
		REFERENCES MU_ESTATUS (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_HORARIO_EMPLEADO (
	Clave SERIAL,
	fk_cargo INTEGER NOT NULL,
	fk_cargo_fase INTEGER NOT NULL,
	fk_empleado INTEGER NOT NULL,
	fk_empleado_cargo_fase INTEGER NOT NULL,
	fk_etapa INTEGER NOT NULL,
	fk_explotacion INTEGER NOT NULL,
	fk_fase INTEGER NOT NULL,
	fk_horario INTEGER NOT NULL,
	CONSTRAINT pk_horario_empleado PRIMARY KEY (Clave),
	CONSTRAINT fk_empleado_cargo_fase_horario_empleado FOREIGN KEY (fk_empleado_cargo_fase) 
		REFERENCES MU_EMPLEADO_CARGO_FASE (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_horario_horario_empleado FOREIGN KEY (fk_horario) 
		REFERENCES MU_HORARIO (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_TIPO_MAQUINARIA_FASE (
	Clave SERIAL,
	Cantidad INTEGER NOT NULL,
	Costo DECIMAL NOT NULL,
	fk_etapa INTEGER NOT NULL,
	fk_explotacion INTEGER NOT NULL,
	fk_fase INTEGER NOT NULL,
	fk_tipo_maquinaria INTEGER NOT NULL,
	CONSTRAINT pk_tipo_maquinaria_fase PRIMARY KEY (Clave),
	CONSTRAINT fk_fase_tipo_maquinaria_fase FOREIGN KEY (fk_fase) 
		REFERENCES MU_FASE (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_tipo_maquinaria_tipo_maquinaria_fase FOREIGN KEY (fk_tipo_maquinaria) 
		REFERENCES MU_TIPO_MAQUINARIA (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_MAQUINARIA_TIPO_MAQUINARIA_FASE (
	Clave SERIAL,
	fk_etapa INTEGER NOT NULL,
	fk_explotacion INTEGER NOT NULL,
	fk_fase INTEGER NOT NULL,
	fk_maquinaria INTEGER NOT NULL,
	fk_tipo_maquinaria INTEGER NOT NULL,
	fk_tipo_maquinaria_fase INTEGER NOT NULL,
	CONSTRAINT pk_maquinaria_tipo_maquinaria_fase PRIMARY KEY (Clave),
	CONSTRAINT fk_maquinaria_maquinaria_tipo_maquinaria_fase FOREIGN KEY (fk_maquinaria)
		REFERENCES MU_MAQUINARIA (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_tipo_maquinaria_fase_maquinaria_tipo_maquinaria_fase FOREIGN KEY (fk_tipo_maquinaria_fase) 
		REFERENCES MU_TIPO_MAQUINARIA_FASE (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_INVENTARIO (
	Clave SERIAL,
	Fecha TIMESTAMP NOT NULL,
	Cantidad_actual DECIMAL NOT NULL,
	Cantidad_transaccion DECIMAL NOT NULL,
	fk_explotacion INTEGER,	-- Arco Exclusivo
	fk_mineral_metalico INTEGER, -- Arco Exclusivo
	fk_mineral_no_metalico INTEGER,	-- Arco Exclusivo
	fk_presentacion INTEGER NOT NULL,
	fk_presentacion_mineral INTEGER NOT NULL,
	fk_venta INTEGER,	-- Arco Exclusivo
	CONSTRAINT pk_inventario PRIMARY KEY (Clave),
	CONSTRAINT fk_explotacion_inventario FOREIGN KEY (fk_explotacion) 
		REFERENCES MU_EXPLOTACION (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_mineral_metalico_inventario FOREIGN KEY (fk_mineral_metalico)
		REFERENCES MU_MINERAL_METALICO (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_mineral_no_metalico_inventario FOREIGN KEY (fk_mineral_no_metalico)
		REFERENCES MU_MINERAL_NO_METALICO (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_venta_inventario FOREIGN KEY (fk_venta) 
		REFERENCES MU_VENTA (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_presentacion_mineral_inventario FOREIGN KEY (fk_presentacion_mineral)
		REFERENCES MU_PRESENTACION_MINERAL (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_SOLICITUD_COMPRA (
	Clave SERIAL,
	Total DECIMAL NOT NULL,
	Fecha TIMESTAMP NOT NULL,
	fk_empresa INTEGER NOT NULL,
	fk_estatus INTEGER NOT NULL,
	fk_explotacion INTEGER NOT NULL,
	CONSTRAINT pk_solicitud_compra PRIMARY KEY (Clave),
	CONSTRAINT fk_empresa_solicitud_compra FOREIGN KEY (fk_empresa)
		REFERENCES MU_EMPRESA (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_estatus_solicitud_compra FOREIGN KEY (fk_estatus) 
		REFERENCES MU_ESTATUS (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_explotacion_solicitud_compra FOREIGN KEY (fk_explotacion) 
		REFERENCES MU_EXPLOTACION (Clave) ON DELETE CASCADE
);

CREATE TABLE MU_DETALLE_SOLICITUD_COMPRA (
	Clave SERIAL,
	Cantidad DECIMAL NOT NULL,
	Precio DECIMAL NOT NULL,
	fk_empresa INTEGER NOT NULL,
	fk_mineral_empresa INTEGER NOT NULL,
	fk_mineral_metalico INTEGER,
	fk_mineral_no_metalico INTEGER,
	fk_solicitud_compra INTEGER NOT NULL,
	CONSTRAINT pk_detalle_solicitud_compra PRIMARY KEY (Clave),
	CONSTRAINT fk_mineral_empresa_detalle_solicitud_compra FOREIGN KEY (fk_mineral_empresa)
		REFERENCES MU_MINERAL_EMPRESA (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_mineral_metalico_detalle_solicitud_compra FOREIGN KEY (fk_mineral_metalico)
		REFERENCES MU_MINERAL_METALICO (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_mineral_no_metalico_detalle_solicitud_compra FOREIGN KEY (fk_mineral_no_metalico)
		REFERENCES MU_MINERAL_NO_METALICO (Clave) ON DELETE CASCADE,
	CONSTRAINT fk_solicitud_compra_detalle_solicitud_compra FOREIGN KEY (fk_solicitud_compra)
		REFERENCES MU_SOLICITUD_COMPRA (Clave) ON DELETE CASCADE
);