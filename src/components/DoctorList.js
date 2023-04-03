import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorList = ({doctor}) => {
    const navigate = useNavigate()
  return (
    <>
    <div className="card m-2" style={{cursor:'pointer'}} onClick={()=>navigate(`/doctor/book-appointment/${doctor._id}`)}>
        <div className="card-header">
            Dr. {doctor.firstname} {doctor.lastname}
        </div>
        <div className="card-body">
            <p>
                <b>Specialization</b>
                {doctor.specialization}
            </p>
            <p>
                <b>Experiance</b>
                {doctor.experience}
            </p>
            <p>
                <b>Fees</b>
                {doctor.feesPercunsaltation}
            </p>
            {/* <p>
                <b>Timings</b>
                {doctor.timings}
            </p> */}
        </div>
    </div>
    </>
  )
}

export default DoctorList