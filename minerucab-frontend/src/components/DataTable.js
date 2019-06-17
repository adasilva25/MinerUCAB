import React from 'react';
import axios from 'axios';
import '../styles/css/jquery.dataTables.css';
import Button from 'react-bootstrap/Button';
import ReactDOMServer from 'react-dom/server';
import '../styles/css/dataTables.checkboxes.min';
import '../styles/css/dataTables.checkboxes.css';

const $ = require('jquery');
$.DataTable = require('datatables.net');

export default class DataTable extends React.Component {

    componentDidMount = () => {
        let modificar = this.props.modificar === true;
        let consultar = this.props.consultar === true;
        let eliminar = this.props.eliminar === true;
        let checktable = this.props.checktable === true;
        let urlConsultar = this.props.urlConsultar;
        let urlModificar = this.props.urlModificar;
        let urlEliminar = this.props.urlEliminar;
        let dataSet = [];
        let columns = [];
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
                columns.push(
                {
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
                            values.push(item.id.toString())
                            /*DROPDOWN ESTATUS*/
                            /*values.push(item.id.toString())*/
                            dataSet.push(values)
                        })

                        this.$el = $(this.el);
                        var table = this.$el.DataTable({
                            data: dataSet,
                            columns: columns,
                            //Quitar paging
                                //paging: false
                            //Quitar searching
                                //searching: false,
                            //Scrollbar
                                scrollY: 270,
                            //No permitir orden
                                //ordering:  false
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
                                 /*DROPDOWN ESTATUS*/
                                 /*
                                {
                                    "aTargets":[-2],
                                    "orderable": false,
                                    "mData": null,
                                    "mRender": function( data, type, full, row, meta ) {   
                                        data = '<select id="dt-dropdown" name="dt-dropdown">\n\
                                                     <option id="'+estados[0].id+'" value="">'+estados[0].nombre+'</option/>\n\
                                                     <option id="'+estados[1].id+'" value="">'+estados[1].nombre+'</option/>\n\
                                                     <option id="'+estados[2].id+'" value="">'+estados[2].nombre+'</option/>\n\
                                                      </select>'
                                        return data;
                                    }
                                },
                                */
                                {
                                    targets: -1,
                                    orderable: false,
                                    name: 'crudoptions',
                                    render: function ( data, type, row, meta ) {
                                        if(type === 'display'){
                                            if (modificar === true){
                                                data = '<a href="' + urlModificar + '/' + encodeURIComponent(row[0]) + '/M"><i class="fas fa-edit icons iconedit"></i></a>'
                                            }
                                            if (consultar === true){
                                                data += '<a href="' + urlConsultar + '/' + encodeURIComponent(row[0]) + '/CO"><i class="fas fa-search icons iconsearch"></i></a>'
                                            }
                                            if (eliminar === true){
                                                data += '<a href="' + urlEliminar + '"><i class="far fa-trash-alt icons icondelete"></i></a>'
                                            }
                                            if ((eliminar === false) && (modificar === false) && (consultar === false)){
                                                data = 'No posee acciones disponibles'
                                            }
                                            //  ORIGINAL --> data = '<a href="/registrar_cliente_juridico"><i class="fas fa-edit icons iconedit"></i></a> <a href=""' + encodeURIComponent(data) + '"><i class="fas fa-search icons iconsearch"></i></a> <a href="#"><i class="far fa-trash-alt icons icondelete"></i></a>';
                                        }
                                        return data;
                                    }
                                }

                            ],

                            'select': {
                                'style': 'multi'
                            },
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
                                //console.log(rows_selected)
                                //debugger;
                              /*Iterate over all selected checkboxes
                              $.each(rows_selected, function(index, rowId){
                              });*/
                        });
                        if(checktable === false){
                            table.column('dtcheckbox:name').visible(false);
                        }else{
                            table.column('crudoptions:name').visible(false);
                        }

                    }).catch((e) => {
                        console.log('Error en axios')
                    })

            }).catch((e) => {
                console.log('Error en axios')
            })

    }

    componentWillUnmount = () => {
        this.$el
        .DataTable
        .destroy(true);
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
                        <i className="fas fa-plus-circle iconadd"></i>
                    )
                )
            }
            </div>
        )
    }
}