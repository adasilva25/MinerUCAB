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
    state = {
        datatable: null
    }
    componentDidMount = () => {
        const iconoConsultar = ReactDOMServer.renderToStaticMarkup(<FontAwesomeIcon className="icons iconsearch" icon={Icons.faSearch}/>);
        const iconoModificar = ReactDOMServer.renderToStaticMarkup(<FontAwesomeIcon className="icons iconedit" icon={Icons.faEdit} />);
        let modificar = this.props.modificar === true;
        let consultar = this.props.consultar === true;
        let eliminar = this.props.eliminar === true;
        let checktable = this.props.checktable === true;
        let urlConsultar = this.props.urlConsultar;
        let urlModificar = this.props.urlModificar;
        let size = this.props.size;
        let dataSet = [];
        let columns = [];
        const textoPlural = this.props.textoPlural;
        const modalEliminar = this.props.modalEliminar;
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }

        axios.get(`${this.props.columns}`, config)
            .then((res) => {
                res.data.forEach(element => {
                    columns.push({
                        title: element.column_name
                    })
                })
                /*DROPDOWN ESTATUS*/
                /*columns.push(
                {
                    title: 'Estatus'
                })*/
                columns.push({
                    title: 'Acciones'
                })
                axios.get(`${this.props.data}`, config)
                .then((res) => {
                    res.data.forEach(item => {
                        let values = [];
                        const keys = Object.keys(item);

                        for (let key of keys) {

                            if (typeof item[key] === 'number'){
                                values.push(item[key].toString());
                            }
                            else {
                                values.push(item[key]);
                            }
                        }
                        values.push('')
                        dataSet.push(values)
                    })

                    
                        this.$el = $(this.el);
                        var table = this.$el.DataTable({
                        data: dataSet,
                        columns: columns,
                        "bDestroy": true,
                        //Quitar paging
                            //paging: false
                        //Quitar searching
                            //searching: false,
                        //Scrollbar
                            scrollY: size,
                        //No permitir orden
                            //ordering:  false
                            "order": [[ 1, "asc" ]],
                        "language": {
                            "paginate": {
                                "previous": "Anterior",
                                "next": "Siguiente",
                            },
                            "emptyTable": "No existen registros.",
                            "infoEmpty": "",
                            "infoFiltered": "",
                            "zeroRecords": "No existen registros con estas características.",
                            "lengthMenu": 'Mostrando <select>'+
                                '<option value="5">5</option>'+
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
                            'checkboxes': {
                               'selectRow': true
                            },
                            name: 'dtcheckbox'
                        }, 
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
                                        if ((eliminar === false) && (modificar === false) && (consultar === false)){
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
                        $('#frm-dt').on('submit', function(e){
                            var form = this;
                            var rows_selected = table.column(0).checkboxes.selected();
                                //console.log(rows_selected,)
                              //Iterate over all selected checkboxes
                              $.each(rows_selected, function(index, rowId){
                                //console.log(encodeURIComponent(rowId))
                              });
                              //debugger;
                        });
                        if(checktable === false){
                            table.column('dtcheckbox:name').visible(false);
                        }else{
                            table.column('crudoptions:name').visible(false);
                        }

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

                    }).catch((e) => {
                        console.log('Error en axios')
                    })
                    // this.setState({ datatable: table });

            }).catch((e) => {
                console.log('Error en axios')
            })

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
    render(){
        return (
            <div>
            <form name="frm-dt" id="frm-dt">
                <table  className="display" width="100%" ref={el => this.el = el}>
                </table>
                {
                  (this.props.checktable === true && 
                    <p className="form-group">
                       <button type="submit" className="btn btn-primary btn-subcheckbox">Submit</button>
                    </p>)
                }  
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