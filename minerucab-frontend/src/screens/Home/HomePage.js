import React from 'react';
// https://react-bootstrap.github.io/components/buttons/
import {history} from '../../routers/History';
import {Header} from '../../components/Header';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Actividad from '../../components/Actividad'
import CarouselActividad from '../../components/CarouselActividad'
import BOG from '../../components/BotonOpcionesGlobales'
import OpcionesLocales from '../../components/OpcionesLocales'
import OpcionesGlobales from '../../components/OpcionesGlobales'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardDeck from 'react-bootstrap/CardDeck'
import Carousel from 'react-bootstrap/Carousel'
import Navbar from 'react-bootstrap/Navbar'

export default class HomePage extends React.Component {
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

        let actividades = ["Yacimientos", "Cargos", "Minerales", "Explotaciones", "Ventas", "Solicitudes de compra","Yacimientos1", "Cargos1", "Minerales1", "Explotaciones1", "Ventas1", "Solicitudes de compra1","Yacimientos2", "Cargos2", "Minerales2", "Explotaciones2", "Ventas2", "Solicitudes de compra2"];
        let Actlength= actividades.length;
        let actividad=[];

        for (var i = 0; i < Actlength; i=i+6) {
            var item =[];
            item = actividades.splice(0,6);
            actividad.push(item);
        }

        var opciones = [
            {
                nombre: 'Consultar',
                link:'#45',
                active:true
            },

            {
                nombre: 'Agregar',
                link:'#link50',
                active:false
            },

            {
                nombre: 'Modificar',
                link:'#link54',
                active:false
            }
        ];

        return ( 
            <div>
                <Header /> 
                <OpcionesGlobales active="Home"/> 
                <OpcionesLocales opciones={opciones}/>
                <div className="bg">
                    <Container className="containerHome ">
                        <Row>
                            <Col md={4}></Col>
                            <Col className="containerHome" md={4}>
                                <div className="titlestyle">Inicio</div>
                            </Col>
                            <Col md={4}></Col>
                        </Row>
                    </Container>
                    <Row className="contain containhome">
                        <Col md={1}></Col>
                        <Col md={10} className="login-bg">
                                <Carousel interval={0} wrap={false} indicators={true} nextIcon={<span aria-hidden={true} className="carousel-control-next-icon" />} prevIcon= {<span aria-hidden={true} className="carousel-control-prev-icon" />} className="CarouselItem ">
                                    {actividad.map((act,index)=>{
                                        return(
                                            <Carousel.Item key={index}>
                                                <CarouselActividad actividades1={act} key={index} className="CarouselItem"/>
                                            </Carousel.Item>
                                        );
                                    })}
                                </Carousel>  
                        </Col>
                        <Col md={1}></Col>
                            
                    </Row>
                </div>
            </div>
        )
    }

}
