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
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import axios from 'axios';

// https://www.w3schools.com/jquery/html_removeclass.asp


const $ = require('jquery');

export default class ConsultarExplotacion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            aux: [],
            loadedexp:true,
            loadedyac:true,
            loadedetapa:true,
            loadfecha:false,
            loadfase:false,
            loadetapa:false,
            explotacion:{
                id:null,
                duracion:0,
                costo:0,
                finalizar:false,
                fechaI:{
                    dia:0,
                    mes:0,
                    ano:0
                },
                fechaF:{
                    dia:0,
                    mes:0,
                    ano:0
                },
                fechaFR:{
                    dia:0,
                    mes:0,
                    ano:0
                },
                estatus: null
            },
            yacimiento:{
                id:null,
                nombre:null,
                descripcion:null,
                area:null,
                estatus:null,
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
            minerales:[],
            mineralesNoMetalicos:[],
            etapas: [],

            eliminadosFases: [],
            dias:["Lunes","Martes","Miercoles","Jueves","Viernes"],
            actualizar:true,
            eliminar:true,
            prueba: true,
            key:"Etapa 1",
            accordionKey:[],
            mineralShow:'inline',
            mineralId:[],
            mineralNoMetalicoId:[],
            mineralNoMetalicoShow:'inline',
        }
    }

    componentWillMount = () => {
        const info = {
            yacimiento:{
                id:1,
                nombre:"Okinawa",
                descripcion:"muy mineraloso",
                estatus:null,
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
                id:2,
                duracion:41,
                costo:0,
                estatus:8,
                fechaI:{
                    dia:12,
                    mes:3,
                    ano:2019
                },
                fechaF:{
                    dia:25,
                    mes:5,
                    ano:2019
                },
                fechaFR:{
                    dia:13,
                    mes:7,
                    ano:2017
                }
            },
            etapas: [{
                id:2,
                nombre: "diego",
                duracion:10,
                costo:30,
                estatus:2,
                fechaI:{
                    dia:2,
                    mes:2,
                    ano:2
                },
                fechaF:{
                    dia:1,
                    mes:1,
                    ano:1
                },
                fechaFR:{
                    dia:14,
                    mes:8,
                    ano:2013
                },
                fases: [{
                    id:1,
                    nombre: "andrea",
                    estatus:2,
                    duracion:2,
                    costo:4,
                    checkInicialCargos:true,
                    checkInicialtipoMaquiaria:true,
                    fechaI:{
                        dia:1,
                        mes:7,
                        ano:2018
                    },
                    fechaF:{
                        dia:5,
                        mes:8,
                        ano:2010
                    },
                    fechaFR:{
                        dia:14,
                        mes:8,
                        ano:2013
                    },
                    cargos:[{
                        id:14,
                        nombre:"Geólogo",
                        sueldo:5,
                        cantidad:7,
                        empleados:[{
                            id:2,
                            nombre:"Diego",
                            ci:"jcjcsdjdj",
                            accordionKey:0,
                            sexo:"Masculino",
                            dia:"Lunes",
                            horario:[{
                                dia:"Lunes",
                                horaEntrada:"d",
                                horaSalida:null,
                                value:0,
                            },
                            {
                                dia:"Martes",
                                horaEntrada:"76",
                                horaSalida:null,
                                value:0,
                            },
                            {
                                dia:"Miercoles",
                                horaEntrada:"753",
                                horaSalida:"",
                                value:2,
                            },
                            {
                                dia:"Jueves",
                                horaEntrada:"s",
                                horaSalida:null,
                                value:2,
                            },
                            {
                                dia:"Viernes",
                                horaEntrada:"sdd",
                                horaSalida:null,
                                value:1,
                            }]
                        },
                        {
                            id:3,
                            nombre:"Alba",
                            ci:"jcjcsdjdj",
                            accordionKey:0,
                            sexo:"Femenino",
                            dia:"Lunes",
                            horario:[{
                                dia:"Lunes",
                                horaEntrada:"dgs",
                                horaSalida:null,
                                value:1,
                            },
                            {
                                dia:"Martes",
                                horaEntrada:"76",
                                horaSalida:null,
                                value:1,
                            },
                            {
                                dia:"Miercoles",
                                horaEntrada:"753",
                                horaSalida:"",
                                value:1,
                            },
                            {
                                dia:"Jueves",
                                horaEntrada:"s",
                                horaSalida:null,
                                value:0,
                            },
                            {
                                dia:"Viernes",
                                horaEntrada:"sdd",
                                horaSalida:null,
                                value:2,
                            }]
                        }],
                    }],
                    tipoMaquinaria:[{
                        id:5,
                        nombre:"Plancha",
                        costo:52,
                        cantidad:7,
                        maquinarias:[{
                            id:1,
                            serial:"edde",
                            estatus:null,
                        },
                        {
                            id:2,
                            serial:"efer",
                            estatus:null,
                        }]
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
                duracion:31,
                costo:30,
                estatus:8,
                fechaI:{
                    dia:12,
                    mes:3,
                    ano:2019
                },
                fechaF:{
                    dia:25,
                    mes:5,
                    ano:2019
                },
                fechaFR:{
                    dia:13,
                    mes:7,
                    ano:2017
                },
                fases: [{
                    nombre: "Sanchéz",
                    id:8,
                    duracion:30,
                    costo:5,
                    estatus:2,
                    checkInicialCargos:true,
                    checkInicialtipoMaquiaria:true,
                    fechaI:{
                        dia:12,
                        mes:3,
                        ano:2019
                    },
                    fechaF:{
                        dia:25,
                        mes:5,
                        ano:2019
                    },
                    fechaFR:{
                        dia:13,
                        mes:7,
                        ano:2017
                    },
                    cargos:[{
                        id:3,
                        nombre:"Administrador",
                        sueldo:8,
                        cantidad:1,
                        empleados:[],
                    },
                    {
                        id:2,
                        nombre:"Dibujante",
                        sueldo:5,
                        cantidad:9,
                        empleados:[],
                    }],
                    tipoMaquinaria:[{
                        id:6,
                        nombre:"Excavadora",
                        costo:2,
                        cantidad:8,
                        maquinarias:[{
                            id:3,
                            serial:"er",
                            estatus:null,
                        }],
                    },
                    {
                        id:1,
                        nombre:"Plancha",
                        costo:9,
                        cantidad:4,
                        maquinarias:[]
                    }]
                },
                {
                    nombre: "Albita",
                    id:4,
                    duracion:1,
                    estatus:10,
                    costo:7.2,
                    checkInicialCargos:true,
                    checkInicialtipoMaquiaria:true,
                    fechaI:{
                        dia:12,
                        mes:3,
                        ano:2019
                    },
                    fechaF:{
                        dia:25,
                        mes:5,
                        ano:2019
                    },
                    fechaFR:{
                        dia:11,
                        mes:9,
                        ano:2017
                    },
                    cargos:[{
                        id:10,
                        nombre:"Geologo",
                        sueldo:8,
                        cantidad:6,
                        empleados:[]
                    }],
                    tipoMaquinaria:[{
                        id:7,
                        nombre:"Horno",
                        costo:5,
                        cantidad:9,
                        maquinarias:[],
                    }]
                }]
            }]
        }

        let state = {
            eliminadosFases: [],
            dias:["Lunes","Martes","Miercoles","Jueves","Viernes"],
            actualizar:true,
            eliminar:true,
            prueba: true,
            key:"Etapa 1",
            estatus:{
                id:null,
                nombre:null,
            },
            explotacion:{
                id:null,
                duracion:0,
                finalizar:false,
                costo:0,
                fechaI:{
                    dia:0,
                    mes:0,
                    ano:0
                },
                fechaF:{
                    dia:0,
                    mes:0,
                    ano:0
                },
                fechaFR:{
                    dia:0,
                    mes:0,
                    ano:0
                },
            },
            yacimiento:{
                id:null,
                nombre:null,
                descripcion:null,
                area:null,
                estatus:null,
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
            etapas: []
        }

        const config = {
            headers: {
              'Content-Type': 'application/json'
            },
            responseType: 'json'
        }

        axios.get(`http://localhost:3000/getYacimientoByIdExplotacion/${this.props.match.params.id}`, config)
            .then((res) => {
                const idYacimiento = res.data[0].clave
                axios.get(`http://localhost:3000/getAllYacimientoInfoById/${idYacimiento}`, config)
            .then((res) => {
                console.log('res yac', res)
                let yacimiento = {
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
                }

                let explotacion = {
                    id:null,
                    duracion:0,
                    finalizar:false,
                    costo:0,
                    fechaI:{
                        dia:0,
                        mes:0,
                        ano:0
                    },
                    fechaF:{
                        dia:0,
                        mes:0,
                        ano:0
                    },
                    fechaFR:{
                        dia:0,
                        mes:0,
                        ano:0
                    }
                }

                const date = new Date(res.data[0].fecha_registro)
                const dia = date.getDate()
                const mes = (date.getMonth() + 1)
                const ano = date.getFullYear()

                state.yacimiento.id = idYacimiento
                state.yacimiento.nombre = res.data[0].nombre;
                state.yacimiento.descripcion = res.data[0].descripcion;
                state.yacimiento.area = res.data[0].area;
                state.yacimiento.ubicacion.estado = res.data[0].estado
                state.yacimiento.ubicacion.municipio = res.data[0].municipio
                state.yacimiento.ubicacion.parroquia = res.data[0].parroquia
                state.yacimiento.ubicacion.idParroquia = res.data[0].idparroquia
                state.yacimiento.fecha.dia = dia;
                state.yacimiento.fecha.mes = mes;
                state.yacimiento.fecha.ano = ano;

                explotacion.id = res.data[0].clave_explotacion;
                explotacion.duracion = res.data[0].duracion_explotacion;
                explotacion.costo = res.data[0].costo_explotacion;

                axios.get(`http://localhost:3000/getExplotacionInfo/${idYacimiento}`, config)
                    .then((res) => {
                        console.log('res explofoaf', res)
                            let date 
                            let dia 
                            let mes 
                            let ano 

                            explotacion.estatus = res.data[0].estatus

                            if (res.data[0].fecha_inicio){
                                console.log('entro')
                                let date = new Date(res.data[0].fecha_inicio)
                                let dia = date.getDate()
                                let mes = (date.getMonth() + 1)
                                let ano = date.getFullYear()

                                explotacion.fechaI.dia = dia
                                explotacion.fechaI.mes = mes
                                explotacion.fechaI.ano = ano
                            }

                            if (res.data[0].fecha_fin){
                                date = new Date(res.data[0].fecha_fin)
                                dia = date.getDate()
                                mes = (date.getMonth() + 1)
                                ano = date.getFullYear()

                                explotacion.fechaF.dia = dia
                                explotacion.fechaF.mes = mes
                                explotacion.fechaF.ano = ano
                            }

                            if (res.data[0].fecha_fin_real){
                                date = new Date(res.data[0].fecha_fin_real)
                                dia = date.getDate()
                                mes = (date.getMonth() + 1)
                                ano = date.getFullYear()

                                explotacion.fechaFR.dia = dia
                                explotacion.fechaFR.mes = mes
                                explotacion.fechaFR.ano = ano
                            }

                            this.setState(() => ({
                                explotacion: explotacion,
                                loadfecha:true
                            }));

                            console.log('state exp', this.state.explotacion)
                    })
                    .catch((e) => {
                        console.log('Error en axios')
                    })

                state.estatus.id = res.data[0].clave_estatus;
                state.estatus.nombre = res.data[0].estatus;
                

                this.setState(() => ({
                    estatus: state.estatus
                }));



                axios.get(`http://localhost:3000/getTipoYacimientoByIdYacimiento/${idYacimiento}`, config)
                .then((res) => {
                    console.log('res tipo', res)
                    
                    state.yacimiento.tipo = res.data[0].nombre_tipo_yacimiento
                    state.yacimiento.tipoId = res.data[0].clave_tipo_yacimiento;
                    
                    console.log('res tipo', res)

                    this.setState(() => ({
                        yacimiento: state.yacimiento
                    }));

                }).catch((e) => {
                    console.log('Error en axios')
                })

                axios.get(`http://localhost:3000/getEtapasByIdExplotacion/${explotacion.id}`, config)
                    .then((res) => {
                        let etapas = [{
                            nombre: "Etapa 1",
                            nombreV:null,
                            id:null,
                            duracion:0,
                            costo:0,
                            etapaShow:true,
                            numero: 1,
                            numeroV:1,
                            eliminar:true,
                            fechaI:{
                                dia:0,
                                mes:0,
                                ano:0
                            },
                            fechaF:{
                                dia:0,
                                mes:0,
                                ano:0
                            },
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
                                fechaI:{
                                    dia:0,
                                    mes:0,
                                    ano:0
                                },
                                fechaF:{
                                    dia:0,
                                    mes:0,
                                    ano:0
                                },
                                cargos:[{
                                    nombre:null,
                                    id:-1,
                                    sueldo:0,
                                    cantidad:0,
                                    accordionKey:0,
                                    empleadosShow:'none',
                                    empleados:[{
                                        id:-1,
                                        nombre:null,
                                        ci:null,
                                        accordionKey:0,
                                        sexo:null,
                                        dia:"Lunes",
                                        horario:[{
                                            dia:"Lunes",
                                            horaEntrada:null,
                                            horaSalida:null,
                                            value:1,
                                        },
                                        {
                                            dia:"Martes",
                                            horaEntrada:null,
                                            horaSalida:null,
                                            value:1,
                                        },
                                        {
                                            dia:"Miercoles",
                                            horaEntrada:null,
                                            horaSalida:null,
                                            value:1,
                                        },
                                        {
                                            dia:"Jueves",
                                            horaEntrada:null,
                                            horaSalida:null,
                                            value:1,
                                        },
                                        {
                                            dia:"Viernes",
                                            horaEntrada:null,
                                            horaSalida:null,
                                            value:1,
                                        }]
                                    }],
                                    
                                }],
                                tipoMaquinaria:[{
                                    nombre:null,
                                    id:-1,
                                    costo:0,
                                    cantidad:0,
                                    accordionKey:0,
                                    maquinariasShow:'none',
                                    maquinarias:[],
                                }]
            
                            }]
                        }]
                        let longitud=0;
                        res.data.forEach((item, i) => {
                            let etapa = {
                                nombre: "Etapa 1",
                                nombreV:null,
                                id:null,
                                finalizar:false,
                                estatus:null,
                                duracion:0,
                                costo:0,
                                etapaShow:true,
                                numero: 1,
                                numeroV:1,
                                eliminar:true,
                                fechaI:{
                                    dia:0,
                                    mes:0,
                                    ano:0
                                },
                                fechaF:{
                                    dia:0,
                                    mes:0,
                                    ano:0
                                },
                                fechaFR:{
                                    dia:0,
                                    mes:0,
                                    ano:0
                                },
                                key:"Fase 1",
                                fases: [{
                                    nombre: "Fase 1",
                                    nombreV:null,
                                    id:null,
                                    finalizar:false,
                                    duracion:0,
                                    estatus:null,
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
                                    fechaI:{
                                        dia:0,
                                        mes:0,
                                        ano:0
                                    },
                                    fechaF:{
                                        dia:0,
                                        mes:0,
                                        ano:0
                                    },
                                    fechaFR:{
                                        dia:0,
                                        mes:0,
                                        ano:0
                                    },
                                    cargos:[],
                                    tipoMaquinaria:[]
                
                                }]
                            }

                            etapa.id = item.clave;
                            etapa.nombreV = item.nombre;
                            etapa.costo = item.costo_total;
                            etapa.duracion = item.duracion;
                            etapa.nombre= 'Etapa '+ (i+1);
                            etapa.numero=i+1;
                            etapa.numeroV=i+1;
                            etapa.estatus = item.clave_estatus

                            let date 
                            let dia 
                            let mes 
                            let ano 

                            if (item.fecha_inicio){
                                let date = new Date(item.fecha_inicio)
                                let dia = date.getDate()
                                let mes = (date.getMonth() + 1)
                                let ano = date.getFullYear()

                                etapa.fechaI.dia = dia
                                etapa.fechaI.mes = mes
                                etapa.fechaI.ano = ano
                            }

                            if (item.fecha_fin){
                                date = new Date(item.fecha_fin)
                                dia = date.getDate()
                                mes = (date.getMonth() + 1)
                                ano = date.getFullYear()

                                etapa.fechaF.dia = dia
                                etapa.fechaF.mes = mes
                                etapa.fechaF.ano = ano
                            }

                            if (item.fecha_fin_real){
                                date = new Date(item.fecha_fin_real)
                                dia = date.getDate()
                                mes = (date.getMonth() + 1)
                                ano = date.getFullYear()

                                etapa.fechaFR.dia = dia
                                etapa.fechaFR.mes = mes
                                etapa.fechaFR.ano = ano
                            }
                            
                            etapa.fases.shift();
                            this.setState((prevState) => ({
                                etapas: prevState.etapas.concat(etapa)
                            }));

                            console.log('state et', this.state.etapas)


                            axios.get(`http://localhost:3000/getFasesByIdEtapa/${etapa.id}`, config)
                                .then((res) => {
                                    let fases = [];
                                    let longitud1=0;
                                    res.data.forEach((element, j) => {
                                        console.log('res etapa', element)

                                        let fase = {
                                            nombre: "Fase 1",
                                            nombreV:null,
                                            id:null,
                                            finalizar:false,
                                            duracion:0,
                                            estatus:null,
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
                                            fechaI:{
                                                dia:0,
                                                mes:0,
                                                ano:0
                                            },
                                            fechaF:{
                                                dia:0,
                                                mes:0,
                                                ano:0
                                            },
                                            fechaFR:{
                                                dia:0,
                                                mes:0,
                                                ano:0
                                            },
                                            cargos:[],
                                            tipoMaquinaria:[/*{     EN CASO DE ERROR QUITAR
                                                nombre:null,
                                                id:-1,
                                                costo:0,
                                                cantidad:0,
                                                estatus:null,
                                                accordionKey:0,
                                                maquinariasShow:'none',
                                                maquinariasId:[],
                                                checkInicialMaquiaria:true,
                                                maquinarias:[],
                                            }*/]
                                        }

                                        let date 
                                        let dia 
                                        let mes 
                                        let ano 

                                        if (element.fecha_inicio){
                                            let date = new Date(element.fecha_inicio)
                                            let dia = date.getDate()
                                            let mes = (date.getMonth() + 1)
                                            let ano = date.getFullYear()

                                            fase.fechaI.dia = dia
                                            fase.fechaI.mes = mes
                                            fase.fechaI.ano = ano
                                        }

                                        if (element.fecha_fin){
                                            date = new Date(element.fecha_fin)
                                            dia = date.getDate()
                                            mes = (date.getMonth() + 1)
                                            ano = date.getFullYear()

                                            fase.fechaF.dia = dia
                                            fase.fechaF.mes = mes
                                            fase.fechaF.ano = ano
                                        }

                                        if (element.fecha_fin_real){
                                            date = new Date(element.fecha_fin_real)
                                            dia = date.getDate()
                                            mes = (date.getMonth() + 1)
                                            ano = date.getFullYear()
    
                                            fase.fechaFR.dia = dia
                                            fase.fechaFR.mes = mes
                                            fase.fechaFR.ano = ano
                                        }


                                        fase.estatus = element.fk_estatus
                                        fase.id=element.clave;
                                        fase.numero=j+1;
                                        fase.numeroV=j+1;
                                        fase.nombre= 'Fase '+ (j+1);
                                        fase.nombreV=element.nombre;
                                        fase.duracion=element.duracion;
                                        fase.costo= element.costo;
                                        
                                        
                                
                                        this.setState((prevState) => ({
                                            etapas: prevState.etapas.map((etapaMap) => {
                                                if (etapaMap.id === etapa.id){
                                                    return {...etapaMap, fases: etapaMap.fases.concat(fase)}
                                                }
                                                else{
                                                    return etapaMap
                                                }
                                            })
                                        }));


                                        // fase.tipoMaquinaria.shift();
                                        axios.get(`http://localhost:3000/getTiposMaquinariaByIdFase/${fase.id}`, config)
                                            .then((res) => {
                                                res.data.forEach((item) => {
                                                    let tipoMaquinaria = {
                                                        id_tipo_maquinaria_fase: null,
                                                        nombre:null,
                                                        id:-1,
                                                        costo:0,
                                                        cantidad:0,
                                                        accordionKey:0,
                                                        checkInicialMaquiaria:true,
                                                        maquinariasShow:'inline',
                                                        maquinariasId: [],
                                                        maquinarias:[]
                                                    }
                                                    tipoMaquinaria.id_tipo_maquinaria_fase = item.clave_tipo_maquinaria_fase;
                                                    tipoMaquinaria.id = item.clave;
                                                    tipoMaquinaria.nombre = item.nombre;
                                                    tipoMaquinaria.costo = item.costo;
                                                    tipoMaquinaria.cantidad = item.cantidad;
                                                    fase.tipoMaquinariaId.push(tipoMaquinaria.id)

                                                    this.setState((prevState) => ({
                                                        etapas: prevState.etapas.map((etapaMap) => {
                                                            if (etapaMap.id === etapa.id){
                                                                return {...etapaMap, fases: etapaMap.fases.map((faseMap) => {
                                                                    if (faseMap.id === fase.id){
                                                                        return {...faseMap, tipoMaquinaria: faseMap.tipoMaquinaria.concat(tipoMaquinaria), tipoMaquinariaId: faseMap.tipoMaquinariaId.concat(tipoMaquinaria.id)}
                                                                    }
                                                                    else {
                                                                        return faseMap
                                                                    }
                                                                })}
                                                            }
                                                            else{
                                                                return etapaMap
                                                            }
                                                        })
                                                    }));
                                                    

                                                    axios.get(`http://localhost:3000/getMaquinariaByIdTipoMaquinariaFase/${tipoMaquinaria.id_tipo_maquinaria_fase}`, config)
                                                        .then((res) => {
                                                            res.data.forEach((item) => {
                                                                let maquinaria = {
                                                                    id: item.clave_maquinaria,
                                                                    estatus: item.estatus,
                                                                    serial: item.serial
                                                                }
                                                                tipoMaquinaria.maquinariasId.push(item.clave_maquinaria);

                                                                this.setState((prevState) => ({
                                                                    etapas: prevState.etapas.map((etapaMap) => {
                                                                        if (etapaMap.id === etapa.id){
                                                                            return {...etapaMap, fases: etapaMap.fases.map((faseMap) => {
                                                                                if (faseMap.id === fase.id){
                                                                                    return {...faseMap, tipoMaquinaria: faseMap.tipoMaquinaria.map((tipoMaquinariaMap) => {
                                                                                        if (tipoMaquinariaMap.id === tipoMaquinaria.id){
                                                                                            return{...tipoMaquinariaMap, maquinarias: tipoMaquinariaMap.maquinarias.concat(maquinaria)}
                                                                                        }
                                                                                        else{
                                                                                            return tipoMaquinariaMap
                                                                                        }
                                                                                    })}
                                                                                }
                                                                                else {
                                                                                    return faseMap
                                                                                }
                                                                            })}
                                                                        }
                                                                        else{
                                                                            return etapaMap
                                                                        }
                                                                    })
                                                                }));

                                                            })
                                                        })  
                                                        .catch((e) => {
                                                            console.log('Error en axios')
                                                        })  
                                                    })
                                                })
                                                .catch((e) => {
                                                    console.log('Error en axios')
                                                })

                                                axios.get(`http://localhost:3000/getCargosByIdFase/${fase.id}`)
                                                    .then((res) => {
                                                        res.data.forEach((item) => {
                                                            fase.cargosId.push(item.clave);

                                                            let cargo = {
                                                                nombre:null,
                                                                id:-1,
                                                                sueldo:0,
                                                                cantidad:0,
                                                                estatus:null,
                                                                id_cargo_fase: null,
                                                                accordionKey:0,
                                                                empleadosShow:'inline',
                                                                empleadosId:[],
                                                                checkInicialEmpleado:true,
                                                                empleados:[]
                                                            }

                                                            // item.clave_cargo_fase

                                                            cargo.id=item.clave;
                                                            cargo.sueldo=item.sueldo;
                                                            cargo.cantidad=item.cantidad;
                                                            cargo.nombre=item.nombre;
                                                            cargo.id_cargo_fase = item.clave_cargo_fase

                                                            this.setState((prevState) => ({
                                                                etapas: prevState.etapas.map((etapaMap) => {
                                                                    if (etapaMap.id === etapa.id){
                                                                        return {...etapaMap, fases: etapaMap.fases.map((faseMap) => {
                                                                            if (faseMap.id === fase.id){
                                                                                return {...faseMap, cargos: faseMap.cargos.concat(cargo)}
                                                                            }
                                                                            else {
                                                                                return faseMap
                                                                            }
                                                                        })}
                                                                    }
                                                                    else{
                                                                        return etapaMap
                                                                    }
                                                                })
                                                            }));

                                                            axios.get(`http://localhost:3000/getEmpleadosByIdCargoFase/${item.clave_cargo_fase}`, config)
                                                                .then((res) => {
                                                                    res.data.forEach((element) => {
                                                                        let empleado = {
                                                                            id:-1,
                                                                            nombre:null,
                                                                            ci:null,
                                                                            accordionKey:0,
                                                                            sexo:null,
                                                                            estatus:null,
                                                                            dia:"Lunes",
                                                                            horario:[{
                                                                                id: null,
                                                                                dia:"Lunes",
                                                                                horaEntrada:null,
                                                                                horaSalida:null,
                                                                                value:0,
                                                                            },
                                                                            {
                                                                                id: null,
                                                                                dia:"Martes",
                                                                                horaEntrada:null,
                                                                                horaSalida:null,
                                                                                value:0,
                                                                            },
                                                                            {
                                                                                id: null,
                                                                                dia:"Miercoles",
                                                                                horaEntrada:null,
                                                                                horaSalida:null,
                                                                                value:0,
                                                                            },
                                                                            {
                                                                                id: null,
                                                                                dia:"Jueves",
                                                                                horaEntrada:null,
                                                                                horaSalida:null,
                                                                                value:0,
                                                                            },
                                                                            {
                                                                                id: null,
                                                                                dia:"Viernes",
                                                                                horaEntrada:null,
                                                                                horaSalida:null,
                                                                                value:0,
                                                                            }]
                                                                        }
                                                                        empleado.ci = element.ci;
                                                                        empleado.nombre = element.nombre;
                                                                        empleado.sexo = element.sexo;
                                                                        empleado.id = element.clave;
                                                                        empleado.estatus = element.estatus;
                                                                        empleado.clave_empleado_cargo_fase = element.clave_empleado_cargo_fase
                                                                        cargo.empleadosId.push(empleado.id);

                                                                        this.setState((prevState) => ({
                                                                            etapas: prevState.etapas.map((etapaMap) => {
                                                                                if (etapaMap.id === etapa.id){
                                                                                    return {...etapaMap, fases: etapaMap.fases.map((faseMap) => {
                                                                                        if (faseMap.id === fase.id){
                                                                                            return {...faseMap, cargos: faseMap.cargos.map((cargoMap) => {
                                                                                                if (cargoMap.id === cargo.id){
                                                                                                    return {...cargoMap, empleados: cargoMap.empleados.concat(empleado)}
                                                                                                }
                                                                                                else {
                                                                                                    return cargoMap
                                                                                                }
                                                                                            })}
                                                                                        }
                                                                                        else {
                                                                                            return faseMap
                                                                                        }
                                                                                    })}
                                                                                }
                                                                                else{
                                                                                    return etapaMap
                                                                                }
                                                                            })
                                                                        }));

                                                                        axios.get(`http://localhost:3000/getHorarioEmpleadoByIdEmpleadoCargoFase/${empleado.clave_empleado_cargo_fase}`, config)
                                                                            .then((res) => {
                                                                                res.data.forEach((item) => {
                                                                                    
                                                                                    empleado.horario.forEach((horario) => {
                                                                                        if (horario.dia === item.dia){
                                                                                            horario.id = item.clave_horario
                                                                                            horario.dia = item.dia
                                                                                            horario.horaEntrada = item.hora_entrada
                                                                                            horario.horaSalida = item.hora_salida

                                                                                            if (item.clave_horario % 2 === 0){
                                                                                                horario.value = 2
                                                                                            }
                                                                                        }
                                                                                    })


                                                                                    

                                                                                    this.setState((prevState) => ({
                                                                                        etapas: prevState.etapas.map((etapaMap) => {
                                                                                            if (etapaMap.id === etapa.id){
                                                                                                return {...etapaMap, fases: etapaMap.fases.map((faseMap) => {
                                                                                                    if (faseMap.id === fase.id){
                                                                                                        return {...faseMap, cargos: faseMap.cargos.map((cargoMap) => {
                                                                                                            if (cargoMap.id === cargo.id){
                                                                                                                return {...cargoMap, empleados: cargoMap.empleados.map((empleadoMap) => {
                                                                                                                    if (empleadoMap.id === empleado.id){
                                                                                                                        return {...empleadoMap, horario: empleado.horario}
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        return empleadoMap
                                                                                                                    }
                                                                                                                })}
                                                                                                            }
                                                                                                            else {
                                                                                                                return cargoMap
                                                                                                            }
                                                                                                        })}
                                                                                                    }
                                                                                                    else {
                                                                                                        return faseMap
                                                                                                    }
                                                                                                })}
                                                                                            }
                                                                                            else{
                                                                                                return etapaMap
                                                                                            }
                                                                                        })
                                                                                    }));
                                                                                    
                                                                                })
                                                                            })
                                                                            .catch((e) => {

                                                                            })
                                                                    })
                                                                })
                                                                .catch((e) => {

                                                                })
                                                            
                                                        })
                                                    })
                                                    .catch((e) => {
                                                        console.log('Error en axios')
                                                    })
    
                                                    //  FASE
                                                    longitud1++;
                                                })
                                                if(longitud1==res.data.length){
                                                    this.setState(() => ({
                                                        loadfase:true
                                                    }));
                                                }
                                            })
                                            .catch((e) => {
                                                console.log('Error en axios')
                                            })
                                longitud++;
                                

                        })
                        if(longitud==res.data.length){
                            this.setState(() => ({
                                loadetapa:true
                            }));
                        }
                    })
                

            })
            .catch((e) => {
                console.log('Error en axios')
            })
  
            axios.get(`http://localhost:3000/getAllMineralesMetalicosByIdYacimiento/${idYacimiento}`, config)
            .then((res) => {
                if (res.data.length > 0){
                    let mineralesMetalicos = []
                    res.data.forEach((item) => {
                        let mineral = {}
                        mineral.id = item.clave_mineral_metalico;
                        mineral.total = item.cantidad_mineral_metalico;
                        mineral.nombre = item.nombre_mineral_metalico;
                        mineralesMetalicos.push(mineral)
                    })
    
                    state.Minerales.shift();
    
                    for(let i=0; i<mineralesMetalicos.length; i++){
    
                        
                        state.mineralId.push(mineralesMetalicos[i].id);
    
                        let mineral = {
                            nombre:null,
                            id:-1,
                            total: 0,
                            accordionKey:0,
                        }
    
                        mineral.nombre=mineralesMetalicos.nombre;
                        mineral.id=mineralesMetalicos.id;
                        mineral.total=mineralesMetalicos.total;
    
                        state.Minerales.push(mineral);
                    }
    
                    this.setState(() => ({
                        mineralId: state.mineralId,
                        minerales: mineralesMetalicos,
                    }));
                }
            }).catch((e) => {
                console.log('Error en axios')
            })

        axios.get(`http://localhost:3000/getAllMineralesNoMetalicosByIdYacimiento/${idYacimiento}`, config)
            .then((res) => {
                if (res.data.length > 0){

                    let mineralesNoMetalicos = []
                    res.data.forEach((item) => {
                        let mineral = {}
                        mineral.id = item.clave_mineral_metalico;
                        mineral.total = item.cantidad_mineral_metalico;
                        mineral.nombre = item.nombre_mineral_metalico;
                        mineralesNoMetalicos.push(mineral)

                        // console.log('mu nom', mineral.nombre)
                    })

                    info.mineralesNoMetalicos = mineralesNoMetalicos;

                    state.MineralesNoMetalicos.shift();
                    for(let i=0; i<info.mineralesNoMetalicos.length; i++){
                        state.mineralNoMetalicoId.push(info.mineralesNoMetalicos[i].id);

                        let mineral={
                            nombre:null,
                            id:-1,
                            total: 0,
                            accordionKey:0
                        }

                        mineral.nombre=info.mineralesNoMetalicos[i].nombre;
                        mineral.id=info.mineralesNoMetalicos[i].id;
                        mineral.total=Number(info.mineralesNoMetalicos[i].total);

                        state.MineralesNoMetalicos.push(mineral);
                    }

                    this.setState(() => ({
                        mineralNoMetalicoId: state.mineralNoMetalicoId,
                        MineralesNoMetalicos: state.MineralesNoMetalicos
                    }));
                }

            }).catch((e) => {
                console.log('Error en axios')
            })
            })
            .catch((e) => {

            })


        





            
        /*for(let i=0; i<info.etapas.length; i++){
            let etapa={
                fases: [{
                    cargos:[{
                        empleados:[{
                            id:-1,
                            nombre:null,
                            ci:null,
                            accordionKey:0,
                            sexo:null,
                            estatus:null,
                            dia:"Lunes",
                        }],
                    }],
                    tipoMaquinaria:[{
                        nombre:null,
                        id:-1,
                        costo:0,
                        cantidad:0,
                        estatus:null,
                        accordionKey:0,
                        maquinariasShow:'none',
                        maquinariasId:[],
                        checkInicialMaquiaria:true,
                        maquinarias:[{
                            id:-1,
                            serial:null,
                            estatus:null,
                        }],
                    }]

                }]
            }

            for(let j=0; j<info.etapas[i].fases.length; j++){

                for(let k=0; k<info.etapas[i].fases[j].cargos.length; k++){ 
                    /*console.log("IsUndefined?",info.etapas[i].fases[j].cargos[k].empleados,i,j,k);
                    info.etapas[i].fases[j].cargos[k].empleados.forEach((empleadoR)=>{
                        cargo.empleadosId.push(empleadoR.id);
                        
                        for(let y=0; y<empleadoR.horario.length; y++){
                            empleado.horario[y].horaEntrada = empleadoR.horario[y].horaEntrada;
                            empleado.horario[y].horaSalida = empleadoR.horario[y].horaSalida;
                            empleado.horario[y].value = empleadoR.horario[y].value;
                        }
                }


                fase.tipoMaquinaria.shift();
                for(let k=0; k<info.etapas[i].fases[j].tipoMaquinaria.length; k++){
                    fase.tipoMaquinariaId.push(info.etapas[i].fases[j].tipoMaquinaria[k].id);
                    let tipoMaquinaria={
                        nombre:null,
                        id:-1,
                        costo:0,
                        cantidad:0,
                        estatus:null,
                        accordionKey:0,
                        maquinariasShow:'none',
                        maquinariasId:[],
                        checkInicialMaquiaria:true,
                        maquinarias:[{
                            id:-1,
                            serial:null,
                            estatus:null,
                        }],
                    }


                    tipoMaquinaria.id=info.etapas[i].fases[j].tipoMaquinaria[k].id;
                    tipoMaquinaria.sueldo=info.etapas[i].fases[j].tipoMaquinaria[k].sueldo;
                    tipoMaquinaria.cantidad=info.etapas[i].fases[j].tipoMaquinaria[k].cantidad;
                    tipoMaquinaria.nombre=info.etapas[i].fases[j].tipoMaquinaria[k].nombre;

                    tipoMaquinaria.maquinarias.shift();
                    info.etapas[i].fases[j].tipoMaquinaria[k].maquinarias.forEach((maquinariaR)=>{
                        tipoMaquinaria.maquinariasId.push(maquinariaR.id);
                        let maquinaria = {
                            id:-1,
                            serial:null,
                            estatus:null,
                        }

                        maquinaria.id = maquinariaR.id;
                        maquinaria.serial = maquinariaR.serial;

                        tipoMaquinaria.maquinarias.push(maquinaria);

                    });

                    fase.tipoMaquinaria.push(tipoMaquinaria);
                    /*console.log("fase",fase);
                    console.log("Tipo",fase.tipoMaquinaria[k].maquinarias);
                    console.log("TipSasdwsdo",fase.tipoMaquinaria);
                    console.log("Tipo",fase.tipoMaquinaria.maquinarias);
                    if(fase.tipoMaquinaria[k].maquinarias.length>0){
                        fase.tipoMaquinaria[k].maquinariasShow = 'inline';
                    }
                }
                
                etapa.fases.push(fase); 
            }
            if (etapa.fases.length>1){
                etapa.eliminar=false;
            }
            state.etapas.push(etapa);
        }

        this.setState(() => ({
            eliminar: state.eliminar,
            mineralId: state.mineralId,
            mineralNoMetalicoId: state.mineralNoMetalicoId,
        }));*/
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

    selectEmpleado = (id,name,ci,sexo,etapaNum,faseNum,auxNum) => {  // EL VALOR DE id EN BASES DE DATOS ====> IGUAL HAY QUE VALIDAR MIL VECES ESO
        // console.log('entroCargos', id,etapaNum,faseNum);

        //console.log("cuentame",etapaNum);
        var etapas1 = this.state.etapas;
        let empleados=this.state.etapas[etapaNum-1].fases[faseNum-1].cargos[auxNum].empleados;
        var eliminado= false;
        var empleadosS='inline';
        /*let costo_anterior = 0;
        let cantidad_anterior = 0;
        let id_a_eliminar=0;*/

        if(empleados[0].id === -1){
            empleados.shift();

        }
        for(var i = 0; i < this.state.etapas[etapaNum-1].fases[faseNum-1].cargos[auxNum].empleados.length; i++) {
           // console.log(empleados[i].id,"id");

            //costo_anterior =document.getElementById('YacimientosCantidadCargo'+etapaNum+faseNum+i).value='';
            //cantidad_anterior =document.getElementById('YacimientosSueldoCargo'+etapaNum+faseNum+i).value='';

            if(eliminado){
           //     document.getElementById('YacimientosCantidadCargo'+etapaNum+faseNum+(i-1)).value=costo_anterior;
               // document.getElementById('YacimientosSueldoCargo'+etapaNum+faseNum+(i-1)).value=cantidad_anterior;

            }
            if(empleados[i].id == id){
               
                //document.getElementById('YacimientosCantidadCargo'+etapaNum+faseNum+i).value='';
               // document.getElementById('YacimientosSueldoCargo'+etapaNum+faseNum+i).value='';
               // id_a_eliminar=i;
                empleados.splice(i,1);
                eliminado=true;
            }
        }

        /*if(eliminado){
            empleados.splice(id_a_eliminar,1);
        }*/


        if(!eliminado){
            let empleado={
                id:-1,
                nombre:null,
                ci:null,
                sexo:null,
                dia:"Lunes",
                horario:[{
                    dia:"Lunes",
                    horaEntrada:null,
                    horaSalida:null,
                    value:1,
                },
                {
                    dia:"Martes",
                    horaEntrada:null,
                    horaSalida:null,
                    value:1,
                },
                {
                    dia:"Miercoles",
                    horaEntrada:null,
                    horaSalida:null,
                    value:1,
                },
                {
                    dia:"Jueves",
                    horaEntrada:null,
                    horaSalida:null,
                    value:1,
                },
                {
                    dia:"Viernes",
                    horaEntrada:null,
                    horaSalida:null,
                    value:1,
                }],
                accordionKey:0
            }
            

            empleado.nombre=name;
            empleado.ci=ci;
            empleado.sexo=sexo;
            empleado.id=id;
            empleados.push(empleado);
        }
        if(empleados.length===0){
            empleadosS='none';
            let empleado={
                id:-1,
                nombre:null,
                ci:null,
                sexo:null,
                dia:"Lunes",
                horario:[{
                    dia:"Lunes",
                    horaEntrada:null,
                    horaSalida:null,
                    value:1,
                },
                {
                    dia:"Martes",
                    horaEntrada:null,
                    horaSalida:null,
                    value:1,
                },
                {
                    dia:"Miercoles",
                    horaEntrada:null,
                    horaSalida:null,
                    value:1,
                },
                {
                    dia:"Jueves",
                    horaEntrada:null,
                    horaSalida:null,
                    value:1,
                },
                {
                    dia:"Viernes",
                    horaEntrada:null,
                    horaSalida:null,
                    value:1,
                }],
                accordionKey:0
            };
            empleados.push(empleado);
        }

        etapas1[etapaNum-1].fases[faseNum-1].cargos[auxNum].empleados=empleados;
        etapas1[etapaNum-1].fases[faseNum-1].cargos[auxNum].empleadosShow=empleadosS;
        this.setState(() => ({
            etapas:etapas1
        }));



        this.actualizarCostos();
       // console.log(this.state.etapas);
        //console.log(empleados); 
    };

    selectMaquinaria = (id,name,etapaNum,faseNum,auxNum) => {  // EL VALOR DE id EN BASES DE DATOS ====> IGUAL HAY QUE VALIDAR MIL VECES ESO
        console.log('entroTipoMaquinaria', id, name, etapaNum)
        var etapas1 = this.state.etapas;
        let maquinarias=this.state.etapas[etapaNum-1].fases[faseNum-1].tipoMaquinaria[auxNum].maquinarias;
        var eliminado= false;
        var MaquinariaS='inline';
        let costo_anterior = 0;
        let cantidad_anterior = 0;
        let id_a_eliminar=0;

        if((maquinarias[0].id === -1) || (maquinarias[0].id === null)){
            maquinarias.shift();

        }
        for(var i = 0; i < this.state.etapas[etapaNum-1].fases[faseNum-1].tipoMaquinaria[auxNum].maquinarias.length; i++) {
           // console.log(maquinarias[i].id,"id");
            //costo_anterior=document.getElementById('YacimientosCantidadTipoMaquinaria'+etapaNum+faseNum+i).value;
            //cantidad_anterior=document.getElementById('YacimientosCostoTipoMaquinaria'+etapaNum+faseNum+i).value;
            if(eliminado){
                    
                //document.getElementById('YacimientosCantidadTipoMaquinaria'+etapaNum+faseNum+(i-1)).value=costo_anterior;
               // document.getElementById('YacimientosCostoTipoMaquinaria'+etapaNum+faseNum+(i-1)).value=cantidad_anterior;
            }
            if(maquinarias[i].id == id){
              //  if(maquinarias[i+1] != undefined){
                //    maquinarias[i+1].accordionKey=1;
                    
               // }
                //document.getElementById('YacimientosCantidadTipoMaquinaria'+etapaNum+faseNum+i).value='';
               // document.getElementById('YacimientosCostoTipoMaquinaria'+etapaNum+faseNum+i).value='';
                //id_a_eliminar=i;
                maquinarias.splice(i,1);
                eliminado=true;
            }
           
        }
        /*if(eliminado){
            maquinarias.splice(id_a_eliminar,1);
        }*/


        if(!eliminado){


            let Maquinaria={
                id:-1,
                serial:null,
            };
            
            Maquinaria.serial=name;
            Maquinaria.id=id;
            maquinarias.push(Maquinaria);
            console.log("Maquinaria",Maquinaria);
        }
        if(maquinarias.length==0){
            MaquinariaS='none';
            let Maquinaria={
                id:-1,
                serial:null,
            };
            maquinarias.push(Maquinaria);
            console.log("Maquinariawenr",maquinarias.length);
        }

        etapas1[etapaNum-1].fases[faseNum-1].tipoMaquinaria[auxNum].maquinarias=maquinarias;
        etapas1[etapaNum-1].fases[faseNum-1].tipoMaquinaria[auxNum].maquinariasShow=MaquinariaS;

        this.setState(() => ({
            etapas: etapas1
            
        }));

        
        console.log("eliminado",eliminado);
        console.log(maquinarias);
        console.log(this.state.etapas);
    };

    nombreDT = (nombre) => {
        console.log('fino')
    }

    selectFunctionCheckbox = (e,classN, id, name,ci,sexo,etapaNum,faseNum,auxNum) => {
        // console.log('selectFunctionCheckbox', boton.alt)
        // console.log('selectFunctionCheckbox', boton)
        let etapas = this.state.etapas;
        
        
        
        // console.log('IndexC',classN.indexOf("cargos"))
        // console.log('IndexM',classN.indexOf("minerales"))
        // console.log('IndexT',classN.indexOf("tiposdemaquinaria"))
        if (classN.indexOf("empleados") != -1){
            //console.log('ENTRO CARGO')
            let cargo = etapas[etapaNum-1].fases[faseNum-1].cargos[auxNum];

            let max = (cargo.empleadosShow=='none')?(cargo.cantidad-cargo.empleados.length+1 ): (cargo.cantidad-cargo.empleados.length);
            
                if( max<=0 ){
                    if(e.target.checked){
                        console.log("Checked y max 0",max,e);
                        e.target.checked=false;
                        //e.target.disabled=true;

                    }
                    else{
                        console.log("not Checked y max 0",max,e);
                        //e.target.disabled=false;
                        this.selectEmpleado(id,name,ci,sexo,etapaNum,faseNum,auxNum)
                    }
                                                
                }
                else{
                    console.log(" max diferente de 0",max,e);
                   // e.target.disabled=false;
                    this.selectEmpleado(id,name,ci,sexo,etapaNum,faseNum,auxNum) 
                 }
            

            
        }
        else if (classN.indexOf("maquinarias") != -1){
            let tipoMaquinaria = etapas[etapaNum-1].fases[faseNum-1].tipoMaquinaria[auxNum]

            let max = (tipoMaquinaria.maquinariasShow=='none')?(tipoMaquinaria.cantidad-tipoMaquinaria.maquinarias.length+1 ): (tipoMaquinaria.cantidad-tipoMaquinaria.maquinarias.length);
            
            if( max<=0 ){
                if(e.target.checked){
                    console.log("Checked y max 0",max);
                    e.target.checked=false;
                }
                else{
                    console.log("not Checked y max 0",max);
                   // e.target.disabled=true;
                   this.selectMaquinaria(id,name,etapaNum,faseNum,auxNum);
                }
                                            
            }
            else{
                console.log(" max diferente de 0",max);
               // e.target.disabled=false;
               this.selectMaquinaria(id,name,etapaNum,faseNum,auxNum); 
            }
        }
    }

    handleOnClickSubmittData=()=>{
       const info = {
            yacimiento:{
                id:null,
            },
            explotacion:{
                id:null,
                fechaI:null,
                fechaF:null,
                estatus:null,
            },
            etapas: [{
                id:null,
                estatus:null,
                fechaI:null,
                fechaF:null,
                fases: [{
                    id:null,
                    fechaI:null,
                    fechaF:null,
                    estatus:null,
                    cargos:[{
                        id:0,
                        empleados:[{
                            id:null,
                            estatus:null,
                            horario:[],
                        }]
                    }],
                    tipoMaquinaria:[{
                        id:null,
                        maquinarias:[{
                            estatus:null,
                            id:null,
                        }]
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




        
        info.explotacion.id = this.state.explotacion.id;
        info.explotacion.estatus = 8;

        let dia = (this.state.explotacion.fechaI.dia<10)? "0"+this.state.explotacion.fechaI.dia: this.state.explotacion.fechaI.dia;
        let mes = (this.state.explotacion.fechaI.mes<10)? "0"+this.state.explotacion.fechaI.mes: this.state.explotacion.fechaI.mes;
        
        info.explotacion.fechaI = mes+'-'+dia+'-'+this.state.explotacion.fechaI.ano;

        dia = (this.state.explotacion.fechaF.dia<10)? "0"+this.state.explotacion.fechaF.dia: this.state.explotacion.fechaF.dia;
        mes = (this.state.explotacion.fechaF.mes<10)? "0"+this.state.explotacion.fechaF.mes: this.state.explotacion.fechaF.mes;
        
        info.explotacion.fechaF = mes+'-'+dia+'-'+this.state.explotacion.fechaF.ano;


        let primeraFase=0;

        info.etapas.shift();
        
        this.state.etapas.forEach((etapaR)=>{
            if(etapaR.numero != 0){
                let etapa= {
                    id:null,
                    estatus:null,
                    fechaI:null,
                    fechaF:null,
                    fases: [{
                        id:null,
                        fechaI:null,
                        fechaF:null,
                        estatus:null,
                        cargos:[{
                            id:0,
                            empleados:[{
                                id:null,
                                estatus:null,
                                horario:[]
                            }]
                        }],
                        tipoMaquinaria:[{
                            id:null,
                            maquinarias:[{
                                estatus:null,
                                id:null,
                            }]
                        }]
                    }]
                }
                
                etapa.id = etapaR.id;

                
                dia = (etapaR.fechaI.dia<10)? "0"+etapaR.fechaI.dia: etapaR.fechaI.dia;
                mes = (etapaR.fechaI.mes<10)? "0"+etapaR.fechaI.mes: etapaR.fechaI.mes;

                etapa.fechaI = mes+'-'+dia+'-'+etapaR.fechaI.ano;

                dia = (etapaR.fechaF.dia<10)? "0"+etapaR.fechaF.dia: etapaR.fechaF.dia;
                mes = (etapaR.fechaF.mes<10)? "0"+etapaR.fechaF.mes: etapaR.fechaF.mes;
                
                etapa.fechaF = mes+'-'+dia+'-'+etapaR.fechaF.ano;


                if(etapaR.numero==1){
                    etapa.estatus = 8;
                }
                else{
                    etapa.estatus = 2;
                }
                

                etapa.fases.shift();

                etapaR.fases.forEach((faseR)=>{
                    if(faseR.numero != 0){
                        let fase= {
                            id:null,
                            fechaI:null,
                            fechaF:null,
                            estatus:null,
                            cargos:[{
                                id:0,
                                empleados:[{
                                    id:null,
                                    estatus:null,
                                    horario:[]
                                }]
                            }],
                            tipoMaquinaria:[{
                                id:null,
                                maquinarias:[{
                                    estatus:null,
                                    id:null,
                                }]
                            }]
                        }

                        fase.id = faseR.id;                
                        
                        dia = (faseR.fechaI.dia<10)? "0"+faseR.fechaI.dia: faseR.fechaI.dia;
                        mes = (faseR.fechaI.mes<10)? "0"+faseR.fechaI.mes: faseR.fechaI.mes;

                        fase.fechaI = mes+'-'+dia+'-'+faseR.fechaI.ano;

                        dia = (faseR.fechaF.dia<10)? "0"+faseR.fechaF.dia: faseR.fechaF.dia;
                        mes = (faseR.fechaF.mes<10)? "0"+faseR.fechaF.mes: faseR.fechaF.mes;
                        
                        fase.fechaF = mes+'-'+dia+'-'+faseR.fechaF.ano;

                        primeraFase++;
                        
                        if(primeraFase==1){
                            fase.estatus = 8;
                        }
                        else{
                            fase.estatus = 2 ;
                        }
                        
                        console.log("Primera Fase",primeraFase,fase.estatus);

                        
                        fase.cargos.shift();
                        fase.tipoMaquinaria.shift();

                        faseR.cargos.forEach((cargoR)=>{
                            let cargo={
                                id:0,
                                empleados:[{
                                    id:null,
                                    estatus:null,
                                    horario:[]
                                }]
                            }

                            cargo.id = Number(cargoR.id);
                            
                            cargo.empleados.shift();

                            cargoR.empleados.forEach((empleadoR)=>{
                                let empleado={
                                    id:null,
                                    estatus:null,
                                    horario:[]
                                }



                                empleado.id = empleadoR.id;
                                empleado.estatus = 3;

                                empleadoR.horario.forEach((horarioR)=>{
                                    if(horarioR.horaEntrada!=null){
                                        if(horarioR.value!=0){

                                            switch(horarioR.dia){
                                                case "Lunes":
                                                    empleado.horario.push((horarioR.value==1)?1:2);
                                                    break;
                                                case "Martes":
                                                    empleado.horario.push((horarioR.value==1)?3:4);
                                                    break;
                                                case "Miercoles":
                                                    empleado.horario.push((horarioR.value==1)?5:6);
                                                    break;
                                                case "Jueves":
                                                    empleado.horario.push((horarioR.value==1)?7:8);
                                                    break;
                                                case "Viernes":
                                                    empleado.horario.push((horarioR.value==1)?9:10);
                                                    break;
                                            }
                                            
                                        }
                                    }
                                });

                                if((empleado.id!=null)&&(empleado.id>0)){
                                    cargo.empleados.push(empleado);
                                }
                                else{
                                   cargo.empleados.shift();
                                }

                            });
                            fase.cargos.push(cargo);
                        });


                        faseR.tipoMaquinaria.forEach((tipoMaquinariaR)=>{
                            let tipoMaquinaria={
                                id:null,
                                maquinarias:[{
                                    estatus:null,
                                    id:null,
                                }]
                            }

                            tipoMaquinaria.id = Number(tipoMaquinariaR.id);
                            
                            tipoMaquinariaR.maquinarias.forEach((maquinariaR)=>{
                                let maquinaria={
                                    estatus:null,
                                    id:null,
                                }

                                maquinaria.id = maquinariaR.id;
                                maquinaria.estatus = 4;

                                if((maquinaria.id!=0)&&(maquinaria.id>0)){
                                    tipoMaquinaria.maquinarias.push(maquinaria);
                                }
                                else{
                                    tipoMaquinaria.maquinarias.shift();
                                }
                            });

                            fase.tipoMaquinaria.push(tipoMaquinaria);
                        });
                        etapa.fases.push(fase);
                    }
                });
                info.etapas.push(etapa);
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
                        //console.log('tipo maqui costo atualizacion', faseR.cargos);
                        faseR.cargos.forEach((cargoR)=>{
                            faseR.costo += Math.round(parseFloat(cargoR.sueldo * cargoR.cantidad)*100)/100;
                            //console.log('tipoualizacion', cargoR.sueldo);
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
        //console.log('CostoTotal', this.state.explotacion.costo);
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

    renderEmpleados=(sexo)=>{
        if(sexo=="Masculino"){
            return(<Image src="/images/empleado1.png" alt="empleado"  />)
        }else if(sexo=="Femenino"){
            return(<Image src="/images/empleada1.png" alt="empleada" />)
        }else{
            return(<Image src="/images/empleadoOtro.png" alt="empleadoOtro" />)
        }
    }

    renderEmpleadosModal=(sexo)=>{
        if(sexo=="Masculino"){
            return(<Image src="/images/empleado1.png" alt="empleado" fluid />)
        }else if(sexo=="Femenino"){
            return(<Image src="/images/empleada1.png" alt="empleada" fluid/>)
        }else{
            return(<Image src="/images/empleadoOtro.png" alt="empleadoOtro" fluid/>)
        }
    }

    horario=(etapaNum,faseNum,cargoNum,empleadoNum)=>{
        let etapas=this.state.etapas;
        let empleado=etapas[etapaNum-1].fases[faseNum-1].cargos[cargoNum].empleados[empleadoNum];
        let primera_vez=false;
        
        console.log("Entra",empleado.horario);
        if(empleado.accordionKey==0){
            empleado.accordionKey=1;
        }
        else{
            empleado.horario=[];
            for(let i=0; i<this.state.dias.length;i++){
                let horario={
                    dia:null,
                    horaEntrada:null,
                    horaSalida:null,
                    value:1
                }
                horario.dia = this.state.dias[i];
                horario.value = document.getElementById("DropdownDia"+this.state.dias[i]+etapaNum+faseNum+cargoNum+empleadoNum).value;
                if(horario.value==1){
                    horario.horaEntrada="7:00";
                    horario.horaSalida="12:00";

                }
                else if(horario.value==2){
                    horario.horaEntrada="14:00";
                    horario.horaSalida="18:00";
                }
                else{
                    horario.horaEntrada=" ";
                    horario.horaSalida=" ";
                }
                empleado.horario.push(horario);
                console.log("input",document.getElementById("DropdownDia"+this.state.dias[i]+etapaNum+faseNum+cargoNum+empleadoNum), "value",document.getElementById("DropdownDia"+this.state.dias[i]+etapaNum+faseNum+cargoNum+empleadoNum).value);

            }
            empleado.accordionKey=0;
        }
        console.log("sale",empleado.horario);
        this.setState(() => ({
            etapas: etapas,
        }));
    }

    validarEmpleadosHorarios=(etapaNum,faseNum,cargoNum)=>{
        let etapas=this.state.etapas;
        let empleados=etapas[etapaNum-1].fases[faseNum-1].cargos[cargoNum].empleados;
       
        let faltante=0;
        let faltantes=0;

        empleados.forEach((empleado)=>{
            faltantes=0;
            empleado.horario.forEach((horario)=>{
                if(horario.horaEntrada==null){
                    faltantes++;
                }
            });

            if(faltantes!=0){
                faltante++;
            }
        });
        return(faltante);
    }

    validarEmpleadoHorario=(etapaNum,faseNum,cargoNum,empleadoNum)=>{
        let etapas=this.state.etapas;
        let empleado=etapas[etapaNum-1].fases[faseNum-1].cargos[cargoNum].empleados[empleadoNum];
        let faltantes=0;

        
            
        empleado.horario.forEach((horario)=>{
            if((horario.horaEntrada==null) && (horario.value!=0)){
                faltantes++;
            }
        });

        if(faltantes!=0){
            return("X");
        }
        else{
            return("✓");
        }      
    }

    setDia=(key,etapaNum,faseNum,cargoNum,empleadoNum)=>{
        let etapas=this.state.etapas;
        let empleado=etapas[etapaNum-1].fases[faseNum-1].cargos[cargoNum].empleados[empleadoNum];
        empleado.dia=key;
        this.setState(() => ({
            etapas: etapas,
        }));
    }

    handleOnChangeFecha=()=>{
        const valueDia = document.getElementById("FechaDia0I").value;
        const valueMes = document.getElementById("FechaMes0I").value;
        const valueAno = document.getElementById("FechaAno0I").value;

        const valueTrimmedDia = valueDia.trim();
        const valueTrimmedMes = valueMes.trim();
        const valueTrimmedAno = valueAno.trim();

        if(valueTrimmedDia && valueTrimmedMes && valueTrimmedAno ){
            

            if((!isNaN(valueTrimmedDia) && (Number(valueTrimmedDia)>0) &&(Number(valueTrimmedDia)<=31)) && (!isNaN(valueTrimmedMes) && (Number(valueTrimmedMes)>0) && (Number(valueTrimmedMes)<=12)) && ( !isNaN(valueTrimmedAno) && (Number(valueTrimmedAno)>=1887) ) ){
                document.getElementById("FechaInicioTexto").innerHTML = "Obligatorio";
                let fecha={
                    dia:Number(valueDia),
                    mes:Number(valueMes),
                    ano:Number(valueAno)
                };
               // console.log("FEEEEEEEEEEEEECCCCCCHA",fecha);
                this.actualizarFechas(fecha);
                
            }
            else{
                this.setFechaCero();
                
                document.getElementById("FechaInicioTexto").innerHTML = "Introduzca una fecha válida";
               
            }
           
        }
        else{
            event.target.state='invalid';
            this.setFechaCero();
            document.getElementById("FechaInicioTexto").innerHTML = "Introduzca una fecha válida";
            console.log("invalido");
        }
        
        if(!valueDia && !valueMes && !valueAno){
            event.target.state='';
            this.setFechaCero();
            document.getElementById("FechaInicioTexto").innerHTML = "Obligatorio";
           
        }
    }

    setFechaCero=()=>{
        let etapas = this.state.etapas;
        let explotacion = this.state.explotacion;

        explotacion.fechaI.dia = 0;
        explotacion.fechaI.mes = 0;
        explotacion.fechaI.ano = 0;


        etapas.forEach((etapa)=>{
            console.log("Fechaaa222");
            etapa.fechaI.dia = 0;
            etapa.fechaI.mes = 0;
            etapa.fechaI.ano = 0;


            document.getElementById("FechaDia"+etapa.numero+"I").value =  "- -";
            document.getElementById("FechaMes"+etapa.numero+"I").value =  "- -";
            document.getElementById("FechaAno"+etapa.numero+"I").value =  "- - - -";

            etapa.fases.forEach((fase)=>{

                fase.fechaI.dia = 0;
                fase.fechaI.mes = 0;
                fase.fechaI.ano = 0;

                document.getElementById("FechaDia"+etapa.numero+fase.numero+"I").value =   "- -";
                document.getElementById("FechaMes"+etapa.numero+fase.numero+"I").value =   "- -";
                document.getElementById("FechaAno"+etapa.numero+fase.numero+"I").value =   "- - - -";

                

                fase.fechaF.dia = 0;
                fase.fechaF.mes = 0;
                fase.fechaF.ano = 0;

                document.getElementById("FechaDia"+etapa.numero+fase.numero+"F").value =    "- -";
                document.getElementById("FechaMes"+etapa.numero+fase.numero+"F").value =    "- -";
                document.getElementById("FechaAno"+etapa.numero+fase.numero+"F").value =    "- - - -";

            });
            console.log("Fechaaa333");
            etapa.fechaF.dia = 0;
            etapa.fechaF.mes = 0;
            etapa.fechaF.ano = 0;

            document.getElementById("FechaDia"+etapa.numero+"F").value =    "- -";
            document.getElementById("FechaMes"+etapa.numero+"F").value =    "- -";
            document.getElementById("FechaAno"+etapa.numero+"F").value =    "- - - -";

        });

        explotacion.fechaF.dia = 0;
        explotacion.fechaF.mes = 0;
        explotacion.fechaF.ano = 0;

        document.getElementById("FechaDia0F").value =    "- -";
        document.getElementById("FechaMes0F").value =    "- -";
        document.getElementById("FechaAno0F").value =    "- - - -";

        this.setState(() => ({
            etapas: etapas,
            explotacion: explotacion
        }));
        console.log("Etapa, explotacion",etapas,explotacion);
    }

    actualizarFechas(fechaInicio){
        let etapas = this.state.etapas;
        let explotacion = this.state.explotacion;

        explotacion.fechaI.dia = Number(fechaInicio.dia);
        explotacion.fechaI.mes = Number(fechaInicio.mes);
        explotacion.fechaI.ano = Number(fechaInicio.ano);

        let fecha = new Date();
        fecha.setDate(fechaInicio.dia-1);
        fecha.setMonth(fechaInicio.mes-1);
        fecha.setFullYear(fechaInicio.ano);
        console.log("Fechaaaa11",fecha);

        etapas.forEach((etapa)=>{
            console.log("Fechaaa222",fecha);
            etapa.fechaI.dia = fecha.getDate()+1;
            etapa.fechaI.mes = fecha.getMonth()+1;
            etapa.fechaI.ano = fecha.getFullYear();


            document.getElementById("FechaDia"+etapa.numero+"I").value =  etapa.fechaI.dia;
            document.getElementById("FechaMes"+etapa.numero+"I").value =  etapa.fechaI.mes;
            document.getElementById("FechaAno"+etapa.numero+"I").value =  etapa.fechaI.ano;

            etapa.fases.forEach((fase)=>{

                fase.fechaI.dia = fecha.getDate()+1;
                fase.fechaI.mes = fecha.getMonth()+1;
                fase.fechaI.ano = fecha.getFullYear();

                document.getElementById("FechaDia"+etapa.numero+fase.numero+"I").value =  fase.fechaI.dia;
                document.getElementById("FechaMes"+etapa.numero+fase.numero+"I").value =  fase.fechaI.mes;
                document.getElementById("FechaAno"+etapa.numero+fase.numero+"I").value =  fase.fechaI.ano;

                fecha.setDate(fecha.getDate()+fase.duracion);
                console.log("Duracion",fase.duracion);

                fase.fechaF.dia = fecha.getDate()+1;
                fase.fechaF.mes = fecha.getMonth()+1;
                fase.fechaF.ano = fecha.getFullYear();

                document.getElementById("FechaDia"+etapa.numero+fase.numero+"F").value =  fase.fechaF.dia;
                document.getElementById("FechaMes"+etapa.numero+fase.numero+"F").value =  fase.fechaF.mes;
                document.getElementById("FechaAno"+etapa.numero+fase.numero+"F").value =  fase.fechaF.ano;

            });
            console.log("Fechaaa333",fecha);
            etapa.fechaF.dia = fecha.getDate()+1;
            etapa.fechaF.mes = fecha.getMonth()+1;
            etapa.fechaF.ano = fecha.getFullYear();

            document.getElementById("FechaDia"+etapa.numero+"F").value =  etapa.fechaF.dia;
            document.getElementById("FechaMes"+etapa.numero+"F").value =  etapa.fechaF.mes;
            document.getElementById("FechaAno"+etapa.numero+"F").value =  etapa.fechaF.ano;

        });

        explotacion.fechaF.dia = fecha.getDate()+1;
        explotacion.fechaF.mes = fecha.getMonth()+1;
        explotacion.fechaF.ano = fecha.getFullYear();

        document.getElementById("FechaDia0F").value =  explotacion.fechaF.dia;
        document.getElementById("FechaMes0F").value =  explotacion.fechaF.mes;
        document.getElementById("FechaAno0F").value =  explotacion.fechaF.ano;

        this.setState(() => ({
            etapas: etapas,
            explotacion: explotacion
        }));
        console.log("Etapa, explotacion",etapas,explotacion);
    }

    goback=()=>{
        history.push('/explotacion')
    }

    render(){
        
        return ( 
            <div className="contain pagecontent" id="Content">
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario="Diego Gutiérrez"/>
                <Container className="FormContainer">
                    <FormTitulo titulo="Consultar Explotación" tamaño="BIG"/>

                    <Accordion defaultActiveKey={1} >
                        <Card className="CardAcc">
                            <Accordion.Toggle as={Card.Header} eventKey={this.state.accordionKey[0]} onClick={() => this.accordionf(0)} className="accordion borderacc">
                                <FormTitulo titulo="Información General"/>
                            </Accordion.Toggle>
                           { this.state.loadfecha && <Accordion.Collapse eventKey={1} >
                                <Card.Body className="BodyAcc">
                                    <Form.Row className="formMargins" >
                                        {
                                            (this.state.loadedexp)&&<FormFecha idF={"0I"} textoAuxiliar="" dia={(this.state.explotacion.fechaI.dia==0)?"- -":this.state.explotacion.fechaI.dia} mes={(this.state.explotacion.fechaI.mes==0)?"- -":this.state.explotacion.fechaI.mes} ano={(this.state.explotacion.fechaI.ano==0)?"- - - -":this.state.explotacion.fechaI.ano}  titulo="Fecha de Inicio de explotación"  clase="inputsPaddingLeft"  disabled={true}/>
                                        }
                                        {
                                            (this.state.loadedexp)&&<FormFecha idF={"0F"} titulo="Fecha Final de explotación" clase="inputsPaddingLeft" textoAuxiliar="" dia={(this.state.explotacion.fechaF.dia==0)?"- -":this.state.explotacion.fechaF.dia} mes={(this.state.explotacion.fechaF.mes==0)?"- -":this.state.explotacion.fechaF.mes} ano={(this.state.explotacion.fechaF.ano==0)?"- - - -":this.state.explotacion.fechaF.ano} disabled={true}/>    
                                        }
                                    </Form.Row>
                                    <Form.Row className="formMargins">
                                        {
                                            (this.state.loadedexp)&&
                                            <Form.Group as={Col} md="5"  className="inputsPaddingRight">
                                                <Form.Label className="cliente-description-fields-text">Estatus</Form.Label>
                                                <Form.Control 
                                                as="select" 
                                                className="form-input"
                                                defaultValue={this.state.explotacion.estatus}
                                                disabled
                                                >
                                                    <option value={8}>En proceso</option>
                                                    <option value={2}>Inactivo</option>
                                                    <option value={10}>Finalizada</option>
                                                </Form.Control>
                                            </Form.Group>
                                        }
                                        <Form.Group as={Col} md="1"></Form.Group>
                                        <Form.Group style={{display: ((this.state.explotacion.estatus!=10)?'none':'contents')}}>
                                            {
                                                (this.state.loadedexp)&&<FormFecha idF={"0FR"} textoAuxiliar="" idTexto="FechaFinalRealTexto0FR" dia={this.state.explotacion.fechaFR.dia} mes={this.state.explotacion.fechaFR.mes} ano={this.state.explotacion.fechaFR.ano}  titulo="Fecha de Final Real de explotación" textoAuxiliar="" clase="inputsPaddingRight" disabled={true}/>
                                            }
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row className="formMargins">
                                        <Form.Group as={Col} md="5" controlId={'YacimientosDuracionInfoExplotacion'} className="inputsPaddingRight">
                                            <Form.Label className="cliente-description-fields-text">Duración de la Explotación</Form.Label>
                                            <InputGroup className="MyInputGroup">
                                                <Form.Control type="text" className="form-input"  placeholder={this.state.explotacion.duracion} disabled/> 
                                                <InputGroup.Append>
                                                    <InputGroup.Text  className="input-append-ventas-form" >días</InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group as={Col} md="1"></Form.Group>
                                        <Form.Group as={Col} md="5" controlId={'YacimientosCostoInfoExplotacion'} className="inputsPaddingLeft">
                                            <Form.Label className="cliente-description-fields-text">Costo Total de la Explotación</Form.Label>
                                            <InputGroup className="MyInputGroup">
                                                <Form.Control type="text" className="form-input" placeholder={this.state.explotacion.costo} disabled  /> 
                                                    <InputGroup.Append>
                                                        <InputGroup.Text  className="input-append-ventas-form">$</InputGroup.Text>
                                                    </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>  
                                        <Form.Group as={Col} md="1"></Form.Group>
                                    </Form.Row>
                                </Card.Body>
                            </Accordion.Collapse>}
                        </Card>
                    </Accordion>
                    
                    <Accordion defaultActiveKey={1} >
                        <Card className="CardAcc">
                            <Accordion.Toggle as={Card.Header} eventKey={this.state.accordionKey[0]} onClick={() => this.accordionf(0)} className="accordion borderacc">
                            <FormTitulo titulo="Información de Yacimiento"/>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={1} >
                                <Card.Body className="BodyAcc">
                                    <Form.Row className="formMargins">
                                        <Form.Group as={Col} md="5" controlId="YacimientosNombreYacimiento" className="inputsPaddingRight">
                                            <Form.Label className="cliente-description-fields-text">Nombre</Form.Label>
                                            <Form.Control disabled type="text" className="form-input" defaultValue={this.state.yacimiento.nombre}/>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2"></Form.Group>
                                        <Form.Group as={Col} md="5"controlId="YacimientosTamañoYacimiento"  className="inputsPaddingRight">
                                            <Form.Label className="cliente-description-fields-text">Área</Form.Label>
                                            <InputGroup className="MyInputGroup">
                                                <Form.Control disabled type="text" className="form-input" defaultValue={this.state.yacimiento.area}/> 
                                                <InputGroup.Append>
                                                    <InputGroup.Text  className="input-append-ventas-form" >Km<sup>2</sup></InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Group controlId="YacimientosTamañoYacimiento"  className="inputsPaddingRight">
                                        <Form.Label className="formMarginsE cliente-title">Ubicación</Form.Label>
                                        {
                                            (this.state.yacimiento.ubicacion.idParroquia)&&<FormLugarPred idParroquia={this.state.yacimiento.ubicacion.idParroquia} predet={true} accion='CO'/>
                                        }
                                    </Form.Group>
                                    
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    {
                        (this.state.minerales.length>0)&&
                        <Accordion defaultActiveKey={1} >
                        <Card className="CardAcc">
                            <Accordion.Toggle as={Card.Header} eventKey={this.state.accordionKey[2]} onClick={() => this.accordionf(2)} className="accordion borderacc">
                                <FormTitulo titulo="Minerales Metálicos"/>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={1} >
                                <Card.Body className="BodyAcc">
                                    <Container>
                                        {this.state.minerales.map((mineral,indexMin)=>{             
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
                                                                        <Form.Group as={Col} md="12" onChange={(evt)=>this.handleOnChangeMineral(evt,mineral.id)} controlId={'YacimientosTotalMineral'+mineral.id}  className="inputsPaddingRight">
                                                                            <Form.Label className="cliente-description-fields-text">Total</Form.Label>
                                                                            <InputGroup className="MyInputGroup">
                                                                                <Form.Control disabled type="text" className="form-input" defaultValue={mineral.total}/> 
                                                                                <InputGroup.Append>
                                                                                    <InputGroup.Text  className="input-append-ventas-form" >Kg</InputGroup.Text>
                                                                                </InputGroup.Append>
                                                                            </InputGroup>   
                                                                        </Form.Group>
                                                                    </Form.Row>
                                                                </Card.Body>
                                                            </Accordion.Collapse>
                                                        </Card>
                                                    </Accordion>
                                                </div>
                                            );
                                        })
                                    }
                                    </Container>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Accordion>
                    }
                    {
                        (this.state.mineralesNoMetalicos.length>0)&&
                        <Accordion defaultActiveKey={1} >
                        <Card className="CardAcc">
                            <Accordion.Toggle as={Card.Header} eventKey={this.state.accordionKey[2]} onClick={() => this.accordionf(2)} className="accordion borderacc">
                                <FormTitulo titulo="Minerales No Metálicos"/>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={1} >
                                <Card.Body className="BodyAcc">
                                    <Container>
                                        {this.state.mineralesNoMetalicos.map((mineral,indexMin)=>{             
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
                                                                        <Form.Group as={Col} md="12" onChange={(evt)=>this.handleOnChangeMineralNoMetalico(evt,mineral.id)} controlId={'YacimientosTotalMineralNoMetalico'+mineral.id}  className="inputsPaddingRight">
                                                                            <Form.Label className="cliente-description-fields-text">Total</Form.Label>
                                                                            <InputGroup className="MyInputGroup">
                                                                                <Form.Control disabled type="text" className="form-input" defaultValue={mineral.total} placeholder="Introduzca cantidad" /> 
                                                                                <InputGroup.Append>
                                                                                    <InputGroup.Text  className="input-append-ventas-form" >Kg</InputGroup.Text>
                                                                                </InputGroup.Append>
                                                                            </InputGroup>
                                                                              
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
                    }
                    {
                        (this.state.loadedetapa===true)&&                        
                        <Accordion defaultActiveKey={1} >
                        <Card className="CardAcc">
                            <Accordion.Toggle as={Card.Header} eventKey={this.state.accordionKey[3]} onClick={() => this.accordionf(3)} className="accordion borderacc">
                                <FormTitulo titulo="Etapas y Fases" />
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={1} >
                                <Card.Body className="BodyAcc">
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
                                                        {this.state.loadedetapa && <Form.Row className="formMargins">
                                                            <FormFecha idF={etapa.numero+"I"} titulo="Fecha de Inicio de la Etapa" textoAuxiliar="" clase="inputsPaddingLeft"  dia={(etapa.fechaI.dia==0)?"- -":etapa.fechaI.dia} mes={(etapa.fechaI.mes==0)?"- -":etapa.fechaI.mes} ano={(etapa.fechaI.ano==0)?"- - - -":etapa.fechaI.ano} disabled={true}/>
                                                            <FormFecha idF={etapa.numero+"F"} titulo="Fecha Final de la Etapa" textoAuxiliar="" clase="inputsPaddingLeft"  dia={(etapa.fechaF.dia==0)?"- -":etapa.fechaF.dia} mes={(etapa.fechaF.mes==0)?"- -":etapa.fechaF.mes} ano={(etapa.fechaF.ano==0)?"- - - -":etapa.fechaF.ano} disabled={true}/>            
                                                        </Form.Row>}

                                                        { this.state.loadfase && <Form.Row className="formMargins">
                                                            <Form.Group as={Col} md="5"  className="inputsPaddingRight">
                                                                <Form.Label className="cliente-description-fields-text">Estatus</Form.Label>
                                                                <Form.Control 
                                                                as="select" 
                                                                className="form-input"
                                                                defaultValue={etapa.estatus}
                                                                disabled
                                                                >
                                                                    <option value={8}>En proceso</option>
                                                                    <option value={2}>Inactivo</option>
                                                                    <option value={10}>Finalizada</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                            <Form.Group as={Col} md="1"></Form.Group>
                                                            <Form.Group style={{display: ((etapa.estatus!=10)?'none':'contents')}}>
                                                                <FormFecha idF={etapa.numero+"FR"} textoAuxiliar="" idTexto={"FechaFinalRealTexto"+etapa.numero+"FR"} dia={etapa.fechaFR.dia} mes={etapa.fechaFR.mes} ano={etapa.fechaFR.ano}  titulo="Fecha de Final Real de etapa" textoAuxiliar="" clase="inputsPaddingLeft" disabled={true}/>
                                                            </Form.Group>
                                                        </Form.Row>}

                                                        <Form.Row className="formMargins">
                                                            <Form.Group as={Col} md="3"></Form.Group>
                                                            <Form.Group as={Col} md="6" onChange={(evt)=>this.handleOnChangeValidarTexto(evt,'YacimientosNombreTextEtapa'+etapa.numeroV,"Introduzca un nombre válido")} controlId={'YacimientosNombreEtapa'+etapa.numeroV} className="inputsPaddingRight">
                                                                <Form.Label className="cliente-description-fields-text">Nombre</Form.Label>
                                                                <Form.Control disabled type="text" defaultValue={etapa.nombreV} className="form-input"/>
                                                            </Form.Group>
                                                            <Form.Group as={Col} md="3"></Form.Group>
                                                        </Form.Row>

                                                        <Form.Row className="formMargins">
                                                            <Form.Group as={Col} md="5" controlId={'YacimientosDuracionEtapa'+etapa.numeroV}className="inputsPaddingRight">
                                                                <Form.Label className="cliente-description-fields-text">Duración de la Etapa</Form.Label>
                                                                <InputGroup className="MyInputGroup">
                                                                    <Form.Control type="text" className="form-input" placeholder={etapa.duracion} disabled/> 
                                                                    <InputGroup.Append>
                                                                        <InputGroup.Text  className="input-append-ventas-form" >días</InputGroup.Text>
                                                                    </InputGroup.Append>
                                                                </InputGroup>
                                                            </Form.Group>
                                                            <Form.Group as={Col} md="1"></Form.Group>
                                                            <Form.Group as={Col} md="5" controlId={'YacimientosCostoEtapa'+etapa.numeroV} className="inputsPaddingLeft">
                                                                 <Form.Label className="cliente-description-fields-text">Costo Total de la Etapa</Form.Label>
                                                                <InputGroup className="MyInputGroup">
                                                                    <Form.Control type="text" className="form-input" placeholder={etapa.costo} disabled /> 
                                                                    <InputGroup.Append>
                                                                        <InputGroup.Text  className="input-append-ventas-form">$</InputGroup.Text>
                                                                    </InputGroup.Append>
                                                                </InputGroup>
                                                            </Form.Group>  
                                                            <Form.Group as={Col} md="1"></Form.Group>
                                                        </Form.Row>
                                                        <FormTitulo titulo="Fases"/>
                                                        <br/>
                                                        <Tabs
                                                            id="controlled-tab-example"
                                                            defaultActiveKey={this.state.etapas[etapa.numeroV-1].key}
                                                            onClick={this.prueba}
                                                        >
                                                            {
                                                                this.state.etapas[etapa.numeroV-1].fases.map((fase,indexf)=>{
                                                                
                                                                if (fase.faseShow === true) 

                                                                    return(    
                                                                    <Tab eventKey={fase.nombre}  title={fase.nombre} key={indexf}>
                                                                        
                                                                        <Container>
                                                                            <br/>

                                                                            {this.state.loadfase && <Form.Row className="formMargins">
                                                                                <FormFecha idF={etapa.numero+''+fase.numero+"I"} titulo="Fecha de Inicio de la Fase" textoAuxiliar="Calculado" clase="inputsPaddingLeft" dia={(fase.fechaI.dia==0)?"- -":fase.fechaI.dia} mes={(fase.fechaI.mes==0)?"- -":fase.fechaI.mes} ano={(fase.fechaI.ano==0)?"- - - -":fase.fechaI.ano} disabled={true}/>
                                                                                <FormFecha idF={etapa.numero+''+fase.numero+"F"} titulo="Fecha Final de la Fase" textoAuxiliar="Calculado" clase="inputsPaddingLeft"  dia={(fase.fechaF.dia==0)?"- -":fase.fechaF.dia} mes={(fase.fechaF.mes==0)?"- -":fase.fechaF.mes} ano={(fase.fechaF.ano==0)?"- - - -":fase.fechaF.ano} disabled={true}/>            
                                                                            </Form.Row>}

                                                                            { this.state.loadfase && <Form.Row className="formMargins">
                                                                                <Form.Group as={Col} md="5"  className="inputsPaddingRight">
                                                                                    <Form.Label className="cliente-description-fields-text">Estatus</Form.Label>
                                                                                    <Form.Control 
                                                                                    as="select" 
                                                                                    className="form-input"
                                                                                    defaultValue={fase.estatus}
                                                                                    disabled
                                                                                    >
                                                                                        <option value={8}>En proceso</option>
                                                                                        <option value={2}>Inactivo</option>
                                                                                        <option value={10}>Finalizada</option>
                                                                                    </Form.Control>
                                                                                    <Form.Text className="text-muted">
                                                                                        Obligatorio
                                                                                    </Form.Text>    
                                                                                </Form.Group>
                                                                                <Form.Group as={Col} md="1"></Form.Group>
                                                                                <Form.Group style={{display: ((fase.estatus!=10)?'none':'contents')}}>
                                                                                    <FormFecha idF={etapa.numero+''+fase.numero+"FR"} textoAuxiliar="Obligatorio" idTexto={"FechaFinalRealTexto"+fase.numero+''+etapa.numero+"FR"} dia={fase.fechaFR.dia} mes={fase.fechaFR.mes} ano={fase.fechaFR.ano}  titulo="Fecha de Final Real de Fase" textoAuxiliar="Obligatorio" clase="inputsPaddingLeft" disabled={true}/>
                                                                                </Form.Group>
                                                                            </Form.Row>}

                                                                            <FormTitulo titulo={"Información General de la Fase "+fase.numero}/>
                                                                            <Form.Row className="formMargins">
                                                                                <Form.Group as={Col} md="3"></Form.Group>
                                                                                <Form.Group as={Col} md="6" onChange={(evt)=>this.handleOnChangeValidarTexto(evt,'YacimientosNombreTextEtapaFase'+etapa.numeroV+fase.numeroV,"Introduzca un nombre válido")} controlId={'YacimientosNombreEtapaFase'+etapa.numeroV+fase.numeroV} className="inputsPaddingRight">
                                                                                    <Form.Label className="cliente-description-fields-text">Nombre</Form.Label>
                                                                                    <Form.Control disabled type="text" defaultValue={fase.nombreV} className="form-input" placeholder="Introduzca nombre de la fase" />
                                                                                </Form.Group>
                                                                                <Form.Group as={Col} md="3"></Form.Group>
                                                                            </Form.Row>
                                                                            <Form.Row className="formMargins">
                                                                                <Form.Group as={Col} md="5" onChange={(evt)=>this.handleOnChangeDuracionFase(evt,etapa.numeroV,fase.numeroV)} controlId={'YacimientosDuracionEtapaFase'+etapa.numeroV+fase.numeroV} className="inputsPaddingRight">
                                                                                    <Form.Label className="cliente-description-fields-text">Duración de la Fase</Form.Label>
                                                                                    <InputGroup className="MyInputGroup">
                                                                                        <Form.Control disabled type="text" className="form-input" defaultValue={fase.duracion} placeholder="Introduzca la duración de la fase"/> 
                                                                                        <InputGroup.Append>
                                                                                            <InputGroup.Text  className="input-append-ventas-form" placeholder="Introduzca la duración de la fase" >días</InputGroup.Text>
                                                                                        </InputGroup.Append>
                                                                                    </InputGroup>
                                                                                </Form.Group>
                                                                                <Form.Group as={Col} md="1"></Form.Group>
                                                                                <Form.Group as={Col} md="5" controlId={'YacimientosCostoEtapaFase'+etapa.numeroV+fase.numeroV} className="inputsPaddingLeft">
                                                                                     <Form.Label className="cliente-description-fields-text">Costo Total de la Fase</Form.Label>
                                                                                    <InputGroup className="MyInputGroup">
                                                                                        <Form.Control disabled type="text" className="form-input"  placeholder={fase.costo} disabled /> 
                                                                                        <InputGroup.Append>
                                                                                            <InputGroup.Text  className="input-append-ventas-form">$</InputGroup.Text>
                                                                                        </InputGroup.Append>
                                                                                    </InputGroup>
                                                                                </Form.Group>  
                                                                                <Form.Group as={Col} md="1"></Form.Group>
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
                                                                                                                <Form.Group as={Col} md="6" onChange={(evt)=>this.handleOnChangeCantidadCargo(evt,etapa.numeroV,fase.numeroV,indexcar)} controlId={'YacimientosCantidadCargo'+etapa.numeroV+fase.numeroV+indexcar} className="inputsPaddingRight">
                                                                                                                    <Form.Label className="cliente-description-fields-text">Cantidad de empleados</Form.Label>
                                                                                                                    <Form.Control disabled type="text" className="form-input" defaultValue={cargo.cantidad} placeholder="Introduzca cantidad de empleados" />
                                                                                                                </Form.Group>
                                                                                                                <Form.Group as={Col} onChange={(evt)=>this.handleOnChangeSueldoCargo(evt,etapa.numeroV,fase.numeroV,indexcar)} md="6" controlId={'YacimientosSueldoCargo'+etapa.numeroV+fase.numeroV+indexcar} className="inputsPaddingLeft">
                                                                                                                     <Form.Label className="cliente-description-fields-text">Sueldo</Form.Label>
                                                                                                                    <InputGroup className="MyInputGroup">
                                                                                                                        <Form.Control disabled type="text" className="form-input" defaultValue={cargo.sueldo}  placeholder="Introduzca sueldo por empleado" /> 
                                                                                                                        <InputGroup.Append>
                                                                                                                            <InputGroup.Text  className="input-append-ventas-form">$</InputGroup.Text>
                                                                                                                        </InputGroup.Append>
                                                                                                                    </InputGroup>
                                                                                                                </Form.Group>
                                                                                                            </Form.Row>
                                                                                                            
                                                                                                            <Container className="containerempleados">
                                                                                                                <br/>
                                                                                                                <Row>
                                                                                                                    {cargo.empleados.map((empleado,indexem)=>{             
                                                                                                                        return(
                                                                                                                            <Col sm={6} md={4} style={{display: cargo.empleadosShow}} className={(empleado.sexo=="Masculino")?"empleadosImage":((empleado.sexo=="Femenino")?"empleadasImage":"empleadosImageOtro")}>
                                                                                                                                {this.renderEmpleados(empleado.sexo)}
                                                                                                                                <div className={(empleado.sexo=="Masculino")?"textoEmpleados":((empleado.sexo=="Femenino")?"textoEmpleadas":"textoEmpleadosOtro")}>
                                                                                                                                    <div>{empleado.nombre}</div>
                                                                                                                                    <div>{empleado.ci}</div>
                                                                                                                                </div>
                                                                                                                                <Button className={(empleado.sexo=="Masculino")?"BotonHorarioM":((empleado.sexo=="Femenino")?"BotonHorarioF":"BotonHorarioO")}variant="outline-primary"  onClick={()=>this.horario(etapa.numero,fase.numero,indexcar,indexem)}>Ver Horario</Button>
                                                                                                                                <Modal show={empleado.accordionKey==1}  size="lg" dialogClassName="modal-dialog modal-xl" centered >
                                                                                                                                    <Modal.Header >
                                                                                                                                        <Modal.Title>Horario</Modal.Title>
                                                                                                                                    </Modal.Header>
                                                                                                                                    <Modal.Body>
                                                                                                                                        <Row>
                                                                                                                                            <Col sm={3}>
                                                                                                                                                {this.renderEmpleadosModal(empleado.sexo)}
                                                                                                                                                <Container fluid className={(empleado.sexo=="Masculino")?"TextoModal":"TextoModalF"}variant="outline-primary"  >
                                                                                                                                                    <h3>
                                                                                                                                                        <Badge variant="secondary">{empleado.nombre}</Badge> 
                                                                                                                                                    </h3>
                                                                                                                                                    <h3>
                                                                                                                                                        <Badge variant="secondary">{empleado.ci}</Badge> 
                                                                                                                                                    </h3>
                                                                                                                                                  
                                                                                                                                                </Container>
                                                                                                                                            </Col>
                                                                                                                                            <Col sm={9} className="HorariosCont">
                                                                                                                                                <br/>
                                                                                                                                                   <br/>
                                                                                                                                                     {empleado.horario.map((horario,indexD)=>{             
                                                                                                                                                        return(
                                                                                                                                                            <div>
                                                                                                                                                                <Form.Row >
                                                                                                                                                                    <Col sm={1}>
                                                                                                                                                                    </Col>
                                                                                                                                                                    <Form.Group as={Col} sm="8"controlId={"DropdownDia"+horario.dia+etapa.numero+fase.numero+indexcar+indexem}>
                                                                                                                                                                        <Form.Label>{horario.dia}</Form.Label>
                                                                                                                                                                        <Form.Control as="select" defaultValue={horario.value} disabled> 
                                                                                                                                                                            <option value={0}>No aplica</option>
                                                                                                                                                                            <option value={1}>Turno de Mañana 7:00-12:00</option>
                                                                                                                                                                            <option value={2}>Turno de Tarde 14:00-18:00</option>
                                                                                                                                                                        </Form.Control>
                                                                                                                                                                    </Form.Group>
                                                                                                                                                                    <Col sm={3}>
                                                                                                                                                                    </Col>
                                                                                                                                                                </Form.Row>
                                                                                                                                                            </div>
                                                                                                                                                        );
                                                                                                                                                    })}
                                                                                                                                            </Col>
                                                                                                                                        </Row>
                                                                                                                                    </Modal.Body>
                                                                                                                                    <Modal.Footer>
                                                                                                                                        <Button variant="primary" onClick={()=>this.horario(etapa.numero,fase.numero,indexcar,indexem)}>
                                                                                                                                            Volver
                                                                                                                                        </Button>
                                                                                                                                    </Modal.Footer>
                                                                                                                                </Modal>
                                                                                                                            </Col>
                                                                                                                        );
                                                                                                                    })}
                                                                                                                </Row>
                                                                                                            </Container>
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
                                                                                                            <Form.Group as={Col} md="6" onChange={(evt)=>this.handleOnChangeCantidadTipoMaq(evt,etapa.numeroV,fase.numeroV,indexTM)} controlId={'YacimientosCantidadTipoMaquinaria'+etapa.numeroV+fase.numeroV+indexTM} className="inputsPaddingRight">
                                                                                                                <Form.Label className="cliente-description-fields-text">Cantidad de unidades</Form.Label>
                                                                                                                <Form.Control disabled type="text" className="form-input" defaultValue={tipoMaquinaria.cantidad} placeholder="Introduzca cantidad de unidades" />
                                                                                                                
                                                                                                            </Form.Group>
                                                                                                            <Form.Group as={Col} md="6" onChange={(evt)=>this.handleOnChangeCostoTipoMaq(evt,etapa.numeroV,fase.numeroV,indexTM)} controlId={'YacimientosCostoTipoMaquinaria'+etapa.numeroV+fase.numeroV+indexTM} className="inputsPaddingLeft">
                                                                                                                 <Form.Label className="cliente-description-fields-text">Costo</Form.Label>
                                                                                                                <InputGroup className="MyInputGroup">
                                                                                                                    <Form.Control disabled type="text" className="form-input" defaultValue={tipoMaquinaria.costo} placeholder="Introduzca costo por unidad" /> 
                                                                                                                    <InputGroup.Append>
                                                                                                                        <InputGroup.Text  className="input-append-ventas-form">$</InputGroup.Text>
                                                                                                                    </InputGroup.Append>
                                                                                                                </InputGroup>
                                                                                                                
                                                                                                            </Form.Group>
                                                                                                        </Form.Row>
                                                                                                        <br/>
                                                                                                        <Container className="containerMaquinaria">
                                                                                                            <br/>
                                                                                                            <Row>
                                                                                                                {tipoMaquinaria.maquinarias.map((maquinaria,indexM)=>{             
                                                                                                                    return(
                                                                                                                        <Col sm={6} md={4} style={{display: tipoMaquinaria.maquinariasShow}} className="maquinaria">
                                                                                                                            <Image src="/images/maquinaria1.png" alt="maquinaria" />
                                                                                                                            <div className="maquinariaText">
                                                                                                                                <div>{maquinaria.serial}</div>
                                                                                                                              

                                                                                                                            </div>
                                                                                                                                      
                                                                                                                           
                                                                                                                        </Col>
                                                                                                                    );
                                                                                                                })}
                                                                                                            </Row>
                                                                                                        </Container>

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
                    }
                    <div>
                    
                    <Button className="RYacimiento-btn btn-block btn-margin-izq-vol" onClick={this.goback}>
                        Volver
                    </Button>
                    </div>
                </Container>
               
            </div>
        ) 
    }

}
