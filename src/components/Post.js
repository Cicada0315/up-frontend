import React from 'react'
import {Card, Col, Row, Button} from 'react-bootstrap';
import Edit from '../images/edit.png'
import Delete from '../images/Black_Trash.ico'
import { deletePost } from '../actions/postsAction'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Link } from "react-router-dom";

const Post=(props)=>{
    const { title, content, files, id } =props.post
    const dispatch=useDispatch();
    const history= useHistory();
    return (
        <Card>
            <Row>
                <Col>
                    <Card.Img variant="top" src={files} height="400"/>
                </Col>

                <Col>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
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
                        <Link to={`/posts/${id}/edit`} onClick={()=> props.setCurrentPostId(id)}><img src={Edit} width="30" height="30" alt="logo"/>Edit</Link>
                        <img src={Delete} onClick={()=>dispatch(deletePost(id, history))} width="30" height="30" alt="logo"/>Delete
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )

}

export default Post;