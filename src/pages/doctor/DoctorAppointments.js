import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Table, message } from 'antd'
import moment from 'moment'
import axios from 'axios'





const DoctorAppointments = () => {
    const [appointments,setAppointments]=useState([])
    const getAppointments =async()=>{
        try {
            const res = await axios.get("http://localhost:8000/api/v1/doctor/doctor-appointments", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            if (res.data.success) {
              setAppointments(res.data.data);
            }
          } catch (error) {
            console.log(error);
          }
        };

    useEffect(()=>{
        getAppointments();
        
    },[])

    const handleStatus=async(record,status)=>{
        try{
            const res=await axios.post('http://localhost:8000/api/v1/doctor/update-status', { appointmentsId:record._id, status },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                message.sucess(res.data.message)
                getAppointments()
            }

        }catch(error){
            console.log(error)
            message.error('Something Went Wrong')
        }


    }
    
    const columns = [
        {
          title: 'ID',
          dataIndex:'_id',
          key: 'id',
        },
        
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
            
          },
          {
            title: 'Actions',
            dataIndex: 'actions',
            render:(text,record)=>(
                <div className="d-flex">
                    {record.status==="pending" &&(
                        <div className="d-flex">
                            <button className='btn btn-success' onClick={()=>handleStatus(record,'approved')}>Approved</button>
                            <button className='btn btn-danger ms-2' onClick={()=>handleStatus(record,'reject')}>Reject</button>
                        </div>
                    )}
                </div>
            )
            
          }
     
        
      
      ];
  return (
    <Layout><h1>Appointment Lists</h1>
    <Table columns={columns} dataSource={appointments}/>
    </Layout>
  )
}

export default DoctorAppointments