import React from 'react'
import {Card, Col, Row, Button} from 'react-bootstrap';
import Edit from '../images/edit.png'
import Delete from '../images/Black_Trash.ico'
import { deletePost } from '../actions/postsAction'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Link } from "react-router-dom";

const Post=(props)=>{
    const { title, content, files, id, user } =props.post
    const dispatch=useDispatch();
    const history= useHistory();
    const userinfo= JSON.parse(localStorage.getItem('userinfo'));
    const handleDelete=()=>{
        props.setSubmitted(true)
        dispatch(deletePost(id, history, userinfo.jwt, props.setSubmitted))
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
            <Card.Footer>
                <Row>
                    <Col>
                    <Button variant="light"></Button>
                    </Col>
                    <Col style={{textAlign: "right"}}>
                    {(userinfo && userinfo.user.id === user.id) &&
                        <><Link to={`/posts/${id}/edit`} onClick={()=> props.setCurrentPostId(id)}><img src={Edit} width="30" height="30" alt="logo"/>Edit</Link>
                        <img src={Delete} onClick={handleDelete} width="30" height="30" alt="logo"/>Delete</>}
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )

}

export default Post;