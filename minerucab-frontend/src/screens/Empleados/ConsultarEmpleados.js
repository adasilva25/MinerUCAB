import React from 'react';
import axios from 'axios';
import MenuBar from '../../components/MenuBar';
import DataTable from '../../components/DataTable';

export default class ConsultarEmpleados extends React.Component {
    render(){
        return (
            <div>
                <MenuBar agregar={"/agregar_empleados"}/>
                <DataTable 
                    columns={'http://localhost:3000/column_names/test_table'} 
                    data={'http://localhost:3000/users'
                }
                />
            </div>
        )
    }
}