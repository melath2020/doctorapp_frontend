
import React from 'react'
import Layout from '../components/Layout';
import { Col, Form, Input, Row, TimePicker } from 'antd';

const ApplyDoctor = () => {
    const handleFinish = (values)=>{
        console.log(values)
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
                   <Form.Item label="Timing" name="timing" >
                    <TimePicker.RangePicker/>
           
                   </Form.Item>


               </Col>

               
           </Row>
           <div className="d-flex justiy-content-end">
            <button className='btn btn-primary' type='submit'>Submit</button>
           </div>
        </Form>
    </Layout>
  )
}

export default ApplyDoctor