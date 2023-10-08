import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import incomeReducer from '../features/incomes/incomeSlice';
import expenseReducer from '../features/expenses/expenseSlice';
import userReducer from '../features/users/userSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const appReducer = combineReducers({
  incomes: incomeReducer,
  expenses: expenseReducer,
  users: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'user/logout') {
    storage.removeItem('persist:root');
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(Store);

export default Store;
