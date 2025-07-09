import React from 'react'
import { Link } from 'react-router-dom';
import { useApp } from '../context/app-context';

function HeaderLoggedIn() {
  const { user, logout, addFlashMessage } = useApp();

  const handleLogOut = () => {
    logout();
    addFlashMessage("You have successfully logged out.", 'success');
  };
  return (
     <div className="flex-row my-3 my-md-0">
          <a href="#" className="text-white mr-2 header-search-icon">
            <i className="fas fa-search"></i>
          </a>
          <span className="mr-2 header-chat-icon text-white">
            <i className="fas fa-comment"></i>
            <span className="chat-count-badge text-white"> </span>
          </span>
          <Link to={`/profile/${user?.username}`} className="mr-2">
            <img className="small-header-avatar" src={user?.avatar || '/default-avatar.png'} alt="avatar" />
          </Link>
          <Link className="btn btn-sm btn-success mr-2" to="/create-post">
            Create Post
          </Link>
          <button onClick={handleLogOut} className="btn btn-sm btn-secondary">
            Sign Out
          </button>
        </div>
  )
}

export default HeaderLoggedIn