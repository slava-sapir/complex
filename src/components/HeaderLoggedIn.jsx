import React from 'react'
import { Link } from 'react-router-dom';
import { useApp } from '../context/app-context';
import { Tooltip as ReactTooltip} from 'react-tooltip'

function HeaderLoggedIn() {
  const { user, logout, addFlashMessage, openSearch } = useApp();

  const handleLogOut = () => {
    logout();
    addFlashMessage("You have successfully logged out.", 'success');
  };
   
  const handleSearchOpen = (e) => {
    e.preventDefault();
    openSearch();
  };

  return (
     <div className="flex-row my-3 my-md-0">
          <a data-tooltip-id="search" data-tooltip-content="Search" onClick={handleSearchOpen} href="#" className="text-white mr-2 header-search-icon">
            <i className="fas fa-search"></i>
          </a>
            <ReactTooltip id="search" place="bottom" effect="float" className='custom-tooltip'/>&nbsp;&nbsp;
          <span data-tooltip-id='chat' data-tooltip-content='Chat' className="mr-2 header-chat-icon text-white">
            <i className="fas fa-comment"></i>
          <span className="chat-count-badge text-white"> </span>
            <ReactTooltip id="chat" place="bottom" effect="float" className='custom-tooltip'/>&nbsp;&nbsp;
          </span>
          <Link data-tooltip-id='profile' data-tooltip-content='Profile' to={`/profile/${user?.username}`} className="mr-2">
            <img className="small-header-avatar" src={user?.avatar || '/default-avatar.png'} alt="avatar" />
          </Link>
           <ReactTooltip id="profile" place="bottom" effect="float" className='custom-tooltip'/>&nbsp;&nbsp;
          <Link className="btn btn-sm btn-success mr-2" to="/create-post">
            Create Post
          </Link>&nbsp;&nbsp;
          <button onClick={handleLogOut} className="btn btn-sm btn-secondary">
            Sign Out
          </button>
        </div>
  )
}

export default HeaderLoggedIn