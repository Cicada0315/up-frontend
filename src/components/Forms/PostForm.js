import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/postsAction'

const PostForm = (props) => {
    const { currentPostId, setCurrentPostId }=props
    const history = useHistory();
    const dispatch = useDispatch();
    const [postinfo, setPostinfo] = useState({ title: '', content: '', files: '' });
    const post = useSelector((state) => (currentPostId ? state.posts.find((p) => p.id === currentPostId) : null));
    const userinfo= JSON.parse(localStorage.getItem('userinfo'))
    
    useEffect(()=>{
        if(post){
            setPostinfo(post);
        };
    }, [post])


    const handleonChange = (e) => {
        setPostinfo({
            ...postinfo,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(currentPostId){
            dispatch(updatePost(currentPostId, {...postinfo, user_id: userinfo.user.id }, history, userinfo.jwt, setCurrentPostId, 1));
        }else{
            dispatch(createPost({...postinfo, user_id: userinfo.user.id }, history, userinfo.jwt));
        }
        clear();
        
    };

    const clear=()=>{
        setPostinfo({
            title: '', content: '', files: '' 
        });
    };

    if(!userinfo){
        return(
            <div>
                {history.push('/login')};
            </div>
        )
    };
    return (
        <Card className="center">
            {!post?<h1 className="text-center">Create Post</h1>: <h1 className="text-center">Edit Post</h1>}
            <div className="login-form">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={postinfo.title} onChange={handleonChange} />
                    </Form.Group>

                    <Form.Group controlId="content">
                    <Form.Label>content</Form.Label>
                    <Form.Control as="textarea" name="content" value={postinfo.content} onChange={handleonChange} />
                    </Form.Group>

                    <Form.Group controlId="content">
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostinfo({ ...postinfo, files: base64 })} />
                    </Form.Group>
                    {!post?<Button variant="primary" type="submit">CreatePost</Button>: <Button variant="primary" type="submit">EditPost</Button>}                   
                </Form>
            </div>
        </Card>
    );
};
  
export default PostForm;