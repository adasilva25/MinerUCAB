import React from 'react';
import MenuBar from '../../components/MenuBar';
import {Header} from '../../components/Header';
import {Footer} from '../../components/Footer';

export default class AgregarEmpleados extends React.Component {
    render(){
        return (
            <div>
            	<Header />
	                <MenuBar consultar={"/consultar_empleados"}/>
	                <h1>Agregar Empleados</h1>
                <Footer />
            </div>
        )
    }
}