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
                        columns: columns
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