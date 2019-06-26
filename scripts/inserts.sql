-------------------------------------    ESTATUS     -------------------------------------
INSERT INTO MU_ESTATUS (Nombre) VALUES 
    ('Activo'), ('Inactivo'), ('Ocupado'), ('En uso'), ('En explotación'), ('Explotado'), ('Procesada'), ('En proceso'),
    ('En reparación');

-------------------------------------    HORARIO     -------------------------------------
INSERT INTO MU_HORARIO (dia, hora_entrada, hora_salida) VALUES
    ('Lunes', '7:00', '12:00'), ('Lunes', '14:00', '18:00'),
    ('Martes', '7:00', '12:00'), ('Martes', '14:00', '18:00'),
    ('Miércoles', '7:00', '12:00'), ('Miércoles', '14:00', '18:00'),
    ('Jueves', '7:00', '12:00'), ('Jueves', '14:00', '18:00'),
    ('Viernes', '7:00', '12:00'), ('Viernes', '14:00', '18:00');

-------------------------------------    ROL     -------------------------------------
INSERT INTO MU_ROL (nombre) VALUES
    ('Administrador'), ('Vendedor'), ('R. H.'), ('Contador'), ('Relaciones públicas');

-------------------------------------    PRIVILEGIO     -------------------------------------
INSERT INTO MU_PRIVILEGIO (nombre, tipo) VALUES
    ('Explotaciones', 'C'), ('Explotaciones', 'R'), ('Explotaciones', 'U'), ('Explotaciones', 'D'),
    ('Minerales', 'C'), ('Minerales', 'R'), ('Minerales', 'U'), ('Minerales', 'D'),
    ('Ventas', 'C'), ('Ventas', 'R'), ('Ventas', 'U'), ('Ventas', 'D'),
    ('Empleados', 'C'), ('Empleados', 'R'), ('Empleados', 'U'), ('Empleados', 'D'),
    ('Clientes', 'C'), ('Clientes', 'R'), ('Clientes', 'U'), ('Clientes', 'D');

-------------------------------------    PRESENTACIÓN     -------------------------------------
INSERT INTO MU_PRESENTACION (Nombre) VALUES
    ('Líquido'),
    ('Fundido'),
    ('Lingote'),
    ('Cilindro'),
    ('Polvo'),
    ('Genérico');

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

-------------------------------------    TIPO MAQUINARIA     -------------------------------------
INSERT INTO MU_TIPO_MAQUINARIA (Nombre) VALUES 
    ('Excavadora'),
    ('Grúa'),
    ('Horno'),
    ('Plancha'),
    ('Planta de Fundición'),
    ('Tractor'),
    ('Vehículo');

-------------------------------------    TIPO YACIMIENTO     -------------------------------------
INSERT INTO MU_TIPO_YACIMIENTO (nombre, descripcion) VALUES
('Autóctono de origen terrestre', 'La acumulación de restos vegetales no difiere de las asociaciones florísticas del área continental inmediata.'),
('Autóctono de origen acuático', 'La acumulación se caracterizó por contener restos de plantas acuáticas y algas de agua dulce.'),
('Alóctono transportado por viento', 'Influye poco en la formación de mantos de carbón.'),
('Alóctono transportado por agua', 'Los restos vegetales suelen depositarse bajo el agua.'),
('Alóctono transportado por desborde', 'De pantanos.'),
('Alóctono transportado por deslizamiento', 'De terrenos.');

------------------------------   MINERALES METÁLICOS ------------------------------
INSERT INTO MU_MINERAL_METALICO (Nombre, Descripcion, Dureza) VALUES 
    ('Aluminio', 'Es un elemento químico, de símbolo Al y número atómico 13', 2.75),
    ('Bario', 'Elemento químico, Ba, con número atómico 56.', 1),
    ('Bauxita', 'Materia prima para obtener aluminio', 4),
    ('Calcio', 'Elemento químico de número atómico 20 y símbolo Ca', 3),
    ('Carbón', 'Compuesto por azufre, nitrógeno, hidrógeno, oxígeno y otros', 2),
    ('Cobre', 'Empleado en la fabricación de conductores eléctricos', 3),
    ('Cuarzo', 'Es un mineral compuesto de sílice (SiO2)', 7),
    ('Hierro', 'Símbolo Fe y número atómico 26', 4),
    ('Manganeso', 'Alto consumo en la industria siderúrgica', 5),
    ('Mercurio', 'Es un elemento químico con el símbolo Hg y número atómico 80.', 1),
    ('Níquel', 'Metal maleable, duro, dúctil y de propiedades ferromagnéticas', 5),
    ('Oro', 'Número atómico es el 79', 3),
    ('Oxígeno', 'Constituye la quinta parte del aire atmosférico terrestre', 8),
    ('Silicio', 'Es un elemento químico, cuyo número atómico es el 14 y su símbolo es Si', 6.5),
    ('Plata', 'Es un elemento químico de número atómico 47.', 3),
    ('Zinc', 'Es un elemento químico esencial de número atómico 30 y símbolo Zn.', 3);

------------------------------   MINERALES NO METÁLICOS ------------------------------
INSERT INTO MU_MINERAL_NO_METALICO (Nombre, Descripcion, Uso) VALUES
    ('Arcilla', 'Roca sedimentaria constituida por silicatos de aluminio hidratados', 'Fabricación de cerámica, ladrillo, porcelana y loza'),
    ('Arena', 'Compuesta fundamentalmente por sílice', 'En la fabricación de cristales y hormigón'),
    ('Azufre', 'Es un elemento químico de número atómico 16 y símbolo S (del latín sulphur)', 'Fabricación de baterías, pólvora, fertilizante y fungicida'),
    ('Baritina', 'Es un mineral del tipo de los sulfatos', 'Como pigmento, fabricación de resinas sintéticas'),
    ('Bentonita', 'Describe una arcilla compuesta de Montmorillonita', 'En las construcciones para las tierras, lubricantes y lodos'),
    ('Cal', 'Formada por calcio y oxígeno', 'En la construcción de viviendas'),
    ('Caliza', 'Formada básicamente por un compuesto de calcio', 'En la fabricación del cemento'),
    ('Carbón', null, 'Generación de electricidad, producción de acero, fabricación de cemento y producción de combustibles líquidos.'),
    ('Carbón Antracita', 'Variante del carbón mineral', 'Para la generación eléctrica, fundiciones y cementera'),
    ('Clarita', null, 'Explotación de carbón'),
    ('Diamante', 'Viene del griego antiguo αδάμας, que significa invencible o inalterable', 'En la industria joyera y en la perforación de lotes petroleros'),
    ('Durita', null, 'Explotación de carbón'),
    ('Fusita', null, 'Explotación de carbón'),
    ('Granito', 'Formado por calcio, feldespato y mica', 'En la construcción de viviendas y edificios públicos'),
    ('Mica', 'Se encuentra en la naturaleza con minerales como el cuarzo', 'Como aislante eléctrico y térmico'),
    ('Sal Común', 'Compuesta por sodio y cloro', 'Como condimento y para la conservación de alimentos'),
    ('Talco', 'De color blanco o azul', 'Fabricación de papel y en la industria cosmética'),
    ('Vitrita', null, 'Explotación de carbón'),
    ('Yeso', 'Composición química rica en calcio y azufre', 'Fabricación de cemento, dry-wall, moldes y tizas');

------------------------------   TIPOS DE PAGO ------------------------------
INSERT INTO MU_TIPO_PAGO_CHEQUE (banco, numero_cheque, numero_cuenta) VALUES
    ('BanCaribe', '123456', '234567'), ('Banco Activo', '345678', '456789'), ('Banco Caroní', '567891', '678912'),
    ('Banco de Venezuela', '789123', '891234'), ('Banco Exterior', '912345', '012345'), ('Banco Mercantil', '023456', '034567');

INSERT INTO MU_TIPO_PAGO_TARJETA_CREDITO (banco, numero_tarjeta, tipo) VALUES
    ('BOD', '0000001', 'Visa'), ('BBVA',  '0000002', 'Master Card'), ('Banesco', '000000008', 'Otro'),
    ('BanCaribe', '0000012', 'Visa'), ('Banco de Venezuela',  '0000022', 'Master Card'), ('Banco Exterior', '0000006454', 'Otro');

INSERT INTO MU_TIPO_PAGO_TARJETA_DEBITO (banco, numero_tarjeta) VALUES
    ('BOD', '12121212'), ('BNC', '23232323'), ('BBVA', '34343434'), ('BanCaribe', '45454545'),
    ('BOD', '56565656'), ('BNC', '67676767'), ('BBVA', '78787878'), ('BanCaribe', '89898989');

INSERT INTO MU_TIPO_PAGO_TRANSFERENCIA (banco, numero_referencia, numero_cuenta) VALUES
    ('BanCaribe', '987', '654321'), ('BanCaribe', '000888', '4567888'), ('Banco Activo', '111222333', '198765'),
    ('Banco Mercantil', '777', '555444888'), ('BanCaribe', '999', '888999111'), ('Banco Activo', '888', '333555111');

-------------------------------------    CLIENTE NATURAL     -------------------------------------
INSERT INTO MU_CLIENTE_NATURAL (CI, P_nombre, S_nombre, P_apellido, S_apellido, Fecha_nacimiento, Email, Telefono, fk_lugar) VALUES
    ('V26435741', 'Andrea', 'Valentina', 'Da Silva', 'Baudet', '01-25-1999', 'andreadasilvab@gmail.com', '04140110935', 984),
    ('V27164848', 'Diego', 'Alfonso', 'Gutiérrez', 'Duarte', '07-14-1999', 'diegoalfonsogutierrez@gmail.com', '04262857751', 440),
    ('V27086052', 'Alba', 'Sofía', 'Sánchez', 'Silvestre', '01-31-1999', 'albasofia.n.n@gmail.com', '04122765991', 445),
    ('V26530119', 'Miguel', 'Antonio', 'Peña', 'Fraga', '04-03-1998', 'mpfraga@gmail.com', '04242855585', 450),
    ('V27127854', 'Gabriel', 'Alejandro', 'Terán', 'Guerrero', '05-24-1999', 'gabrielgt12@hotmail.com', '04126102278', 452),
    ('V26904756', 'Gustavo', 'Ignacio', 'Sánchez', 'Rodríguez', '05-15-1998', 'gustavosr@gmail.com', '04241828934', 447),
    ('V78417530', 'Moise', 'Elinor', 'Leif', 'Scotchmoor', '1979-11-18', 'escotchmoor0@tmall.com', '6484166278', 1112),
    ('V21786518', 'Seana', 'Aymer', 'Vondracek', 'Teasdale', '2009-11-06', 'ateasdale1@census.gov', '5272281268', 1391),
    ('V20023978', 'Meris', 'Woodie', 'Heineken', 'Treadgall', '1994-06-06', 'wtreadgall2@is.gd', '6328962528', 1263),
    ('V19489646', 'Odey', 'Link', 'Brunotti', 'Crocetti', '1963-04-22', 'lcrocetti3@123-reg.co.uk', '8392614684', 373),
    ('V43081843', 'Imogen', 'Elston', 'Biggadike', 'Kreuzer', '1953-08-03', 'ekreuzer4@purevolume.com', '4107082948', 892),
    ('V14362149', 'Camilla', 'Zea', 'Polle', 'Ortes', '1945-06-16', 'zortes5@uiuc.edu', '7636654233', 405),
    ('V22805599', 'Bertina', 'Salvidor', 'Sanpher', 'O''Fearguise', '2016-02-09', 'sofearguise6@virginia.edu', '4921712259', 391),
    ('V80759141', 'Raynard', 'Matthieu', 'Rodolfi', 'Fife', '1969-03-12', 'mfife7@cnn.com', '3361574249', 941),
    ('V65715200', 'Jeffie', 'Golda', 'Knevett', 'McKernon', '1970-03-31', 'gmckernon8@hao123.com', '6022478698', 1368),
    ('V73043988', 'Haydon', 'Jacob', 'Grice', 'Baldocci', '1958-01-06', 'jbaldocci9@webmd.com', '2629296800', 692),
    ('V45560243', 'Greta', 'Tani', 'Knowlton', 'Eye', '1963-10-16', 'teyea@themeforest.net', '6073851955', 506),
    ('V30734924', 'Web', 'Blanche', 'Shenton', 'Mallabund', '1946-11-15', 'bmallabundb@blogtalkradio.com', '7785111521', 712),
    ('V72067573', 'Lenard', 'Merrel', 'McLay', 'Iredale', '1986-01-04', 'miredalec@foxnews.com', '5235585835', 918),
    ('V41803263', 'Minnaminnie', 'Willie', 'Atrill', 'Blackader', '2008-05-17', 'wblackaderd@icio.us', '7032636937', 1082),
    ('V23355886', 'Kit', 'Pip', 'Klaussen', 'McConway', '1971-11-02', 'pmcconwaye@netlog.com', '2185782194', 700),
    ('V67078002', 'Yardley', 'Donia', 'Redmore', 'Buscombe', '1984-09-13', 'dbuscombef@google.ca', '9073107675', 1014),
    ('V54333594', 'Mose', 'Farly', 'Ogborn', 'Stranaghan', '1942-03-13', 'fstranaghang@google.com.au', '9897108724', 410),
    ('V86634510', 'Rollins', 'Jessy', 'Lumby', 'Warlawe', '1960-07-13', 'jwarlaweh@vk.com', '7228432850', 1178),
    ('V29235007', 'Romona', 'Hollyanne', 'Greenhead', 'Counsell', '1956-03-15', 'hcounselli@nba.com', '5378263199', 812),
    ('V79200226', 'Pearl', 'Hermina', 'Roscher', 'Padbery', '2007-11-01', 'hpadberyj@samsung.com', '3556727883', 705),
    ('V13897911', 'Bernadene', 'Loralee', 'Toomey', 'Churly', '1943-04-08', 'lchurlyk@flavors.me', '5778345202', 418),
    ('V70043067', 'Olivette', 'Leonanie', 'Lesor', 'Westman', '1992-11-11', 'lwestmanl@sciencedirect.com', '6135274340', 970),
    ('V30086962', 'Jocko', 'Kermit', 'Ridout', 'Crippill', '1979-01-23', 'kcrippillm@github.io', '1023686731', 1256),
    ('V76420613', 'Lenard', 'Sharla', 'Abramovicz', 'Nevin', '1936-06-19', 'snevinn@1688.com', '5285586470', 1007),
    ('V49674903', 'Calv', 'Rona', 'Rockcliffe', 'Mower', '2016-12-26', 'rmowero@posterous.com', '4015591148', 368),
    ('E89554017', 'Irvin', 'Shalom', 'McRae', 'Facchini', '1963-12-29', 'sfacchinip@eventbrite.com', '2826539740', 1177),
    ('E61140813', 'Georgiana', 'Murdoch', 'Dicker', 'Duckett', '1937-10-19', 'mduckettq@disqus.com', '4201179764', 420),
    ('E98191725', 'Robina', 'Maudie', 'Addionisio', 'Fitkin', '1984-08-02', 'mfitkinr@soundcloud.com', '5796854726', 484),
    ('E68007969', 'Lester', 'Rufus', 'Wooles', 'Daintry', '1942-06-20', 'rdaintrys@mac.com', '6934201952', 1138),
    ('E28545383', 'Gisella', 'Ameline', 'Pringley', 'Tuerena', '1933-11-18', 'atuerenat@gnu.org', '5564701483', 1275),
    ('E47557246', 'Marna', 'Gaultiero', 'Wheble', 'Aitchison', '1963-10-26', 'gaitchisonu@jigsy.com', '7099772167', 1339),
    ('E49712702', 'Susy', 'Northrop', 'Aldwich', 'Giblett', '1955-08-03', 'ngiblettv@cyberchimps.com', '1196751805', 751),
    ('E83653661', 'Sherm', 'Roxi', 'Dillaway', 'Linebarger', '1984-03-14', 'rlinebargerw@miibeian.gov.cn', '3771223555', 1215),
    ('E77631011', 'Carlin', 'Merwin', 'Gricewood', 'Fierro', '2017-01-04', 'mfierrox@ted.com', '7465387445', 999),
    ('E44907272', 'Pauly', 'Angus', 'Jiggen', 'MacMeanma', '2012-04-23', 'amacmeanmay@mediafire.com', '2895338717', 1155),
    ('E68945386', 'Antons', 'Winne', 'Franzonello', 'Blazhevich', '1959-05-29', 'wblazhevichz@over-blog.com', '2683904770', 914),
    ('E13381063', 'Bibi', 'Deanna', 'Prandin', 'Fonzo', '1983-01-19', 'dfonzo10@mit.edu', '6001190079', 1314),
    ('E46390227', 'Agretha', 'Wade', 'Janney', 'Archard', '1980-02-19', 'warchard11@cornell.edu', '7289377652', 514),
    ('E47826598', 'Marin', 'Josie', 'Rushbrooke', 'Woolfitt', '1986-06-19', 'jwoolfitt12@miitbeian.gov.cn', '7392502461', 389),
    ('E68243532', 'Mil', 'Sebastian', 'Allbut', 'Mucci', '1946-06-06', 'smucci13@illinois.edu', '6909502698', 1398),
    ('E18685992', 'Nikolia', 'Ewart', 'Gornar', 'Barwood', '2000-01-26', 'ebarwood14@moonfruit.com', '5423861415', 817),
    ('E79382200', 'Saleem', 'Christan', 'Blader', 'Pape', '1981-12-04', 'cpape15@bravesites.com', '5876872960', 541),
    ('E92980848', 'Jamal', 'Ingra', 'Turtle', 'Normaville', '1964-05-07', 'inormaville16@g.co', '8068090869', 468),
    ('E93762595', 'Rosie', 'Arri', 'Livett', 'Starkings', '1962-09-17', 'astarkings17@issuu.com', '8588845738', 910),
    ('E36691908', 'Carolina', 'Biron', 'Baddoe', 'Flahy', '1949-08-01', 'bflahy18@whitehouse.gov', '7448372483', 1107),
    ('E45448932', 'Alastair', 'Petr', 'Le Blond', 'Standage', '1976-09-09', 'pstandage19@ftc.gov', '6749389233', 575),
    ('E78141617', 'Josh', 'Emmey', 'Paschke', 'Branca', '2010-07-17', 'ebranca1a@sphinn.com', '4377418264', 574),
    ('E32434701', 'Francklyn', 'Amanda', 'Brummell', 'Hannaby', '2005-07-27', 'ahannaby1b@foxnews.com', '9206341295', 898),
    ('E10481339', 'Ray', 'Jarid', 'Cristoforetti', 'Mc Carroll', '1943-12-13', 'jmccarroll1c@quantcast.com', '7765851977', 1132),
    ('E17869718', 'Fidelity', 'Chrystel', 'Scoyles', 'Teanby', '1963-08-24', 'cteanby1d@alexa.com', '8059233232', 1343);

-------------------------------------    CLIENTE JURÍDICO     -------------------------------------
INSERT INTO MU_CLIENTE_JURIDICO (Telefono, Email, RIF, Nombre, fk_lugar) VALUES 
    ('02123788072', 'ibm@ibm.com', 'J11111111', 'IBM', 560),
    ('02126725272', 'avg@avg.com', 'J22222222', 'AVG', 565),
    ('02126453638', 'sap@sap.com', 'J33333333', 'SAP', 568),
    ('02123473638', 'oracle@oracle.com', 'J44444444', 'Oracle', 570),
    ('02126909081', 'apple@apple.com', 'J55555555', 'Apple', 580),
    ('02126939528', 'microsoft@microsoft.com', 'J66666666', 'Microsoft', 585),
    ('6376619421', 'ogladding0@mapquest.com', 'J6919368', 'Kazio', 1280),
    ('9543182937', 'kyanov1@t.co', 'J3932018', 'Ntags', 821),
    ('3913350960', 'ejoberne2@ed.gov', 'J5878457', 'Linklinks', 790),
    ('4611375011', 'nannets3@boston.com', 'J4738275', 'Topdrive', 520),
    ('8848516811', 'sdemetz4@nytimes.com', 'J2269970', 'Dabshots', 1036),
    ('3634614939', 'rkobsch5@jalbum.net', 'J1790400', 'Wikibox', 1237),
    ('9472923118', 'rstaniforth6@github.com', 'J7074325', 'Vimbo', 817),
    ('8555756202', 'jphilippeaux7@walmart.com', 'J1251323', 'Meezzy', 1057),
    ('2787255837', 'jjesty8@t-online.de', 'J6400754', 'Chatterbridge', 1290),
    ('1592490334', 'rcheetam9@businessinsider.com', 'J6697805', 'Aibox', 771),
    ('6507927792', 'kgatenbya@rakuten.co.jp', 'J3365611', 'Wikizz', 543),
    ('6279003641', 'akikkeb@amazon.com', 'J9123278', 'Minyx', 514),
    ('1792252820', 'cerangyc@nbcnews.com', 'J9305852', 'Linktype', 573),
    ('2338629624', 'plackeyed@unicef.org', 'J6874073', 'LiveZ', 1428),
    ('2183196538', 'ctallowine@gmpg.org', 'J5142567', 'Mycat', 1035),
    ('1649634703', 'vbenianf@unesco.org', 'J5611064', 'Fadeo', 550),
    ('6785282996', 'eerbeg@arstechnica.com', 'J652591', 'Shuffledrive', 1034),
    ('3798717425', 'rcorrinh@histats.com', 'J7362096', 'Zoonder', 666),
    ('9937967541', 'itasselli@ucoz.ru', 'J7429035', 'Jaxspan', 1366),
    ('3101673109', 'fshilstonej@shareasale.com', 'J2537155', 'Jabbersphere', 1238),
    ('6465885620', 'dmcturloughk@mapquest.com', 'J6232633', 'Babblestorm', 826),
    ('6391167548', 'bcallawayl@storify.com', 'J6519242', 'Youtags', 735),
    ('4884362656', 'gvashchenkom@home.pl', 'J4085436', 'DabZ', 1420),
    ('1872550516', 'mmcalistern@pagesperso-orange.fr', 'J8261872', 'Rhyloo', 361),
    ('7037014755', 'peakleyo@storify.com', 'J7648729', 'Flashpoint', 1442),
    ('8721399783', 'cbilliardp@deviantart.com', 'J2044949', 'Bluezoom', 863),
    ('8826838658', 'hkniftonq@wikipedia.org', 'J9870826', 'Zoomdog', 1387),
    ('9367358278', 'jramiror@51.la', 'J5069305', 'Oyoba', 933),
    ('3153669581', 'ctilsleys@ocn.ne.jp', 'J8039264', 'Mydo', 1006),
    ('7946051716', 'mifflandt@simplemachines.org', 'J2250191', 'Geba', 635),
    ('4566016237', 'cleagasu@yale.edu', 'J3212062', 'Quinu', 1375),
    ('7985224700', 'kdaceyv@about.me', 'J639130', 'Flashpoint', 1413),
    ('2678633838', 'mwilloxw@tiny.cc', 'J5444167', 'Shufflebeat', 466),
    ('2205097445', 'ptonnerx@weather.com', 'J1829001', 'Realcube', 1469),
    ('2206651100', 'wbroadhursty@deviantart.com', 'J9622542', 'DabZ', 1129),
    ('9221546097', 'dorrumz@cargocollective.com', 'J349452', 'Mynte', 1240),
    ('6278094649', 'sankrett10@webnode.com', 'J7027857', 'Browsebug', 488),
    ('8666810287', 'uparlot11@mysql.com', 'J9622790', 'Browsecat', 829),
    ('8509518844', 'ldrepp12@icio.us', 'J949738', 'Wikibox', 498),
    ('1778481834', 'sspringtorpe13@fda.gov', 'J9802449', 'Voomm', 1469),
    ('9758065944', 'tcliffe14@dropbox.com', 'J9130383', 'Brightbean', 783),
    ('7891196320', 'raubray15@umn.edu', 'J4874455', 'Blognation', 386),
    ('6474610478', 'pheimann16@mediafire.com', 'J7987115', 'Teklist', 688),
    ('7989750777', 'cbewsey17@ebay.com', 'J6545962', 'Gevee', 387),
    ('1785192163', 'ekenewell18@google.ca', 'J6437679', 'Photobug', 582),
    ('2128060855', 'ecornock19@jimdo.com', 'J4210463', 'Topdrive', 864),
    ('3413043046', 'ymurison1a@google.de', 'J90838', 'Yombu', 1153),
    ('5364752969', 'rtolomei1b@mit.edu', 'J3950573', 'Skidoo', 1304),
    ('4686108371', 'lcrocumbe1c@home.pl', 'J887611', 'Yakidoo', 1176),
    ('8799959868', 'felleray1d@about.me', 'J1369620', 'Meevee', 1105);

-------------------------------------    PRESENTACIÓN MINERAL     -------------------------------------
INSERT INTO MU_PRESENTACION_MINERAL (Precio, fk_presentacion, fk_mineral_metalico, fk_mineral_no_metalico) VALUES
    (1234.70,   1,  1,  NULL),
    (654.67,    1,  7,  NULL),
    (540.80,    1,  10, NULL),
    (1000,      2,  10, NULL),
    (1500.00,   3,  10, NULL),
    (33027.68,  5,  8,  null),
    (41399.71,  1,  9,  null),
    (44927.09,  4,  9,  null),
    (68030.66,  2,  3,  null),
    (9423.2,    4,  1,  null),
    (50120.76,  4,  3,  null),
    (55567.47,  6,  9,  null),
    (83504.93,  1,  5,  null),
    (63509.47,  6,  12, null),
    (38808.42,  4,  10, null),
    (5565.59,   5,  7,  null),
    (69352.67,  2,  2,  null);
    (800,       5,  NULL,   6),
    (2000,      6,  NULL,   9),
    (2500,      3,  NULL,   9),
    (250.20,    6,  NULL,   2),
    (36496.74,  6,  null,   5),
    (25742.29,  3,  null,   7),
    (87037.84,  1,  null,   7),
    (44656.08,  3,  null,   13),
    (28250.9,   6,  null,   3),
    (89952.43,  5,  null,   8),,
    (80584.89,  5,  null,   12),
    (8915.7,    4,  null,   12),
    (31175.23,  1,  null,   10),

-------------------------------------    ROL_PRIVILEGIO     -------------------------------------
INSERT INTO MU_ROL_PRIVILEGIO(fk_rol, fk_privilegio) VALUES
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10),
    (1, 11), (1, 12), (1, 13), (1, 14), (1, 15), (1, 16), (1, 17), (1, 18), (1, 19),
    (1, 20), (2, 9), (2, 10), (2, 11), (2, 12), (3, 13), (3, 14), (3, 15), (3, 16),
    (3, 17), (3, 18), (3, 19), (3, 20), (4, 9), (5, 17), (5, 18), (5, 19), (5, 20);

-------------------------------------    MINERAL_MINERAL     -------------------------------------
INSERT INTO MU_MINERAL_MINERAL (porcentaje, fk_mineral_metalico_compuesto, fk_mineral_metalico_compone, fk_mineral_no_metalico_compuesto, fk_mineral_no_metalico_compone) VALUES
    (14.18, 6, 7, null, null), (46.65, 12, 7, null, null), (4.17, 10, 12, null, null),
    (86.13, 8, 1, null, null), (29.49, 4, 8, null, null), (31.18, 6, 5, null, null),
    (96.9, 10, 3, null, null), (83.74, 4, 2, null, null), (94.2, 4, 9, null, null),
    (50.49, 7, 5, null, null), (27.14, null, null, 3, 13), (34.97, null, null, 10, 2),
    (37.91, null, null, 4, 13), (87.66, null, null, 1, 11), (96.5, null, null, 3, 2),
    (85.37, null, null, 7, 6), (54.2, null, null, 12, 8), (6.75, null, null, 4, 8),
    (68.2, null, null, 9, 1), (61.83, null, null, 4, 11), (25, null, null, 8, 10),
    (25, null, null, 8, 12), (25, null, null, 8, 13), (25, null, null, 8, 18),;

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

------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------



























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