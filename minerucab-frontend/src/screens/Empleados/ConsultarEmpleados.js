import React from 'react';
import axios from 'axios';
import MenuBar from '../../components/MenuBar';
import DataTable from '../../components/DataTable';
import {Header} from '../../components/Header';
import {Footer} from '../../components/Footer';

export default class ConsultarEmpleados extends React.Component {
    render(){
        return (
            <div>
<<<<<<< HEAD
                <MenuBar agregar={"/agregar_empleados"}/>
                <DataTable 
                    columns={'http://localhost:3000/column_names/test_table'} 
                    data={'http://localhost:3000/users'
                }
                />
=======
                <Header />
                    <MenuBar agregar={"/agregar_empleados"}/>
                    <DataTable 
                        columns={'http://localhost:3000/column_names/test_table'} 
                        data={'http://localhost:3000/users'}
                    />
                <Footer />
>>>>>>> origin/Alba
            </div>
        )
    }
}