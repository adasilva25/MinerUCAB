import React from 'react';
import axios from 'axios';
import '../styles/css/jquery.dataTables.css';
import Button from 'react-bootstrap/Button';

const $ = require('jquery');
$.DataTable = require('datatables.net');

export default class DataTable extends React.Component {
    componentDidMount = () => {
        let modificar = this.props.modificar === true;
        let consultar = this.props.consultar === true;
        let eliminar = this.props.eliminar === true;
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
                        values.push(item.id.toString())
                        dataSet.push(values)
                    })

                    this.$el = $(this.el);
                    this.$el.DataTable({
                        data: dataSet,
                        columns: columns,
                        //Quitar paging
                            //paging: false
                        //Quitar searching
                            //searching: false,
                        //Scrollbar
                            scrollY: 390,
                        //No permitir orden
                            //ordering:  false
                        /*columnDefs: [
                            {
                                targets:-0, // Start with the last
                                render: function ( data, type, row, meta ) {
                                    if(type === 'display'){
                                        data = '<a href="consultar_empleado/:' + encodeURIComponent(data) + '">Más información</a>';
                                    }
                                    return data;
                                }
                            }
                        ],*/
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
                                '<option value="10">10</option>'+
                                '<option value="25">25</option>'+
                                '<option value="50">50</option>'+
                                '<option value="-1">Todos</option>'+
                                `</select> ${this.props.textoPlural}`,
                            "search": "_INPUT_",
                            searchPlaceholder: `Buscar ${this.props.textoSingular}`,
                            "info": "_START_-_END_ de _TOTAL_",
                          },

                    columnDefs: [{
                        targets: -1,
                        render: function ( data, type, row, meta ) {
                                    // console.log(this.props.modificar)
                                    if(type === 'display'){
                                        // data = '<a href="/registrar_cliente_juridico"><i class="fas fa-edit icons iconedit"></i></a> <a href=""' + encodeURIComponent(data) + '"><i class="fas fa-search icons iconsearch"></i></a> <a href="#"><i class="far fa-trash-alt icons icondelete"></i></a>';
                                        
                                        /*data = '<button class="btn btn-primary purple-btn">A</button> <form style="display: inline" action="consultar_empleado/:' + encodeURIComponent(data) +'" method="get"><button class="btn btn-primary purple-btn">Detalle</button></form> <button class="btn btn-primary purple-btn">C</button>';*/
                                        // data = '<a href="/registrar_cliente_juridico"><FontAwesomeIcon icon="check-square" /></a>'
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
                    }]
                    /*"columnDefs": [ {
                        "targets": 0,
                        "data": null,
                        "defaultContent":'<i class="far fa-trash-alt"></i><form style="display: inline" action="consultar_empleado/:" method="get"><button>B</button></form><button>C</button>',
                    } ],*/
                    })

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
            <Button className="dt-btn btn-block" onClick={this.onSubmit}>
            Agregar
            </Button>
                <table className="display" width="100%" ref={el => this.el = el}>
                </table>
            </div>
        )
    }
}