import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Table } from 'antd'

const Appointments = () => {
    const [appointments,setAppointments]=useState([])
    const getAppointments =async()=>{
        try{
            const res =await axios.get('http://localhost:8000/api/v1/user/user-appointments',{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(res.data)
            if (res.data.success) {
                
                setAppointments(res.data.data);
              }
          
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getAppointments();
        
    },[])
    
    
    const columns = [
        {
          title: 'ID',
          dataIndex:'_id',
          key: 'id',
        },
        // {
        //   title: 'Name',
        //   dataIndex:'name',
        //   key: 'name',
        //   render: (text,record)=>(
        //     <span>
        //          {record.doctorId.firstname} {record.doctorId.lastname}
        //     </span>
           
        //   ),
        // },
        // {
        //   title: 'Phone',
        //   dataIndex: 'phone',
        //   render: (text,record)=>(
        //     <span>
        //          {record.doctorId.phone} 
        //     </span>
           
        //   ),
        // },
        {
            title: 'Date & Time',
            dataIndex: 'date',
            render: (text,record)=>(
              <span>
                  {moment(record.date).format('DD-MM-YYYY')}
                  {moment(record.time).format('HH:mm')}
              </span>
             
            ),
          },
          {
            title: 'Status',
            dataIndex: 'status',
            
          }
     
        
      
      ];
  return (
    <Layout><h1>Appointment Lists</h1>
    <Table columns={columns} dataSource={appointments}/>
    </Layout>
    
  )
}

export default Appointments