import React from 'react';
import Button from 'react-bootstrap/Button';
// https://react-bootstrap.github.io/components/buttons/
import {history} from '../routers/History';

export default class LoginPage extends React.Component {
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
            <div>
                <Button variant="primary" onClick={this.onClickDashboardPage}>Go to DashboardPage</Button>
                <Button variant="warning" onClick={this.onClickLoginPage}>Go to LoginPage</Button>
            </div>
        )
    }
}