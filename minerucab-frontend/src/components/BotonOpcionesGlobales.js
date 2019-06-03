import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
 


export default class BotonOpcionesGlobales extends React.Component {
    constructor(props){
        super(props);
    }
                     
    render(){
        
        return (

          <ButtonToolbar>
            <Button variant="secondary">&#9776;</Button>
          </ButtonToolbar>
          
            
        )
    }
}