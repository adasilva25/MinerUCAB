import React from 'react';
import axios from 'axios';
import MenuBar from '../../components/MenuBar';
import DataTable from '../../components/DataTable';

export default class ConsultarEmpleados extends React.Component {
    getColumns = () => {
        let columns = [];
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }
        axios.get('http://localhost:3000/column_names/test_table', config)
        .then((res) => {
            res.data.forEach(element => {
                columns.push({
                    title: element.column_name
                })
            })
        }).catch((e) => {
            console.log('Error en axios')
        })
        return columns;
    }
    getData = () => {
        let dataSet = [];
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }
        axios.get('http://localhost:3000/users', config)
        .then((res) => {
            res.data.forEach(element => {
                let values = [];
                values.push(element.id.toString());
                values.push(element.name);
                dataSet.push(values)
            })
        }).catch((e) => {
            console.log('Error en axios')
        })
        return dataSet;
    }
    render(){
        return (
            <div>
                <MenuBar agregar={"/agregar_empleados"}/>
                <DataTable 
                    columns={'http://localhost:3000/column_names/test_table'} 
                    data={'http://localhost:3000/users'}
                />
            </div>
        )
    }
}