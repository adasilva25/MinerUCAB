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
import FormLugarPred from '../../components/FormLugarPred'
import Card from 'react-bootstrap/Card'

// https://www.w3schools.com/jquery/html_removeclass.asp


const $ = require('jquery');

export default class ModificarYacimiento extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            eliminadosFases: [],
            actualizar:true,
            eliminar:true,
            prueba: true,
            key:"Etapa 1",
            explotacion:{
                id:null,
                duracion:0,
                costo:0,
            },
            estatus:{
                id:null,
                nombre:null,
            },
            yacimiento:{
                id:null,
                nombre:null,
                descripcion:null,
                area:null,
                tipo:null,
                tipoId:null,
                ubicacion:{
                    estado:null,
                    municipio:null,
                    parroquia:null,
                    idParroquia:null,
                },
                fecha:{
                    dia:0,
                    mes:0,
                    ano:0
                }
            },
            accordionKey:[],
            mineralShow:'inline',
            mineralId:[],
            Minerales:[{
                nombre:null,
                id:-1,
                total: 0,
                accordionKey:0,
            }],
            mineralNoMetalicoId:[],
            mineralNoMetalicoShow:'inline',
            MineralesNoMetalicos:[{
                nombre:null,
                id:-1,
                total: 0,
                accordionKey:0,
                
            }],
            etapas: [{
                nombre: "Etapa 1",
                nombreV:null,
                id:null,
                duracion:0,
                costo:0,
                etapaShow:true,
                numero: 1,
                numeroV:1,
                eliminar:true,
                key:"Fase 1",
                fases: [{
                    nombre: "Fase 1",
                    nombreV:null,
                    id:null,
                    duracion:0,
                    costo:0,
                    faseShow:true,
                    cargoShow:'inline',
                    tipoMaquinariaShow:'inline',
                    numero:1,
                    numeroV:1,
                    cargosId:[],
                    checkInicialCargos:true,
                    tipoMaquinariaId:[],
                    checkInicialtipoMaquiaria:true,
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
       // this.eliminarActivoEtapa = this.eliminarActivoEtapa.bind(this);
        //this.eliminarActivoFase = this.eliminarActivoFase.bind(this);
    }


     componentWillMount = () => {

        const info = {
            yacimiento:{
                id:1,
                nombre:"Okinawa",
                descripcion:"muy mineraloso",
                area:300,
                tipo:"Autóctono",
                tipoId:3,
                ubicacion:{
                    estado:"Sucre",
                    municipio:"Sucre",
                    parroquia:"Altagracia",
                    idParroquia:760
                },
                fecha:{
                    dia:7,
                    mes:14,
                    ano:1999
                }
            },
            estatus:{
                id:1,
                nombre:"Activo",
            },
            minerales:[{
                id:1,
                total: 5,
                nombre:"Epale",
               
            },
            {
                id:8,
                total: 8,
                nombre:"Epale2",
                
            }],
            mineralesNoMetalicos:[{
                id:1,
                total: 5,
                nombre:"ICabron",
               
            },
            {
                id:8,
                total: 8,
                nombre:"Alumina",
                
            }],
            explotacion:{
                duracion:0,
                costo:0,
            },
            etapas: [{
                id:2,
                nombre: "diego",
                duracion:80,
                costo:30,
                fases: [{
                    id:1,
                    nombre: "andrea",
                    duracion:10,
                    costo:4,
                    checkInicialCargos:true,
                    checkInicialtipoMaquiaria:true,
                    cargos:[{
                        id:14,
                        nombre:"Natu",
                        sueldo:5,
                        cantidad:7,
                    }],
                    tipoMaquinaria:[{
                        id:5,
                        nombre:"Aloa",
                        costo:52,
                        cantidad:7,
                    }]
                }/*,
                {
                    nombre: "Albita",
                    duracion:1,
                    costo:7.2,
                    cargos:[{
                        id:10,
                        nombre:"Em",
                        sueldo:8,
                        cantidad:6,
                    }],
                    tipoMaquinaria:[{
                        id:7,
                        nombre:"Dibujante",
                        costo:5,
                        cantidad:9,
                    }]
                }*/]
            },    
            {
                nombre: "Baudet",
                id:4,
                duracion:80,
                costo:30,
                fases: [{
                    nombre: "Sanchéz",
                    id:3,
                    duracion:1,
                    costo:5,
                    checkInicialCargos:true,
                    checkInicialtipoMaquiaria:true,
                    cargos:[{
                        id:3,
                        nombre:"Armadora",
                        sueldo:8,
                        cantidad:1,
                    },
                    {
                        id:2,
                        nombre:"Rompedora",
                        sueldo:5,
                        cantidad:9,
                    }],
                    tipoMaquinaria:[{
                        id:6,
                        nombre:"Porfi pelase",
                        costo:2,
                        cantidad:8,
                    },
                    {
                        id:1,
                        nombre:"Si ves esto entonces funcionó",
                        costo:9,
                        cantidad:4,
                    }]
                },
                {
                    nombre: "Albita",
                    id:4,
                    duracion:1,
                    costo:7.2,
                    checkInicialCargos:true,
                    checkInicialtipoMaquiaria:true,
                    cargos:[{
                        id:10,
                        nombre:"empleadae",
                        sueldo:8,
                        cantidad:6,
                    }],
                    tipoMaquinaria:[{
                        id:7,
                        nombre:"Geo",
                        costo:5,
                        cantidad:9,
                    }]
                }]
            }]
        }

        console.log(info);

        let state={
            eliminadosFases: [],
            actualizar:true,
            eliminar:true,
            prueba: true,
            key:"Etapa 1",
            explotacion:{
                id:null,
                duracion:0,
                costo:0,
            },
            estatus:{
                id:null,
                nombre:null,
            },
            yacimiento:{
                nombre:null,
                id:null,
                descripcion:null,
                area:null,
                tipo:null,
                tipoId:null,
                ubicacion:{
                    estado:null,
                    municipio:null,
                    parroquia:null,
                    idParroquia:null
                },
                fecha:{
                    dia:0,
                    mes:0,
                    ano:0
                }
            },
            accordionKey:[],
            mineralShow:'inline',
            mineralId:[],
            Minerales:[{
                nombre:null,
                id:-1,
                total: 0,
                accordionKey:0,
                
                
            }],
            mineralNoMetalicoId:[],
            mineralNoMetalicoShow:'inline',
            MineralesNoMetalicos:[{
                nombre:null,
                id:-1,
                total: 0,
                accordionKey:0,
                
            }],
            etapas: [{
                nombre: "Etapa 1",
                nombreV:null,
                id:null,
                duracion:0,
                costo:0,
                etapaShow:true,
                numero: 1,
                numeroV:1,
                eliminar:true,
                key:"Fase 1",
                fases: [{
                    nombre: "Fase 1",
                    nombreV:null,
                    id:null,
                    duracion:0,
                    costo:0,
                    faseShow:true,
                    cargoShow:'inline',
                    tipoMaquinariaShow:'inline',
                    numero:1,
                    numeroV:1,
                    cargosId:[],
                    tipoMaquinariaId:[],
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
        state.yacimiento.id=info.yacimiento.id;
        state.yacimiento.nombre=info.yacimiento.nombre;
        state.yacimiento.descripcion = info.yacimiento.descripcion;
        state.yacimiento.area = info.yacimiento.area;
        state.yacimiento.tipo = info.yacimiento.tipo;
        state.yacimiento.tipoId = info.yacimiento.tipoId;
        state.yacimiento.ubicacion.estado = info.yacimiento.ubicacion.estado;
        state.yacimiento.ubicacion.municipio = info.yacimiento.ubicacion.municipio;
        state.yacimiento.ubicacion.parroquia = info.yacimiento.ubicacion.parroquia;
        state.yacimiento.ubicacion.idParroquia = info.yacimiento.ubicacion.idParroquia;
        state.yacimiento.fecha.dia = info.yacimiento.fecha.dia;
        state.yacimiento.fecha.mes = info.yacimiento.fecha.mes;
        state.yacimiento.fecha.ano = info.yacimiento.fecha.ano;

        state.explotacion.id = info.explotacion.id;
        state.explotacion.duracion = info.explotacion.duracion;
        state.explotacion.costo = info.explotacion.costo;


        state.estatus.id = info.estatus.id;
        state.estatus.nombre = info.estatus.nombre;



        state.Minerales.shift();
        for(let i=0; i<info.minerales.length; i++){

           
            state.mineralId.push(info.minerales[i].id);

            let mineral={
                nombre:null,
                id:-1,
                total: 0,
                accordionKey:0,
                
                
            }

            mineral.nombre=info.minerales[i].nombre;
            mineral.id=info.minerales[i].id;
            mineral.total=info.minerales[i].total;

            

            
            state.Minerales.push(mineral);
        }
        


        state.MineralesNoMetalicos.shift();
        for(let i=0; i<info.mineralesNoMetalicos.length; i++){

           
            state.mineralNoMetalicoId.push(info.mineralesNoMetalicos[i].id);

            let mineral={
                nombre:null,
                id:-1,
                total: 0,
                accordionKey:0,
                
            }

            mineral.nombre=info.mineralesNoMetalicos[i].nombre;
            mineral.id=info.mineralesNoMetalicos[i].id;
            mineral.total=Number(info.mineralesNoMetalicos[i].total);

            state.MineralesNoMetalicos.push(mineral);
        }














        //console.log("minerales",state.Minerales);

        state.etapas.shift();

        if (info.etapas.length>1){
            state.eliminar=false;
        }
        for(let i=0; i<info.etapas.length; i++){
            let etapa={
                nombre: "Etapa 1",
                nombreV:null,
                id:null,
                duracion:0,
                costo:0,
                etapaShow:true,
                numero: 1,
                numeroV:1,
                eliminar:true,
                key:"Fase 1",
                fases: [{
                    nombre: "Fase 1",
                    nombreV:null,
                    id:null,
                    duracion:0,
                    costo:0,
                    faseShow:true,
                    cargoShow:'inline',
                    tipoMaquinariaShow:'inline',
                    numero:1,
                    numeroV:1,
                    cargosId:[],
                    tipoMaquinariaId:[],
                    checkInicialCargos:true,
                    checkInicialtipoMaquiaria:true,
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

            etapa.id=info.etapas[i].id;
            etapa.numero=i+1;
            etapa.numeroV=i+1;

            etapa.nombre= 'Etapa '+ (i+1);
            etapa.nombreV=info.etapas[i].nombre;

            etapa.duracion=info.etapas[i].duracion;
            etapa.costo= info.etapas[i].costo;

            

            etapa.fases.shift();
            for(let j=0; j<info.etapas[i].fases.length; j++){

                let fase ={
                    nombre: "Fase 1",
                    nombreV:null,
                    duracion:0,
                    costo:0,
                    faseShow:true,
                    cargoShow:'inline',
                    tipoMaquinariaShow:'inline',
                    numero:1,
                    numeroV:1,
                    cargosId:[],
                    tipoMaquinariaId:[],
                    checkInicialCargos:true,
                    checkInicialtipoMaquiaria:true,
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





                fase.id=info.etapas[i].fases[j].id;
                fase.numero=j+1;
                fase.numeroV=j+1;

                fase.nombre= 'Fase '+ (j+1);
                fase.nombreV=info.etapas[i].fases[j].nombre;

                fase.duracion=info.etapas[i].fases[j].duracion;
                fase.costo= info.etapas[i].fases[j].costo;
                 

                fase.cargos.shift();
                for(let k=0; k<info.etapas[i].fases[j].cargos.length; k++){
                    fase.cargosId.push(info.etapas[i].fases[j].cargos[k].id);

                    let cargo={
                        nombre:null,
                        id:-1,
                        sueldo:0,
                        cantidad:0,
                        accordionKey:0
                    }


                    cargo.id=info.etapas[i].fases[j].cargos[k].id;
                    cargo.sueldo=info.etapas[i].fases[j].cargos[k].sueldo;
                    cargo.cantidad=info.etapas[i].fases[j].cargos[k].cantidad;
                    cargo.nombre=info.etapas[i].fases[j].cargos[k].nombre;

                    fase.cargos.push(cargo);    
                }


                fase.tipoMaquinaria.shift();
                for(let k=0; k<info.etapas[i].fases[j].tipoMaquinaria.length; k++){
                    fase.tipoMaquinariaId.push(info.etapas[i].fases[j].tipoMaquinaria[k].id);
                    let tipoMaquinaria={
                        nombre:null,
                        id:-1,
                        costo:0,
                        cantidad:0,
                        accordionKey:0
                    }


                    tipoMaquinaria.id=info.etapas[i].fases[j].tipoMaquinaria[k].id;
                    tipoMaquinaria.sueldo=info.etapas[i].fases[j].tipoMaquinaria[k].sueldo;
                    tipoMaquinaria.cantidad=info.etapas[i].fases[j].tipoMaquinaria[k].cantidad;
                    tipoMaquinaria.nombre=info.etapas[i].fases[j].tipoMaquinaria[k].nombre;

                    fase.tipoMaquinaria.push(tipoMaquinaria);
                }
                
                etapa.fases.push(fase); 
            }
            if (etapa.fases.length>1){
                etapa.eliminar=false;
            }
            state.etapas.push(etapa);
        }

        

       

        console.log("estado inicial",state);
        console.log("estado inicial",state.mineralId);
        this.setState(() => ({
            eliminar: state.eliminar,
            yacimiento: state.yacimiento,
            explotacion: state.explotacion,
            mineralId: state.mineralId,
            Minerales: state.Minerales,
            mineralNoMetalicoId: state.mineralNoMetalicoId,
            MineralesNoMetalicos: state.MineralesNoMetalicos,
            etapas: state.etapas,
            estatus: state.estatus,
        }));
    }

    /*inicializarInputs=()=>{

        if((document.getElementById("YacimientosNombreYacimiento")!=null) && (this.state.actualizar)){
            this.state.actualizar=false;
            console.log("que manguangua, Ah?!");

            console.log(document.getElementById("YacimientosNombreYacimiento"));
            document.getElementById("YacimientosNombreYacimiento").value = this.state.yacimiento.nombre ;
            document.getElementById("YacimientosDescripcionYacimiento").value = this.state.yacimiento.descripcion ;
            document.getElementById("YacimientosTamañoYacimiento").value = this.state.yacimiento.area ;
            document.getElementById("YacimientosTipoYacimiento").value = this.state.yacimiento.tipo ;
            document.getElementById("LugarEstado").value = this.state.yacimiento.ubicacion.estado ;
            document.getElementById("LugarMunicipio").value = this.state.yacimiento.ubicacion.municipio ;
            document.getElementById("LugarParroquia").value = this.state.yacimiento.ubicacion.parroquia ;
            document.getElementById("FechaDia").value = this.state.yacimiento.fecha.dia ;
            document.getElementById("FechaMes").value = this.state.yacimiento.fecha.mes ; 
            document.getElementById("FechaAno").value = this.state.yacimiento.fecha.ano ;


            for(let i=0; i<this.state.Minerales.length; i++){
                
               let mineral=this.state.Minerales[i];
                
                document.getElementById("YacimientosTotalMineral"+mineral.id).value = mineral.total;
                
                for(let k=0; k<this.state.Minerales[i].componentes.length; k++){
                    
                    let componente = this.state.Minerales[i].componentes[k];

                    document.getElementById("YacimientosMineralComponente"+mineral.id+componente.id).value = componente.total;   
                }  
            }

            this.state.etapas.forEach((etapaR)=>{
                if(etapaR.numero != 0){
                    
                    document.getElementById('YacimientosNombreEtapa'+etapaR.numeroV).value=etapaR.nombre;
                    etapaR.fases.forEach((faseR)=>{
                        if(faseR.numero != 0){
                            
                            document.getElementById('YacimientosNombreEtapaFase'+etapaR.numeroV+faseR.numeroV).value=fase.nombre;
                            document.getElementById('YacimientosDuracionEtapaFase'+etapaR.numeroV+faseR.numeroV).value=faseR.duracion;
                            let indexcar=0;
                            faseR.cargos.forEach((cargoR)=>{
                                
                                document.getElementById('YacimientosCantidadCargo'+etapaR.numeroV+faseR.numeroV+indexcar).value= cargoR.cantidad;;
                                document.getElementById('YacimientosSueldoCargo'+etapaR.numeroV+faseR.numeroV+indexcar).value= cargoR.sueldo;;
             
                               indexcar++;

                            });
                            let indexTM = 0;
                            faseR.tipoMaquinaria.forEach((tipoMaquinariaR)=>{
                                document.getElementById('YacimientosCantidadTipoMaquinaria'+etapaR.numeroV+faseR.numeroV+indexTM).value= tipoMaquinariaR.costo;
                                document.getElementById('YacimientosCostoTipoMaquinaria'+etapaR.numeroV+faseR.numeroV+indexTM).value= tipoMaquinariaR.cantidad;
                                indexTM++;
                            });
                        }

                    });
                }
            });
        }
    }*/



    prueba = (e) => {
        this.setState((prevState) => ({
            prueba: !this.state.prueba
        }));
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



    accordionMNM(i){
       // console.log(this.state.Minerales[i].accordionKey,i);
     //   console.log(this.state.Minerales[i].accordionKey, "holoooA");
        var minerales=this.state.MineralesNoMetalicos;
        var k=this.state.MineralesNoMetalicos[i].accordionKey;
       
           // console.log(this.state.Minerales, "mineralesssss");
           // console.log(this.state.Minerales[i].accordionKey, "holA");
            if(k === 0){
                k=1;
              //  console.log( "1");
                minerales[i].accordionKey=k;
                this.setState(() => ({
                    MineralesNoMetalicos: minerales
                }));
            }
            else{
                k=0;
             //   console.log( "2");
                minerales[i].accordionKey=k;
                this.setState(() => ({
                    MineralesNoMetalicos: minerales
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
                id:null,
                descripcion: null,
                duracion:0,
                costo:0,
                etapaShow:true,
                numero: 1,
                numeroV:1,
                eliminar:true,
                key:"Fase 1",
                fases: [{
                    nombre: "Fase 1",
                    id:null,
                    descripcion:null,
                    duracion:0,
                    costo:0,
                    faseShow:true,
                    cargoShow:'none',
                    tipoMaquinariaShow:'none',
                    numero:1,
                    numeroV:1,
                    cargosId:[],
                    checkInicialCargos:false,
                    tipoMaquinariaId:[],
                    checkInicialtipoMaquiaria:false,
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

        for (var i = etapa.length - 1; i >= 0; i--) {
            if(etapa[i].numero!=0){
                Etapa.numero=etapa[i].numero+1;
                break;
            }
        }
        Etapa.numeroV=etapa[etapa.length-1].numeroV+1;
        console.log(Etapa);
        Etapa.nombre= 'Etapa '+ Etapa.numero;    
        this.setState((prevState) => ({
            etapas: prevState.etapas.concat(Etapa),
            eliminar: false
        }));
        //this.eliminarActivoEtapa();
    }

    

    handleOnClickAFase(etapa_num){
        var Etapa= this.state.etapas;
        var fase1= this.state.etapas[etapa_num-1].fases;
        var Fase={
                nombre: '',
                id:null,
                descripcion:null,
                duracion:0,
                costo:0,
                faseShow:true,
                cargoShow:'none',
                tipoMaquinariaShow:'none',
                numero:1,
                numeroV:1,
                cargosId:[],
                checkInicialCargos:false,
                tipoMaquinariaId:[],
                checkInicialtipoMaquiaria:false,
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
        
        //console.log('Lenght',this.state.etapas[etapa_num-1].fases.length
         //   );
        for (var i = fase1.length - 1; i >= 0; i--) {
           // console.log('FASE NUMEROOOOO V',fase1[i].numero);
            if(fase1[i].numero!=0){
                Fase.numero=fase1[i].numero+1;
               // console.log('FASE NUMEROOOOO N',Fase.numero);
                break;
            }
        }
        Fase.numeroV=fase1[fase1.length-1].numeroV+1; 
        Fase.nombre= 'Fase '+ Fase.numero;  
        console.log('NUMfase',Fase.numeroV,'NUMeta',etapa_num);
        //console.log(Fase);
       // console.log(Etapa);
       /* fase1.concat(Fase);
        Etapa[etapa_num-1]=fase1;
        this.setState((prevState) => ({
            etapas: Etapa
        }));*/
       this.setState((prevState) => ({
            etapas: prevState.etapas.map(
                obj => (obj.numeroV === etapa_num ? Object.assign(obj,{fases: fase1.concat(Fase)}): obj )
            )     
        }));
        console.log(this.state.etapas);
        this.eliminarActivoFase(etapa_num,1);
    }


    handleOnClickEFase(etapaNum,faseNum){

      /*  var etapas1 =this.state.etapas;
        var etapa = this.state.etapas[etapaNum-1];
        var eliminado = false;
        
       // for(var i = faseNum-1; i < etapa.fases.length; i++) {

            if((etapa.fases[faseNum]!=undefined)){
                let faseAux=etapa.fases[faseNum-1];
                etapa.fases[faseNum-1]=etapa.fases[faseNum];
                etapa.fases[faseNum]= faseAux;
                //etapa.fases[i].numero--;
                //etapa.fases[i].nombre='Fase '+etapa.fases[i].numero;
                //console.log('Numero',etapa.fases[i].numero,'NUmeV',etapa.fases[i].numeroV);
            }
        //}
       // etapa.fases.splice(faseNum-1,1);

        etapas1[etapaNum-1]=etapa;
        this.setState(() => ({
            etapas: etapas1
            }));*/






     /* var etapas1 =this.state.etapas;
        var etapa = this.state.etapas[etapaNum-1];
        var eliminado = false;
        etapa.fases.splice(faseNum-1,1);
        for(var i = faseNum-1; i < etapa.fases.length; i++) {

            if((etapa.fases[i]!=undefined)){
                etapa.fases[i].numero--;
                etapa.fases[i].nombre='Fase '+etapa.fases[i].numero;
                console.log('Numero',etapa.fases[i].numero,'NUmeV',etapa.fases[i].numeroV);
            }
        }

        etapas1[etapaNum-1]=etapa;
        this.setState(() => ({
            etapas: etapas1
            }));*/


        var etapas1 =this.state.etapas;
        var etapa = this.state.etapas[etapaNum-1];
        etapa.fases[faseNum-1].faseShow=false;
        etapa.fases[faseNum-1].numero=0;
        for(var i = faseNum; i < etapa.fases.length; i++) {

            if((etapa.fases[i]!=undefined) && (etapa.fases[i].numero!=0) ){
                
                
                etapa.fases[i].numero--;
                
                etapa.fases[i].nombre='Fase '+etapa.fases[i].numero;
                console.log('Numero',etapa.fases[i].numero,'NUmeV',etapa.fases[i].numeroV);
            }
        }
     

        etapas1[etapaNum-1]=etapa;
        this.setState(() => ({
            etapas: etapas1
        }));


        this.eliminarActivoFase(etapaNum,0);
        this.actualizarCostos();
        this.actualizarDuracion();


       /* console.log(faseNum)

        this.setState((prevState) => ({
            eliminadosFases: prevState.eliminadosFases.concat(faseNum)
        }));*/





        // this.setState(prevState => ({
        //     ...prevState,
        //     etapas: {
        //         ...prevState.etapas,
        //         fases: {
        //             ...prevState.etapas.fases
        //             // ...prevState.etapas.fases, 
        //             // anotherProperty: {
        //             //    ...prevState.someProperty.someOtherProperty.anotherProperty,
        //             //    flag: false
        //             // }
        //         }
        //     }
        // }))

        // console.log(this.state)


        // const checks = $('.cargos13').removeClass('cargos13').addClass('cargos12');
        // console.log('dt', $(this.el).length)
        // // const checks = document.getElementsByClassName('cargos'+etapaNum+faseNum)
        
        // const checksN = document.getElementsByClassName('cargos'+(etapaNum+1)+(faseNum+1))
        // let x = 0;
        // console.log('classname', checks[0].selected)
        // console.log('classnameN', checksN)
        // console.log('jQueryO', $('.cargos'+etapaNum+faseNum).is(":checked"))
        // console.log('jQueryN', $('.cargos'+(etapaNum+1)+(faseNum+1)).is(":checked"))

        // for(let j = 0; j < checks.length; j++){
        //     console.log('checks[j]', checks[j].classList)
        //     if ((checks[j].className.includes('cargos'+etapaNum+faseNum)) ){
        //         x = 1;
        //         // const style = 'cargos12';
        //         // const f = '/\\';
        //         // const regEx = new RegExp("/\\" + style + "\b/");
        //         // checks[j].className.replace(/\bcargos12\b/,'')
        //         // checks[j].remove('cargos12')
                
        //         // console.log('className removing', checks[j].classList)
        //         // console.log('className', checks[j].classList, checks[j].className)
        //     }
        // }

        // let statePrueba = this.state.etapas[etapaNum-1].fases
        // statePrueba = statePrueba.splice(faseNum-1,1).splice(faseNum-1,1)
        // console.log('etapa', statePrueba, this.state.etapas[etapaNum-1].fases)



        // console.log(this.state.etapas)

        // const optionToRemove = this.state.etapas[etapaNum-1].fases[faseNum-1]

        // console.log('et',this.state.etapas[etapaNum-1].fases)

        // this.setState((prevState) => ({
        //     etapas: prevState.etapas[etapaNum-1].fases.filter((option) => {
        //         return option !== optionToRemove
        //     })
        // }));

        // console.log(this.state.etapas)




        // console.log('state new', this.state)
        // console.log('e-f', etapaNum, faseNum)
        // var etapas1 =this.state.etapas;
        // console.log('etapas1', etapas1)
        // var etapa = this.state.etapas;
        // var eliminado = false;
        // etapa[etapaNum-1].fases.splice(faseNum-1,1);
        // console.log(etapa)

        // console.log('el', $('#DataTables_Table_3').DataTable().clear())
        


        // for(var i = faseNum-1; i < etapa.fases.length; i++) {
            
        //     if((etapa.fases[i]!=undefined)){
        //         etapa.fases[i].numero--;
        //         etapa.fases[i].nombre='Fase '+etapa.fases[i].numero;
        //         console.log('Numero',etapa.fases[i].numero,'NUmeV',etapa.fases[i].numeroV);
        //     }
        // }

        // etapas1[etapaNum-1]=etapa;
        // this.setState(() => ({
        //     etapas: etapas1
        // }));

        // console.log('yeyo', this.state.etapas)

        

        // classList.remove('cool', 'make', 'me')

        // checkboxesDT[k].classList.add(textoPlural.replace(/\s/g,'')+etapa+fase);

    }

    handleOnClickEEtapa(etapaNum){

        var etapas1 =this.state.etapas;
        //console.log(etapas1, etapaNum-1);
        //console.log(etapas1[etapaNum-1]);
        /*for(var i =0; i< etapas1[etapaNum-1].fases.length; i++){

            this.handleOnClickEFase(etapaNum,etapas1[etapaNum-1].fases[i].numero);
        }*/
        //etapas1.splice(etapaNum-1,1);
        etapas1[etapaNum-1].etapaShow=false;
        etapas1[etapaNum-1].numero=0;
        for(var i = etapaNum; i < etapas1.length; i++) {
            
          
            if((etapas1[i]!=undefined) && (etapas1[i].numero!=0)){
               
                
                etapas1[i].numero--;
                etapas1[i].nombre='Etapa '+etapas1[i].numero;
            }
        }

        this.setState(() => ({
            etapas: etapas1,
        }));
        this.eliminarActivoEtapa();
        this.actualizarCostos();
        this.actualizarDuracion();
    }



    eliminarActivoEtapa=()=>{

        let i=0;
        let activar=true;
        let etapas = this.state.etapas;
        for(let k=0; k< this.state.etapas.length; k++){
             if(etapas[k].numero!=0){
                i++;
            }
        }
        
        if(i>1){
            activar=false;
        }

        this.setState(() => ({
            eliminar:activar
        }));
        console.log('Eliminar Etapa',activar,i);
       
    }


    eliminarActivoFase=(etapaNum,e)=>{

        let i=0+e;
        let activar=true;
        let fases=this.state.etapas[etapaNum-1].fases;
        for(let k=0; k<this.state.etapas[etapaNum-1].fases.length; k++){
             if(fases[k].numero!=0){
                i++;
            }
        }
        
        if(i>1){
            activar=false;
        }

        let etapas = this.state.etapas;
        let etapa = this.state.etapas[etapaNum-1];
        etapa.eliminar = activar;
        etapas[etapaNum-1] = etapa;

        this.setState(() => ({
            etapas: etapas
        }));
         console.log('Eliminar Fase',activar,i);
        
    }


    selectMinerales = (id,name,et,fa) => {  // EL VALOR DE id EN BASES DE DATOS ====> IGUAL HAY QUE VALIDAR MIL VECES ESO
        console.log('entroMinerales', id)

        let  minerales=this.state.Minerales;
        var eliminado= false;
        var mineralS='inline';
        
        let costo_anterior=0;
        let id_a_eliminar=-1;

        var componetesNombres=['Clarita','Durita','Virita','Fusita'];
        if(this.state.Minerales[0].id === -1){
            this.state.Minerales.shift();

        }






        for(var i = 0; i < this.state.Minerales.length; i++) {
            //console.log(minerales[i].id,"id");
            
            console.log("id que viene, id que va",minerales[i].id, id);
            costo_anterior=document.getElementById('YacimientosTotalMineral'+minerales[i].id).value;
           
            


           if(eliminado){
                document.getElementById('YacimientosTotalMineral'+minerales[i-1].id).value=costo_anterior;
                /*for(let j=0; j<minerales[i-1].componentes.length; j++){
                    document.getElementById('YacimientosMineralComponente'+minerales[i-1].id+minerales[i-1].componentes[j].id).value=cantidad_anterior[j];  
                }*/
            }

            if(minerales[i].id == id){
               
               
                document.getElementById('YacimientosTotalMineral'+id).value='';

                //minerales.splice(i,1);
                id_a_eliminar=i;
                eliminado=true;
            }

            
            
        }

        if(eliminado){
            minerales.splice(id_a_eliminar,1);
        }

        if(!eliminado){
            let mineral={
                nombre:'',
                id:'',
                total: 0,
                accordionKey:0,
                
            }
            

            mineral.nombre=name;
            mineral.id=id;
            
            minerales.push(mineral);
        }
        if(minerales.length===0){
            mineralS='none';
            let mineral={
                nombre:null,
                id:-1,
                total: 0,
                accordionKey:0,
                  
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



    selectMineralesNoMetalicos = (id,name,et,fa) => {  // EL VALOR DE id EN BASES DE DATOS ====> IGUAL HAY QUE VALIDAR MIL VECES ESO
        console.log('entroMineralesNoMetalicos', id)

        let MineralesNoMetalicos=this.state.MineralesNoMetalicos;
        var eliminado= false;
        var mineralS='inline';
        
        let costo_anterior=0;
        let id_a_eliminar=-1;

        var componetesNombres=['Clarita','Durita','Virita','Fusita'];
        if(this.state.MineralesNoMetalicos[0].id == -1){
            this.state.MineralesNoMetalicos.shift();

        }






        for(var i = 0; i < this.state.MineralesNoMetalicos.length; i++) {
            //console.log(MineralesNoMetalicos[i].id,"id");
            

            costo_anterior=document.getElementById('YacimientosTotalMineralNoMetalico'+MineralesNoMetalicos[i].id).value;
           
            


           if(eliminado){
                document.getElementById('YacimientosTotalMineralNoMetalico'+MineralesNoMetalicos[i-1].id).value=costo_anterior;
                /*for(let j=0; j<MineralesNoMetalicos[i-1].componentes.length; j++){
                    document.getElementById('YacimientosMineralComponente'+MineralesNoMetalicos[i-1].id+MineralesNoMetalicos[i-1].componentes[j].id).value=cantidad_anterior[j];  
                }*/
            }

            if(MineralesNoMetalicos[i].id == id){
               
               
                document.getElementById('YacimientosTotalMineralNoMetalico'+id).value='';

                //MineralesNoMetalicos.splice(i,1);
                id_a_eliminar=i;
                eliminado=true;
            }

            
            
        }

        if(eliminado){
            MineralesNoMetalicos.splice(id_a_eliminar,1);
        }

        if(!eliminado){
            let mineral={
                nombre:'',
                id:'',
                total: 0,
                accordionKey:0,
               
            }
            

            mineral.nombre=name;
            mineral.id=id;
            
            MineralesNoMetalicos.push(mineral);
        }
        if(MineralesNoMetalicos.length===0){
            mineralS='none';
            let mineral={
                nombre:null,
                id:-1,
                total: 0,
                accordionKey:0,
                  
            };
            MineralesNoMetalicos.push(mineral);
        }

        this.setState(() => ({
            mineralNoMetalicoShow: mineralS,
            MineralesNoMetalicos: MineralesNoMetalicos
        }));

        


        console.log(MineralesNoMetalicos);

       // console.log(minerales[0].componentes[1]);
    };


    selectCargos = (id,name,etapaNum,faseNum) => {  // EL VALOR DE id EN BASES DE DATOS ====> IGUAL HAY QUE VALIDAR MIL VECES ESO
        // console.log('entroCargos', id,etapaNum,faseNum);
        var etapas1 = this.state.etapas;
        let cargos=this.state.etapas[etapaNum-1].fases[faseNum-1].cargos;
        var eliminado= false;
        var cargoS='inline';
        let costo_anterior = 0;
        let cantidad_anterior = 0;
        let id_a_eliminar=0;

        if(cargos[0].id === -1){
            cargos.shift();

        }
        for(var i = 0; i < this.state.etapas[etapaNum-1].fases[faseNum-1].cargos.length; i++) {
           // console.log(cargos[i].id,"id");

            costo_anterior =document.getElementById('YacimientosCantidadCargo'+etapaNum+faseNum+i).value='';
            cantidad_anterior =document.getElementById('YacimientosSueldoCargo'+etapaNum+faseNum+i).value='';

            if(eliminado){
                document.getElementById('YacimientosCantidadCargo'+etapaNum+faseNum+(i-1)).value=costo_anterior;
                document.getElementById('YacimientosSueldoCargo'+etapaNum+faseNum+(i-1)).value=cantidad_anterior;

            }
            if(cargos[i].id == id){
               
                document.getElementById('YacimientosCantidadCargo'+etapaNum+faseNum+i).value='';
                document.getElementById('YacimientosSueldoCargo'+etapaNum+faseNum+i).value='';
                id_a_eliminar=i;
               // cargos.splice(i,1);
                eliminado=true;
            }
        }

        if(eliminado){
            cargos.splice(id_a_eliminar,1);
        }


        if(!eliminado){
            let cargo={
                nombre:null,
                id:-1,
                sueldo:0,
                cantidad:0,
                accordionKey:0
            }
            

            cargo.nombre=name;
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



        this.actualizarCostos();

        console.log(cargos);
        
    };



    selectTipoMaquinaria = (id,name,etapaNum,faseNum) => {  // EL VALOR DE id EN BASES DE DATOS ====> IGUAL HAY QUE VALIDAR MIL VECES ESO
        console.log('entroTipoMaquinaria', id)
        var etapas1 = this.state.etapas;
        let tiposMaquinaria=this.state.etapas[etapaNum-1].fases[faseNum-1].tipoMaquinaria;
        var eliminado= false;
        var tipoMaquinariaS='inline';
        let costo_anterior = 0;
        let cantidad_anterior = 0;
        let id_a_eliminar=0;

        if(tiposMaquinaria[0].id === -1){
            tiposMaquinaria.shift();

        }
        for(var i = 0; i < this.state.etapas[etapaNum-1].fases[faseNum-1].tipoMaquinaria.length; i++) {
           // console.log(tiposMaquinaria[i].id,"id");
            costo_anterior=document.getElementById('YacimientosCantidadTipoMaquinaria'+etapaNum+faseNum+i).value;
            cantidad_anterior=document.getElementById('YacimientosCostoTipoMaquinaria'+etapaNum+faseNum+i).value;
            if(eliminado){
                    
                document.getElementById('YacimientosCantidadTipoMaquinaria'+etapaNum+faseNum+(i-1)).value=costo_anterior;
                document.getElementById('YacimientosCostoTipoMaquinaria'+etapaNum+faseNum+(i-1)).value=cantidad_anterior;
            }
            if(tiposMaquinaria[i].id == id){
                if(tiposMaquinaria[i+1] != undefined){
                    tiposMaquinaria[i+1].accordionKey=1;
                    
                }
                document.getElementById('YacimientosCantidadTipoMaquinaria'+etapaNum+faseNum+i).value='';
                document.getElementById('YacimientosCostoTipoMaquinaria'+etapaNum+faseNum+i).value='';
                id_a_eliminar=i;
                //tiposMaquinaria.splice(i,1);
                eliminado=true;
            }
           

        }
        if(eliminado){
            tiposMaquinaria.splice(id_a_eliminar,1);
        }


        if(!eliminado){


            let tipoMaquinaria={
                nombre:null,
                id:-1,
                costo:0,
                cantidad:0,
                accordionKey:0
            };
            
            tipoMaquinaria.nombre=name;
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

        this.actualizarCostos();

       console.log(tiposMaquinaria);
        
    };


    nombreDT = (nombre) => {
     console.log('fino')
    }


    selectFunctionCheckbox = (classN,id, name,etapaNum,faseNum) => {
        // console.log('selectFunctionCheckbox', boton.alt)
        // console.log('selectFunctionCheckbox', boton)


        // console.log('IndexC',classN.indexOf("cargos"))
        // console.log('IndexM',classN.indexOf("minerales"))
        // console.log('IndexT',classN.indexOf("tiposdemaquinaria"))
        if (classN.indexOf("cargos") != -1){
            //console.log('ENTRO CARGO')
            this.selectCargos(id,name,etapaNum,faseNum)
        }
        else if (classN.indexOf("mineralesmetálicos") != -1){
            this.selectMinerales(id,name,etapaNum,faseNum)
        }
        else if (classN.indexOf("mineralesnometálicos") != -1){
            this.selectMineralesNoMetalicos(id,name,etapaNum,faseNum)
        }
        else if (classN.indexOf("tiposdemaquinaria") != -1 ){
            this.selectTipoMaquinaria(id,name,etapaNum,faseNum)          
        }
    }



     handleOnClickSubmittData=()=>{


        const info = {
            yacimiento:{
                id:null,
                nombre:null,
                descripcion:null,
                area:null,
                tipo:null,
                tipoId:null,
                ubicacion:{
                    estado:null,
                    municipio:null,
                    parroquia:null,
                    parroquiaId:null,
                },
                fecha:{
                    dia:null,
                    mes:null,
                    ano:null
                }
            },
            estatus:{
                id:null,
                nombre:null,
            },
            minerales:[{
                id:0,
                total: 0,
               
            }],
            mineralesNoMetalicos:[{
                id:0,
                total: 0,
               
            }],
            explotacion:{
                id:null,
                duracion:0,
                costo:0,
            },
            etapas: [{
                nombre: null,
                id:null,
                duracion:0,
                estatus:0,
                costo:0,
                fases: [{
                    nombre: null,
                    id:null,
                    duracion:0,
                    estatus:0,
                    costo:0,
                    cargos:[{
                        id:0,
                        sueldo:0,
                        cantidad:0,
                    }],
                    tipoMaquinaria:[{
                        id:0,
                        costo:0,
                        cantidad:0,
                    }]
                }]
            }]
        }


        
        

       /* let incompleto = document.getElementById("YacimientosNombreYacimiento").value.trim(); 
        if(!incompleto){
            console.log('COMPLETO');
        }*/
      /*  if(document.getElementById("YacimientosNombreYacimiento").value.trim){

        }
        this.state.yacimiento.nombre = document.getElementById("YacimientosNombreYacimiento").value;
        this.state.yacimiento.descripcion*/
        //console.log('NOMBRE YACIMEITNO',incompleto);
        info.yacimiento.id = this.state.yacimiento.id;
        info.yacimiento.nombre = document.getElementById("YacimientosNombreYacimiento").value.trim();
        info.yacimiento.descripcion = document.getElementById("YacimientosDescripcionYacimiento").value.trim();
        info.yacimiento.area = Number(document.getElementById("YacimientosTamañoYacimiento").value.trim());
        info.yacimiento.tipo = document.getElementById("YacimientosTipoYacimiento").value.trim();
        info.yacimiento.tipoId = this.state.yacimiento.tipoId;
        info.yacimiento.ubicacion.estado = Number(document.getElementById("LugarEstado").value.trim());
        info.yacimiento.ubicacion.municipio = Number(document.getElementById("LugarMunicipio").value.trim());
        info.yacimiento.ubicacion.parroquia = Number(document.getElementById("LugarParroquia").value.trim());
        info.yacimiento.fecha.dia = Number(document.getElementById("FechaDia").value.trim());
        info.yacimiento.fecha.mes = Number(document.getElementById("FechaMes").value.trim());
        info.yacimiento.fecha.ano = Number(document.getElementById("FechaAno").value.trim());

        info.estatus.id = this.state.estatus.id;
        info.estatus.nombre = this.state.estatus.nombre;

        info.minerales.shift();
        for(let i=0; i<this.state.Minerales.length; i++){
            let mineral={
                id:0,
                total: 0,
              
            }
           
            mineral.id=Number(this.state.Minerales[i].id);
            mineral.total=Number(document.getElementById("YacimientosTotalMineral"+mineral.id).value.trim());
           

            if(mineral.id != -1){
                info.minerales.push(mineral);
            }
            else{
                info.minerales.shift();
            }
            
        }
        
        info.mineralesNoMetalicos.shift();
        for(let i=0; i<this.state.MineralesNoMetalicos.length; i++){
            let mineral={
                id:0,
                total: 0,
              
            }
           
            mineral.id=Number(this.state.MineralesNoMetalicos[i].id);
            mineral.total=Number(document.getElementById("YacimientosTotalMineralNoMetalico"+mineral.id).value.trim());
           

            if(mineral.id != -1){
                info.mineralesNoMetalicos.push(mineral);
            }
            else{
                info.mineralesNoMetalicos.shift();
            }
            
        }


        info.explotacion.id = this.state.explotacion.id;
        info.explotacion.duracion = this.state.explotacion.duracion;
        info.explotacion.costo = this.state.explotacion.costo;

        info.etapas.shift();
        
        this.state.etapas.forEach((etapaR)=>{
            if(etapaR.numero != 0){
                let etapa= {
                    nombre: null,
                    duracion:0,
                    costo:0,
                    estatus:0,
                    fases: [{
                        nombre: null,
                        duracion:0,
                        costo:0,
                        estatus:0,
                        cargos:[{
                            id:0,
                            sueldo:0,
                            cantidad:0,
                        }],
                        tipoMaquinaria:[{
                            id:0,
                            costo:0,
                            cantidad:0,
                        }]
                    }]
                }
                
                etapa.id = etapaR.id;
                etapa.nombre = document.getElementById('YacimientosNombreEtapa'+etapaR.numeroV).value.trim();
                etapa.duracion = etapaR.duracion;
                etapa.costo = etapaR.costo;
                etapa.estatus = 2;

                etapa.fases.shift();
                etapaR.fases.forEach((faseR)=>{
                    if(faseR.numero != 0){
                        let fase= {
                            nombre: null,
                            duracion:0,
                            costo:0,
                            estatus:0,
                            cargos:[{
                                id:0,
                                sueldo:0,
                                cantidad:0,
                            }],
                            tipoMaquinaria:[{
                                id:0,
                                costo:0,
                                cantidad:0,
                            }]
                        }

                        fase.id = faseR.id;
                        fase.nombre = document.getElementById('YacimientosNombreEtapaFase'+etapaR.numeroV+faseR.numeroV).value.trim();
                        fase.duracion = faseR.duracion;
                        fase.costo = faseR.costo;
                        fase.estatus = 2;
                        
                        fase.cargos.shift();
                        fase.tipoMaquinaria.shift();
                        faseR.cargos.forEach((cargoR)=>{
                            let cargo={
                                id:0,
                                sueldo:0,
                                cantidad:0,
                            }
                            cargo.id = Number(cargoR.id);
                            cargo.sueldo = cargoR.sueldo;
                            cargo.cantidad = cargoR.cantidad;

                            
                            if(cargo.id!=0){
                               fase.cargos.push(cargo);
                            }
                            else{
                                fase.cargos.shift();
                            }
                        });


                        faseR.tipoMaquinaria.forEach((tipoMaquinariaR)=>{
                            let tipoMaquinaria={
                                id:0,
                                costo:0,
                                cantidad:0,
                            }
                            tipoMaquinaria.id = Number(tipoMaquinariaR.id);
                            tipoMaquinaria.costo = tipoMaquinariaR.costo;
                            tipoMaquinaria.cantidad = tipoMaquinariaR.cantidad;

                            

                            if(tipoMaquinaria.id!=0){
                               fase.tipoMaquinaria.push(tipoMaquinaria);
                            }
                            else{
                                fase.tipoMaquinaria.shift();
                            }
                        });

                        
                        if((fase.nombre!=null) && (fase.nombre != '')){
                           etapa.fases.push(fase);
                        }
                        else{
                            etapa.fases.shift();
                        }
                    }
                });
                
                if((etapa.nombre!=null) && (etapa.nombre != '')){
                    info.etapas.push(etapa);
                }
                else{
                    info.etapas.shift();
                }
                


            }
        });

        console.log(info);

    }




    handleOnChangeCostoTipoMaq=(event,etapaNum,faseNum,tipoMaqNum)=>{
        const value = event.target.value;
        const valueTrimmed = value.trim();
        const etapas1= this.state.etapas;

        

        if(valueTrimmed){
            event.target.state='valid';
             console.log("valido",document.getElementById('YacimientosCostoTextTipoMaquinaria'+etapaNum+faseNum+tipoMaqNum).innerHTML);

            if(!isNaN(valueTrimmed) && (Number(valueTrimmed)>-1) ){
                document.getElementById('YacimientosCostoTextTipoMaquinaria'+etapaNum+faseNum+tipoMaqNum).innerHTML = "Obligatorio";
                etapas1[etapaNum-1].fases[faseNum-1].tipoMaquinaria[tipoMaqNum].costo=Number(valueTrimmed);
                
                this.setState(() => ({
                    etapas: etapas1
                    
                }));
                console.log('Costo Maquinaria', this.state.etapas[etapaNum-1].fases[faseNum-1].tipoMaquinaria[tipoMaqNum].costo);
                this.actualizarCostos();
            }
            else{
                
                document.getElementById('YacimientosCostoTextTipoMaquinaria'+etapaNum+faseNum+tipoMaqNum).innerHTML = "Introduzca un número válido";
                etapas1[etapaNum-1].fases[faseNum-1].tipoMaquinaria[tipoMaqNum].costo=0;
                this.actualizarCostos();
            }
           
        }
        else{
            event.target.state='invalid';
            document.getElementById('YacimientosCostoTextTipoMaquinaria'+etapaNum+faseNum+tipoMaqNum).innerHTML = "Introduzca un número válido";
              console.log("invalido");
        }
        
        if(!value){
            event.target.state='';
            document.getElementById('YacimientosCostoTextTipoMaquinaria'+etapaNum+faseNum+tipoMaqNum).innerHTML = "Obligatorio";
            etapas1[etapaNum-1].fases[faseNum-1].tipoMaquinaria[tipoMaqNum].costo=0;
            this.actualizarCostos();
        }
        
         

    }

    handleOnChangeCantidadTipoMaq=(event,etapaNum,faseNum,tipoMaqNum)=>{
        const value = event.target.value;
        const valueTrimmed = value.trim();
        const etapas1= this.state.etapas;

        

        if(valueTrimmed){
            event.target.state='valid';
             console.log("valido",document.getElementById('YacimientosCantidadTextTipoMaquinaria'+etapaNum+faseNum+tipoMaqNum).innerHTML);

            if(!isNaN(valueTrimmed) && (Number(valueTrimmed)>0) && (Number.isInteger(Number(valueTrimmed))) ){
                document.getElementById('YacimientosCantidadTextTipoMaquinaria'+etapaNum+faseNum+tipoMaqNum).innerHTML = "Obligatorio";
                etapas1[etapaNum-1].fases[faseNum-1].tipoMaquinaria[tipoMaqNum].cantidad=Number(valueTrimmed);
                
                this.setState(() => ({
                    etapas: etapas1
                    
                }));
                this.actualizarCostos();
            }
            else{
                
                document.getElementById('YacimientosCantidadTextTipoMaquinaria'+etapaNum+faseNum+tipoMaqNum).innerHTML = "Introduzca un número válido";
                etapas1[etapaNum-1].fases[faseNum-1].tipoMaquinaria[tipoMaqNum].cantidad=0;
                this.actualizarCostos();
            }
           
        }
        else{
            event.target.state='invalid';
            document.getElementById('YacimientosCantidadTextTipoMaquinaria'+etapaNum+faseNum+tipoMaqNum).innerHTML = "Introduzca un número válido";
              console.log("invalido");
        }
        
        if(!value){
            event.target.state='';
            document.getElementById('YacimientosCantidadTextTipoMaquinaria'+etapaNum+faseNum+tipoMaqNum).innerHTML = "Obligatorio";
            etapas1[etapaNum-1].fases[faseNum-1].tipoMaquinaria[tipoMaqNum].cantidad=0;
            this.actualizarCostos();
        }
        

    }




    handleOnChangeSueldoCargo=(event,etapaNum,faseNum,cargoNum)=>{
        const value = event.target.value;
        const valueTrimmed = value.trim();
        const etapas1= this.state.etapas;

        

        if(valueTrimmed){
            event.target.state='valid';
             console.log("valido",document.getElementById('YacimientosSueldoTextCargo'+etapaNum+faseNum+cargoNum).innerHTML);

            if(!isNaN(valueTrimmed) && (Number(valueTrimmed)>-1) ){
                document.getElementById('YacimientosSueldoTextCargo'+etapaNum+faseNum+cargoNum).innerHTML = "Obligatorio";
                etapas1[etapaNum-1].fases[faseNum-1].cargos[cargoNum].sueldo=Number(valueTrimmed);
                
                this.setState(() => ({
                    etapas: etapas1
                    
                }));
                console.log('Costo Maquinaria', this.state.etapas[etapaNum-1].fases[faseNum-1].cargos[cargoNum].sueldo);
                this.actualizarCostos();
            }
            else{
                
                document.getElementById('YacimientosSueldoTextCargo'+etapaNum+faseNum+cargoNum).innerHTML = "Introduzca un número válido";
                etapas1[etapaNum-1].fases[faseNum-1].cargos[cargoNum].sueldo=0;
                this.actualizarCostos();
            }
           
        }
        else{
            event.target.state='invalid';
            document.getElementById('YacimientosSueldoTextCargo'+etapaNum+faseNum+cargoNum).innerHTML = "Introduzca un número válido";
              console.log("invalido");
        }
        
        if(!value){
            event.target.state='';
            document.getElementById('YacimientosSueldoTextCargo'+etapaNum+faseNum+cargoNum).innerHTML = "Obligatorio";
            etapas1[etapaNum-1].fases[faseNum-1].cargos[cargoNum].sueldo=0;
            this.actualizarCostos();
        }
    }





    handleOnChangeCantidadCargo=(event,etapaNum,faseNum,cargoNum)=>{
        const value = event.target.value;
        const valueTrimmed = value.trim();
        const etapas1= this.state.etapas;

        

        if(valueTrimmed){
            event.target.state='valid';
             console.log("valido",document.getElementById('YacimientosCantidadTextCargo'+etapaNum+faseNum+cargoNum).innerHTML);

            if(!isNaN(valueTrimmed) && (Number(valueTrimmed)>0) && (Number.isInteger(Number(valueTrimmed))) ){
                document.getElementById('YacimientosCantidadTextCargo'+etapaNum+faseNum+cargoNum).innerHTML = "Obligatorio";
                etapas1[etapaNum-1].fases[faseNum-1].cargos[cargoNum].cantidad=Number(valueTrimmed);
                
                this.setState(() => ({
                    etapas: etapas1
                    
                }));
                this.actualizarCostos();
            }
            else{
                
                document.getElementById('YacimientosCantidadTextCargo'+etapaNum+faseNum+cargoNum).innerHTML = "Introduzca un número válido";
                etapas1[etapaNum-1].fases[faseNum-1].cargos[cargoNum].cantidad=0;
                this.actualizarCostos();
            }
           
        }
        else{
            event.target.state='invalid';
            document.getElementById('YacimientosCantidadTextCargo'+etapaNum+faseNum+cargoNum).innerHTML = "Introduzca un número válido";
              console.log("invalido");
        }
        
        if(!value){
            event.target.state='';
            document.getElementById('YacimientosCantidadTextCargo'+etapaNum+faseNum+cargoNum).innerHTML = "Obligatorio";
            etapas1[etapaNum-1].fases[faseNum-1].cargos[cargoNum].cantidad=0;
            this.actualizarCostos();
        }
        

    }

    actualizarCostos=()=>{
        let etapas1 = this.state.etapas;
        let explotacion1 = this.state.explotacion;
        explotacion1.costo = 0;
        etapas1.forEach((etapaR)=>{
            etapaR.costo=0;
            if(etapaR.numero != 0){
                etapaR.fases.forEach((faseR)=>{
                    faseR.costo=0;
                    if(faseR.numero!=0){
                        console.log('tipo maqui costo atualizacion', faseR.cargos);
                        faseR.cargos.forEach((cargoR)=>{
                            faseR.costo += Math.round(parseFloat(cargoR.sueldo * cargoR.cantidad)*100)/100;
                            console.log('tipoualizacion', cargoR.sueldo);
                        });

                        faseR.tipoMaquinaria.forEach((tipoMaquinariaR)=>{

                            faseR.costo += Math.round(parseFloat(tipoMaquinariaR.costo * tipoMaquinariaR.cantidad)*100)/100;

                        });

                        etapaR.costo += faseR.costo;
                    }
                });
                explotacion1.costo += etapaR.costo;
            }
        });

        this.setState(() => ({
            etapas: etapas1,
            explotacion: explotacion1
                    
        }));
        console.log('CostoTotal', this.state.explotacion.costo);
    }





    handleOnChangeDuracionFase=(event,etapaNum,faseNum)=>{
        const value = event.target.value;
        const valueTrimmed = value.trim();
        const etapas1= this.state.etapas;

        

        if(valueTrimmed){
            event.target.state='valid';
             console.log("valido",document.getElementById('YacimientosDuracionTextEtapaFase'+etapaNum+faseNum).innerHTML);

            if(!isNaN(valueTrimmed) && (Number(valueTrimmed)>0) && (Number.isInteger(Number(valueTrimmed))) ){
                document.getElementById('YacimientosDuracionTextEtapaFase'+etapaNum+faseNum).innerHTML = "Obligatorio";
                etapas1[etapaNum-1].fases[faseNum-1].duracion=Number(valueTrimmed);
                
                this.setState(() => ({
                    etapas: etapas1
                    
                }));
                this.actualizarDuracion();
            }
            else{
                
                document.getElementById('YacimientosDuracionTextEtapaFase'+etapaNum+faseNum).innerHTML = "Introduzca un número válido";
                etapas1[etapaNum-1].fases[faseNum-1].duracion=0;
                this.actualizarDuracion();
            }
           
        }
        else{
            event.target.state='invalid';
            document.getElementById('YacimientosDuracionTextEtapaFase'+etapaNum+faseNum).innerHTML = "Introduzca un número válido";
              console.log("invalido");
        }
        
        if(!value){
            event.target.state='';
            document.getElementById('YacimientosDuracionTextEtapaFase'+etapaNum+faseNum).innerHTML = "Obligatorio";
            etapas1[etapaNum-1].fases[faseNum-1].duracion=0;
            this.actualizarDuracion();
        }
        

    }




    actualizarDuracion=()=>{
        let etapas1 = this.state.etapas;
        let explotacion1 = this.state.explotacion;

        explotacion1.duracion = 0;
        etapas1.forEach((etapaR)=>{
            etapaR.duracion=0;
            if(etapaR.numero != 0){
                etapaR.fases.forEach((faseR)=>{
                    if(faseR.numero!=0){
                        etapaR.duracion += faseR.duracion;
                    }
                });
                explotacion1.duracion += etapaR.duracion;
            }
        });

        this.setState(() => ({
            etapas: etapas1,
            explotacion: explotacion1
                    
        }));
        console.log('Duracion Total', this.state.explotacion.duracion);

    }



    
    handleOnChangeMineral=(event,minNUm)=>{
        const value = event.target.value;
        const valueTrimmed = value.trim();
        const minerales= this.state.Minerales;

        if(valueTrimmed){
            event.target.state='valid';
            console.log("validoMineral",document.getElementById('YacimientosTotalTextMineral'+minNUm).innerHTML);

            if(!isNaN(valueTrimmed) && (Number(valueTrimmed)>0)  ){
                document.getElementById('YacimientosTotalTextMineral'+minNUm).innerHTML = "Obligatorio";
                
            }
            else{
                
                document.getElementById('YacimientosTotalTextMineral'+minNUm).innerHTML = "Introduzca un número válido";
               
            }
           
        }
        else{
            event.target.state='invalid';
            document.getElementById('YacimientosTotalTextMineral'+minNUm).innerHTML = "Introduzca un número válido";
              console.log("invalido");
        }
        
        if(!value){
            event.target.state='';
            document.getElementById('YacimientosTotalTextMineral'+minNUm).innerHTML = "Obligatorio";
           
        }
    }



   


    handleOnChangeMineralNo=(event,minNUm)=>{
        const value = event.target.value;
        const valueTrimmed = value.trim();
        const minerales= this.state.MineralesNoMetalicos;

        if(valueTrimmed){
            event.target.state='valid';
            console.log("validoMineral",document.getElementById('YacimientosTotalTextMineralNoMetalico'+minNUm).innerHTML);

            if(!isNaN(valueTrimmed) && (Number(valueTrimmed)>0)  ){
                document.getElementById('YacimientosTotalTextMineralNoMetalico'+minNUm).innerHTML = "Obligatorio";
                
            }
            else{
                
                document.getElementById('YacimientosTotalTextMineralNoMetalico'+minNUm).innerHTML = "Introduzca un número válido";
               
            }
           
        }
        else{
            event.target.state='invalid';
            document.getElementById('YacimientosTotalTextMineralNoMetalico'+minNUm).innerHTML = "Introduzca un número válido";
              console.log("invalido");
        }
        
        if(!value){
            event.target.state='';
            document.getElementById('YacimientosTotalTextMineralNoMetalico'+minNUm).innerHTML = "Obligatorio";
           
        }
    }


    







    handleOnChangeValidarNumeros=(event,Texto)=>{
        const value = event.target.value;
        const valueTrimmed = value.trim();

        if(valueTrimmed){
            event.target.state='valid';
            

            if(!isNaN(valueTrimmed) && (Number(valueTrimmed)>0)  ){
                document.getElementById(Texto).innerHTML = "Obligatorio";
                
            }
            else{
                
                document.getElementById(Texto).innerHTML = "Introduzca un número válido";
               
            }
           
        }
        else{
            event.target.state='invalid';
            document.getElementById(Texto).innerHTML = "Introduzca un número válido";
            console.log("invalido");
        }
        
        if(!value){
            event.target.state='';
            document.getElementById(Texto).innerHTML = "Obligatorio";
           
        }
    }

     handleOnChangeValidarTexto=(event,Texto,Mensaje)=>{
        const value = event.target.value;
        const valueTrimmed = value.trim();

        if(valueTrimmed){
            event.target.state='valid';
            document.getElementById(Texto).innerHTML = "Obligatorio";
            document.getElementById(Texto).classList.remove("invalidText");
            event.target.classList.remove("invalid");

           
        }
        else{
            event.target.state='invalid';
            document.getElementById(Texto).innerHTML = Mensaje;
            document.getElementById(Texto).classList.add("invalidText");
            event.target.classList.add("invalid");
            console.log('clases',event.target.classList);
        
        }
        
        if(!value){
            event.target.state='';
            document.getElementById(Texto).innerHTML = "Obligatorio";
            event.target.classList.add("invalid");
           
        }
    }

    handleOnClickEstatus=(event)=>{
        console.log("estado anterior", this.state.estatus);
        this.state.estatus.nombre = event.target.value;
        this.state.estatus.id = null;
        console.log("estado posterior", this.state.estatus);

    }


    render(){
        
       
        return ( 
            <div className="contain pagecontent" id="Content">
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario="Diego Gutiérrez"/>
  
                <Container className="FormContainer">
                   

                    <FormTitulo titulo="Modificar Yacimiento" tamaño="BIG"/>
                     
                    <Accordion defaultActiveKey={1} >
                        <Card className="CardAcc">
                            <Accordion.Toggle as={Card.Header} eventKey={this.state.accordionKey[0]} onClick={() => this.accordionf(0)} className="accordion borderacc">
                              
                                <FormTitulo titulo="Información General"/>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={1} >
                                <Card.Body className="BodyAcc">




                                    <Form.Row className="formMargins">
                                        <Form.Group as={Col} md="6" controlId="YacimientosEstatusYacimiento"  className="inputsPaddingRight">
                                            <Form.Label className="cliente-description-fields-text">Estatus</Form.Label>
                                            <Form.Control 
                                            as="select" 
                                            className="form-input"
                                            defaultValue={this.state.estatus.nombre}
                                            onClick={(evt)=>this.handleOnClickEstatus(evt)}
                                            >
                                                <option value="Activo">Activo</option>
                                                <option value="En Explotación">En Explotación</option>
                                            </Form.Control>
                                            <Form.Text className="text-muted">
                                                Obligatorio
                                            </Form.Text>    
                                        </Form.Group>
                                    </Form.Row>


                                    



                                    <Form.Row className="formMargins">
                                        <Form.Group as={Col} md="6" onChange={(evt)=>this.handleOnChangeValidarTexto(evt,"YacimientosNombreYacimientoText","Introduzca un nombre válido")} controlId="YacimientosNombreYacimiento" className="inputsPaddingRight">
                                            <Form.Label className="cliente-description-fields-text">Nombre</Form.Label>
                                            <Form.Control type="text" className="form-input" defaultValue={this.state.yacimiento.nombre} placeholder="Introduzca nombre del yacimiento" />
                                            <Form.Text className="text-muted" id="YacimientosNombreYacimientoText">
                                                Obligatorio
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" onChange={(evt)=>this.handleOnChangeValidarTexto(evt,"YacimientosDescripcionYacimientoText","Introduzca una descripción válida")} controlId="YacimientosDescripcionYacimiento" className="inputsPaddingLeft">
                                            <Form.Label className="cliente-description-fields-text">Descripción</Form.Label>
                                            <Form.Control as="textarea" rows="1" className="form-input-juridico-textarea" defaultValue={this.state.yacimiento.descripcion} placeholder="Introduzca una descripción"/>
                                            <Form.Text className="text-muted" id="YacimientosDescripcionYacimientoText">
                                                Obligatorio
                                            </Form.Text>
                                        </Form.Group>   
                                    </Form.Row>
                                          
                                    
                                    <Form.Row className="formMargins">
                                        <Form.Group as={Col} md="6" onChange={(evt)=>this.handleOnChangeValidarNumeros(evt,"YacimientosTamañoYacimientoText")} controlId="YacimientosTamañoYacimiento"  className="inputsPaddingRight">
                                            <Form.Label className="cliente-description-fields-text">Área</Form.Label>
                                            <InputGroup className="MyInputGroup">
                                                <Form.Control type="text" className="form-input" defaultValue={this.state.yacimiento.area} placeholder="Introduzca tamaño del yacimiento" /> 
                                                <InputGroup.Append>
                                                    <InputGroup.Text  className="input-append-ventas-form" >Km<sup>2</sup></InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <Form.Text className="text-muted" id="YacimientosTamañoYacimientoText">
                                                Obligatorio
                                            </Form.Text>    
                                        </Form.Group>
                                        <FormFecha titulo="Fecha de Registro" clase="inputsPaddingLeft" dia={this.state.yacimiento.fecha.dia} mes={this.state.yacimiento.fecha.mes} ano={this.state.yacimiento.fecha.ano} disabled={true}/>    
                                    </Form.Row>

                                    <Form.Row className="formMargins">
                                        <Form.Group as={Col} md="6" controlId="YacimientosTipoYacimiento"  className="inputsPaddingRight">
                                            <Form.Label className="cliente-description-fields-text">Tipo de Yacimiento</Form.Label>
                                            <Form.Control 
                                            as="select" 
                                            className="form-input"
                                            defaultValue={this.state.yacimiento.tipo}
                                            >
                                                <option value="Alóctono">Alóctono</option>
                                                <option value="Autóctono">Autóctono</option>
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
                                    <FormLugarPred idParroquia={this.state.yacimiento.ubicacion.idParroquia} predet={true} accion='M'/>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>






                    <Accordion defaultActiveKey={1} >
                        <Card className="CardAcc">
                            <Accordion.Toggle as={Card.Header} eventKey={this.state.accordionKey[2]} onClick={() => this.accordionf(2)} className="accordion borderacc">
                                <FormTitulo titulo="Minerales Metálicos"/>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={1} >
                                <Card.Body className="BodyAcc">
                    
                                    <Row>
                                        <Col sm={0} md={1}></Col>
                                        <Col sm={12} md={10}>
                                            <DataTable
                                                selectCheck={this.selectFunctionCheckbox}
                                                modificarCheck={true}
                                                listaModificarCheck={this.state.mineralId}
                                                agregar={false}
                                                modificar={false}
                                                consultar={false}
                                                eliminar={false}

                                                columns={'http://localhost:3000/column_names/mu_mineral_metalico'} 
                                                data={'http://localhost:3000/getAllMineralesMetalicos'}

                                                url={'consultar_empleado/:'}
                                                checktable={true}
                                                textoSingular={'mineral metálico'}
                                                textoPlural={'minerales metálicos'}
                                                size={200}
                                                etapa={0}
                                                fase={0}
                                            />
                                        </Col>
                                        <Col sm={0} md={1}></Col>
                                    </Row>
                                    <Container>
                                        {this.state.Minerales.map((mineral,indexMin)=>{             
                                            return(
                                                <div style={{display: this.state.mineralShow}}>
                                                    <Accordion defaultActiveKey={1} >
                                                        <Card className="CardAcc">
                                                            <Accordion.Toggle as={Card.Header} eventKey={mineral.accordionKey} onClick={() => this.accordionM(indexMin)} className="accordion borderacc">
                                                                <FormTitulo titulo={mineral.nombre}/>
                                                            </Accordion.Toggle>
                                                            <Accordion.Collapse eventKey={1} >
                                                                <Card.Body className="BodyAcc">
                                                                    <Form.Row className="formMargins">
                                                                    
                                                                    </Form.Row>
                                                                    <Form.Row className="formMargins">
                                                                        <Form.Group as={Col} md="12" onChange={(evt)=>this.handleOnChangeMineral(evt,mineral.id)} controlId={'YacimientosTotalMineral'+mineral.id}  className="inputsPaddingRight">
                                                                            <Form.Label className="cliente-description-fields-text">Total</Form.Label>
                                                                            <InputGroup className="MyInputGroup">
                                                                                <Form.Control type="text" className="form-input" defaultValue={mineral.total} placeholder="Introduzca cantidad" /> 
                                                                                <InputGroup.Append>
                                                                                    <InputGroup.Text  className="input-append-ventas-form" >Kg</InputGroup.Text>
                                                                                </InputGroup.Append>
                                                                            </InputGroup>
                                                                            <Form.Text className="text-muted" id={'YacimientosTotalTextMineral'+mineral.id}>
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
                            <Accordion.Toggle as={Card.Header} eventKey={this.state.accordionKey[2]} onClick={() => this.accordionf(2)} className="accordion borderacc">
                                <FormTitulo titulo="Minerales No Metálicos"/>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={1} >
                                <Card.Body className="BodyAcc">
                    
                                    <Row>
                                        <Col sm={0} md={1}></Col>
                                        <Col sm={12} md={10}>
                                            <DataTable
                                                selectCheck={this.selectFunctionCheckbox}
                                                modificarCheck={true}
                                                listaModificarCheck={this.state.mineralNoMetalicoId}
                                                agregar={false}
                                                modificar={false}
                                                consultar={false}
                                                eliminar={false}

                                                columns={'http://localhost:3000/column_names/mu_mineral_no_metalico'} 
                                                data={'http://localhost:3000/getAllMineralesNoMetalicos'}

                                                url={'consultar_empleado/:'}
                                                checktable={true}
                                                textoSingular={'mineral no metálico'}
                                                textoPlural={'minerales no metálicos'}
                                                size={200}
                                                etapa={0}
                                                fase={0}
                                            />
                                        </Col>
                                        <Col sm={0} md={1}></Col>
                                    </Row>
                                    <Container>
                                        {this.state.MineralesNoMetalicos.map((mineral,indexMin)=>{             
                                            return(
                                                <div style={{display: this.state.mineralNoMetalicoShow}}>
                                                    <Accordion defaultActiveKey={1} >
                                                        <Card className="CardAcc">
                                                            <Accordion.Toggle as={Card.Header} eventKey={mineral.accordionKey} onClick={() => this.accordionMNM(indexMin)} className="accordion borderacc">
                                                                <FormTitulo titulo={mineral.nombre}/>
                                                            </Accordion.Toggle>
                                                            <Accordion.Collapse eventKey={1} >
                                                                <Card.Body className="BodyAcc">
                                                                    <Form.Row className="formMargins">
                                                                   
                                                                    </Form.Row>
                                                                    <Form.Row className="formMargins">
                                                                        <Form.Group as={Col} md="12" onChange={(evt)=>this.handleOnChangeMineralNoMetalico(evt,mineral.id)} controlId={'YacimientosTotalMineralNoMetalico'+mineral.id}  className="inputsPaddingRight">
                                                                            <Form.Label className="cliente-description-fields-text">Total</Form.Label>
                                                                            <InputGroup className="MyInputGroup">
                                                                                <Form.Control type="text" className="form-input" defaultValue={mineral.total} placeholder="Introduzca cantidad" /> 
                                                                                <InputGroup.Append>
                                                                                    <InputGroup.Text  className="input-append-ventas-form" >Kg</InputGroup.Text>
                                                                                </InputGroup.Append>
                                                                            </InputGroup>
                                                                            <Form.Text className="text-muted" id={'YacimientosTotalTextMineralNoMetalico'+mineral.id}>
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
                                <FormTitulo titulo="Configuración de explotación" />
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={1} >
                                <Card.Body className="BodyAcc">
                                    
                                    <Form.Row className="formMargins">
                                        <Form.Group as={Col} md="6" controlId={'YacimientosDuracionInfoExplotacion'} className="inputsPaddingRight">
                                            <Form.Label className="cliente-description-fields-text">Duración de la Explotación</Form.Label>
                                            <InputGroup className="MyInputGroup">
                                                <Form.Control type="text" className="form-input"  placeholder={this.state.explotacion.duracion} disabled/> 
                                                <InputGroup.Append>
                                                    <InputGroup.Text  className="input-append-ventas-form" >días</InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <Form.Text className="text-muted">
                                                Calculado
                                            </Form.Text> 
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId={'YacimientosCostoInfoExplotacion'} className="inputsPaddingLeft">
                                            <Form.Label className="cliente-description-fields-text">Costo Total de la Explotación</Form.Label>
                                            <InputGroup className="MyInputGroup">
                                                <Form.Control type="text" className="form-input" placeholder={this.state.explotacion.costo} disabled  /> 
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
                                        {this.state.etapas.map((etapa,indexe)=>{
                                            if (etapa.etapaShow === true) 
                                            return(

                                                <Tab eventKey={etapa.nombre} title={etapa.nombre} key={indexe}>
                                                    <Button variant="outline-danger" className="btn-eliminar" onClick={() => this.handleOnClickEEtapa(etapa.numeroV)} disabled={this.state.eliminar}>Eliminar</Button>
                                                    <Container>
                                                   
                                                        <FormTitulo titulo={"Información General de la Etapa "+etapa.numero}/>
                                                        <Form.Row className="formMargins">
                                                            <Form.Group as={Col} md="6" onChange={(evt)=>this.handleOnChangeValidarTexto(evt,'YacimientosNombreTextEtapa'+etapa.numeroV,"Introduzca un nombre válido")} controlId={'YacimientosNombreEtapa'+etapa.numeroV} className="inputsPaddingRight">
                                                                <Form.Label className="cliente-description-fields-text">Nombre</Form.Label>
                                                                <Form.Control type="text" defaultValue={etapa.nombreV} className="form-input" placeholder="Introduzca nombre de la etapa" />
                                                                <Form.Text className="text-muted" id={'YacimientosNombreTextEtapa'+etapa.numeroV}>
                                                                    Obligatorio
                                                                </Form.Text>
                                                            </Form.Group>
                                                            
                                                        </Form.Row>
                                                        <Form.Row className="formMargins">
                                                            <Form.Group as={Col} md="6" controlId={'YacimientosDuracionEtapa'+etapa.numeroV}className="inputsPaddingRight">
                                                                <Form.Label className="cliente-description-fields-text">Duración de la Etapa</Form.Label>
                                                                <InputGroup className="MyInputGroup">
                                                                    <Form.Control type="text" className="form-input" placeholder={etapa.duracion} disabled/> 
                                                                    <InputGroup.Append>
                                                                        <InputGroup.Text  className="input-append-ventas-form" >días</InputGroup.Text>
                                                                    </InputGroup.Append>
                                                                </InputGroup>
                                                                <Form.Text className="text-muted">
                                                                    Calculado
                                                                </Form.Text> 
                                                            </Form.Group>
                                                            <Form.Group as={Col} md="6" controlId={'YacimientosCostoEtapa'+etapa.numeroV} className="inputsPaddingLeft">
                                                                 <Form.Label className="cliente-description-fields-text">Costo Total de la Etapa</Form.Label>
                                                                <InputGroup className="MyInputGroup">
                                                                    <Form.Control type="text" className="form-input" placeholder={etapa.costo} disabled /> 
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
                                                        <Button variant="outline-primary" className="btn-agregar" onClick={() => this.handleOnClickAFase(etapa.numeroV)}>Agregar Fase</Button>
                                                        <Tabs
                                                            id="controlled-tab-example"
                                                            defaultActiveKey={this.state.etapas[etapa.numeroV-1].key}
                                                            onClick={this.prueba}
                                                        >
                                                            {this.state.etapas[etapa.numeroV-1].fases.map((fase,indexf)=>{
                                                                console.log()        

                                                                if (fase.faseShow === true) 

                                                                    return(    
                                                                    <Tab eventKey={fase.nombre}  title={fase.nombre} key={indexf}>
                                                                        <Button variant="outline-danger" onClick={() => this.handleOnClickEFase(etapa.numeroV,fase.numeroV)} className="btn-eliminar" disabled={etapa.eliminar}>Eliminar</Button>
                                                                        <Container>
                                                                            <FormTitulo titulo={"Información General de la Fase "+fase.numero}/>
                                                                            <Form.Row className="formMargins">
                                                                                <Form.Group as={Col} md="6" onChange={(evt)=>this.handleOnChangeValidarTexto(evt,'YacimientosNombreTextEtapaFase'+etapa.numeroV+fase.numeroV,"Introduzca un nombre válido")} controlId={'YacimientosNombreEtapaFase'+etapa.numeroV+fase.numeroV} className="inputsPaddingRight">
                                                                                    <Form.Label className="cliente-description-fields-text">Nombre</Form.Label>
                                                                                    <Form.Control type="text" defaultValue={fase.nombreV} className="form-input" placeholder="Introduzca nombre de la fase" />
                                                                                    <Form.Text className="text-muted" id={'YacimientosNombreTextEtapaFase'+etapa.numeroV+fase.numeroV}>
                                                                                        Obligatorio
                                                                                    </Form.Text>
                                                                                </Form.Group>
                                                                               
                                                                            </Form.Row>
                                                                            <Form.Row className="formMargins">
                                                                                <Form.Group as={Col} md="6" onChange={(evt)=>this.handleOnChangeDuracionFase(evt,etapa.numeroV,fase.numeroV)} controlId={'YacimientosDuracionEtapaFase'+etapa.numeroV+fase.numeroV} className="inputsPaddingRight">
                                                                                    <Form.Label className="cliente-description-fields-text">Duración de la Fase</Form.Label>
                                                                                    <InputGroup className="MyInputGroup">
                                                                                        <Form.Control type="text" className="form-input" defaultValue={fase.duracion} placeholder="Introduzca la duración de la fase"/> 
                                                                                        <InputGroup.Append>
                                                                                            <InputGroup.Text  className="input-append-ventas-form" placeholder="Introduzca la duración de la fase" >días</InputGroup.Text>
                                                                                        </InputGroup.Append>
                                                                                    </InputGroup>
                                                                                    <Form.Text className="text-muted" id={'YacimientosDuracionTextEtapaFase'+etapa.numeroV+fase.numeroV}>
                                                                                        Obligatorio
                                                                                    </Form.Text> 
                                                                                </Form.Group>
                                                                                <Form.Group as={Col} md="6" controlId={'YacimientosCostoEtapaFase'+etapa.numeroV+fase.numeroV} className="inputsPaddingLeft">
                                                                                     <Form.Label className="cliente-description-fields-text">Costo Total de la Fase</Form.Label>
                                                                                    <InputGroup className="MyInputGroup">
                                                                                        <Form.Control type="text" className="form-input"  placeholder={fase.costo} disabled /> 
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
                                                                            {console.log("Aquiiiii",etapa.numeroV)}
                                                                                    <Col sm={0} md={1}></Col>
                                                                                    <Col sm={12} md={10}>
                                                                                        <DataTable

                                                                                            selectCheck={this.selectFunctionCheckbox}

                                                                                            modificarCheck={fase.checkInicialCargos}
                                                                                            listaModificarCheck={fase.cargosId}

                                                                                            agregar={false}
                                                                                            modificar={false}
                                                                                            consultar={false}
                                                                                            eliminar={false}
                                                                                            columns={'http://localhost:3000/column_names/mu_cargo'} 
                                                                                            data={'http://localhost:3000/getAllCargos'}
                                                                                            size={200}
                                                                                            url={'consultar_empleado/:'}
                                                                                            checktable={true}
                                                                                            textoSingular={'cargo'}
                                                                                            textoPlural={'cargos'}
                                                                                            etapa={etapa.numeroV}
                                                                                            fase={fase.numeroV}
                                                                                            nombreDT={this.props.nombreDT}
                                                                                        />
                                                                                       
                                                                                    </Col>
                                                                                    <Col sm={0} md={1}></Col>
                                                                            </Row>
                                                                            <Container>
                                                                            {fase.cargos.map((cargo,indexcar)=>{             
                                                                                return(
                                                                                    <div style={{display: fase.cargoShow}}>
                                                                                        <Accordion defaultActiveKey={1} >
                                                                                            <Card className="CardAcc">
                                                                                                <Accordion.Toggle as={Card.Header} eventKey={cargo.accordionKey} onClick={() => this.accordionC(indexcar,etapa.numero,fase.numero)} className="accordion borderacc">
                                                                                                    <FormTitulo titulo={cargo.nombre}/>
                                                                                                </Accordion.Toggle>
                                                                                                <Accordion.Collapse eventKey={1} >
                                                                                                    <Card.Body className="BodyAcc">

                                                                                                        <Form.Row className="formMargins">
                                                                                                            <Form.Group as={Col} md="6" onChange={(evt)=>this.handleOnChangeCantidadCargo(evt,etapa.numeroV,fase.numeroV,indexcar)} controlId={'YacimientosCantidadCargo'+etapa.numeroV+fase.numeroV+indexcar} className="inputsPaddingRight">
                                                                                                                <Form.Label className="cliente-description-fields-text">Cantidad de empleados</Form.Label>
                                                                                                                <Form.Control type="text" className="form-input" defaultValue={cargo.cantidad} placeholder="Introduzca cantidad de empleados" />
                                                                                                                <Form.Text className="text-muted" id={'YacimientosCantidadTextCargo'+etapa.numeroV+fase.numeroV+indexcar}>
                                                                                                                    Obligatorio
                                                                                                                </Form.Text>
                                                                                                            </Form.Group>
                                                                                                            <Form.Group as={Col} onChange={(evt)=>this.handleOnChangeSueldoCargo(evt,etapa.numeroV,fase.numeroV,indexcar)} md="6" controlId={'YacimientosSueldoCargo'+etapa.numeroV+fase.numeroV+indexcar} className="inputsPaddingLeft">
                                                                                                                 <Form.Label className="cliente-description-fields-text">Sueldo</Form.Label>
                                                                                                                <InputGroup className="MyInputGroup">
                                                                                                                    <Form.Control type="text" className="form-input" defaultValue={cargo.sueldo}  placeholder="Introduzca sueldo por empleado" /> 
                                                                                                                    <InputGroup.Append>
                                                                                                                        <InputGroup.Text  className="input-append-ventas-form">$</InputGroup.Text>
                                                                                                                    </InputGroup.Append>
                                                                                                                </InputGroup>
                                                                                                                <Form.Text className="text-muted" id={'YacimientosSueldoTextCargo'+etapa.numeroV+fase.numeroV+indexcar}>
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


                                                                                            modificarCheck={fase.checkInicialtipoMaquiaria}
                                                                                            listaModificarCheck={fase.tipoMaquinariaId}

                                                                                            agregar={false}
                                                                                            modificar={false}
                                                                                            consultar={false}
                                                                                            eliminar={false}
                                                                                            columns={'http://localhost:3000/column_names/mu_tipo_maquinaria'} 
                                                                                            data={'http://localhost:3000/getAllTiposMaquinaria'}
                                                                                            size={200}

                                                                                            url={'consultar_empleado/:'}
                                                                                            checktable={true}
                                                                                            textoSingular={'tipo de maquinaria'}
                                                                                            textoPlural={'tipos de maquinaria'}
                                                                                            etapa={etapa.numeroV}
                                                                                            fase={fase.numeroV}
                                                                                        />
                                                                                    </Col>
                                                                                    <Col sm={0} md={1}></Col>
                                                                            </Row>
                                                                            <Container>
                                                                            {fase.tipoMaquinaria.map((tipoMaquinaria,indexTM)=>{             
                                                                                return(
                                                                                    <div style={{display: fase.tipoMaquinariaShow}}>
                                                                                        <Accordion defaultActiveKey={1} >
                                                                                            <Card className="CardAcc">
                                                                                                <Accordion.Toggle as={Card.Header} eventKey={tipoMaquinaria.accordionKey} onClick={() => this.accordionTM(indexTM,etapa.numero,fase.numero)} className="accordion borderacc">
                                                                                                    <FormTitulo titulo={tipoMaquinaria.nombre}/>
                                                                                                </Accordion.Toggle>
                                                                                                <Accordion.Collapse eventKey={1} >
                                                                                                    <Card.Body className="BodyAcc">

                                                                                                        <Form.Row className="formMargins">
                                                                                                            <Form.Group as={Col} md="6" onChange={(evt)=>this.handleOnChangeCantidadTipoMaq(evt,etapa.numeroV,fase.numeroV,indexTM)} controlId={'YacimientosCantidadTipoMaquinaria'+etapa.numeroV+fase.numeroV+indexTM} className="inputsPaddingRight">
                                                                                                                <Form.Label className="cliente-description-fields-text">Cantidad de unidades</Form.Label>
                                                                                                                <Form.Control type="text" className="form-input" defaultValue={tipoMaquinaria.cantidad} placeholder="Introduzca cantidad de unidades" />
                                                                                                                <Form.Text id={'YacimientosCantidadTextTipoMaquinaria'+etapa.numeroV+fase.numeroV+indexTM} className="text-muted">
                                                                                                                    Obligatorio
                                                                                                                </Form.Text>
                                                                                                            </Form.Group>
                                                                                                            <Form.Group as={Col} md="6" onChange={(evt)=>this.handleOnChangeCostoTipoMaq(evt,etapa.numeroV,fase.numeroV,indexTM)} controlId={'YacimientosCostoTipoMaquinaria'+etapa.numeroV+fase.numeroV+indexTM} className="inputsPaddingLeft">
                                                                                                                 <Form.Label className="cliente-description-fields-text">Costo</Form.Label>
                                                                                                                <InputGroup className="MyInputGroup">
                                                                                                                    <Form.Control type="text" className="form-input" defaultValue={tipoMaquinaria.costo} placeholder="Introduzca costo por unidad" /> 
                                                                                                                    <InputGroup.Append>
                                                                                                                        <InputGroup.Text  className="input-append-ventas-form">$</InputGroup.Text>
                                                                                                                    </InputGroup.Append>
                                                                                                                </InputGroup>
                                                                                                                <Form.Text id={'YacimientosCostoTextTipoMaquinaria'+etapa.numeroV+fase.numeroV+indexTM} className="text-muted">
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
                    <div>
                    <Button className="RYacimiento-btn btn-block">
                        Cancelar
                    </Button>
                    <Button className="RYacimiento-btn btn-block btn-margin-izq" onClick={this.handleOnClickSubmittData}>
                        Enviar
                    </Button>
                    </div>
                </Container>
               
            </div>
        ) 
    }

}
