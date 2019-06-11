import React from 'react';

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



export default class FormTitulo extends React.Component {
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
			return(<h4 className="horizontal-line-title cliente-title formTitulo">{titulo}</h4>);
		}
		else{
			return(<h6 className="horizontal-line-title cliente-title formTitulo">{titulo}</h6>);
		}
	}
	

    render(){

    	var {titulo}=this.props;
    	var {tamaño}=this.props;

        return ( 
            
            this.titleText(titulo,tamaño)
	                    
        ) 
    }
}
