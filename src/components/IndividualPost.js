import React from 'react'
import {Button} from 'react-bootstrap';
import Edit from '../images/edit.png'
import Delete from '../images/Black_Trash.ico'
import { deletePost, updatePost } from '../actions/postsAction'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ThumbsUp from '../images/ThumbsUp.png'
import View from '../images/view.png'

const IndividualPost=(props)=>{
    const dispatch=useDispatch();
    const history= useHistory();
    const userinfo= JSON.parse(localStorage.getItem('userinfo'));
    const { id } = useParams();
    const posts = useSelector((state) => state.posts);
    const post=posts.find(p=> p.id===parseInt(id));

    const handleEdit=()=>{
        props.setCurrentPostId(post.id);
        history.push(`/posts/${post.id}/edit`);
    }

    const handleLike=()=>{
        props.setCurrentPostId(post.id);
        dispatch(updatePost(post.id, {...post, likes: [...post.likes, userinfo.user.id] }, history, userinfo.jwt, props.setCurrentPostId, 1));
    }
    
    const handleDelete=()=>{
        props.setSubmitted(true);
        dispatch(deletePost(post.id, history, userinfo.jwt, props.setSubmitted));
    }


    return (
        <div className="bg-light">
            {(userinfo && userinfo.user.id === post.user.id) &&
                (<div style={{textAlign: "right"}}><Button variant="outline-primary" onClick={handleEdit}><img src={Edit} width="20" height="20" alt="edit"/>Edit</Button>
            <Button variant="outline-primary" onClick={handleDelete}><img src={Delete} width="20" height="20" alt="delete"/>Delete</Button></div>)}
            <h4>by. {post.user.firstname+" "+post.user.lastname}</h4>   
            <h1>{post.title}</h1>
            <p>{post.created_at.split("T")[0]}  Views {post.view}</p>

            <img src={post.files} alt="file" className="img-fluid"/>
            <p>{post.content}</p>
            
            <Button variant="light" onClick={handleLike}><img src={ThumbsUp} width="15" height="15" alt="like"/>{post.likes.length}{" "}</Button>
            <br/>
            <br/>
            <Button variant="outline-primary" onClick={()=> history.push("/posts")}>Back</Button>
        </div>
    )

}

export default IndividualPost;