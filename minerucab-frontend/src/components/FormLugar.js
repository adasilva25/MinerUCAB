import React from 'react';

import FormTitulo from '../components/FormTitulo'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



export default class FormLugar extends React.Component {
    constructor(props){
        super(props);
    }

    onClickDashboardPage(){
        history.push('/dashboard');  
    }       

    onClickLoginPage(){
        history.push('/');  
    }  
 
    render(){
        return ( 
            <div>
                
                <Form.Row className="formMargins">
                    <Form.Group  as={Col} md="4" controlId="LugarEstado" className="div-ventas-pedido-form inputsPaddingRight">
                        <Form.Label className="cliente-description-fields-text">Estado</Form.Label>
                        <Form.Control 
                            as="select" 
                            className="form-input"
                        >
                            <option>Sucre</option>
                            <option>Distrito Capital</option>
                            <option>Amazonas</option>
                            <option>Apure</option>
                            <option>Barinas</option>
                        </Form.Control>
                    </Form.Group>
                    {/*<Form.Group as={Col} md="4" controlId="formBasicEmail" className="div-ventas-pedido-form inputsPaddingLeft">
                        <Form.Label className="cliente-description-fields-text">Ciudad</Form.Label>
                        <Form.Control 
                            as="select"
                            className="form-input"
                        >
                            <option>Caracas</option>
                            <option>Cumaná</option>
                            <option>San Fernando de Apure</option>
                            <option>Tucupita</option>
                            <option>Portuguesa</option>
                            <option>Guanare</option>
                            <option>Barinas</option>
                            <option>La Guaira</option>
                            <option>Barquisimeto</option>
                        </Form.Control>
                    </Form.Group>  */}
                    <Form.Group as={Col} md="4" controlId="LugarMunicipio" className="div-ventas-pedido-form inputsPaddingRight">
                        <Form.Label className="cliente-description-fields-text">Municipio</Form.Label>
                        <Form.Control 
                            as="select" 
                            className="form-input"
                        >
                            <option>Sucre</option>
                            <option>Baruta</option>                                
                            <option>Chacao</option>
                            <option>Libertador</option>
                            <option>Guaicaipuro</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="LugarParroquia" className="div-ventas-pedido-form inputsPaddingLeft">
                        <Form.Label className="cliente-description-fields-text">Parroquia</Form.Label>
                        <Form.Control 
                            as="select"
                            className="form-input"
                        >
                            <option>Santa Mónica</option>
                            <option>Coche</option>
                            <option>El Valle</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
            </div>
        ) 
    }
}
