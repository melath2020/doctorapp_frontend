
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../../components/Layout'
import { message, Table } from 'antd'


const Doctors = () => {
  const [doctor,setDoctor]=useState([])
  // getUsers
  const getDoctors=async()=>{
    try{
      const res= await axios.get('http://localhost:8000/api/v1/admin/getAllDoctors',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}` 
        }
      })
      if(res.data.success){
        setDoctor(res.data.data)
      }

    }catch(error){
      console.log(error)
    }
  }

  const handleAccountStatus=async(record,status)=>{
    try{
      const res=await axios.post('http://localhost:8000/api/v1/admin/changeAccountStatus',{doctorId:record._id,userId:record.userId,status:status},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success){
      
        message.success(res.data.message)
        window.location.reload()
      }

    }catch(error){
      message.error('Something Went Wrong')
    }

  }
  useEffect(()=>{
    getDoctors()
  },[])


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render:(text,record)=>(
        <span>{record.firstname} {record.lastname}</span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render:(text,record)=>(
        <div className='d-flex'>
          {record.status === 'pending' ? <button className='btn btn-success' onClick={()=>handleAccountStatus(record,'approved')}>Approve</button>:
          <button className='btn btn-danger'>Reject</button> }

        </div>
      )
    },
  ];
  return (
    <Layout><h1>All Doctors</h1>
    <Table dataSource={doctor} columns={columns} />;
    </Layout>
  )
}

export default Doctors