import { Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'


const Users = () => {
  const [user,setUser]=useState([])
  // getUsers
  const getUsers=async()=>{
    try{
      const res= await axios.get('http://localhost:8000/api/v1/admin/getAllUsers',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}` 
        }
      })
      if(res.data.success){
        setUser(res.data.data)
      }

    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getUsers()
  },[])

  
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Doctor',
      dataIndex: 'isDoctor',
      key: 'doctor',
      render:(text,record)=>(
        <span>{record.isDoctor? 'Yes': 'No'}</span>
      )
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render:(text,record)=>(
        <div className='d-flex'>
          <button className='btn btn-danger'>Block</button>
        </div>
      )
    },
  ];
  
  return (
    <Layout><h1 className='text-center m-2'>Users List</h1>
    <Table dataSource={user} columns={columns} />;

    </Layout>
  )
}

export default Users