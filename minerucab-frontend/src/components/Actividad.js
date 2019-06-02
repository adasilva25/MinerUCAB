import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
// https://react-bootstrap.github.io/components/buttons/


export default class Actividad extends React.Component {
    constructor(props){
        super(props);
    }
                     
    render(){
        const {title} = this.props;
        var clase = "actividad";
        if ( title == "" ){
        	clase = "No_visible"
        }
        return (
             
            <Card body className={clase}>{title}</Card>
            
        )
    }
}