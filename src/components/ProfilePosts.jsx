import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Page from './Page';
import LoadinDotsIcon from './LoadinDotsIcon';

const ProfilePosts = () => {
    const { username } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const ourRequest = axios.CancelToken.source();
        async function fetchPosts() {  
            try {
            const response = await axios.get(`/profile/${username}/posts`, { cancelToken: ourRequest.token });
            setPosts(response.data);
            setIsLoading(false);
            } catch (e) {
                console.error('Error fetching posts:', e);
            } 
        }
        fetchPosts();   
        return () => {
            ourRequest.cancel();
        } 
    }, []);                   
            
    if(isLoading) return (
        <Page title="Loading Post...">
          <LoadinDotsIcon />
        </Page>
    )

  return (
        <div className="list-group">
            {posts.map(post => (
                // const date = new Date(post.createdAt);
                // return (
                // <a key={post._id} href="#" className="list-group-item list-group-item-action">
                //     <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong>
                //     <span className="text-muted small">&nbsp;&nbsp;&nbsp;{new Date(post.createdDate).toLocaleDateString()}</span>
                // </a>
                // )
                <Link key={post._id} to={`/post/${post._id}`} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{post.title}</h5>
                        <small>{new Date(post.createdDate).toLocaleDateString()}</small>
                    </div>
                    {/* <p className="mb-1">{post.body}</p> */}
                    <img className="avatar-tiny" src={post.author.avatar} />&nbsp;&nbsp;&nbsp;<strong>{post.title}</strong>
                    <small>&nbsp;&nbsp;&nbsp;Posted by {post.author.username}</small>
                </Link>
            ))}
        </div>
  )
}

export default ProfilePosts