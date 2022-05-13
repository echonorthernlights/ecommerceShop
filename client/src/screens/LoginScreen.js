import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import {login} from "../actions/userActions"
import Message from '../components/Message'
import Loader from '../components/Loader'
const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect")
    : "/";
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const {loading, userInfo, error} = userLogin
    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
            console.log("-----------")
            console.log(redirect)
        }
    },[navigate, userInfo, redirect])

const submitHandler = (e) => {
    e.preventDefault()
    //Dispatch login
    dispatch(login(email, password))

}
  return (
    <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <br/>
            <Button type="submit" variant='primary' >Sign In</Button>
        </Form>
        <Row className='py-3' >
            <Col>New Customer ? <Link to = {redirect ? `/register?redirect=${redirect}` : "/register"} >Register</Link></Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen