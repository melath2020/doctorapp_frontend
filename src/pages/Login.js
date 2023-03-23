import React from 'react'
import {  Form, Input, message } from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/RegisterStyles.css';
import axios from 'axios'
const Login = () => {
  const navigate=useNavigate()
  const onFinishHandler = async(values) => {
    try{
      const res= await axios.post('http://localhost:8000/api/v1/user/login',values)
      if(res.data.success){
        localStorage.setItem("token",res.data.token)
        message.success('Login Success')
        navigate('/')
      }else{
        message.error(res.data.message)
      }
    }catch(error){
      message.error('something went wrong')
    }
  };
 
  return (
    <>
     <div className="form-container">
        <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
          <h3 className='text-center'>Login Form</h3>
        

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item> 

          <Form.Item label="password" name="password">
            <Input type="password" required />
          </Form.Item> 
          <Link to="/register" className='m-2'>Not a User Register here</Link>
          <button className='btn btn-primary' type='submit'>Login</button>
        </Form>
      </div>
    </>
  )
}

export default Login