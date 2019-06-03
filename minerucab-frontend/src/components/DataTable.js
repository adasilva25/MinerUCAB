import React from 'react';
import axios from 'axios';
import '../styles/css/jquery.dataTables.css'

const $ = require('jquery');
$.DataTable = require('datatables.net');

export default class DataTable extends React.Component {
    componentDidMount = () => {
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
                        columnDefs: [
                            {
                                targets:-0, // Start with the last
                                render: function ( data, type, row, meta ) {
                                    if(type === 'display'){
                                        data = '<a href="consultar_empleado/:' + encodeURIComponent(data) + '">Más información</a>';
                                    }
                                    return data;
                                }
                            }
                        ],
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
                                '</select> empleados',
                            "search": "_INPUT_",
                            searchPlaceholder: "Buscar empleado",
                            "info": "_START_-_END_ de _TOTAL_",
                          },

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
                <table className="display" width="100%" ref={el => this.el = el}>
                </table>
            </div>
        )
    }
}