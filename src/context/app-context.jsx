import { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AppContext = createContext();

const initialState = {
  user: null,
  flashMessages: [],
  isSearchOpen: false
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
        closeSearch
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
