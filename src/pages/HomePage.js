
import React, { useEffect } from 'react'
import axios from 'axios'


const HomePage = () => {
  // login user data
  const getUserData= async()=>{
    try{
      const res = await axios.post('http://localhost:8000/api/v1/user/getUserData',{},{
        headers:{
          Authorization:"Bearer "+ localStorage.getItem('token'),
        }
      })
    }catch(error){

    }
  }

  useEffect(()=>{
    getUserData()
  },[])
  return (
    <div><h1>Home page</h1></div>
  )
}

export default HomePage