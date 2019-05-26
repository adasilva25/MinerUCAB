import React from 'react';
import MenuBar from '../../components/MenuBar';

export default class AgregarEmpleados extends React.Component {
    render(){
        return (
            <div>
                <MenuBar consultar={"/consultar_empleados"}/>
                <h1>Agregar Empleados</h1>
            </div>
        )
    }
}