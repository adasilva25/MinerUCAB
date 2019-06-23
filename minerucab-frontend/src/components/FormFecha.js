import React from 'react';

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



export default class FormFecha extends React.Component {
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

    	var {titulo}=this.props;
        var {clase}=this.props;

        return ( 
            <Form.Group as={Col} md="6" className={clase}>
                <Form.Label className="cliente-description-fields-text">{titulo}</Form.Label>
                    <Row className="div-content-date">
                        <Form.Control type="text" id="FechaDia"  className="form-date form-input form-input-day" placeholder="DD" />                                                    
                            <Form.Text className="text-muted">
                                /
                            </Form.Text>
                        <Form.Control type="text" id="FechaMes" className="form-date form-input" placeholder="MM" />                                                    
                            <Form.Text className="text-muted">
                                 /
                            </Form.Text>
                        <Form.Control type="text" id="FechaAno" className="form-date form-input" placeholder="YYYY" />                                            
                    </Row>
                <Form.Text className="text-muted">
                    Este campo es obligatorio
                </Form.Text>
            </Form.Group>         
        ) 
    }
}
