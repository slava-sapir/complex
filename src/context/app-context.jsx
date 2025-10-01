import { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AppContext = createContext();

const initialState = {
  user: null,
  isLoggedIn: false,
  flashMessages: [],
  isSearchOpen: false,
  isChatOpen: false,
  unreadChatCount: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };

    case 'LOGOUT':
      return { ...state, user: null };

    case 'ADD_FLASH':
      const newMessage = {
        id: uuidv4(),
        text: action.payload,
        type: action.msgType || 'success'
      };
      return { ...state, flashMessages: [...state.flashMessages, newMessage] };

    case 'REMOVE_FLASH':
      return {
        ...state,
        flashMessages: state.flashMessages.filter(msg => msg.id !== action.id)
      };

    case 'OPEN_SEARCH':
      return { ...state, isSearchOpen: true };

    case 'CLOSE_SEARCH':
      return { ...state, isSearchOpen: false };

    case 'TOGGLE_CHAT':
      return { ...state, isChatOpen: !state.isChatOpen };

    case 'CLOSE_CHAT':
      return { ...state, isChatOpen: false };

    case 'SET_UNREAD_CHAT_COUNT':
      return { ...state, unreadChatCount: (state.unreadChatCount+1)};

    case 'RESET_UNREAD_CHAT_COUNT':
      return { ...state, unreadChatCount: 0 };

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('complexappToken');
    const username = localStorage.getItem('complexappUsername');
    const avatar = localStorage.getItem('complexappAvatar');

    if (token && username && avatar) {
      dispatch({
        type: 'LOGIN',
        payload: { token, username, avatar }
      });
    }
  }, []);

  const openSearch = () => dispatch({ type: 'OPEN_SEARCH' });
  const closeSearch = () => dispatch({ type: 'CLOSE_SEARCH' });
  const toggleChat = () => dispatch({ type: 'TOGGLE_CHAT' });
  const closeChat = () => dispatch({ type: 'CLOSE_CHAT' });
  const setChatCount = () => dispatch({ type: 'SET_UNREAD_CHAT_COUNT' });
  const resetChatCount = () => dispatch({ type: 'RESET_UNREAD_CHAT_COUNT' });
  const login = ({ token, username, avatar }) => {
    localStorage.setItem('complexappToken', token);
    localStorage.setItem('complexappUsername', username);
    localStorage.setItem('complexappAvatar', avatar);

    dispatch({ type: 'LOGIN', payload: { token, username, avatar } });
  };

  const logout = () => {
    localStorage.removeItem('complexappToken');
    localStorage.removeItem('complexappUsername');
    localStorage.removeItem('complexappAvatar');
    dispatch({ type: 'LOGOUT' });
  };

  const addFlashMessage = (text, msgType = 'success') => {
    const id = uuidv4();
    dispatch({ type: 'ADD_FLASH', payload: text, msgType });
    // setTimeout(() => dispatch({ type: 'REMOVE_FLASH', id }), 3000);
  };

  return (
    <AppContext.Provider
      value={{
        user: state.user,
        isLoggedIn: !!state.user,
        login,
        logout,
        flashMessages: state.flashMessages,
        addFlashMessage,
        isSearchOpen: state.isSearchOpen,
        openSearch,
        closeSearch,
        isChatOpen: state.isChatOpen,
        toggleChat,
        closeChat,
        unreadChatCount: state.unreadChatCount,
        setChatCount,
        resetChatCount
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
