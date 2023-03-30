import React from 'react'
import Layout from '../components/Layout'
import {  message, Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Notification = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} =useSelector((state)=>state.user)
    const handleMarkAllRead =async()=>{
        try{
            dispatch(showLoading())
            const res = await axios.post('http://localhost:8000/api/v1/user/get-all-notiication',{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.message){
                message.success(res.data.message)
            }else{
                message.error(res.data.message)
            }
        }catch(error){
            dispatch(hideLoading())
            console.log(error)
            message.error("Something Went Wrong")
        }
    }
    const handleDeleteAllRead =async()=>{
        try{
            dispatch(showLoading())
            const res=await axios.post('http://localhost:8000/api/v1/user/delete-all-notiication',{userId:user._id },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
            }else{
                message.error(res.data.message)
            }
        }catch(error){
            console.log(error)
            message.error('Somthing went wrong in notification')
        }

    }
  return (
    <Layout ><h4 className='p-3 text-center'>Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab="UnRead" key={0}>
            <div className="d-flex justify-content-end">
                <h4 className='p-2' onClick={handleMarkAllRead}>Mark All Read</h4>
            </div>
            {
            user?.notification.map(notificationMgs=>(
                <div className="card"  style={{cursor:'pointer'}}>
                    <div className="card-text" onClick={()=>navigate(notificationMgs.onclickPath)}>
                        {notificationMgs.message}
                    </div>
                </div>
            ))
        }
        </Tabs.TabPane>
        
        <Tabs.TabPane tab="Read" key={1}>
            <div className="d-flex justify-content-end" style={{cursor:'pointer'}}>
                <h4 className='p-2 text-primary' onClick={handleDeleteAllRead}>Delete All Read</h4>
            </div>
            {
            user?.seennotification.map(notificationMgs=>(
                <div className="card"  style={{cursor:'pointer'}}>
                    <div className="card-text" onClick={()=>navigate(notificationMgs.onclickPath)}>
                        {notificationMgs.message}
                    </div>
                </div>
            ))
        }
        </Tabs.TabPane>
        </Tabs>
    </Layout>
  
  )
}

export default Notification