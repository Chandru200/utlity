// store.js
import { createStore } from "redux";
import sharedDataReducer from "./manager";

const store = createStore(sharedDataReducer);

export default store;
