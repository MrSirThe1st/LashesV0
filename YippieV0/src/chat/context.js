import React, { createContext, useReducer, useContext } from "react";

const ChatContext = createContext();

const chatReducer = (state, action) => {
  switch (action.type) {
    case "SET_CHAT_DATA":
      return {
        ...state,
        chatData: action.payload,
      };
    default:
      return state;
  }
};

const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, {
    chatData: {
      sellerId: "",
      sellerName: "",
      sellerAvatar: "",
    },
  });

  const setChatData = (data) => {
    dispatch({ type: "SET_CHAT_DATA", payload: data });
  };

  return (
    <ChatContext.Provider value={{ ...state, setChatData }}>
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

export { ChatProvider, useChatContext };
