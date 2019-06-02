import React from 'react';
import MenuBar from '../../components/MenuBar';
import DataTable from '../../components/DataTable';
import {Header} from '../../components/Header';

export default class ConsultarEmpleados extends React.Component {
    render(){
        return (
            <div>
                <Header />
                    <MenuBar agregar={"/agregar_empleados"}/>
                    <DataTable 
                        columns={'http://localhost:3000/column_names/test_table'} 
                        data={'http://localhost:3000/users'}
                    />
            </div>
        )
    }
}