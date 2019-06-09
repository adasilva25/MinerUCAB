import React from 'react';
import MenuBar from '../../components/MenuBar';
import {Header} from '../../components/Header';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ModalBuscarCliente from '../../components/ModalBuscarCliente';
import ModalYesNo from '../../components/ModalYesNo';
import ModalRegistrarCliente from '../../components/ModalRegistrarCliente';
import OpcionesLocales from '../../components/OpcionesLocales';

export default class AgregarEmpleados extends React.Component {
    state = { 
        modalShow: false,
        modalShow2: false,
        modalShow3: false 
    };
    modalClose = () => this.setState({ modalShow2: false });
    render(){
        return (
            <div>
                <OpcionesLocales />
	                <MenuBar consultar={"/consultar_empleados"}/>
                    <h1>Agregar Empleados</h1>
                    <ButtonToolbar>
                        <Button 
                            className="purple-btn text-center" 
                            size="md" 
                            block as="input" 
                            type="submit" 
                            onClick={() => this.setState({ modalShow3: true })}
                            value="Ingresar" />
                        <ModalBuscarCliente
                            show={this.state.modalShow}
                            onHide={this.modalClose}
                            content=
                                {
                                    'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beerlabore wes anderson cred nesciunt sapiente ea proident.'
                                }
                        />
                        <ModalYesNo
                            show={this.state.modalShow2}
                            onHide={this.modalClose}
                            content=
                                {
                                    'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beerlabore wes anderson cred nesciunt sapiente ea proident.'
                                }
                        />
                        <ModalRegistrarCliente
                            show={this.state.modalShow3}
                            onHide={this.modalClose}
                        />
                    </ButtonToolbar>
            </div>
        )
    }
}