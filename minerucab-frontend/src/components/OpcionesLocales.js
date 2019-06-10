import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import BOG from './BotonOpcionesGlobales'
import Image from 'react-bootstrap/Image';



export default class OpcionesLocales extends React.Component {
    constructor(props){
        super(props);
    }
                   

    handleOpenSideBar = (event) =>{
        var SB = document.getElementById('SideBar');
        var Content = document.getElementById('Content');

        if(SB.style.display == "none"){

          SB.style.display="block";
          SB.style.animationName = "slideIn";
          SB.style.animationDuration = ".5s";
          Content.style.marginLeft= "250px";
        }
        else{

          SB.style.animationName = "slideOut";
          SB.style.animationDuration = ".5s";

          setTimeout(function() {
            SB.style.display = "none";
          }, 500);

          Content.style.marginLeft= "0px";
        }
    }




    render(){
       
       var {Usuario} = this.props;

        return (
            <Navbar fixed="top" className='NavbarContainer' expand="lg" variant="light">
              <div>
                <h3>MinerUCAB</h3>
              </div>
              <div onClick={this.handleOpenSideBar} className="ToggleNav">
                <BOG/>
              </div>
              <Nav className="ml-auto">
                {Usuario}
              </Nav>
            </Navbar>
        ) 
    }
}