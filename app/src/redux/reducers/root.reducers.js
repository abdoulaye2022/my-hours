import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { user } from './users.reducers';
import { employer } from './employers.reducers';
import { job } from './jobs.reducers';
import { shift } from './shifts.reducers';
import { error } from './errors.reducers';
import { langue } from './langues.reducers';

const appReducers = combineReducers({
    user,
    employer, 
    job,
    shift,
    error,
    langue
})

const rootReducers = (state, action) => {
    if(action.type === "LOGOUT_USER") {
        storage.removeItem('persist:root');

        return appReducers(undefined, action)
    }
    return appReducers(state, action);
}

export default rootReducers;

