import React from 'react';
import axios from 'axios';
import '../styles/css/jquery.dataTables.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import ReactDOMServer from 'react-dom/server';
import {history} from '../routers/History';
import '../styles/css/dataTables.checkboxes.min';
import '../styles/css/dataTables.checkboxes.css';

const $ = require('jquery');
$.DataTable = require('datatables.net');

export default class DataTable extends React.Component {
    /* constructor(props){
        super(props);

        this.*/state = {
           datatable: null
       }/* 
        
        this.check = this.check.bind(this);
    }*/

    
    componentDidMount = () => {
        const iconoConsultar = ReactDOMServer.renderToStaticMarkup(<FontAwesomeIcon className="icons iconsearch" icon={Icons.faSearch}/>);
        const iconoModificar = ReactDOMServer.renderToStaticMarkup(<FontAwesomeIcon className="icons iconedit" icon={Icons.faEdit} />);
        let modificar = this.props.modificar === true;
        let consultar = this.props.consultar === true;
        let eliminar = this.props.eliminar === true;
        let explotar = this.props.explotar === true
        let checktable = this.props.checktable === true;
        let modificarCheck = this.props.modificarCheck === true;
        const listaModificarCheck = this.props.listaModificarCheck;
        let urlConsultar = this.props.urlConsultar;
        let urlModificar = this.props.urlModificar;
        let urlExplotar = this.props.urlExplotar;
        let size = this.props.size;
        let registros = true;
        let dataSet = [];
        let columns = [];
        const textoPlural = this.props.textoPlural;
        let columnsSet = 0;
        const modalEliminar = this.props.modalEliminar;
        const modalExplotar = this.props.modalExplotar;
        let etapa = this.props.etapa;
        let fase = this.props.fase;
        let id = this.props.id;
        let tipo = this.props.tipo;
        const selectCheck = this.props.selectCheck;
        const selectCheck2 = this.props.selectCheck2;
        let max = this.props.max;
        // console.log('selectCheck', selectCheck)
        // console.log("inicio",etapa,fase);
        if(etapa !== undefined){
            const alt = etapa.toString() + '_' + fase.toString()
        }
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }

                // res.data.forEach(element => {
                //     columns.push({
                //         title: element.column_name[0].toUpperCase() + element.column_name.substring(1,element.column_name.length).toLowerCase()
                //     })
                //     // columns.push({
                //     //     title: element.column_name
                //     // })
                // })
                /*DROPDOWN ESTATUS*/
                /*columns.push(
                {
                    title: 'Estatus'
                })*/
                axios.get(`${this.props.data}`, config)
                .then((res) => {
                    // console.log('res', res)
                    res.data.forEach(item => {
                        let values = [];
                        const keys = Object.keys(item);
                        for (let key of keys) {
                            if (columnsSet < keys.length){
                                columns.push({
                                    title: key[0].toUpperCase() + key.substring(1,key.length).toLowerCase()
                                })
                                columnsSet++;
                            }
                            if (columnsSet === keys.length){
                                columns.push({
                                    title: 'Acciones'
                                })
                                columnsSet++;
                            }
                            if (typeof item[key] === 'number'){
                                values.push(item[key].toString());
                            }
                            else if (key.includes('fecha')){
                                const date = new Date(item[key])
                                 const dia = date.getDate()
                                 const mes = (date.getMonth() + 1)
                                 const ano = date.getFullYear()
                                 values.push(`${dia}/${mes}/${ano}`)
                                //values.push(date)
                            }
                            else {
                                values.push(item[key]);
                            }
                        }
                        values.push('')
                        dataSet.push(values)
                    })
                    if (res.data.length === 0){
                        columns.push({title: 'No existen registros'}, {title: 'No existen registros'})
                        consultar = false;
                        modificar = false;
                        eliminar = false;
                        registros = false;
                    }
                    // console.log(dataSet)

                        let i = -1;
                    
                        this.$el = $(this.el);
                        var table = this.$el.DataTable({
                        data: dataSet,
                        columns: columns,
                        "bDestroy": true,
                        //Quitar paging
                            paging: false,
                        //Quitar searching
                            //searching: false,
                        //Scrollbar
                            scrollY: size,
                            scrollX: 300,
                        //No permitir orden
                            //ordering:  false
                            // "order": [[ 1, "asc" ]],
                        "language": {
                            "paginate": {
                                "previous": "Anterior",
                                "next": "Siguiente",
                            },
                            "emptyTable": "No existen registros",
                            "infoEmpty": "",
                            "infoFiltered": "",
                            "zeroRecords": "No existen registros con estas características.",
                            "lengthMenu": 'Mostrando <select>'+
                                '<option value="2">2</option>'+
                                '<option value="10">10</option>'+
                                '<option value="25">25</option>'+
                                '<option value="50">50</option>'+
                                '<option value="-1">Todos</option>'+
                                `</select> ${this.props.textoPlural}`,
                            "search": "_INPUT_",
                            searchPlaceholder: `Buscar ${this.props.textoSingular}`,
                            "info": "_START_-_END_ de _TOTAL_",
                        },
                        columnDefs: [

                       {
                          'targets': 0,
                            
                            className: 'dt-checkbox',
                            render: function (data, type, row, meta){
                                
                               if (checktable === true){
                                    
                                    var checkbox = $("<input/>",{
                                        "type": "checkbox"
                                    });
                                    checkbox.addClass("dt-checkboxes");
                                   
                                    if(modificarCheck===true){
                                       // console.log("chechboxes",checkbox);
                                        if(listaModificarCheck.includes(Number(row[0]))){
                                            checkbox.attr("checked", "checked");
                                            //checkbox.addClass("checkbox_checked");
                                        }else{
                                           // checkbox.addClass("checkbox_unchecked");
                                        }
                                    }
                                    
                                  
                                    return checkbox.prop("outerHTML");
                                
                                }

                                else {

                                    return row[0]
                                }
                            
                            }
                         }, 
                    //   {

                    //         'targets': 0,
                    //         'orderable': false,
                    //         // 'className': 'dt-body-center',
                    //         render: function (data, type, row, meta){
                    //             i++;
                    //             // console.log(data)
                                
                    //             if (checktable === true){
                    //                 console.log('data', data)
                    //                 console.log('row', row)
                    //                 console.log('type', meta.row)
                    //                 const input = <input type="checkbox" value={meta.row} name={data} className="checkbox-dt"></input>;
                    //                 console.log('input.value', input.props.value)
                    //                 const inputHTML = ReactDOMServer.renderToStaticMarkup(input);
                    //                 return inputHTML
                    //                 // return '<input type="checkbox" value="' + data + '" class="checkbox-dt">';
                    //                 // console.log(input)
                    //                 return input;
                    //             }
                    //             else {
                    //                 return row[0]
                    //             }
                    //         }
                    //     },
                        {
                            targets: -1,
                            orderable: false,
                            name: 'crudoptions',
                            render: function ( data, type, row, meta ) {
                                    if(type === 'display'){
                                        if (modificar === true){
                                            data += `<a href="${urlModificar}/M/${encodeURIComponent(row[0])}">${iconoModificar}</a>`
                                        }
                                        if (consultar === true){
                                            data += `<a href="${urlConsultar}/CO/${encodeURIComponent(row[0])}">${iconoConsultar}</a>`
                                        }
                                        if (eliminar === true){
                                            const iconoEliminar = ReactDOMServer.renderToStaticMarkup(<FontAwesomeIcon id={row[0]} className="icons icondelete" icon={Icons.faTrashAlt}/>)
                                            data += `${iconoEliminar}`
                                        }
                                        if (explotar === true){
                                            const iconoExplotar = ReactDOMServer.renderToStaticMarkup(<FontAwesomeIcon id={row[0]} className="icons iconedit iconexp" icon={Icons.faEyeDropper}/>)
                                            data += `${iconoExplotar}`
                                        }
                                        if ((eliminar === false) && (modificar === false) && (consultar === false) && (registros === true)){
                                            data = 'No posee acciones disponibles'
                                        }
                                        if (registros === false){
                                            data = 'No posee acciones disponibles'
                                        }
                                    }
                                    return data;
                                }   
                        }],
                            'select': {
                                'style': 'multi'
                            }
                        })

                        
                        /*$('select[name=dt-dropdown]').on('change', function () {   
                            var selectedid = $(this).children(":selected").attr("id");
                            var rowdata = table.row( $(this).parents('tr') ).data()[0];
                                //console.log("Row:",rowdata);
                                //console.log("Estatus:",selectedid);
                              return false;

                        });*/
                        /*$('#frm-dt').on('submit', function(e){
                            var form = this;
                            var rows_selected = table.column(0).checkboxes.selected();
                                //console.log(rows_selected,)
                              //Iterate over all selected checkboxes
                              $.each(rows_selected, function(index, rowId){
                                //console.log(encodeURIComponent(rowId))
                              });
                              //debugger;
                        });*/
                       if (checktable === true){
                        // console.log('antes', document.getElementsByClassName('dt-checkboxes'))
                            const checkboxesDT = document.getElementsByClassName('dt-checkboxes')
                          // console.log("atributos clases",checkboxesDT);
                            // console.log('tP', textoPlural)
                            let m = 0;
                                if (checkboxesDT.length > 0){
                                   // console.log('datatable', this.$el)
                                    for (let k = 0; k < checkboxesDT.length; k++){
                                        // console.log('entroLETK')
                                        // console.log(checkboxesDT[k].alt);

                                        // console.log('classList', checkboxesDT[k].classList.length)

                                        //  FUNCIONA PERFECT
                                        if (checkboxesDT[k].classList.length === 1){
                                            

                                            // console.log('dataSet', dataSet[m][0])
                                            // console.log('alt', checkboxesDT[k].alt)

                                            if(id!=null){

                                                if(tipo=="E"){
                                                    checkboxesDT[k].alt = dataSet[m][0];//ID
                                                    checkboxesDT[k].Name = dataSet[m][3];//CI
                                                    checkboxesDT[k].align = dataSet[m][1]+' '+dataSet[m][2];//NOMBRE
                                                    checkboxesDT[k].dirName = dataSet[m][4];//SEXO
                                                   
                                                }
                                                else{
                                                    checkboxesDT[k].alt = dataSet[m][0];
                                                    checkboxesDT[k].align = dataSet[m][1];
                                                }
                                               
                                                checkboxesDT[k].classList.add(textoPlural.replace(/\s/g,'')+etapa+fase+id);
                                            }

                                            else{
                                                checkboxesDT[k].alt = dataSet[m][0];
                                                checkboxesDT[k].align = dataSet[m][1];
                                                checkboxesDT[k].classList.add(textoPlural.replace(/\s/g,'')+etapa+fase);
                                            }
                                            

                                            m++; 
                                        }

                                        //      ANTERIOR EN CASO DE EMERGENCIA
                                        // if (textoPlural === 'cargos' || textoPlural === 'minerales' || textoPlural === 'tipos de maquinaria'){
                                        //     if(textoPlural === 'cargos' && !checkboxesDT[k].className.includes('minerales') && !checkboxesDT[k].className.includes('tipos de maquinaria')){
                                        //         checkboxesDT[k].classList.add(textoPlural.replace(/\s/g,''));
                                        //     }
                                        //     else if (textoPlural === 'minerales' && !checkboxesDT[k].className.includes('cargos') && !checkboxesDT[k].className.includes('tipos de maquinaria')){
                                        //         checkboxesDT[k].classList.add(textoPlural.replace(/\s/g,''));
                                        //     }
                                        //     else if (textoPlural === 'tipos de maquinaria' && !checkboxesDT[k].className.includes('minerales') && !checkboxesDT[k].className.includes('cargos')){
                                        //         checkboxesDT[k].classList.add(textoPlural.replace(/\s/g,''));
                                        //     }
                                        // }
                                    }
                                }
                           
                                
                            $('.dt-checkboxes').ready(function(){
                                // console.log('dt-checkboxes', document.getElementsByClassName('dt-checkboxes'))
                                // const checks = document.getElementsByClassName('dt-checkboxes');
                                // checks[0].classList.add('hola');
                                // console.log(checks[0])

                                // for (let i = 0; i < checks.length; i++){
                                //     console.log('long inicial', checks[i].classList.length)
                                //     if (checks[i].length === 1){
                                //         checks[i].id = (this.props.textoPlural.replace(/\s/g,''));
                                //     }
                                //     console.log('long final', checks[i].classList.length)
                                //     console.log('classes values', checks[i].classList)
                                //     // if (textoPlural === 'cargos' || textoPlural === 'minerales' || textoPlural === 'tipos de maquinaria'){
                                //     //     if(textoPlural === 'cargos' && !checks[i].className.includes('minerales') && !checks[i].className.includes('tipos de maquinaria')){
                                //     //         checks[i].classList.add(textoPlural.replace(/\s/g,''));
                                //     //     }
                                //     //     else if (textoPlural === 'minerales' && !checks[i].className.includes('cargos') && !checks[i].className.includes('tipos de maquinaria')){
                                //     //         checks[i].classList.add(textoPlural.replace(/\s/g,''));
                                //     //     }
                                //     //     else if (textoPlural === 'tipos de maquinaria' && !checks[i].className.includes('minerales') && !checks[i].className.includes('cargos')){
                                //     //         checks[i].classList.add(textoPlural.replace(/\s/g,''));
                                //     //     }
                                //     // }
                                // }
                            })
                           
                            const textoPrueba = textoPlural.replace(/\s/g,'')
                            if (textoPrueba === 'cargos12'){
                                this.props.nombreDT(table)
                            }
                            if(id!=null){
                                $('.dt-checkboxes.'+textoPrueba+etapa+fase+id).on('change', function(e){
                                var form = this;
                                // console.log('jquery', $('.dt-checkboxes'))
                                // console.log('dt-checkboxes list', document.getElementsByClassName('dt-checkboxes'))
                                // console.log(table.column(0).checkboxes)
                                
                                // console.log('length', document.getElementsByClassName('dt-checkboxes').length)
                                
                                // console.log('me pones una banderita ahí', table.columns(0).checkboxes.selected()[0], etapa, fase);
                                
                               /* console.log('SELECCIONADO ', e.target.checked); // SELECCIONADO O NO
                                console.log('ID EN BD ', e.target.alt);   // ID EN BD
                                console.log('TABLA SELECCIONADA ', e.target.className);
                                console.log('ETAPA - FASE ', etapa, fase);
                                // console.log('selectCheck change', selectCheck)
                                console.log('className', e.target.className);
                                console.log('CIIII2222222222222 ',e.target);
                                console.log('C3333333333333 ',e.target.Name);*/
                                




                                selectCheck2(e,e.target.className,e.target.alt,e.target.align,e.target.Name,e.target.dirName,etapa,fase,id);
                                
                                // this.props.selectCheck()
                                    
                                })
                            }
                            else{

                                $('.dt-checkboxes.'+textoPrueba+etapa+fase).on('change', function(e){
                                var form = this;
                                // console.log('jquery', $('.dt-checkboxes'))
                                // console.log('dt-checkboxes list', document.getElementsByClassName('dt-checkboxes'))
                                // console.log(table.column(0).checkboxes)
                                
                                // console.log('length', document.getElementsByClassName('dt-checkboxes').length)
                                
                                // console.log('me pones una banderita ahí', table.columns(0).checkboxes.selected()[0], etapa, fase);
                                
                                console.log('SELECCIONADO ', e.target.checked) // SELECCIONADO O NO
                                console.log('ID EN BD ', e.target.alt)   // ID EN BD
                                console.log('TABLA SELECCIONADA ', e.target.className)
                                console.log('ETAPA - FASE ', etapa, fase)
                                // console.log('selectCheck change', selectCheck)
                                console.log('className', e.target.className)
                                selectCheck(e.target.className,e.target.alt,e.target.align,etapa,fase);
                                
                                // this.props.selectCheck()
                                    
                                })

                            }
                        }
                       
                                // var actualRows=[];
                                // var i=0;
                                // while(rows_selected[i] != undefined ){
                                //     actualRows.push(rows_selected[i]);
                                //     i++;
                                
                                // // call=rows_selected;
                                
                                // }
                                // console.log(rows_selected);
                                // this.props.selectCheck(actualRows);
                                // this.props.callback(rows_selected);

                                    
                                    //debugger;
                                  /*Iterate over all selected checkboxes
                                  $.each(rows_selected, function(index, rowId){
                                  });*/


                           // }.bind(this));
                       // }
                        if(checktable === false){
                            table.column('dtcheckbox:name').visible(false);
                        }else{
                            table.column('crudoptions:name').visible(false);
                        }

                        // console.log(getElementsByClassName('dt-checkboxes'))
                        const botonesEliminar = document.getElementsByClassName('icondelete');
                            if (botonesEliminar.length > 0){
                                for (let i = 0; i < botonesEliminar.length; i++){
                                    if (textoPlural === 'minerales metalicos' || textoPlural === 'minerales no metalicos'){
                                        if(textoPlural === 'minerales metalicos' && !botonesEliminar[i].className.baseVal.includes('mineralesnometalicos')){
                                            botonesEliminar[i].classList.add(textoPlural.replace(/\s/g,''));
                                        }
                                        else if (textoPlural === 'minerales no metalicos' && !botonesEliminar[i].className.baseVal.includes('mineralesmetalicos')){
                                            botonesEliminar[i].classList.add(textoPlural.replace(/\s/g,''));
                                        }
                                    }
                                    else if (textoPlural === 'clientes jurídicos' || textoPlural === 'clientes naturales'){
                                        if(textoPlural === 'clientes jurídicos' && !botonesEliminar[i].className.baseVal.includes('clientesnaturales')){
                                            botonesEliminar[i].classList.add(textoPlural.replace(/\s/g,''));
                                        }
                                        else if (textoPlural === 'clientes naturales' && !botonesEliminar[i].className.baseVal.includes('clientesjurídicos')){
                                            botonesEliminar[i].classList.add(textoPlural.replace(/\s/g,''));
                                        }
                                    }
                                    botonesEliminar[i].onclick = function() {
                                        if ((this.props.textoPlural === 'minerales metalicos' || this.props.textoPlural === 'minerales no metalicos')){
                                            this.props.modalEliminar(botonesEliminar[i])
                                        }
                                        else if ((this.props.textoPlural === 'clientes jurídicos' || this.props.textoPlural === 'clientes naturales')){
                                            this.props.modalEliminar(botonesEliminar[i])
                                        }
                                        else {
                                            console.log('id', botonesEliminar[i].id)
                                            this.props.modalEliminar(botonesEliminar[i].id)
                                        }   
                                    }.bind(this)
                                }
                            }
                            
                         const botonesExplotar = document.getElementsByClassName('iconexp');
                            if (botonesExplotar.length > 0){
                                for (let i = 0; i <  botonesExplotar.length; i++){
                                     botonesExplotar[i].onclick = function() {
                                        this.props.modalExplotar(botonesExplotar[i].id)
                                    }.bind(this)
                                }
                            }
                            // if (checktable === true){
                            //     const checks = document.getElementsByClassName('checkbox-dt');
                            //     console.log(checks.length)
                            //     if (checks.length > 0){
                                    
                            //         for (let i = 0; i < checks.length; i++){
                            //             if (textoPlural === 'cargos' || textoPlural === 'minerales' || textoPlural === 'tipos de maquinaria'){
                            //                 if(textoPlural === 'cargos' && !checks[i].className.includes('minerales') && !checks[i].className.includes('tipos de maquinaria')){
                            //                     checks[i].classList.add(textoPlural.replace(/\s/g,''));
                            //                 }
                            //                 else if (textoPlural === 'minerales' && !checks[i].className.includes('cargos') && !checks[i].className.includes('tipos de maquinaria')){
                            //                     checks[i].classList.add(textoPlural.replace(/\s/g,''));
                            //                 }
                            //                 else if (textoPlural === 'tipos de maquinaria' && !checks[i].className.includes('minerales') && !checks[i].className.includes('cargos')){
                            //                     checks[i].classList.add(textoPlural.replace(/\s/g,''));
                            //                 }
                            //             }
                            //             // checks[i].alt = alt;
                            //             // console.log('alt viejo', checks[i].alt)
                            //             if (checks[i].alt === ''){
                            //                 checks[i].alt = alt;
                            //                 // console.log('alt nevo', checks[i].alt)
                            //             }
                                        
                            //             // if (checks[i].name === ''){
                            //             //     for (let j = 0; j < dataSet.length; j++){
                            //             //         checks[i+j].name = dataSet[j][0]
                            //             //         console.log(checks)
                            //             //         console.log('name', checks[i+j].name, dataSet[j][0])
                            //             //         // console.log(checks[j].name)
                            //             //     }
                            //             // }
                                            
                                        
                            //             // console.log(checks)
                            //             checks[i].onclick = function() {
                            //                 console.log("DataTable Checks",etapa,fase);
                            //                 // console.log(table.column(0).checkboxes.selected());
                            //                 console.log('name', checks[i].name)
                            //                 console.log('value', checks[i].value)
                            //                 this.props.selectCheck(checks[i]);
                            //                 // this.props.selectCheck(checks[i].value)
                            //                 // console.log(this.props.selectCheck)
                            //             }.bind(this)
                            //         }
    
                            //     }
                            // }
                        

                            // console.log('checks did mount', document.getElementsByClassName('checkbox-dt').length)
                            // const checks = document.getElementsByClassName('checkbox-dt')
                            // this.setState(() => ({
                            //     checks: checks
                            // }));
                            // console.log('final', document.getElementsByClassName('dt-checkboxes'))

                    }).catch((e) => {
                        console.log('Error en axios')
                    })
                    // this.setState({ datatable: table });


    }


   
    componentWillUnmount = () => {
        const datatable = $(this.el);
        datatable.DataTable().destroy()
        // this.$el
        // .DataTable
        // .destroy(true);
    }
    createElement = () => {
        if (this.props.modalCrear){
            this.props.modalCrear()
        }
        else {
            history.push(this.props.urlCrear);
        }
    }

    setOnClickCheck = () => {
        const textoPlural = this.props.textoPlural;
        const etapa = this.props.etapa;
        const fase = this.props.fase;
        console.log('setOnClickCheck')

        if (this.props.checktable === true){
            // console.log('entro')
            console.log(document.getElementsByClassName('checkbox-dt').length)
            let checks = document.getElementsByClassName('checkbox-dt');
            console.log('checks[0]', checks.length, checks)
            // console.log('length', checks.length)
            if (checks.length > 0){
                // console.log('checks >0')
                for (let i = 0; i < checks.length; i++){
                    console.log('entro en el if')
                    if (textoPlural === 'cargos' || textoPlural === 'minerales' || textoPlural === 'tipos de maquinaria'){
                        if(textoPlural === 'cargos' && !checks[i].className.includes('minerales') && !checks[i].className.includes('tipos de maquinaria')){
                            checks[i].classList.add(textoPlural.replace(/\s/g,''));
                        }
                        else if (textoPlural === 'minerales' && !checks[i].className.includes('cargos') && !checks[i].className.includes('tipos de maquinaria')){
                            checks[i].classList.add(textoPlural.replace(/\s/g,''));
                        }
                        else if (textoPlural === 'tipos de maquinaria' && !checks[i].className.includes('minerales') && !checks[i].className.includes('cargos')){
                            checks[i].classList.add(textoPlural.replace(/\s/g,''));
                        }
                    }
                    
                    checks[i].onClick = function() {
                        console.log('onClick', checks[i])
                        console.log("DataTable Checks",etapa,fase);
                        // this.props.selectCheck(checks[i],etapa,fase);
                        // this.props.selectCheck(checks[i].value)
                        // console.log(this.props.selectCheck)
                    }
                }

            }
        }
    }

    render(){
        return (
            <div>
            <form name="frm-dt" id="frm-dt" >
                <table  className="display" width="100%" ref={el => this.el = el}>
                </table>
            </form>
            {
                (this.props.agregar === true && 
                    (this.props.checktable === false &&
                        
                    <span onClick={() => this.createElement()}>
                        <FontAwesomeIcon className="iconadd" icon={Icons.faPlusCircle}/>
                    </span>
                    )
                )
            }
            </div>
        )
    }
}