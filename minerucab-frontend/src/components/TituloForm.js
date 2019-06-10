import React from 'react';

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



export default class TituloForm extends React.Component {
    constructor(props){
        super(props);
        this.titleText = this.titleText.bind(this);
    }

    onClickDashboardPage(){
        history.push('/dashboard');  
    }       

    onClickLoginPage(){
        history.push('/');  
    }  
 
	titleText(titulo,Size){
		if (Size == "BIG"){
			return(<h4 className="horizontal-line-title cliente-title">{titulo}</h4>);
		}
		else{
			return(<h6 className="horizontal-line-title cliente-title">{titulo}</h6>);
		}
	}
	


    render(){

    	var {titulo}=this.props;
    	var {tamaño}=this.props;

        return ( 
            <Row>
                <Col md={2}></Col>
                <Col md={9}>
	                <Row>
	                    <Col md={11}>
	                        {this.titleText(titulo,tamaño)}
	                    </Col>
	                    <Col md={1}></Col>
	                </Row>
                </Col>
                <Col md={1}></Col>
            </Row>           
        ) 
    }
}
