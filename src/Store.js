import { configureStore } from '@reduxjs/toolkit';
import tablereducer from './Reducer/tablereducer';
import filterreducer from './Reducer/filterreducer';
import orderreducer from './Reducer/orderreducer';
const store = configureStore({
  reducer: {
    tablereducer, 
    filterreducer,
    orderreducer
  },
});

export default store;
