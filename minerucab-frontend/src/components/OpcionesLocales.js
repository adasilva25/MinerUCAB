import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import BOG from './BotonOpcionesGlobales'



export default class OpcionesLocales extends React.Component {
    constructor(props){
        super(props);
    }
                     
    render(){
       
       var {opciones} = this.props;

        return (
             
          <Navbar className='NavbarContainer' expand="lg" variant="light" bg="light">
            
            <Navbar.Brand className='NavbarButton' href=""><BOG/></Navbar.Brand> 
            
            <Navbar.Toggle aria-controls="responsive-navbar-nav"  className = { ( (opciones) && (opciones.length != 0) ) ? "NavItemResponsive" : "No_visible"}> Opciones </Navbar.Toggle >
             <Container className='NavbarContainer' fluid={true}>
            <Navbar.Collapse id="responsive-navbar-nav" className="NavbarCollapse">
             
                {
                  ( (opciones) && (opciones.length != 0) ) ? (
                    opciones.map((opcion,index)=>{
                        return(
                          <Nav className={ ( (opcion) && (opcion.length != 0) ) ? (index === 0 ? "NavItems vertical-line vertical-line-r" : "NavItems vertical-line-r") : ""} variant="pills"  fill={true} key={index}>
                            <Nav.Link href="#home"  >{opcion}</Nav.Link>
                          </Nav> 
                        );
                      })
                  ):(
                      <span className="No_visible"/>
                    )
                }
                
            </Navbar.Collapse>
            </Container>
          </Navbar>
            
        )
    }
}