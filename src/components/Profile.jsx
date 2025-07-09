import React, { use, useEffect, useState } from 'react'
import Page from './Page'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useApp } from '../context/app-context';
import ProfilePosts from './ProfilePosts'

const Profile = () => {
  const { username } = useParams();
  const { user } = useApp();
  const [ profileData, setProfileData ] = useState({
    profileUserName: '',
    profileAvatar: 'https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128',
    isFollowing: false,
    counts: { postCount: "", followerCount: "", followingCount: "" }
  });

useEffect(() => {
  async function fetchData() {
    try {
      const response = await axios.post(`/profile/${username}`, { token: user?.token } );
      // Handle the response data as needed
      setProfileData(response.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }
  fetchData();
  }, []);

  return (
    <Page title="Your Profile">
       <h2>
        <img className="avatar-small" src={profileData.profileAvatar} /> { user?.username }
        <button className="btn btn-primary btn-sm ml-2">Follow <i className="fas fa-user-plus"></i></button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {profileData.counts.followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {profileData.counts.followingCount}
        </a>
      </div>
      <ProfilePosts />
    </Page>
  )
}

export default Profile