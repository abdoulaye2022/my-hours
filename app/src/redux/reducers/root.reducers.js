import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { user } from './users.reducers';
import { employer } from './employers.reducers';
import { job } from './jobs.reducers';

const appReducers = combineReducers({
    user,
    employer, job
})

const rootReducers = (state, action) => {
    if(action.type === "LOGOUT_USER") {
        storage.removeItem('persist:root');

        return appReducers(undefined, action)
    }
    return appReducers(state, action);
}

export default rootReducers;

