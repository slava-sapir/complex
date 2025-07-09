
import './App.css'
import { Outlet } from "react-router-dom";
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FlashMessage from './components/FlashMessage.jsx';
import { useApp } from './context/app-context.jsx'; // ✅ unified context
const App = () => {
  const { flashMessages } = useApp();

  return (
    <>
    <FlashMessage messages={flashMessages} />
    <Header/>
      <Outlet />
    <Footer />
    </>
  )
};

export default App
