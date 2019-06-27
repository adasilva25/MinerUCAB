import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import userReducer from '../reducers/user';

export default () => {
    // Store creation
    const store = createStore(
        combineReducers({
            user: userReducer
        }),
        compose(applyMiddleware(thunk))
        // https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store
};