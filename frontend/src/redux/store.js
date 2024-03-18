import { configureStore } from "@reduxjs/toolkit";
// importation du reducer loginReducer depuis le fichier "loginSlice.js"

// configuration du store Redux en utilisant configureStore
const store = configureStore({
  reducer: {},
});

export default store;
