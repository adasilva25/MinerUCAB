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

export default class ConsultarYacimiento extends React.Component {
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
                componentes:[{
                    nombre:null,
                    id:0,
                    total:0
                }]
                
            }],
            mineralNoMetalicoId:[],
            mineralNoMetalicoShow:'inline',
            MineralesNoMetalicos:[{
                nombre:null,
                id:-1,
                total: 0,
                accordionKey:0,
                componentes:[{
                    nombre:null,
                    id:0,
                    total:0
                }]
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
            minerales:[{
                id:1,
                total: 5,
                nombre:"Epale",
                componentes:[{
                    id:1,
                    nombre:"Carbon",
                    total:5
                }, 
                {
                    id:2,
                    nombre:"Bauxita",
                    total:2
                }]
            },
            {
                id:8,
                total: 8,
                nombre:"Epale2",
                componentes:[{
                    nombre:"Clarita",
                    id:12,
                    total:52
                }, 
                {
                    nombre:"Vitrita",
                    id:1,
                    total:17
                },
                {
                    nombre:"Durita",
                    id:4,
                    total:8
                }]
            }],
            mineralesNoMetalicos:[{
                id:1,
                total: 5,
                nombre:"ICabron",
                componentes:[{
                    id:1,
                    nombre:"ICarbon",
                    total:5
                }, 
                {
                    id:2,
                    nombre:"Bauxita",
                    total:2
                }]
            },
            {
                id:8,
                total: 8,
                nombre:"Alumina",
                componentes:[{
                    nombre:"Adamantium",
                    id:12,
                    total:52
                }, 
                {
                    nombre:"Peludito",
                    id:34,
                    total:5
                },
                {
                    nombre:"Moradita",
                    id:54,
                    total:7
                }]
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
                componentes:[{
                    nombre:null,
                    id:0,
                    total:0
                }]
                
            }],
            mineralNoMetalicoId:[],
            mineralNoMetalicoShow:'inline',
            MineralesNoMetalicos:[{
                nombre:null,
                id:-1,
                total: 0,
                accordionKey:0,
                componentes:[{
                    nombre:null,
                    id:0,
                    total:0
                }]
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


        state.Minerales.shift();
        for(let i=0; i<info.minerales.length; i++){

            console.log(info.minerales[i].componentes.length);
            state.mineralId.push(info.minerales[i].id);

            let mineral={
                nombre:null,
                id:-1,
                total: 0,
                accordionKey:0,
                componentes:[{
                    nombre:null,
                    id:0,
                    total:0
                }]
                
            }

            mineral.nombre=info.minerales[i].nombre;
            mineral.id=info.minerales[i].id;
            mineral.total=info.minerales[i].total;

            

            mineral.componentes.shift();
            for(let j=0; j<info.minerales[i].componentes.length; j++){
                let componente={
                    nombre:null,
                    id:0,
                    total:0
                }

                componente.id=info.minerales[i].componentes[j].id;
                componente.nombre=info.minerales[i].componentes[j].nombre;
                componente.total=info.minerales[i].componentes[j].total;

                mineral.componentes.push(componente);
                console.log("length",info.minerales[i].componentes.length);
            }
            state.Minerales.push(mineral);
        }
        


        state.MineralesNoMetalicos.shift();
        for(let i=0; i<info.mineralesNoMetalicos.length; i++){

            console.log(info.mineralesNoMetalicos[i].componentes.length);
            state.mineralNoMetalicoId.push(info.mineralesNoMetalicos[i].id);

            let mineral={
                nombre:null,
                id:-1,
                total: 0,
                accordionKey:0,
                componentes:[{
                    nombre:null,
                    id:0,
                    total:0
                }]
                
            }

            mineral.nombre=info.mineralesNoMetalicos[i].nombre;
            mineral.id=info.mineralesNoMetalicos[i].id;
            mineral.total=Number(info.mineralesNoMetalicos[i].total);

            

            mineral.componentes.shift();
            for(let j=0; j<info.mineralesNoMetalicos[i].componentes.length; j++){
                let componente={
                    nombre:null,
                    id:0,
                    total:0
                }

                componente.id=info.mineralesNoMetalicos[i].componentes[j].id;
                componente.nombre=info.mineralesNoMetalicos[i].componentes[j].nombre;
                componente.total=Number(info.mineralesNoMetalicos[i].componentes[j].total);

                mineral.componentes.push(componente);
                console.log("length",info.mineralesNoMetalicos[i].componentes.length);
            }
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
            etapas: state.etapas
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
   
    render(){
        
       
        return ( 
            <div className="contain pagecontent" id="Content">
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario="Diego Gutiérrez"/>
  
                <Container className="FormContainer">
                   

                    <FormTitulo titulo="Consultar Yacimiento" tamaño="BIG"/>
                     
                    <Accordion defaultActiveKey={1} >
                        <Card className="CardAcc">
                            <Accordion.Toggle as={Card.Header} eventKey={this.state.accordionKey[0]} onClick={() => this.accordionf(0)} className="accordion borderacc">
                              
                                <FormTitulo titulo="Información General"/>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={1} >
                                <Card.Body className="BodyAcc">
                                    <Form.Row className="formMargins">
                                        <Form.Group as={Col} md="6"  controlId="YacimientosNombreYacimiento" className="inputsPaddingRight">
                                            <Form.Label className="cliente-description-fields-text">Nombre</Form.Label>
                                            <Form.Control disabled type="text" className="form-input" defaultValue={this.state.yacimiento.nombre} placeholder="Introduzca nombre del yacimiento" />
                                            <Form.Text className="text-muted" id="YacimientosNombreYacimientoText">
                                                Obligatorio
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" onChange={(evt)=>this.handleOnChangeValidarTexto(evt,"YacimientosDescripcionYacimientoText","Introduzca una descripción válida")} controlId="YacimientosDescripcionYacimiento" className="inputsPaddingLeft">
                                            <Form.Label className="cliente-description-fields-text">Descripción</Form.Label>
                                            <Form.Control disabled as="textarea" rows="1" className="form-input-juridico-textarea" defaultValue={this.state.yacimiento.descripcion} placeholder="Introduzca una descripción"/>
                                            <Form.Text className="text-muted" id="YacimientosDescripcionYacimientoText">
                                                Obligatorio
                                            </Form.Text>
                                        </Form.Group>   
                                    </Form.Row>
                                          
                                    
                                    <Form.Row className="formMargins">
                                        <Form.Group as={Col} md="6"  controlId="YacimientosTamañoYacimiento"  className="inputsPaddingRight">
                                            <Form.Label className="cliente-description-fields-text">Área</Form.Label>
                                            <InputGroup className="MyInputGroup">
                                                <Form.Control disabled type="text" className="form-input" defaultValue={this.state.yacimiento.area} placeholder="Introduzca tamaño del yacimiento" /> 
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
                                            <Form.Control disabled 
                                            as="select" 
                                            className="form-input"
                                            defaultValue={this.state.yacimiento.tipo}
                                            >
                                                <option value="Alóctono">Alóctono</option>
                                                <option value="Autóctono">Autóctono</option>
                                            </Form.Control >
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
                                    <FormLugarPred idParroquia={this.state.yacimiento.ubicacion.idParroquia} predet={true} accion='CO'/>
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
                                                                    {mineral.componentes.map((componente,indexComp)=>{
                                                                            
                                                                        return(
                                                                            
                                                                                <Form.Group as={Col} md="3" controlId={'YacimientosMineralComponente'+mineral.id+componente.id} className="inputsPaddingRight">
                                                                                    <Form.Label className="cliente-description-fields-text">{componente.nombre}</Form.Label>
                                                                                    <InputGroup className="MyInputGroup">
                                                                                        <Form.Control disabled type="text" className="form-input" defaultValue={componente.total} placeholder="Introduzca cantidad" /> 
                                                                                        <InputGroup.Append>
                                                                                            <InputGroup.Text  className="input-append-ventas-form" >Kg</InputGroup.Text>
                                                                                        </InputGroup.Append>
                                                                                    </InputGroup>
                                                                                    <Form.Text className="text-muted" id={'YacimientosTextMineralComponente'+mineral.id+componente.id}>
                                                                                        Obligatorio
                                                                                    </Form.Text>    
                                                                                </Form.Group>
                                                                            
                                                                        );
                                                                    })}
                                                                    </Form.Row>
                                                                    <Form.Row className="formMargins">
                                                                        <Form.Group as={Col} md="12"  className="inputsPaddingRight">
                                                                            <Form.Label className="cliente-description-fields-text">Total</Form.Label>
                                                                            <InputGroup className="MyInputGroup">
                                                                                <Form.Control disabled type="text" className="form-input" defaultValue={mineral.total} placeholder="Introduzca cantidad" /> 
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
                                                                    {mineral.componentes.map((componente,indexComp)=>{
                                                                            
                                                                        return(
                                                                            
                                                                                <Form.Group as={Col} md="3"  controlId={'YacimientosMineralNoMetalicoComponente'+mineral.id+componente.id} className="inputsPaddingRight">
                                                                                    <Form.Label className="cliente-description-fields-text">{componente.nombre}</Form.Label>
                                                                                    <InputGroup className="MyInputGroup">
                                                                                        <Form.Control disabled type="text" className="form-input" defaultValue={componente.total} placeholder="Introduzca cantidad" /> 
                                                                                        <InputGroup.Append>
                                                                                            <InputGroup.Text  className="input-append-ventas-form" >Kg</InputGroup.Text>
                                                                                        </InputGroup.Append>
                                                                                    </InputGroup>
                                                                                    <Form.Text className="text-muted" id={'YacimientosTextMineralNoMetalicoComponente'+mineral.id+componente.id}>
                                                                                        Obligatorio
                                                                                    </Form.Text>    
                                                                                </Form.Group>
                                                                            
                                                                        );
                                                                    })}
                                                                    </Form.Row>
                                                                    <Form.Row className="formMargins">
                                                                        <Form.Group as={Col} md="12"  className="inputsPaddingRight">
                                                                            <Form.Label className="cliente-description-fields-text">Total</Form.Label>
                                                                            <InputGroup className="MyInputGroup">
                                                                                <Form.Control disabled type="text" className="form-input" defaultValue={mineral.total} placeholder="Introduzca cantidad" /> 
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
                                <FormTitulo titulo="Información de explotación" />
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={1} >
                                <Card.Body className="BodyAcc">
                                    
                                    <Form.Row className="formMargins">
                                        <Form.Group as={Col} md="6" controlId={'YacimientosDuracionInfoExplotacion'} className="inputsPaddingRight">
                                            <Form.Label className="cliente-description-fields-text">Duración de la Explotación</Form.Label>
                                            <InputGroup className="MyInputGroup">
                                                <Form.Control disabled type="text" className="form-input"  placeholder={this.state.explotacion.duracion} disabled/> 
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
                                                <Form.Control disabled type="text" className="form-input" placeholder={this.state.explotacion.costo} disabled  /> 
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
                                    <br/>
                                    <Tabs
                                        id="controlled-tab-example"
                                        defaultActiveKey={this.state.key}
                                    >
                                        {this.state.etapas.map((etapa,indexe)=>{
                                            if (etapa.etapaShow === true) 
                                            return(

                                                <Tab eventKey={etapa.nombre} title={etapa.nombre} key={indexe}>
                                                    
                                                    <Container>
                                                   <br/>
                                                        <FormTitulo titulo={"Información General de la Etapa "+etapa.numero}/>
                                                        <Form.Row className="formMargins">
                                                            <Form.Group as={Col} md="6" controlId={'YacimientosNombreEtapa'+etapa.numeroV} className="inputsPaddingRight">
                                                                <Form.Label className="cliente-description-fields-text">Nombre</Form.Label>
                                                                <Form.Control disabled type="text" defaultValue={etapa.nombreV} className="form-input" placeholder="Introduzca nombre de la etapa" />
                                                                <Form.Text className="text-muted" id={'YacimientosNombreTextEtapa'+etapa.numeroV}>
                                                                    Obligatorio
                                                                </Form.Text>
                                                            </Form.Group>
                                                            
                                                        </Form.Row>
                                                        <Form.Row className="formMargins">
                                                            <Form.Group as={Col} md="6" controlId={'YacimientosDuracionEtapa'+etapa.numeroV}className="inputsPaddingRight">
                                                                <Form.Label className="cliente-description-fields-text">Duración de la Etapa</Form.Label>
                                                                <InputGroup className="MyInputGroup">
                                                                    <Form.Control disabled type="text" className="form-input" placeholder={etapa.duracion} disabled/> 
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
                                                                    <Form.Control disabled type="text" className="form-input" placeholder={etapa.costo} disabled /> 
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
                                                        <br/>
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
                                                                       
                                                                        <Container>
                                                                        <br/>
                                                                            <FormTitulo titulo={"Información General de la Fase "+fase.numero}/>
                                                                            <Form.Row className="formMargins">
                                                                                <Form.Group as={Col} md="6" controlId={'YacimientosNombreEtapaFase'+etapa.numeroV+fase.numeroV} className="inputsPaddingRight">
                                                                                    <Form.Label className="cliente-description-fields-text">Nombre</Form.Label>
                                                                                    <Form.Control disabled type="text" defaultValue={fase.nombreV} className="form-input" placeholder="Introduzca nombre de la fase" />
                                                                                    <Form.Text className="text-muted" id={'YacimientosNombreTextEtapaFase'+etapa.numeroV+fase.numeroV}>
                                                                                        Obligatorio
                                                                                    </Form.Text>
                                                                                </Form.Group>
                                                                               
                                                                            </Form.Row>
                                                                            <Form.Row className="formMargins">
                                                                                <Form.Group as={Col} md="6" controlId={'YacimientosDuracionEtapaFase'+etapa.numeroV+fase.numeroV} className="inputsPaddingRight">
                                                                                    <Form.Label className="cliente-description-fields-text">Duración de la Fase</Form.Label>
                                                                                    <InputGroup className="MyInputGroup">
                                                                                        <Form.Control disabled type="text" className="form-input" defaultValue={fase.duracion} placeholder="Introduzca la duración de la fase"/> 
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
                                                                                        <Form.Control disabled type="text" className="form-input"  placeholder={fase.costo} disabled /> 
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
                                                                                                            <Form.Group as={Col} md="6"  controlId={'YacimientosCantidadCargo'+etapa.numeroV+fase.numeroV+indexcar} className="inputsPaddingRight">
                                                                                                                <Form.Label className="cliente-description-fields-text">Cantidad de empleados</Form.Label>
                                                                                                                <Form.Control disabled type="text" className="form-input" defaultValue={cargo.cantidad} placeholder="Introduzca cantidad de empleados" />
                                                                                                                <Form.Text className="text-muted" id={'YacimientosCantidadTextCargo'+etapa.numeroV+fase.numeroV+indexcar}>
                                                                                                                    Obligatorio
                                                                                                                </Form.Text>
                                                                                                            </Form.Group>
                                                                                                            <Form.Group as={Col}  md="6" controlId={'YacimientosSueldoCargo'+etapa.numeroV+fase.numeroV+indexcar} className="inputsPaddingLeft">
                                                                                                                 <Form.Label className="cliente-description-fields-text">Sueldo</Form.Label>
                                                                                                                <InputGroup className="MyInputGroup">
                                                                                                                    <Form.Control disabled type="text" className="form-input" defaultValue={cargo.sueldo}  placeholder="Introduzca sueldo por empleado" /> 
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
                                                                                                            <Form.Group as={Col} md="6" controlId={'YacimientosCantidadTipoMaquinaria'+etapa.numeroV+fase.numeroV+indexTM} className="inputsPaddingRight">
                                                                                                                <Form.Label className="cliente-description-fields-text">Cantidad de unidades</Form.Label>
                                                                                                                <Form.Control disabled type="text" className="form-input" defaultValue={tipoMaquinaria.cantidad} placeholder="Introduzca cantidad de unidades" />
                                                                                                                <Form.Text id={'YacimientosCantidadTextTipoMaquinaria'+etapa.numeroV+fase.numeroV+indexTM} className="text-muted">
                                                                                                                    Obligatorio
                                                                                                                </Form.Text>
                                                                                                            </Form.Group>
                                                                                                            <Form.Group as={Col} md="6"  controlId={'YacimientosCostoTipoMaquinaria'+etapa.numeroV+fase.numeroV+indexTM} className="inputsPaddingLeft">
                                                                                                                 <Form.Label className="cliente-description-fields-text">Costo</Form.Label>
                                                                                                                <InputGroup className="MyInputGroup">
                                                                                                                    <Form.Control disabled type="text" className="form-input" defaultValue={tipoMaquinaria.costo} placeholder="Introduzca costo por unidad" /> 
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
                    
                    <Button className="RYacimiento-btn btn-block btn-margin-izq-vol" onClick={this.handleOnClickSubmittData}>
                        Volver
                    </Button>
                    </div>
                </Container>
               
            </div>
        ) 
    }

}