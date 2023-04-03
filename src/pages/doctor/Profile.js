import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import { Col, Form, Input, Row, message } from 'antd'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'

const Profile = () => {
    const {user}= useSelector(state=>state.user)
    const [doctor,setDoctor]= useState(null)
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const params = useParams()

    const handleFinish = async(values)=>{
        console.log(values)
        try{
            dispatch(showLoading())
            const res = await axios.post('http://localhost:8000/api/v1/doctor/updateProfile',{...values, userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
                navigate('/')
            }else{
                message.error(res.data.success)
            }
        }catch(error){
            dispatch(hideLoading())
            console.log(error)
            message.error('Something went wrong')
        }
    }

    // getDoc Details
    const getDoctorInfo=async()=>{
        try{
            const res=await axios.post('http://localhost:8000/api/v1/doctor/getDoctorInfo',{userId:params.id},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setDoctor(res.data.data)
            }
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getDoctorInfo()
    },[])
  return (
    <Layout><h1>Manage Profile</h1>
    {doctor && (
            <Form layout='vertical' onFinish={handleFinish} className="m-3" initialValues={doctor}>
            <h4 className=''>Personal Details :</h4>
                <Row gutter={20}>
                   
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="First Name" name="firstname" required rules={[{required:true}]}>
                            <Input type='text' placeholder='your name'/>
                        </Form.Item>
    
    
                    </Col>
    
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Last Name" name="lastname" required rules={[{required:true}]}>
                            <Input type='text' placeholder='your last name'/>
                        </Form.Item>
    
    
                    </Col>
    
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Mobile Number" name="phone" required rules={[{required:true}]}>
                            <Input type='text' placeholder='your mobile number'/>
                        </Form.Item>
    
    
                    </Col>
    
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Email" name="email" required rules={[{required:true}]}>
                            <Input type='text' placeholder='your email'/>
                        </Form.Item>
    
    
                    </Col>
    
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Website" name="website" required rules={[{required:true}]}>
                            <Input type='text' placeholder='your website'/>
                        </Form.Item>
    
    
                    </Col>
    
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Address" name="address" required rules={[{required:true}]}>
                            <Input type='text' placeholder='your address'/>
                        </Form.Item>
    
    
                    </Col>
                </Row>
    
    
                <h4 className=''>Proessional Details :</h4>
                <Row gutter={20}>
                   
                   <Col xs={24} md={24} lg={8}>
                       <Form.Item label="Specialization" name="specialization" required rules={[{required:true}]}>
                           <Input type='text' placeholder='your specialization'/>
                       </Form.Item>
    
    
                   </Col>
    
                   <Col xs={24} md={24} lg={8}>
                       <Form.Item label="Experience" name="experience" required rules={[{required:true}]}>
                           <Input type='text' placeholder='your experience'/>
                       </Form.Item>
    
    
                   </Col>
    
                   
    
                   <Col xs={24} md={24} lg={8}>
                       <Form.Item label="Fees" name="feesPercunsaltation" required rules={[{required:true}]}>
                           <Input type='text' placeholder='your fees'/>
                       </Form.Item>
    
    
                   </Col>
    
                   {/* <Col xs={24} md={24} lg={8}>
                       <Form.Item label="Timings" name="timings">
                        <TimePicker.RangePicker use12Hours format="HH:mm"/>
                       </Form.Item>
    
                   </Col> */}
                   <Col xs={24} md={24} lg={8}>
                   
                   
                   </Col>
                   <Col xs={24} md={24} lg={8}>
                   <button className='btn btn-primary form-btn' type='submit'>Update</button>
                   </Col>
    
                  
               </Row>
            
            </Form>
    )}</Layout>
  )
}

export default Profile