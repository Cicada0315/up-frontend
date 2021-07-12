import React from 'react'
import {Card, Col, Row} from 'react-bootstrap';
import ThumbsUp from '../images/ThumbsUp.png'
import View from '../images/view.png'
import { updatePost } from '../actions/postsAction'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Post=(props)=>{
    const { title, files, id, user, likes, view, created_at } =props.post;
    const dispatch=useDispatch();
    const history= useHistory();
    const userinfo= JSON.parse(localStorage.getItem('userinfo'));

    const routeChange = () =>{
        props.setCurrentPostId(id);
        if(userinfo){
            dispatch(updatePost(id, {...props.post, view: view+1 }, history, userinfo.jwt, props.setCurrentPostId, 1)); 
        }else{
            dispatch(updatePost(id, {...props.post, view: view+1 }, history, null, props.setCurrentPostId, 1)); 
        }
         
    }

    return (
        <Card onClick={routeChange}>
            <Card.Body>
            <Row>
                <Col>
                    <Card.Img variant="top" src={files} className="img-fluid"/>
                </Col>
                <Col>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">by. {user.firstname+" "+user.lastname} {created_at.split("T")[0]}</Card.Subtitle>
                    <img src={ThumbsUp} width="15" height="15" alt="like"/>{likes.length}{" "}
                    <img src={View} width="15" height="15" alt="view"/>{view}
                </Col>
            </Row>
            </Card.Body>
        </Card>
    )
}

export default Post;