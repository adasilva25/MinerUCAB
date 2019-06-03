import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import BOG from './BotonOpcionesGlobales';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'



export default class OpcionesLocales extends React.Component {
    constructor(props){
        super(props);
    }
    
    handleCloseSideBar = (event) =>{
        var SB = document.getElementById('SideBar');
        
        SB.style.animationName = "slideOut";
        SB.style.animationDuration = "1s";

        var Overlay = document.getElementById('overlay');
        Overlay.style.animationName = "fadeOut";
        Overlay.style.animationDuration = "1s";

        setTimeout(function() {
          Overlay.style.display = "none";
          SB.style.display = "none";
        }, 1000);
    }


    render(){
       
       var {active}= this.props;
       var opciones = [
            {
                src: '/images/Home-96.png',
                alt: 'Home',
                nombre:'Home',
                class:'ListItem FocusLI ActiveLI',
                class2:'HomeAyudaFont',
                link:'/home',
                id:'SBHome',
                active: false,
                variant:''
            },

            {
                src: '/images/User-100.png',
                alt: 'User',
                nombre:'Información Personal',
                class:'ListItem1 FocusLI ActiveLI',
                class2:'',
                link:'#link2',
                id:'SBInformacionPersonal',
                active: false,
                variant:''
            },

            {
                src: '/images/Pencil-96.png',
                alt: 'Lapiz',
                nombre:'Cambiar Contraseña',
                class:'ListItem1 FocusLI ActiveLI',
                class2:'',
                link:'/cambiar_contrasena',
                id:'SBCambiarContraseña',
                active: false,
                variant:''
            },

            {
                src: '/images/Search-96.png',
                alt: 'Lupa',
                nombre:'Ayuda',
                class:'ListItem1 FocusLI ActiveLI',
                class2:'HomeAyudaFont',
                link:'#link4',
                id:'SBAyuda',
                active: false,
                variant:''
            }
        ];

        switch(active) {
          case 'Home':
            opciones[0].active= true;
            break;
          case 'Información Personal':
            opciones[1].active= true;
            break;
          case 'Cambiar Contraseña':
            opciones[2].active= true;
            break;
          case 'Ayuda':
            opciones[3].active= true;
            break;
        }
        


        return (

          <div>   
          <div id= "overlay" onClick={this.handleCloseSideBar}>
            </div>
          <div id="SideBar">
            
            
              
              <Button variant="outline-secondary" type="button" className="BotonExit float-right " onClick={this.handleCloseSideBar}>&times;</Button>
              
              
              <Container className = "containerImg">
                <Image src="/images/MinerUCAB-logo.png" alt="LogoMinerUCAB" fluid />
              </Container>
              <ListGroup>
                {opciones.map((opcion,index)=>{
                    return(
                      <ListGroup.Item action id={opcion.id} href={opcion.link} className={opcion.class} variant={opcion.variant} key={index} active={opcion.active}>
                       <Row>
                          <Col xs={4}> 
                            <Image src={opcion.src} alt={opcion.alt} className="ListItemRow" fluid/>
                          </Col>
                          <Col xs={8} className={opcion.class2}>
                            <span className="ListItemRowTitle">
                              <strong >{opcion.nombre}</strong>
                            </span>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                })}





                <ListGroup.Item action id="SBCerrarSesion" href="#link5" className="ListItemCerrarsesion CerrarSesion" variant=''>
                  <span className="ListItemRowTitle">
                    <strong >Cerrar sesión</strong>
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        )
    }
}