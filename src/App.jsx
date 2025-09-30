import React, { useRef } from 'react';
import './App.css'
import { Outlet } from "react-router-dom";
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FlashMessage from './components/FlashMessage.jsx';
import { useApp } from './context/app-context.jsx'; // ✅ unified context
import Search from './components/Search.jsx'; // ✅ added Search component
import { CSSTransition } from 'react-transition-group';
import Chat from './components/Chat.jsx';
const App = () => {
  const { isSearchOpen, flashMessages }  = useApp();
  const searchRef = useRef(null);

  return (
    <>
    <FlashMessage messages={flashMessages} />
    <Header/>
      <Outlet />
    <CSSTransition nodeRef={searchRef} in={isSearchOpen} timeout={330} classNames="search-overlay" unmountOnExit>
      <div ref={searchRef} className='search-overlay'>
        <Search />
      </div>
    </CSSTransition>
    <Chat/>
    <Footer />
    </>
  )
};

export default App
