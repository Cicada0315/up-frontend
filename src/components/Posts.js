import React from 'react';
import Post from './Post';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';

const Posts=()=>{
    const posts = useSelector((state) => state.posts);
    return (
        !posts.length ? 
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>:
        <div>
        {posts.map(p=><Post key={p.id} post={p}/>)}
        </div>
    )
}

export default Posts;