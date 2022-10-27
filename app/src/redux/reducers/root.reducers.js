import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { user } from './users.reducers';
import { employer } from './employers.reducers';

const appReducers = combineReducers({
    user,
    employer
})

const rootReducers = (state, action) => {
    if(action.type === "LOGOUT_USER") {
        storage.removeItem('persist:root');

        return appReducers(undefined, action)
    }
    return appReducers(state, action);
}

export default rootReducers;

