
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/auth/authSlice"
import propertyReducer from "../features/property/propertiesSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: authReducer,
    property:propertyReducer
  },
});
