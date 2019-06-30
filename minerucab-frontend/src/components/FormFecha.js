import React from 'react';

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



export default class FormFecha extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dia:null,
            mes:null,
            ano:null
        }
    }


    onClickDashboardPage(){
        history.push('/dashboard');  
    }       

    onClickLoginPage(){
        history.push('/');  
    } 

    componentWillMount=()=>{
        let dia = this.props.dia;
        let mes = this.props.mes;
        let ano = this.props.ano;

        this.setState(() => ({
            dia: dia,
            mes: mes,
            ano: ano
        }));
    }



    render(){

    	var {titulo}=this.props;
        var {clase}=this.props;

        return ( 
            <Form.Group as={Col} md="6" className={clase}>
                <Form.Label className="cliente-description-fields-text">{titulo}</Form.Label>
                    <Row className="div-content-date">
                        <Form.Control type="text" id={((this.props.idF==0)||(this.props.idF==null)||(this.props.idF==undefined))? "FechaDia":"FechaDia"+this.props.idF}  onChange={this.props.onChangeF}  defaultValue={this.state.dia} className="form-date form-input form-input-day" placeholder="DD" disabled={this.props.disabled} />                                                    
                            <Form.Text className="text-muted">
                                /
                            </Form.Text>
                        <Form.Control type="text" id={((this.props.idF==0)||(this.props.idF==null)||(this.props.idF==undefined))? "FechaMes":"FechaMes"+this.props.idF} onChange={this.props.onChangeF} defaultValue={this.state.mes} className="form-date form-input" placeholder="MM"  disabled={this.props.disabled}/>                                                    
                            <Form.Text className="text-muted">
                                 /
                            </Form.Text>
                        <Form.Control type="text" id={((this.props.idF==0)||(this.props.idF==null)||(this.props.idF==undefined))? "FechaAno":"FechaAno"+this.props.idF} onChange={this.props.onChangeF} defaultValue={this.state.ano} className="form-date form-input" placeholder="YYYY"  disabled={this.props.disabled}/>                                            
                    </Row>
                <Form.Text className="text-muted" id={this.props.idTexto}>
                    {this.props.textoAuxiliar}
                </Form.Text>
                
            </Form.Group>         
        ) 
    }
}
