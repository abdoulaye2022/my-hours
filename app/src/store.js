import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

import rootReducer from './redux/reducers/root.reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'

const persistConfig = {
    key: 'root',
    storage,
}

const logger = createLogger({
    // ...options
});

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({ reducer: persistedReducer, middleware: [logger, thunk] })
// The store now has redux-thunk added and the Redux DevTools Extension is turned on

export default store;