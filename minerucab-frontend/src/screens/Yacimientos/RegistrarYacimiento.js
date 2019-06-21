import React from 'react';
// https://react-bootstrap.github.io/components/buttons/
import {history} from '../../routers/History';
import SetActividades from '../../components/SetActividades'
import OpcionesLocales from '../../components/OpcionesLocales'
import OpcionesGlobales from '../../components/OpcionesGlobales'
import DataTable from '../../components/DataTable';
import FormTitulo from '../../components/FormTitulo'
import FormLugar from '../../components/FormLugar'
import FormFecha from '../../components/FormFecha'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

export default class RegistrarYacimiento extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            prueba: true,
            key:"Etapa 1",
            yacimiento:{
                nombre:null,
                descripcion:null,
                area:null,
                fecha:null,
                tipo:null
            },
            ubicacion:{
                estado:null,
                municipio:null,
                parroquia:null
            },
            accordionKey:[],
            mineralShow:'none',
            
            Minerales:[{
                nombre:null,
                id:-1,
                total: 0,
                accordionKey:0,
                componentes:[{
                    nombre:null,
                    total:0
                }]
                
            }],
            
            etapas: [{
                nombre: "Etapa 1",
                descripcion: null,
                duracion:null,
                costo:null,
                numero: 1,
                key:"Fase 1",
                fases: [{
                    nombre: "Fase 1",
                    descripcion:null,
                    duracion:null,
                    costo:null,
                    cargoShow:'none',
                    tipoMaquinariaShow:'none',
                    numero:1,
                    cargos:[{
                        nombre:null,
                        id:-1,
                        sueldo:0,
                        cantidad:0,
                        accordionKey:0
                    }],
                    tipoMaquinaria:[{
                        nombre:null,
                        id:-1,
                        costo:0,
                        cantidad:0,
                        accordionKey:0
                    }]

                }]
            }]
        }

        this.handleOnClickAEtapa = this.handleOnClickAEtapa.bind(this);
    }

    prueba = (e) => {
        this.setState((prevState) => ({
            prueba: !this.state.prueba
        }));
    }

    onClickDashboardPage(){
        history.push('/dashboard');  
    }       

    onClickLoginPage(){
        history.push('/');  
    }  
    
    accordionf(e){
      //  console.log(this.state.accordionKey[e],e);
       // console.log(this.state.accordionKey[2], "holoooA");
        var k=this.state.accordionKey;
        if (k[e] === undefined){
           // console.log(this.state.accordionKey[e], "UND");
            if(e != 0){
             //   console.log( "10");
                for(var i=0; i<=(e-k.length);i++){
                    k.push(0);
                }
            }
            else{
             //   console.log( "20");
                k.push(0);
                
            }
            
            
        }
       
            // console.log(this.state.accordionKey[e], "holA");
            if(k[e] === 0){
                k[e]=1;
               // console.log( "1");
                this.setState((prevState) => ({
                    accordionKey: k
                }));
            }
            else{
                k[e]=0;
              //  console.log( "2");
                this.setState((prevState) => ({
                    accordionKey: k
                }));
            }
           // console.log(this.state.accordionKey, "ho",this.state.accordionKey[1]);
        
       /* if(this.state.accordionKey === 1){
            this.setState({accordionKey: 0});
        }
        else{
            this.setState({accordionKey: 1});
        }*/
    }


    accordionM(i){
       // console.log(this.state.Minerales[i].accordionKey,i);
     //   console.log(this.state.Minerales[i].accordionKey, "holoooA");
        var minerales=this.state.Minerales;
        var k=this.state.Minerales[i].accordionKey;
       
           // console.log(this.state.Minerales, "mineralesssss");
           // console.log(this.state.Minerales[i].accordionKey, "holA");
            if(k === 0){
                k=1;
              //  console.log( "1");
                minerales[i].accordionKey=k;
                this.setState(() => ({
                    Minerales: minerales
                }));
            }
            else{
                k=0;
             //   console.log( "2");
                minerales[i].accordionKey=k;
                this.setState(() => ({
                    Minerales: minerales
                }));
            }
            //console.log(this.state.Minerales[i].accordionKey, "ho",this.state.Minerales[i].accordionKey);
        
       /* if(this.state.accordionKey === 1){
            this.setState({accordionKey: 0});
        }
        else{
            this.setState({accordionKey: 1});
        }*/
    }

    accordionC(i,etapaNum,faseNum){
       // console.log(this.state.Cargos[i].accordionKey,i);
       // console.log(this.state.Cargos[i].accordionKey, "holoooA");
        var etapas1 = this.state.etapas;
        var cargos=etapas1[etapaNum-1].fases[faseNum-1].cargos;
        var k=cargos[i].accordionKey;
       
           // console.log(this.state.Cargos, "mineralesssss");
            //console.log(this.state.Cargos[i].accordionKey, "holA");
            if(k === 0){
                k=1;
                //console.log( "1");
                cargos[i].accordionKey=k;
                this.setState(() => ({
                    etapas: etapas1
                }));
            }
            else{
                k=0;
                //console.log( "2");
                cargos[i].accordionKey=k;
                this.setState(() => ({
                    etapas: etapas1
                }));
            }
          //  console.log(this.state.Cargos[i].accordionKey, "ho",this.state.Cargos[i].accordionKey);
        
       /* if(this.state.accordionKey === 1){
            this.setState({accordionKey: 0});
        }
        else{
            this.setState({accordionKey: 1});
        }*/
    }


    accordionTM(i,etapaNum,faseNum){
      ///  console.log(this.state.TipoMaquinaria[i].accordionKey,i);
       // console.log(this.state.TipoMaquinaria[i].accordionKey, "holoooA");
        
        var etapas1 = this.state.etapas;
        var tiposMaquinaria=etapas1[etapaNum-1].fases[faseNum-1].tipoMaquinaria;
        var k=tiposMaquinaria[i].accordionKey;
       
           // console.log(this.state.TipoMaquinaria, "mineralesssss");
           // console.log(this.state.TipoMaquinaria[i].accordionKey, "holA");
            if(k === 0){
                k=1;
               // console.log( "1");
                tiposMaquinaria[i].accordionKey=k;
                this.setState(() => ({
                    etapas: etapas1
                }));
            }
            else{
                k=0;
              //  console.log( "2");
                tiposMaquinaria[i].accordionKey=k;
                this.setState(() => ({
                    etapas: etapas1
                }));
            }
            //console.log(this.state.TipoMaquinaria[i].accordionKey, "ho",this.state.TipoMaquinaria[i].accordionKey);
        
       /* if(this.state.accordionKey === 1){
            this.setState({accordionKey: 0});
        }
        else{
            this.setState({accordionKey: 1});
        }*/
    }


    onSelectFase(etapa_num, Key){
        var etapa1= this.state.etapas.findIndex(x => x.numero === etapa_num );
        var Etapa= this.state.etapas[etapa1];
        Etapa.key= key;
    }
    handleOnClickAEtapa(){
        var etapa= this.state.etapas;
        var Etapa={
                nombre:'',
                descripcion: null,
                duracion:null,
                costo:null,
                numero: 1,
                key:"Fase 1",
                fases: [{
                    nombre: "Fase 1",
                    descripcion:null,
                    duracion:null,
                    costo:null,
                    cargoShow:'none',
                    tipoMaquinariaShow:'none',
                    numero:1,
                    cargos:[{
                        nombre:null,
                        id:-1,
                        sueldo:0,
                        cantidad:0,
                        accordionKey:0
                    }],
                    tipoMaquinaria:[{
                        nombre:null,
                        id:-1,
                        costo:0,
                        cantidad:0,
                        accordionKey:0
                    }]

                }]
            }
        Etapa.numero=etapa[etapa.length-1].numero+1;
        console.log(Etapa);
        Etapa.nombre= 'Etapa '+ Etapa.numero;    
        this.setState((prevState) => ({
            etapas: prevState.etapas.concat(Etapa)
        }));
    }

    

    handleOnClickAFase(etapa_num){
        var etapa1= this.state.etapas.findIndex(x => x.numero === etapa_num );
        var Etapa= this.state.etapas[etapa1];
        var fase1= this.state.etapas[etapa1].fases;
        var Fase={
                nombre: '',
                descripcion:null,
                duracion:null,
                costo:null,
                cargoShow:'none',
                tipoMaquinariaShow:'none',
                numero:1,
                cargos:[{
                    nombre:null,
                    id:-1,
                    sueldo:0,
                    cantidad:0,
                    accordionKey:0
                }],
                tipoMaquinaria:[{
                    nombre:null,
                    id:-1,
                    costo:0,
                    cantidad:0,
                    accordionKey:0
                }]
            }
        
        Fase.numero=fase1[fase1.length-1].numero+1; 
        Fase.nombre= 'Fase '+ Fase.numero;  
        console.log(Fase);
        console.log(Etapa);
        this.setState((prevState) => ({
            etapas: prevState.etapas.map(
                obj => (obj.numero === etapa_num ? Object.assign(obj,{fases: fase1.concat(Fase)}): obj )
            )     
        }));
        console.log(this.state.etapas);
    };


    handleOnClickEFase(etapaNum,faseNum){
        var etapas1 =this.state.etapas;
        var etapa = this.state.etapas[etapaNum-1];
        var eliminado = false;
        etapa.fases.splice(faseNum-1,1);
        for(var i = faseNum-1; i < etapa.fases.length; i++) {
            
            if((etapa.fases[i]!=undefined)){
                etapa.fases[i].numero--;
                etapa.fases[i].nombre='Fase '+etapa.fases[i].numero;
            }
        }

        etapas1[etapaNum-1]=etapa;
        this.setState(() => ({
            etapas: etapas1
        }));

    }

    handleOnClickEEtapa(etapaNum){

        var etapas1 =this.state.etapas;
        console.log(etapas1, etapaNum-1);
        console.log(etapas1[etapaNum-1]);
        for(var i =0; i< etapas1[etapaNum-1].fases.length; i++){

            this.handleOnClickEFase(etapaNum,etapas1[etapaNum-1].fases[i].numero);
        }
        etapas1.splice(etapaNum-1,1);

        for(var i = etapaNum-1; i < etapas1.length; i++) {
            
            if((etapas1[i]!=undefined)){
                etapas1[i].numero--;
                etapas1[i].nombre='Etapa '+etapas1[i].numero;
            }
        }

        this.setState(() => ({
            etapas: etapas1
        }));

    }


    selectMinerales = (id,et,fa) => {  // EL VALOR DE id EN BASES DE DATOS ====> IGUAL HAY QUE VALIDAR MIL VECES ESO
        console.log('entroMinerales', id)

      


        let  minerales=this.state.Minerales;
        var eliminado= false;
        var mineralS='inline';
        var componetesNombres=['Clarita','Durita','Virita','Fusita'];
        if(this.state.Minerales[0].id === -1){
            this.state.Minerales.shift();

        }






        for(var i = 0; i < this.state.Minerales.length; i++) {
            //console.log(minerales[i].id,"id");
            if(minerales[i].id === id){
                minerales.splice(i,1);
                eliminado=true;
            }
        }
        if(!eliminado){
            let mineral={
                nombre:'',
                id:'',
                total: 0,
                accordionKey:0,
                componentes:[]
            }
            

            mineral.nombre='Mineral'+id;
            mineral.id=id;
            for(var k=0; k<componetesNombres.length; k++){
                let componente={
                    nombre:'',
                    total:0
                }
                componente.nombre='Componente '+id+' '+componetesNombres[k];
                mineral.componentes.push(componente);
               // console.log(k,"k",componetesNombres[k]);
            }
            minerales.push(mineral);
        }
        if(minerales.length===0){
            mineralS='none';
            let mineral={
                nombre:null,
                id:-1,
                total: 0,
                accordionKey:0,
                componentes:[{
                    nombre:null,
                    total:0
                }]    
            };
            minerales.push(mineral);
        }

        this.setState(() => ({
            mineralShow: mineralS,
            Minerales: minerales
        }));
        console.log(minerales);
       // console.log(minerales[0].componentes[1]);
    };






    selectCargos = (id,etapaNum,faseNum) => {  // EL VALOR DE id EN BASES DE DATOS ====> IGUAL HAY QUE VALIDAR MIL VECES ESO
        console.log('entroCargos', id,etapaNum,faseNum);
        var etapas1 = this.state.etapas;
        let cargos=this.state.etapas[etapaNum-1].fases[faseNum-1].cargos;
        var eliminado= false;
        var cargoS='inline';
        if(cargos[0].id === -1){
            cargos.shift();

        }
        for(var i = 0; i < this.state.etapas[etapaNum-1].fases[faseNum-1].cargos.length; i++) {
           // console.log(cargos[i].id,"id");
            if(cargos[i].id === id){
                cargos.splice(i,1);
                eliminado=true;
            }
        }
        if(!eliminado){
            let cargo={
                nombre:null,
                id:-1,
                sueldo:0,
                cantidad:0,
                accordionKey:0
            }
            

            cargo.nombre='Cargo'+id;
            cargo.id=id;
            cargos.push(cargo);
        }
        if(cargos.length===0){
            cargoS='none';
            let cargo={
                nombre:null,
                id:-1,
                sueldo:0,
                cantidad:0,
                accordionKey:0
            };
            cargos.push(cargo);
        }
        etapas1[etapaNum-1].fases[faseNum-1].cargoShow=cargoS;
        this.setState(() => ({
            etapas:etapas1
        }));
        console.log(cargos);
        
    };



    selectTipoMaquinaria = (id,etapaNum,faseNum) => {  // EL VALOR DE id EN BASES DE DATOS ====> IGUAL HAY QUE VALIDAR MIL VECES ESO
        console.log('entroTipoMaquinaria', id)
        var etapas1 = this.state.etapas;
        let tiposMaquinaria=this.state.etapas[etapaNum-1].fases[faseNum-1].tipoMaquinaria;
        var eliminado= false;
        var tipoMaquinariaS='inline';

        if(tiposMaquinaria[0].id === -1){
            tiposMaquinaria.shift();

        }
        for(var i = 0; i < this.state.etapas[etapaNum-1].fases[faseNum-1].tipoMaquinaria.length; i++) {
           // console.log(tiposMaquinaria[i].id,"id");
            if(tiposMaquinaria[i].id === id){
                if(tiposMaquinaria[i+1] != undefined){
                    tiposMaquinaria[i+1].accordionKey=1;
                }
                tiposMaquinaria.splice(i,1);
                eliminado=true;
            }
        }
        if(!eliminado){


            let tipoMaquinaria={
                nombre:null,
                id:-1,
                costo:0,
                cantidad:0,
                accordionKey:0
            };
            
            tipoMaquinaria.nombre='Tipo de Maquinaria '+id;
            tipoMaquinaria.id=id;
            tiposMaquinaria.push(tipoMaquinaria);
        }
        if(tiposMaquinaria.length===0){
            tipoMaquinariaS='none';
            let tipoMaquinaria={
               nombre:null,
                id:-1,
                costo:0,
                cantidad:0,
                accordionKey:0
            };
            tiposMaquinaria.push(tipoMaquinaria);
        }

        etapas1[etapaNum-1].fases[faseNum-1].tipoMaquinariaShow=tipoMaquinariaS;

        this.setState(() => ({
            etapas: etapas1
            
        }));
       console.log(tiposMaquinaria);
        
    };



    selectFunctionCheckbox = (boton) => {
        // console.log('selectFunctionCheckbox', boton.alt)
        // console.log('selectFunctionCheckbox', boton)
        if (boton.includes('cargos')){
            console.log('entro cargos')
        }
        else if (boton.includes('minerales')){
            console.log('minerales')
        }
        else if (boton.includes('tiposdemaquinaria')){
            console.log('tipos de maquinarias')          
        }
    }



    render(){
        
       
        return ( 
            <div className="contain pagecontent" id="Content">
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario="Diego Gutiérrez"/>
  
                <Container className="FormContainer">
                   

                    <FormTitulo titulo="Registrar Yacimiento" tamaño="BIG"/>
                     
                    <Accordion defaultActiveKey={1} >
                        <Card className="CardAcc">
                            <Accordion.Toggle as={Card.Header} eventKey={this.state.accordionKey[0]} onClick={() => this.accordionf(0)} className="accordion borderacc">
                              
                                <FormTitulo titulo="Información General"/>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={1} >
                                <Card.Body className="BodyAcc">
                                    <Form.Row className="formMargins">
                                        <Form.Group as={Col} md="6" controlId="formBasicEmail" className="inputsPaddingRight">
                                            <Form.Label className="cliente-description-fields-text">Nombre</Form.Label>
                                            <Form.Control type="text" className="form-input" placeholder="Introduzca nombre del yacimiento" />
                                            <Form.Text className="text-muted">
                                                Obligatorio
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="exampleForm.ControlTextarea1" className="inputsPaddingLeft">
                                            <Form.Label className="cliente-description-fields-text">Descripción</Form.Label>
                                            <Form.Control as="textarea" rows="1" className="form-input-juridico-textarea" placeholder="Introduzca una descripción"/>
                                            <Form.Text className="text-muted">
                                                Obligatorio
                                            </Form.Text>
                                        </Form.Group>   
                                    </Form.Row>
                                          
                                    
                                    <Form.Row className="formMargins">
                                        <Form.Group as={Col} md="6" controlId="formBasicEmail"  className="inputsPaddingRight">
                                            <Form.Label className="cliente-description-fields-text">Área</Form.Label>
                                            <InputGroup className="MyInputGroup">
                                                <Form.Control type="text" className="form-input" placeholder="Introduzca tamaño del yacimiento" /> 
                                                <InputGroup.Append>
                                                    <InputGroup.Text  className="input-append-ventas-form" >Km<sup>2</sup></InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <Form.Text className="text-muted">
                                                Obligatorio
                                            </Form.Text>    
                                        </Form.Group>
                                        <FormFecha titulo="Fecha de Registro" clase="inputsPaddingLeft"/>    
                                    </Form.Row>

                                    <Form.Row className="formMargins">
                                        <Form.Group as={Col} md="6" controlId="formBasicEmail"  className="inputsPaddingRight">
                                            <Form.Label className="cliente-description-fields-text">Tipo de Yacimiento</Form.Label>
                                            <Form.Control 
                                            as="select" 
                                            className="form-input"
                                            >
                                                <option>Alóctono</option>
                                                <option>Autóctono</option>
                                            </Form.Control>
                                            <Form.Text className="text-muted">
                                                Obligatorio
                                            </Form.Text>    
                                        </Form.Group>
                                    </Form.Row>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    <Accordion defaultActiveKey={1} >
                        <Card className="CardAcc">
                            <Accordion.Toggle as={Card.Header} eventKey={this.state.accordionKey[1]} onClick={() => this.accordionf(1)} className="accordion borderacc">
                                <FormTitulo titulo="Ubicación"/>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={1} >
                                <Card.Body className="BodyAcc">
                                    <FormLugar/>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    <Accordion defaultActiveKey={1} >
                        <Card className="CardAcc">
                            <Accordion.Toggle as={Card.Header} eventKey={this.state.accordionKey[2]} onClick={() => this.accordionf(2)} className="accordion borderacc">
                                <FormTitulo titulo="Minerales"/>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={1} >
                                <Card.Body className="BodyAcc">
                    
                                    <Row>
                                        <Col sm={0} md={1}></Col>
                                        <Col sm={12} md={10}>
                                            <DataTable
                                                selectCheck={this.selectFunctionCheckbox}
                                                agregar={false}
                                                modificar={false}
                                                consultar={false}
                                                eliminar={false}
                                                columns={'http://localhost:3000/column_names/test_table'} 
                                                data={'http://localhost:3000/users'}
                                                url={'consultar_empleado/:'}
                                                checktable={true}
                                                textoSingular={'mineral'}
                                                textoPlural={'minerales'}
                                                etapa={0}
                                                fase={0}
                                            />
                                        </Col>
                                        <Col sm={0} md={1}></Col>
                                    </Row>
                                    <Container>
                                        {this.state.Minerales.map((mineral,index)=>{             
                                            return(
                                                <div style={{display: this.state.mineralShow}}>
                                                    <Accordion defaultActiveKey={1} >
                                                        <Card className="CardAcc">
                                                            <Accordion.Toggle as={Card.Header} eventKey={mineral.accordionKey} onClick={() => this.accordionM(index)} className="accordion borderacc">
                                                                <FormTitulo titulo={mineral.nombre}/>
                                                            </Accordion.Toggle>
                                                            <Accordion.Collapse eventKey={1} >
                                                                <Card.Body className="BodyAcc">
                                                                    <Form.Row className="formMargins">
                                                                    {mineral.componentes.map((componente,index)=>{
                                                                            
                                                                        return(
                                                                            
                                                                                <Form.Group as={Col} md="3" controlId="formBasicEmail"  className="inputsPaddingRight">
                                                                                    <Form.Label className="cliente-description-fields-text">{componente.nombre}</Form.Label>
                                                                                    <InputGroup className="MyInputGroup">
                                                                                        <Form.Control type="text" className="form-input" placeholder="Introduzca cantidad" /> 
                                                                                        <InputGroup.Append>
                                                                                            <InputGroup.Text  className="input-append-ventas-form" >Kg</InputGroup.Text>
                                                                                        </InputGroup.Append>
                                                                                    </InputGroup>
                                                                                    <Form.Text className="text-muted">
                                                                                        Obligatorio
                                                                                    </Form.Text>    
                                                                                </Form.Group>
                                                                            
                                                                        );
                                                                    })}
                                                                    </Form.Row>
                                                                    <Form.Row className="formMargins">
                                                                        <Form.Group as={Col} md="12" controlId="formBasicEmail"  className="inputsPaddingRight">
                                                                            <Form.Label className="cliente-description-fields-text">Total</Form.Label>
                                                                            <InputGroup className="MyInputGroup">
                                                                                <Form.Control type="text" className="form-input" placeholder="Introduzca cantidad" /> 
                                                                                <InputGroup.Append>
                                                                                    <InputGroup.Text  className="input-append-ventas-form" >Kg</InputGroup.Text>
                                                                                </InputGroup.Append>
                                                                            </InputGroup>
                                                                            <Form.Text className="text-muted">
                                                                                Obligatorio
                                                                            </Form.Text>    
                                                                        </Form.Group>
                                                                    </Form.Row>
                                                                </Card.Body>
                                                            </Accordion.Collapse>
                                                        </Card>
                                                    </Accordion>
                                                </div>
                                            );
                                        })}
                                    </Container>
                                </Card.Body>
                            </Accordion.Collapse>


                        </Card>
                    </Accordion>
                    <Accordion defaultActiveKey={1} >
                        <Card className="CardAcc">
                            <Accordion.Toggle as={Card.Header} eventKey={this.state.accordionKey[3]} onClick={() => this.accordionf(3)} className="accordion borderacc">
                                <FormTitulo titulo="Información de explotación" />
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={1} >
                                <Card.Body className="BodyAcc">
                                    
                                    <Form.Row className="formMargins">
                                        <Form.Group as={Col} md="6" controlId="formBasicEmail" className="inputsPaddingRight">
                                            <Form.Label className="cliente-description-fields-text">Duración de la Explotación</Form.Label>
                                            <InputGroup className="MyInputGroup">
                                                <Form.Control type="text" className="form-input" disabled={true}/> 
                                                <InputGroup.Append>
                                                    <InputGroup.Text  className="input-append-ventas-form" >días</InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <Form.Text className="text-muted">
                                                Calculado
                                            </Form.Text> 
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="exampleForm.ControlTextarea1" className="inputsPaddingLeft">
                                            <Form.Label className="cliente-description-fields-text">Costo Total de la Explotación</Form.Label>
                                            <InputGroup className="MyInputGroup">
                                                <Form.Control type="text" className="form-input" disabled={true}  /> 
                                                    <InputGroup.Append>
                                                        <InputGroup.Text  className="input-append-ventas-form">$</InputGroup.Text>
                                                    </InputGroup.Append>
                                            </InputGroup>
                                            <Form.Text className="text-muted">
                                                Calculado
                                            </Form.Text> 
                                        </Form.Group>  
                                    </Form.Row>
                                    <FormTitulo titulo="Etapas"/>
                                    <Button variant="outline-primary" className="btn-agregar" onClick={this.handleOnClickAEtapa}>Agregar Etapa</Button>
                                    <Tabs
                                        id="controlled-tab-example"
                                        defaultActiveKey={this.state.key}
                                        
                                    >
                                        {this.state.etapas.map((etapa,index)=>{
                                            return(

                                                <Tab eventKey={etapa.nombre} title={etapa.nombre}>
                                                    <Button variant="outline-danger" className="btn-eliminar" onClick={() => this.handleOnClickEEtapa(etapa.numero)} disabled={(this.state.etapas.length == 1)? true: false}>Eliminar</Button>
                                                    <Container>
                                                   
                                                        <FormTitulo titulo={"Información General de la Etapa "+etapa.numero}/>
                                                        <Form.Row className="formMargins">
                                                            <Form.Group as={Col} md="6" controlId="formBasicEmail" className="inputsPaddingRight">
                                                                <Form.Label className="cliente-description-fields-text">Nombre</Form.Label>
                                                                <Form.Control type="text" className="form-input" placeholder="Introduzca nombre de la etapa" />
                                                                <Form.Text className="text-muted">
                                                                    Obligatorio
                                                                </Form.Text>
                                                            </Form.Group>
                                                            <Form.Group as={Col} md="6" controlId="exampleForm.ControlTextarea1" className="inputsPaddingLeft">
                                                                <Form.Label className="cliente-description-fields-text">Descripción</Form.Label>
                                                                <Form.Control as="textarea" rows="1" className="form-input-juridico-textarea" placeholder="Introduzca una descripción"/>
                                                                <Form.Text className="text-muted">
                                                                    Obligatorio
                                                                </Form.Text>
                                                            </Form.Group>  
                                                        </Form.Row>
                                                        <Form.Row className="formMargins">
                                                            <Form.Group as={Col} md="6" controlId="formBasicEmail" className="inputsPaddingRight">
                                                                <Form.Label className="cliente-description-fields-text">Duración de la Etapa</Form.Label>
                                                                <InputGroup className="MyInputGroup">
                                                                    <Form.Control type="text" className="form-input" disabled={true}/> 
                                                                    <InputGroup.Append>
                                                                        <InputGroup.Text  className="input-append-ventas-form" >días</InputGroup.Text>
                                                                    </InputGroup.Append>
                                                                </InputGroup>
                                                                <Form.Text className="text-muted">
                                                                    Calculado
                                                                </Form.Text> 
                                                            </Form.Group>
                                                            <Form.Group as={Col} md="6" controlId="exampleForm.ControlTextarea1" className="inputsPaddingLeft">
                                                                 <Form.Label className="cliente-description-fields-text">Costo Total de la Etapa</Form.Label>
                                                                <InputGroup className="MyInputGroup">
                                                                    <Form.Control type="text" className="form-input" disabled={true}  /> 
                                                                    <InputGroup.Append>
                                                                        <InputGroup.Text  className="input-append-ventas-form">$</InputGroup.Text>
                                                                    </InputGroup.Append>
                                                                </InputGroup>
                                                                <Form.Text className="text-muted">
                                                                    Calculado
                                                                </Form.Text> 
                                                            </Form.Group>  
                                                        </Form.Row>
                                                        <FormTitulo titulo="Fases"/>
                                                        <Button variant="outline-primary" className="btn-agregar" onClick={() => this.handleOnClickAFase(etapa.numero)}>Agregar Fase</Button>
                                                        <Tabs
                                                            id="controlled-tab-example"
                                                            defaultActiveKey={this.state.etapas[etapa.numero-1].key}
                                                            onClick={this.prueba}
                                                        >
                                                            {this.state.etapas[etapa.numero-1].fases.map((fase,index)=>{
                                                                        
                                                                return(    
                                                                    <Tab eventKey={fase.nombre} title={fase.nombre}>
                                                                        <Button variant="outline-danger" onClick={() => this.handleOnClickEFase(etapa.numero,fase.numero)} className="btn-eliminar" disabled={(this.state.etapas[etapa.numero-1].fases.length == 1)? true: false}>Eliminar</Button>
                                                                        <Container>
                                                                            <FormTitulo titulo={"Información General de la Fase "+fase.numero}/>
                                                                            <Form.Row className="formMargins">
                                                                                <Form.Group as={Col} md="6" controlId="formBasicEmail" className="inputsPaddingRight">
                                                                                    <Form.Label className="cliente-description-fields-text">Nombre</Form.Label>
                                                                                    <Form.Control type="text" className="form-input" placeholder="Introduzca nombre de la fase" />
                                                                                    <Form.Text className="text-muted">
                                                                                        Obligatorio
                                                                                    </Form.Text>
                                                                                </Form.Group>
                                                                                <Form.Group as={Col} md="6" controlId="exampleForm.ControlTextarea1" className="inputsPaddingLeft">
                                                                                    <Form.Label className="cliente-description-fields-text">Descripción</Form.Label>
                                                                                    <Form.Control as="textarea" rows="1" className="form-input-juridico-textarea" placeholder="Introduzca una descripción"/>
                                                                                    <Form.Text className="text-muted">
                                                                                        Obligatorio
                                                                                    </Form.Text>
                                                                                </Form.Group>  
                                                                            </Form.Row>
                                                                            <Form.Row className="formMargins">
                                                                                <Form.Group as={Col} md="6" controlId="formBasicEmail" className="inputsPaddingRight">
                                                                                    <Form.Label className="cliente-description-fields-text">Duración de la Fase</Form.Label>
                                                                                    <InputGroup className="MyInputGroup">
                                                                                        <Form.Control type="text" className="form-input"/> 
                                                                                        <InputGroup.Append>
                                                                                            <InputGroup.Text  className="input-append-ventas-form" placeholder="Introduzca la duración de la fase" >días</InputGroup.Text>
                                                                                        </InputGroup.Append>
                                                                                    </InputGroup>
                                                                                    <Form.Text className="text-muted">
                                                                                        Obligatorio
                                                                                    </Form.Text> 
                                                                                </Form.Group>
                                                                                <Form.Group as={Col} md="6" controlId="exampleForm.ControlTextarea1" className="inputsPaddingLeft">
                                                                                     <Form.Label className="cliente-description-fields-text">Costo Total de la Fase</Form.Label>
                                                                                    <InputGroup className="MyInputGroup">
                                                                                        <Form.Control type="text" className="form-input"  /> 
                                                                                        <InputGroup.Append>
                                                                                            <InputGroup.Text  className="input-append-ventas-form">$</InputGroup.Text>
                                                                                        </InputGroup.Append>
                                                                                    </InputGroup>
                                                                                    <Form.Text className="text-muted">
                                                                                        Calculado
                                                                                    </Form.Text> 
                                                                                </Form.Group>  
                                                                            </Form.Row>
                                                                            <FormTitulo titulo="Cargos"/>
                                                                            <Row>
                                                                                    <Col sm={0} md={1}></Col>
                                                                                    <Col sm={12} md={10}>
                                                                                        <DataTable
                                                                                            selectCheck={this.selectFunctionCheckbox}
                                                                                            agregar={false}
                                                                                            modificar={false}
                                                                                            consultar={false}
                                                                                            eliminar={false}
                                                                                            columns={'http://localhost:3000/column_names/test_table'} 
                                                                                            data={'http://localhost:3000/users'}
                                                                                            url={'consultar_empleado/:'}
                                                                                            checktable={true}
                                                                                            textoSingular={'cargo'}
                                                                                            textoPlural={'cargos'}
                                                                                            etapa={etapa.numero}
                                                                                            fase={fase.numero}
                                                                                        />
                                                                                    </Col>
                                                                                    <Col sm={0} md={1}></Col>
                                                                            </Row>
                                                                            <Container>
                                                                            {fase.cargos.map((cargo,index)=>{             
                                                                                return(
                                                                                    <div style={{display: fase.cargoShow}}>
                                                                                        <Accordion defaultActiveKey={1} >
                                                                                            <Card className="CardAcc">
                                                                                                <Accordion.Toggle as={Card.Header} eventKey={cargo.accordionKey} onClick={() => this.accordionC(index,etapa.numero,fase.numero)} className="accordion borderacc">
                                                                                                    <FormTitulo titulo={cargo.nombre}/>
                                                                                                </Accordion.Toggle>
                                                                                                <Accordion.Collapse eventKey={1} >
                                                                                                    <Card.Body className="BodyAcc">

                                                                                                        <Form.Row className="formMargins">
                                                                                                            <Form.Group as={Col} md="6" controlId="formBasicEmail" className="inputsPaddingRight">
                                                                                                                <Form.Label className="cliente-description-fields-text">Cantidad de empleados</Form.Label>
                                                                                                                <Form.Control type="text" className="form-input" placeholder="Introduzca cantidad de empleados" />
                                                                                                                <Form.Text className="text-muted">
                                                                                                                    Obligatorio
                                                                                                                </Form.Text>
                                                                                                            </Form.Group>
                                                                                                            <Form.Group as={Col} md="6" controlId="exampleForm.ControlTextarea1" className="inputsPaddingLeft">
                                                                                                                 <Form.Label className="cliente-description-fields-text">Sueldo</Form.Label>
                                                                                                                <InputGroup className="MyInputGroup">
                                                                                                                    <Form.Control type="text" className="form-input"  placeholder="Introduzca sueldo por empleado" /> 
                                                                                                                    <InputGroup.Append>
                                                                                                                        <InputGroup.Text  className="input-append-ventas-form">$</InputGroup.Text>
                                                                                                                    </InputGroup.Append>
                                                                                                                </InputGroup>
                                                                                                                <Form.Text className="text-muted">
                                                                                                                    Obligatorio
                                                                                                                </Form.Text> 
                                                                                                            </Form.Group>
                                                                                                        </Form.Row>

                                                                                                    </Card.Body>
                                                                                                </Accordion.Collapse>
                                                                                            </Card>
                                                                                        </Accordion>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                            </Container>
                                                                            <FormTitulo titulo="Tipo de Maquinarias"/>
                                                                            <Row>
                                                                                    <Col sm={0} md={1}></Col>
                                                                                    <Col sm={12} md={10}>
                                                                                        <DataTable
                                                                                            selectCheck={this.selectFunctionCheckbox}
                                                                                            agregar={false}
                                                                                            modificar={false}
                                                                                            consultar={false}
                                                                                            eliminar={false}
                                                                                            columns={'http://localhost:3000/column_names/test_table'} 
                                                                                            data={'http://localhost:3000/users'}
                                                                                            url={'consultar_empleado/:'}
                                                                                            checktable={true}
                                                                                            textoSingular={'tipo de maquinaria'}
                                                                                            textoPlural={'tipos de maquinaria'}
                                                                                            etapa={etapa.numero}
                                                                                            fase={fase.numero}
                                                                                        />
                                                                                    </Col>
                                                                                    <Col sm={0} md={1}></Col>
                                                                            </Row>
                                                                            <Container>
                                                                            {fase.tipoMaquinaria.map((tipoMaquinaria,index)=>{             
                                                                                return(
                                                                                    <div style={{display: fase.tipoMaquinariaShow}}>
                                                                                        <Accordion defaultActiveKey={1} >
                                                                                            <Card className="CardAcc">
                                                                                                <Accordion.Toggle as={Card.Header} eventKey={tipoMaquinaria.accordionKey} onClick={() => this.accordionTM(index,etapa.numero,fase.numero)} className="accordion borderacc">
                                                                                                    <FormTitulo titulo={tipoMaquinaria.nombre}/>
                                                                                                </Accordion.Toggle>
                                                                                                <Accordion.Collapse eventKey={1} >
                                                                                                    <Card.Body className="BodyAcc">

                                                                                                        <Form.Row className="formMargins">
                                                                                                            <Form.Group as={Col} md="6" controlId="formBasicEmail" className="inputsPaddingRight">
                                                                                                                <Form.Label className="cliente-description-fields-text">Cantidad de unidades</Form.Label>
                                                                                                                <Form.Control type="text" className="form-input" placeholder="Introduzca cantidad de unidades" />
                                                                                                                <Form.Text className="text-muted">
                                                                                                                    Obligatorio
                                                                                                                </Form.Text>
                                                                                                            </Form.Group>
                                                                                                            <Form.Group as={Col} md="6" controlId="exampleForm.ControlTextarea1" className="inputsPaddingLeft">
                                                                                                                 <Form.Label className="cliente-description-fields-text">Costo</Form.Label>
                                                                                                                <InputGroup className="MyInputGroup">
                                                                                                                    <Form.Control type="text" className="form-input"  placeholder="Introduzca costo por unidad" /> 
                                                                                                                    <InputGroup.Append>
                                                                                                                        <InputGroup.Text  className="input-append-ventas-form">$</InputGroup.Text>
                                                                                                                    </InputGroup.Append>
                                                                                                                </InputGroup>
                                                                                                                <Form.Text className="text-muted">
                                                                                                                    Obligatorio
                                                                                                                </Form.Text> 
                                                                                                            </Form.Group>
                                                                                                        </Form.Row>

                                                                                                    </Card.Body>
                                                                                                </Accordion.Collapse>
                                                                                            </Card>
                                                                                        </Accordion>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                            </Container>
                                                                        </Container>
                                                                    </Tab>
                                                                 );
                                                            })}
                                                        </Tabs>
                                                    </Container>  
                                                </Tab>
                                            );
                                        })}
                                    </Tabs>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Container>
            </div>
        ) 
    }

}
