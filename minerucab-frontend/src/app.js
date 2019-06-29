import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore()

const jsx = ( // the variable store is the variable store used above
    <Provider store={store}>    
        <AppRouter />
    </Provider>
);

// const jsx = (
//     <div>
//         <Button variant="primary">Primary</Button>
//         <Button variant="secondary">Secondary</Button>
//         <Button variant="success">Success</Button>
//     </div>
// );

ReactDOM.render(jsx, document.getElementById('app'));