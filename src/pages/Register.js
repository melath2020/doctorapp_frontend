import React from 'react'
import {  Form, Input, message } from 'antd';
import '../styles/RegisterStyles.css';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';


const Register = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const onFinishHandler = async(values) => {
   try{
    dispatch(showLoading())
    const res = await axios.post('http://localhost:8000/api/v1/user/register',values)
    dispatch(hideLoading())
    if(res.data.success){
      message.success('Register Success')
      navigate('/login')
    }else{
     message.error('Something Went Wrong')
    }
   }catch(error){
    dispatch(hideLoading())
    message.error('Something went wrong')
   }
  };
 
  return (
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
          <h3 className='text-center'>Register Form</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item> 

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item> 

          <Form.Item label="password" name="password">
            <Input type="password" required />
          </Form.Item> 
          <Link to="/login" className='m-2'>Already User login here</Link>
          <button className='btn btn-primary' type='submit'>Register</button>
        </Form>
      </div>
    </>
  );
}

export default Register