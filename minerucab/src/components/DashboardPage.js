import React from 'react';
import Button from 'react-bootstrap/Button';
// https://react-bootstrap.github.io/components/buttons/
import {history} from '../routers/History';

export default class DashboardPage extends React.Component {
    constructor(props){
        super(props);
    }
    onClickNotFoundPage(){
        history.push('/jahsdjha');   // Como es NotFoundPage, no importa la dirección que ponga, 
    }                                // está hecha para agarrar cualquier error en cuanto a la URL
    onClickLoginPage(){
        history.push('/');
    }
    render(){
        return (
            <div>
                <Button variant="primary" onClick={this.onClickLoginPage}>Go to LoginPage</Button>
                <Button variant="danger" onClick={this.onClickNotFoundPage}>Go to NotFoundPage</Button>
            </div>
        )
    }
}