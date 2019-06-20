CREATE TABLE MU_MINERAL_METALICO (
	Clave SERIAL,
	Nombre VARCHAR(20) NOT NULL,
	Descripcion VARCHAR(70),
	Dureza DECIMAL NOT NULL,
	CONSTRAINT pk_clave_mineral_metalico PRIMARY KEY (Clave)
);

CREATE TABLE MU_MINERAL_NO_METALICO (
	Clave SERIAL,
	Nombre VARCHAR(20) NOT NULL,
	Descripcion VARCHAR(70),
	Uso VARCHAR(70) NOT NULL,
	CONSTRAINT pk_clave_mineral_no_metalico PRIMARY KEY (Clave)
);

------------------------------   MINERALES  ------------------------------

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

CREATE TABLE MU_MINERAL_MINERAL (
	Clave SERIAL,
	Porcentaje DECIMAL NOT NULL,
	fk_mineral_metalico_compuesto INTEGER,
	fk_mineral_metalico_compone INTEGER,
	fk_mineral_no_metalico_compuesto INTEGER,
	fk_mineral_no_metalico_compone INTEGER,
	CONSTRAINT pk_mineral_mineral PRIMARY KEY (Clave),
	CONSTRAINT fk_mineral_metalico_compuesto FOREIGN KEY (fk_mineral_metalico_compuesto) 
		REFERENCES MU_MINERAL_METALICO (Clave),
	CONSTRAINT fk_mineral_metalico_compone FOREIGN KEY (fk_mineral_metalico_compone) 
		REFERENCES MU_MINERAL_METALICO (Clave),
	CONSTRAINT fk_mineral_no_metalico_compuesto FOREIGN KEY (fk_mineral_no_metalico_compuesto) 
		REFERENCES MU_MINERAL_NO_METALICO (Clave),
	CONSTRAINT fk_mineral_no_metalico_compone FOREIGN KEY (fk_mineral_no_metalico_compone) 
		REFERENCES MU_MINERAL_NO_METALICO (Clave)
);

INSERT INTO MU_MINERAL_MINERAL (Porcentaje, fk_mineral_metalico_compuesto, fk_mineral_metalico_compone, 
    fk_mineral_no_metalico_compuesto, fk_mineral_no_metalico_compone) VALUES
    ()




    const botonesEliminar = document.getElementsByClassName('icondelete');
    if (botonesEliminar.length > 0){
        for (let i = 0; i < botonesEliminar.length; i++){
            if ((textoPlural === 'minerales metalicos' || textoPlural === 'minerales no metalicos') || 
                (textoPlural === 'minerales metalicos' || textoPlural === 'minerales no metalicos')) {

                if(textoPlural === 'minerales metalicos' && !botonesEliminar[i].className.baseVal.includes('mineralesnometalicos')){
                    botonesEliminar[i].classList.add(textoPlural.replace(/\s/g,''));
                }
                else if (textoPlural === 'minerales no metalicos' && !botonesEliminar[i].className.baseVal.includes('mineralesmetalicos')){
                    botonesEliminar[i].classList.add(textoPlural.replace(/\s/g,''));
                }
            }
            botonesEliminar[i].onclick = function() {
                if (this.props.textoPlural === 'minerales metalicos' || this.props.textoPlural === 'minerales no metalicos'){
                    this.props.modalEliminar(botonesEliminar[i])
                }
                else {
                    this.props.modalEliminar(botonesEliminar[i].id)
                }   
            }.bind(this)
        }
    }