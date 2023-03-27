import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';

export default function ProtectedRoute({children}) {
  const dispatch=useDispatch();
  const {user}=useSelector(state=>state.user)
  const getUser=async()=>{
    try{
      dispatch(showLoading())
      const res= await axios.post('/api/v1/user/getUserData',
      {token:localStorage.getItem('token')},
      {headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }})
      dispatch(hideLoading())
      if(res.data.success){
        dispatch(setUser(res.data.data))
      }else{
        <Navigate to="/login"/>
      }
    }catch(error){
      dispatch(hideLoading())
      console.log(error);
    }
  }
  if(localStorage.getItem("token")){
    return children;
  }else{
    return <Navigate to="/login"/>
  }
}
