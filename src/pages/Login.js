import React from 'react'
import {  Form, Input } from 'antd';
import {Link} from 'react-router-dom';
import '../styles/RegisterStyles.css';

const Login = () => {
  const onFinishHandler = (values) => {
    console.log('Success:', values);
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
          <button className='btn btn-primary' type='submit'>Loin</button>
        </Form>
      </div>
    </>
  )
}

export default Login