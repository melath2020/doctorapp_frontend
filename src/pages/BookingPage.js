import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { DatePicker, TimePicker, message } from 'antd'
import moment from 'moment/moment'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/alertSlice';


const BookingPage = () => {
    const params =useParams()
    const {user}= useSelector((state)=>state.user)
    const [doctors,setDoctors] = useState([])
    const [date,setDate]= useState()
    const [time,setTime]= useState()
    const [isAvailiable,setIsAvailiable]=useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()
  // login user data
  const getUserData= async()=>{
    try{
      const res = await axios.post('http://localhost:8000/api/v1/doctor/getDoctorById',{doctorId:params.doctorId},{
        headers:{
          Authorization:"Bearer "+ localStorage.getItem('token'),
        }
      })
      
      if(res.data.success){
        setDoctors(res.data.data)
      }
    }catch(error){
        console.log(error)
    }
  }

  
 

  
  const handleAvailiability=async () =>{
    try{
      dispatch(showLoading())
      const res=await axios.post('http://localhost:8000/api/v1/user/booking-availiability',{
        doctorId:params.doctorId,date,time
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading())
      if(res.data.success){
        setIsAvailiable(true)
        message.success(res.data.message)
      }else{
        message.error(res.data.message)
      }
      
    }catch(error){
      dispatch(hideLoading())
      console.log(error)
    }

  }

  const handleBooking = async () => {
    try {
      setIsAvailiable(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = axios.post('http://localhost:8000/api/v1/user/book-appointnment',
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(()=>{
    getUserData()
  },[])
  return (
    <Layout><h3>BookingPage</h3>
    <div className="container m-2">
        {doctors && (
            <><h4>Dr {doctors.firstname} {doctors.lastname}</h4>
            <h4>Fees: {doctors.feesPercunsaltation}</h4>
            <h4>
              Timings : {doctors.timings && doctors.timings[0]} -{" "}
              {doctors.timings && doctors.timings[1]}{" "}
            </h4>
            <div className='d-flex flex-column w-50'>
              <DatePicker className='m-2' format="DD-MM-YYYY"
              onChange={(value)=>{
             
              setDate(moment(value).format('DD-MM-YYYY'))
              }
                }/>
              <TimePicker format="HH:mm" onChange={(value) => {
                  
                  setTime(moment(value).format("HH:mm"));
                
                }}/>
              <button className='btn btn-primary mt-2' onClick={handleAvailiability}>Check Availiability</button>
          
                   <button className='btn btn-dark mt-2' onClick={handleBooking}>Book Now</button>
            
            </div>
            </>
      
        )}
    </div>
    </Layout>
  )
}

export default BookingPage