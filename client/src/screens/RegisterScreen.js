import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import {login, register} from "../actions/userActions"
import Message from '../components/Message'
import Loader from '../components/Loader'
const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)


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
        }
    },[navigate, userInfo, redirect])


const submitHandler = (e) => {
    e.preventDefault()
    //Dispatch register
    if(password !== confirmPassword){
        setMessage('Passwords mismatch !!')
    }else{
        dispatch(register(name, email, password))

    }

}
  return (
    <FormContainer>
        <h1>Sign Up</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </Form.Group>
            <br/>
            <Button type="submit" variant='primary' >Sign Up</Button>
        </Form>
        <Row className='py-3' >
        <Col>Already a member ? <Link to = {redirect ? `/login?redirect=${redirect}` : "/login"} >Sign In</Link></Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen