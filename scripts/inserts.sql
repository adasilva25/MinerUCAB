-------------------------------------    ALIADOS     -------------------------------------
INSERT INTO MU_EMPRESA (RIF, Descripcion, Nombre, fk_lugar) VALUES
    --  AMAZONAS --
    ('J11111111', 'Empresa Minera', 'AVG', 384),
    ('J22222222', 'Productores de Bauxita', 'MGM', 362),
    -- ANZOATEGUI --
    ('J33333333', 'Empresa Eléctrica', 'IBM', 392),
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
    ('J90909090', 'Diamantes de la selva', 'DIAMOND VE', 687);

-------------------------------------    CARGO     -------------------------------------
INSERT INTO MU_CARGO (Nombre, Descripcion) VALUES
    ('Analista de Laboratorio', 'Analiza las muestras en el laboratorio'),
    ('Auxiliar de Campo', 'Apoyo extra en la actividad de campo'),
    ('Ayudante de Campaña', 'Apoyan el trabajo de explotación'),
    ('Chofer', 'Realiza traslados'),
    ('Consultor', 'Ofrece asesoría sobre los procesos de explotación'),
    ('Dibujante', 'Representa gráficamente algunos objetos'),
    ('Economista', 'Evalúa viabilidad y costos del proyecto'),
    ('Geólogo', 'Encargado de estudiar la tierra'),
    ('Ingeniero', 'Estudia el proyecto, el terreno y evalúa la viabilidad'),
    ('Muestrero', 'Obtiene las muestras para luego ser analizadas'),
    ('Obrero', 'Realiza la actividad de campo'),
    ('Perforista', 'Encargado de perforar durante la explotación'),
    ('Personal de Soporte', 'Ofrece ayuda extra en labor de campo'),
    ('Portamira', 'Encargado de medir desniveles'),
    ('Secretario', 'Manejan toda la información y organizan la explotación'),
    ('Técnico', 'Supervisa el estado de los equipos y la maquinaria'),
    ('Topógrafo', 'Realiza el levantamiento plano-milimétrico del terreno');

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
    ('Vehículo'),