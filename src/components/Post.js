import React from 'react'
import {Card, Col, Row, Button} from 'react-bootstrap';
import Edit from '../images/edit.png'
import Delete from '../images/Black_Trash.ico'
import ThumbsUp from '../images/ThumbsUp.png'
import { deletePost, updatePost } from '../actions/postsAction'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Post=(props)=>{
    const { title, content, files, id, user, likes } =props.post;
    const dispatch=useDispatch();
    const history= useHistory();
    const userinfo= JSON.parse(localStorage.getItem('userinfo'));
    
    const handleEdit=()=>{
        props.setCurrentPostId(id);
        history.push(`/posts/${id}/edit`);
    }

    const handleLike=()=>{
        props.setCurrentPostId(id);
        dispatch(updatePost(id, {...props.post, likes: [...likes, userinfo.user.id] }, history, userinfo.jwt, props.setCurrentPostId));
    }
    
    const handleDelete=()=>{
        props.setSubmitted(true);
        dispatch(deletePost(id, history, userinfo.jwt, props.setSubmitted));
    }
    
    return (
        <Card>
            <Row>
                <Col>
                    <Card.Img variant="top" src={files} height="400"/>
                </Col>
                <Col>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">by. {user.firstname+" "+user.lastname}</Card.Subtitle>
                        <Card.Text>
                        {content}
                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>
            <Card.Footer >
                <Row>
                    <Col>
                        <Button variant="light" onClick={handleLike}><img src={ThumbsUp} width="30" height="30" alt="logo"/>Likes {likes.length}</Button>
                    </Col>
                    <Col style={{textAlign: "right"}}>
                    {(userinfo && userinfo.user.id === user.id) &&
                        (<><Button variant="light" onClick={handleEdit}><img src={Edit} width="30" height="30" alt="logo"/>Edit</Button>
                        <Button variant="light" onClick={handleDelete}><img src={Delete} width="30" height="30" alt="logo"/>Delete</Button></>)}   
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}

export default Post;