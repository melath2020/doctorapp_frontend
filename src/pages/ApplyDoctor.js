
import React from 'react'
import Layout from '../components/Layout';
import { Col, Form, Input, message, Row, TimePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoading ,hideLoading} from '../redux/features/alertSlice';
import axios from 'axios';

const ApplyDoctor = () => {
    const {user}= useSelector(state=>state.user)
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const handleFinish = async(values)=>{
        try{
            dispatch(showLoading())
            const res = await axios.post('http://localhost:8000/api/v1/user/apply-doctor',{...values,userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.success)
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
  return (
    <Layout>
        <h1 className='text-center'>Apply Doctor</h1>
        <Form layout='vertical' onFinish={handleFinish} className="m-3">
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

               <Col xs={24} md={24} lg={8}>
                   <Form.Item label="Timings" name="timings" required>
                    <TimePicker.RangePicker use12Hours format="HH:mm"/>
                   </Form.Item>

               </Col>
               <Col xs={24} md={24} lg={8}>
               
               
               </Col>
               <Col xs={24} md={24} lg={8}>
               <button className='btn btn-primary form-btn' type='submit'>Submit</button>
               </Col>

              
           </Row>
        
        </Form>
    </Layout>
  )
}

export default ApplyDoctor