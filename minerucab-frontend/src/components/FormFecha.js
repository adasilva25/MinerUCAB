import React from 'react';

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



export default class FormFecha extends React.Component {
    constructor(props){
        super(props);
    }
    render(){

    	var {titulo}=this.props;
        var {clase}=this.props;

        return ( 
            <Form.Group as={Col} md="6" className={clase}>
                <Form.Label className="cliente-description-fields-text">{titulo}</Form.Label>
                    <Row className="div-content-date">
                        <Form.Control type="text" id="FechaDia"  defaultValue={this.props.dia} className="form-date form-input form-input-day" placeholder="DD" disabled={this.props.disabled} />                                                    
                            <Form.Text className="text-muted">
                                /
                            </Form.Text>
                        <Form.Control type="text" id="FechaMes"  defaultValue={this.props.mes} className="form-date form-input" placeholder="MM"  disabled={this.props.disabled}/>                                                    
                            <Form.Text className="text-muted">
                                 /
                            </Form.Text>
                        <Form.Control type="text" id="FechaAno"  defaultValue={this.props.ano} className="form-date form-input" placeholder="YYYY"  disabled={this.props.disabled}/>                                            
                    </Row>
                <Form.Text className="text-muted">
                    Este campo es obligatorio
                </Form.Text>
            </Form.Group>         
        ) 
    }
}
