import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import { history } from '../routers/History';
import { Link } from 'react-router';
// https://react-bootstrap.github.io/components/buttons/


export default class Actividad extends React.Component {
    constructor(props){
        super(props);
    }          
    render(){
        const {title} = this.props;
        var clase = "actividad";
        let url;
        if ( title == "" ){
        	clase = "No_visible"
        }

        if (title === "Ventas"){
            url = '/ventas';
        }
        else{
            url = '#link';
        }

        return (
             
            <a href={url} className="a-actividad"><Card body  className={clase}>{title}</Card></a>
            
        )
    }
}