import React, { createContext, useReducer, useContext } from "react";

const AppContext = createContext();

const initialState = {
  modalVisible: false,
  searchText: "",
  data: [],
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_MODAL_VISIBLE":
      return { ...state, modalVisible: action.payload };
    case "SET_SEARCH_TEXT":
      return { ...state, searchText: action.payload };
    case "SET_DATA":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { AppProvider, useAppContext };
