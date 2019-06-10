import React from 'react';
// https://react-bootstrap.github.io/components/buttons/
import {history} from '../../routers/History';
import SetActividades from '../../components/SetActividades'
import OpcionesLocales from '../../components/OpcionesLocales'
import OpcionesGlobales from '../../components/OpcionesGlobales'
import TituloForm from '../../components/TituloForm'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class RegistrarYacimiento extends React.Component {
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
            <div className="contain pagecontent" id="Content">
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario="Diego Gutiérrez"/>
                <Container>
                   <TituloForm titulo="Registrar Yacimiento" tamaño="BIG"/>
                   <TituloForm titulo="Información General"/>
                </Container>
            </div>
        ) 
    }

}
