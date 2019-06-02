import React from 'react';
import MenuBar from '../../components/MenuBar';
import {Header} from '../../components/Header';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ModalComponent from '../../components/ModalComponent';

export default class AgregarEmpleados extends React.Component {
    state = { 
        modalShow: false 
    };
    modalClose = () => this.setState({ modalShow: false });
    render(){
        return (
            <div>
            	<Header />
	                <MenuBar consultar={"/consultar_empleados"}/>
                    <h1>Agregar Empleados</h1>
                    <ButtonToolbar>
                        <Button 
                            className="purple-btn text-center" 
                            size="md" 
                            block as="input" 
                            type="submit" 
                            onClick={() => this.setState({ modalShow: true })}
                            value="Ingresar" />
                        <ModalComponent
                            show={this.state.modalShow}
                            onHide={this.modalClose}
                            title={'Advertencia'}
                            content=
                                {
                                    'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beerlabore wes anderson cred nesciunt sapiente ea proident.'
                                }
                        />
                    </ButtonToolbar>
            </div>
        )
    }
}