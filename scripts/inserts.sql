-------------------------------------    ALIADOS     -------------------------------------
INSERT INTO MU_EMPRESA (RIF, Descripcion, Nombre, fk_lugar) VALUES
    --  AMAZONAS --
    ('J11111111', 'Empresa Minera', 'AVG', 384),
    ('J22222222', 'Productores de Bauxita', 'MGM', 362),
    -- ANZOATEGUI --
    ('J33333333', 'Empresa carbonera', 'IBM', 392),
    ('J44444444', 'Productores de Carbones desde 1974', 'Carbones de Venezuela CA', 412),
    -- APURE --
    ('J55555555', 'Generadores de Aluminio', 'Alumin CA', 450),
    ('J66666666', 'Productores de Venezuela con 20 años de trayectoria', 'Oros de Venezuela CA', 459),
    -- ARAGUA --
    ('J77777777', 'Corporación Venezolana SAP', 'CV SAP', 507),
    ('J88888888', 'Empresa Minera especializada en fusita', 'Fusitas de Venezuela', 475),
    -- BARINAS --
    ('J99999999', 'Empresa explotadora de durita', 'Duritas de Venezuela', 531),
    ('J10101010', 'Perforadores de clarita', 'Claritas de Venezuela CA', 545),
    -- BOLÍVAR --
    ('J20202020', 'CVG Industria Venezolana de Aluminio', 'CVG VENALUM', 581),
    ('J30303030', 'Compañía General de Minería de Venezuela', 'CVG MINERVEN', 583),
    -- CARABOBO --
    ('J40404040', 'Compañía extractora de calcio', 'Calcitín CA', 645),
    ('J50505050', 'Empresa productora de talco', 'GIT CA', 651),
    -- COJEDES --
    ('J60606060', 'Cadmio del llano', 'CVG CADMIO', 661),
    ('J70707070', 'Carbones de Cojedes', 'CARBON-COJEDES CA', 669),
    -- DELTA AMACURO --
    ('J80808080', 'Fundidores de Oro', 'ORO FUND CA', 691),
    ('J90909090', 'Diamantes de la selva', 'DIAMOND VE', 687),
    -- FALCÓN --
    ('J10010010', 'Compañía pionera en el desarrollo minero', 'Médanos de Metales CA', 694),
    ('J20020020', 'Productores de cobre en Falcón', 'CVG COFAL', 719),
    -- GUÁRICO --
    ('J30030030', 'Finca minera ubicada en El Socorro', 'OXIVEN CA',780),
    ('J40040040', 'Empresa refinadora de oro', 'REFINAVEN', 783),
    -- LARA --
    ('J50050050', 'Empresa productora de cadmio, vitrita y fusita', 'LARAVEN', 822),
    ('J60060060', 'Comprometidos con el desarrollo minero en Venezuela', 'CVG METAL', 818),
    -- MÉRIDA --
    ('J70070070', 'Empresa gocha metalera', 'FUSITRÚN CA', 927),
    ('J80080080', 'Merideños y mineros', 'CVG CLARITÍN', 943),
    -- MIRANDA --
    ('J90090090', 'Metales mirandinos', 'MIRAMAN CA', 970),
    ('J01010101', 'Minerales playeros', 'FOSFATRÁN', 973),
    -- MONAGAS --
    ('J02020202', 'Empresa dedicada al reciclaje de minerales', 'TODOMINERAL', 1015),
    ('J03030303', 'Comprometidos con la formación del manganeso', 'CVG MANGANESO', 1016),
    -- NUEVA ESPARTA --
    ('J04040404', 'Garantizamos la producción de talco', 'TALQUERA LA ASUNCIÓN', 1059),
    ('J05050505', 'La mica es el mineral más importante', 'Micas de Nueva Esparta', 1070),
    -- PORTUGUESA --
    ('J06060606', 'Productores de azufre', 'AZUFRÁN', 1082),
    ('J07070707', 'Generadores de arcilla', 'Arcillas de Portuguesa', 1086),
    -- SUCRE --
    ('J08080808', 'Extractores de bentonita', 'BVE CA', 1127),
    ('J09090909', 'Fundidores de mica', 'CVG LA MICA', 1173),
    -- TÁCHIRA --
    ('J00100100', 'Transformadores de granito y otros minerales', 'LOS GRANITOS CA', 1239),
    ('J00200200', 'Vendedores de caliza', 'CAPPLE', 1232),
    -- TRUJILLO --
    ('J00300300', 'El níquel como metal de explotación', 'NIQUELS', 1254),
    ('J00400400', 'Desde 1975 explotando clarita', 'CLARITÍN', 1260),
    -- VARGAS --
    ('J00500500', 'Formadores de caolín', 'MINERCAOLÍN', 1346),
    ('J00600600', 'Vitrita de Vargas', 'VARGASVIT', 1342),
    -- YARACUY --
    ('J00700700', 'Producimos todas las presentaciones de vitrita, calcio y cadmio', 'VITRITAS 1984', 1349),
    ('J00800800', 'Producción y explotación a nivel nacional de durita y clarita', 'CVG EXPLOTAMED', 1366),
    -- ZULIA --
    ('J00900900', 'Venta y producción de manganeso', 'MANGAMED CA', 1373),
    ('J00100001', 'Explotación y producción de basaltos', 'BASALTAMÉ CA', 1410),
    -- DISTRITO CAPITAL --
    ('J00200002', 'Caracas minera', 'MINERUCV', 1494),
    ('J00300003', 'La Simón Bolívar minera', 'MINERUSB', 1489);

-------------------------------------    ESTATUS     -------------------------------------
INSERT INTO MU_ESTATUS (Nombre) VALUES 
    ('Activo'), ('Inactivo'), ('Ocupado'), ('En uso'), ('En explotación'), ('Explotado'), ('Procesada'), ('En proceso'),
    ('En reparación');

-------------------------------------    CARGO     -------------------------------------
INSERT INTO MU_CARGO (Nombre, Descripcion) VALUES
    ('Analista de Laboratorio', 'Analiza las muestras en el laboratorio'),
    ('Auxiliar de Campo', 'Apoyo extra en la actividad de campo'),
    ('Ayudante de Campaña', 'Apoyan el trabajo de explotación'),
    ('Chofer', 'Realiza traslados'),
    ('Consultor', 'Ofrece asesoría sobre los procesos de explotación'),
    ('Coordinador General', 'Coordina las actividades de la explotación'),
    ('Dibujante', 'Representa gráficamente algunos objetos'),
    ('Economista', 'Evalúa viabilidad y costos del proyecto'),
    ('Geólogo', 'Encargado de estudiar la tierra'),
    ('Ingeniero', 'Estudia el proyecto, el terreno y evalúa la viabilidad'),
    ('Jefe de Proyecto', 'Supervisa y gestiona las actividades de explotación'),
    ('Muestrero', 'Obtiene las muestras para luego ser analizadas'),
    ('Obrero', 'Realiza la actividad de campo'),
    ('Perforista', 'Encargado de perforar durante la explotación'),
    ('Personal de Soporte', 'Ofrece ayuda extra en labor de campo'),
    ('Portamira', 'Encargado de medir desniveles'),
    ('Secretario', 'Manejan toda la información y organizan la explotación'),
    ('Supervisor de Campo', 'Supervisa las actividades de campo de la explotación'),
    ('Técnico', 'Supervisa el estado de los equipos y la maquinaria'),
    ('Topógrafo', 'Realiza el levantamiento plano-milimétrico del terreno');
    
------------------------------   EMPLEADOS   ------------------------------
INSERT INTO MU_EMPLEADO (CI, P_nombre, S_nombre, P_apellido, S_apellido, Fecha_nacimiento, Sexo, Nivel_de_instruccion, Telefono, fk_lugar, fk_cargo, fk_estatus) VALUES
    ('V11111111', 'Andrea', 'Valentina', 'Da Silva', 'Baudet', '01-25-1999', 'Femenino', 'Universitaria', '04141111111', 546, 1, 1),
    ('V22222223', 'Diego', 'Alfonso', 'Gutiérrez', 'Duarte', '07-14-1999', 'Masculino', 'Universitaria', '04142222222', 765, 1, 1),
    ('V33333333', 'Alba', 'Sofía', 'Sánchez', 'Silvestre', '01-31-1999', 'Femenino', 'Superior', '04123333333', 865, 1, 3),
    ('V44444444', 'Javier', 'Alejandro', 'Andrade', 'González', '07-21-1998', 'Masculino', 'Universitaria', '0424445421', 965, 2, 2),
    ('E55555555', 'Gustavo', 'Ignacio', 'Sánchez', 'Rodríguez', '05-15-1998', 'Masculino', 'Otro', '04161265342', 987, 2, 1),
    ('V66666666', 'Miguel', 'Antonio', 'Peña', 'Fraga', '04-03-1998', 'Masculino', 'Superior', '04142890753', 1010, 2, 3),
    ('V77777777', 'Gabriel', 'Alejandro', 'Terán', 'Guerrero', '05-24-1999', 'Masculino', 'Universitaria', '04167652341', 1090, 3, 3),
    ('E88888888', 'Luis', 'Reynaldo', 'Fuentes', 'Salazar', '11-05-1999', 'Masculino', 'Secundaria', '0245612309', 741, 3, 1),
    ('V99999999', 'Michelle', 'Andrea', 'Alleyne', 'Boniel', '10-04-1998', 'Femenino', 'Superior', '04265412897', 632, 3, 2),
    ('V10101010', 'Diego', 'Alejandro', 'De Quintal', 'Nóbrega', '07-26-1999', 'Masculino', 'Primaria', '04126789421', 876, 4, 1),
    ('V20202020', 'Stephanie', NULL, 'Cruz', 'Castelli', '09-07-1998', 'Femenino', 'Secundaria', '04265478954', 653, 4, 2),
    ('E30303030', 'Alexander', 'José', 'Fernández', 'Morales', '01-13-1999', 'Masculino', 'Primaria', '04165234987', 976, 4, 2),
    ('V40404040', 'Maximiliano', NULL, 'Bogoljubskij', NULL, '01-26-1999', 'Masculino', 'Otro', '04265321786', 1076, 5, 2),
    ('V50505050', 'Rafael', 'Ricardo', 'Méndez', 'Nieves', '09-01-1998', 'Masculino', 'Otro', '04247612893', 854, 5, 3),
    ('E60606060', 'Anthony', 'Gabriel', 'Rodríguez', 'Zambrano', '11-08-1999', 'Masculino', 'Superior', '04142783450', 634, 5, 3),
    ('V70707070', 'Carolina', 'Del Valle', 'Patiño', 'Bittar', '05-02-1998', 'Femenino', 'Universitaria', '04163245124', 908, 6, 3),
    ('V80808080', 'David', NULL, 'Monroy', NULL, '09-09-1998', 'Masculino', 'Universitaria', '04264376451', 1001, 6, 3),
    ('V90909090', 'Roberto', 'José', 'Carbajales', 'Di Cosola', '03-17-1998', 'Masculino', 'Universitaria', '04145623894', 965, 6, 2),
    ('V10010010', 'Ysabel', NULL, 'Ardila', NULL, '09-22-1997', 'Femenino', 'Universitaria', '04247612908', 546, 7, 1),
    ('V20020020', 'Ezequiel', 'José', 'Montero', 'Pantano', '05-29-1999', 'Masculino', 'Secundaria', '04264386512', 623, 7, 3),
    ('E30030030', 'Gregg', 'Michell', 'Spinetti', NULL, '10-28-1998', 'Masculino', 'Secundaria', '04127623987', 787, 7, 1),
    ('V40040040', 'Oscar', 'José', 'Márquez', 'Salvatierra', '05-12-1998', 'Masculino', 'Universitaria', '04145239801', 797, 8, 2),
    ('E50050050', 'Yeisson', NULL, 'Venencia', NULL, '02-12-1999', 'Masculino', 'Universitaria', '04265312908', 890, 8, 1),
    ('E60060060', 'David', 'Andrés', 'Ortuño', 'Pereira', '11-13-1998', 'Masculino', 'Superior', '04125320876', 982, 8, 1),
    ('V70070070', 'Mario', 'Andrés', 'Avena', 'Sorrentino', '08-12-1998', 'Masculino', 'Superior', '04165239876', 910, 9, 3),
    ('E80080080', 'Pedro', 'José', 'Farías', 'De Sousa', '11-25-1998', 'Masculino', 'Otro', '04167213409', 835, 9, 1),
    ('E90090090', 'Javier', 'Adriano', 'Stifano', 'Durán', '01-25-1999', 'Masculino', 'Otro', '04267321987', 745, 9, 1),
    ('V10001000', 'Fernando', 'Andrés', 'Rodríguez', 'Marcano', '07-18-1998', 'Masculino', 'Superior', '04264257891', 921, 10, 2),
    ('V20002000', 'Mauricio', 'Ricardo', 'Rodríguez', NULL, '11-08-1999', 'Masculino', 'Universitaria', '04127632894', 1025, 10, 2),
    ('E30003000', 'Alexandra', 'Elena', 'Manrique', 'Guerrero', '12-09-1998', 'Femenino', 'Universitaria', '04267123987', 598, 10, 3);

------------------------------   MINERALES METÁLICOS ------------------------------
INSERT INTO MU_MINERAL_METALICO (Nombre, Descripcion, Dureza) VALUES 
    ('Aluminio', 'Es un elemento químico, de símbolo Al y número atómico 13', 2.75),
    ('Bauxita', 'Materia prima para obtener aluminio', 4),
    ('Calcio', 'Elemento químico de número atómico 20 y símbolo Ca', 3),
    ('Carbón', 'Compuesto por azufre, nitrógeno, hidrógeno, oxígeno y otros', 2),
    ('Cobre', 'Empleado en la fabricación de conductores eléctricos', 3),
    ('Cuarzo', 'Es un mineral compuesto de sílice (SiO2)', 7),
    ('Hierro', 'Símbolo Fe y número atómico 26', 4),
    ('Manganeso', 'Alto consumo en la industria siderúrgica', 5),
    ('Níquel', 'Metal maleable, duro, dúctil y de propiedades ferromagnéticas', 5),
    ('Oro', 'Número atómico es el 79', 3),
    ('Oxígeno', 'Constituye la quinta parte del aire atmosférico terrestre', 8),
    ('Silicio', 'Es un elemento químico, cuyo número atómico es el 14 y su símbolo es Si', 6.5);

------------------------------   MINERALES NO METÁLICOS ------------------------------
INSERT INTO MU_MINERAL_NO_METALICO (Nombre, Descripcion, Uso) VALUES
    ('Arcilla', 'Roca sedimentaria constituida por silicatos de aluminio hidratados', 'Fabricación de cerámica, ladrillo, porcelana y loza'),
    ('Arena', 'Compuesta fundamentalmente por sílice', 'En la fabricación de cristales y hormigón'),
    ('Azufre', 'Es un elemento químico de número atómico 16 y símbolo S (del latín sulphur)', 'Fabricación de baterías, pólvora, fertilizante y fungicida'),
    ('Baritina', 'Es un mineral del tipo de los sulfatos', 'Como pigmento, fabricación de resinas sintéticas'),
    ('Bentonita', 'Describe una arcilla compuesta de Montmorillonita', 'En las construcciones para las tierras, lubricantes y lodos'),
    ('Cal', 'Formada por calcio y oxígeno', 'En la construcción de viviendas'),
    ('Caliza', 'Formada básicamente por un compuesto de calcio', 'En la fabricación del cemento'),
    ('Carbón Antracita', 'Variante del carbón mineral', 'Para la generación eléctrica, fundiciones y cementera'),
    ('Diamante', 'Viene del griego antiguo αδάμας, que significa invencible o inalterable', 'En la industria joyera y en la perforación de lotes petroleros'),
    ('Granito', 'Formado por calcio, feldespato y mica', 'En la construcción de viviendas y edificios públicos'),
    ('Mica', 'Se encuentra en la naturaleza con minerales como el cuarzo', 'Como aislante eléctrico y térmico'),
    ('Sal Común', 'Compuesta por sodio y cloro', 'Como condimento y para la conservación de alimentos'),
    ('Talco', 'De color blanco o azul', 'Fabricación de papel y en la industria cosmética'),
    ('Yeso', 'Composición química rica en calcio y azufre', 'Fabricación de cemento, dry-wall, moldes y tizas');

-------------------------------------    PRESENTACIÓN     -------------------------------------
INSERT INTO MU_PRESENTACION (Nombre) VALUES
    ('Líquido'),
    ('Fundido'),
    ('Lingote'),
    ('Cilindro'),
    ('Polvo'),
    ('Genérico');

-------------------------------------    PRESENTACIÓN MINERAL     -------------------------------------
INSERT INTO MU_PRESENTACION_MINERAL (Precio, fk_presentacion, fk_mineral_metalico, fk_mineral_no_metalico) VALUES
    (1234.70, 1, 1, NULL),
    (654.67, 1, 7, NULL),
    (540.80, 1, 10, NULL),
    (1000, 2, 10, NULL),
    (1500.00, 3, 10, NULL),
    (800, 5, NULL, 6),
    (2000, 6, NULL, 9),
    (2500, 3, NULL, 9),
    (250.20, 6, NULL, 2);

-------------------------------------    TIPO MAQUINARIA     -------------------------------------
INSERT INTO MU_TIPO_MAQUINARIA (Nombre) VALUES 
    ('Excavadora'),
    ('Grúa'),
    ('Horno'),
    ('Plancha'),
    ('Planta de Fundición'),
    ('Tractor'),
    ('Vehículo');

-------------------------------------    MAQUINARIA     -------------------------------------
INSERT INTO MU_MAQUINARIA (Identificador, Fecha_adquisicion, fk_tipo_maquinaria, fk_estatus) VALUES
    ('1111111111', '01-25-1999', 1, 1),
    ('2222222222', '01-31-1999', 2, 2),
    ('3333333333', '07-14-1999', 2, 1),
    ('4444444444', '04-03-1998', 1, 3),
    ('5555555555', '05-24-1998', 4, 3),
    ('6666666666', '11-23-2018', 4, 3),
    ('7777777777', '01-05-2010', 5, 1),
    ('8888888888', '02-07-1973', 6, 1),
    ('9999999999', '05-30-1951', 5, 2),
    ('1010101010', '08-20-1965', 7, 2),
    ('2020202020', '06-29-1987', 1, 1),
    ('3030303030', '07-18-2017', 2, 2),
    ('4040404040', '09-22-2012', 2, 1),
    ('5050505050', '10-11-2002', 1, 3),
    ('6060606060', '11-01-2008', 4, 3),
    ('7070707070', '02-22-1998', 4, 3),
    ('8080808080', '11-19-1978', 5, 1),
    ('9090909090', '04-15-1999', 6, 1),
    ('1001001001', '07-13-2005', 5, 2),
    ('2002002002', '09-11-2005', 7, 2);

-------------------------------------    CLIENTE NATURAL     -------------------------------------
INSERT INTO MU_CLIENTE_NATURAL (CI, P_nombre, S_nombre, P_apellido, S_apellido, Fecha_nacimiento, Email, Telefono, fk_lugar) VALUES
    ('V26435741', 'Andrea', 'Valentina', 'Pérez', 'Baudet', '01-25-1999', 'andreadasilvab@gmail.com', '04140110935', 984),
    ('V27164848', 'Diego', 'Alfonso', 'Gutiérrez', 'Duarte', '07-14-1999', 'diegoalfonsogutierrez@gmail.com', '04262857751', 440),
    ('V27086052', 'Alba', 'Sofía', 'Sánchez', 'Silvestre', '01-31-1999', 'albasofia.n.n@gmail.com', '04122765991', 445),
    ('V26530119', 'Miguel', 'Antonio', 'Peña', 'Fraga', '04-03-1998', 'mpfraga@gmail.com', '04242855585', 450),
    ('V27127854', 'Gabriel', 'Alejandro', 'Terán', 'Guerrero', '05-24-1999', 'gabrielgt12@hotmail.com', '04126102278', 452),
    ('V26904756', 'Gustavo', 'Ignacio', 'Sánchez', 'Rodríguez', '05-15-1998', 'gustavosr@gmail.com', '04241828934', 447);

-------------------------------------    CLIENTE JURÍDICO     -------------------------------------
INSERT INTO MU_CLIENTE_JURIDICO (Nombre, RIF, Email, Telefono, fk_lugar) VALUES 
    ('IBM', 'J11111111', 'ibm@ibm.com', '02123788072', 560),
    ('AVG', 'J22222222', 'avg@avg.com', '02126725272', 565),
    ('SAP', 'J33333333', 'sap@sap.com', '02126453638', 568),
    ('Oracle', 'J44444444', 'oracle@oracle.com', '02123473638', 570),
    ('Apple', 'J55555555', 'apple@apple.com', '02126909081', 580),
    ('Microsoft', 'J66666666', 'microsoft@microsoft.com', '02126939528', 585);
