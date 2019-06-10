import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';



export default class OpcionesLocales extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
       
       var {active}= this.props;
       var opciones = [
            {
                src: '/images/Home-96.png',
                alt: 'Home',
                nombre:'Home',
                class:'ListItem1 FocusLI ActiveLI Items',
                link:'/home',
                active: false
            },

            {
                src: '/images/User-52.png',
                alt: 'User',
                nombre:'Información Personal',
                class:'ListItem1 FocusLI ActiveLI Items',
                link:'#link2',
                active: false
            },

            {
                src: '/images/Edit-96.png',
                alt: 'Lapiz',
                nombre:'Cambiar Contraseña',
                class:'ListItem1 FocusLI ActiveLI Items',
                link:'/cambiar_contrasena',
                active: false
            },

            {
                src: '/images/Lupa-50.png',
                alt: 'Lupa',
                nombre:'Ayuda',
                class:'ListItem1 FocusLI ActiveLI Items',
                link:'#link4',
                active: false
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

          <div id="SideBar">   
            <ListGroup>
              {opciones.map((opcion,index)=>{
                return(
                  <ListGroup.Item action  href={opcion.link} className={opcion.class}  key={index} active={opcion.active} >
                    <Row>
                        <Col sm={2}>
                          <Image src={opcion.src} alt={opcion.alt} className="SideBarIcons" />
                        </Col>
                        <Col sm={10}>
                          <span>
                            <strong >{opcion.nombre}</strong>
                          </span>
                        </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
              <ListGroup.Item actionhref="#link5" className="CerrarSesion">
                <span>
                  <strong>Cerrar sesión</strong>
                </span>
              </ListGroup.Item>
            </ListGroup> 
          </div>
        )
    }
}